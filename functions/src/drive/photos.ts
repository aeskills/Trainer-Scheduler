import { randomUUID } from "node:crypto";
import { logger } from "firebase-functions";
import { onCall, onRequest, HttpsError } from "firebase-functions/v2/https";
import { DRIVE_PUBLIC_LINKS, DRIVE_SECRETS, REGION } from "../config";
import { getUser, logActivity, requireAuth } from "../lib/common";
import { auth, col, db, FieldValue } from "../lib/firebase";
import { istDateKey } from "../lib/ist";
import { FieldPath } from "firebase-admin/firestore";
import { Photo, Visit } from "../types";
import { getDriveService } from "./DriveService";
import { filePrefix, photosFolder } from "./folders";

const MAX_BYTES = 10 * 1024 * 1024;
const MIME_EXT: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp", "image/heic": "heic" };
const SESSION_MAX_S = 30 * 24 * 3600;

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

/** Shared permission check for photo mutations. */
function assertCanEditPhotos(visit: Visit, uid: string, role: string) {
  if (role === "admin") return;
  if (visit.trainerId !== uid) throw new HttpError(403, "You can only upload photos to your own visits.");
  if (visit.status !== "PLANNED") throw new HttpError(409, "This day is locked and can no longer be edited.");
  if (visit.dateKey !== istDateKey()) throw new HttpError(409, "Photos can only be added on the day of the visit.");
}

/**
 * POST /uploadPhoto?visitId=…&schoolId=…
 * Headers: Authorization: Bearer <Firebase ID token>, Content-Type: image/jpeg
 * Body: raw (client-compressed) image bytes.
 * Implemented as an HTTP function (not callable) so the browser can report upload progress.
 */
export const uploadPhoto = onRequest(
  { region: REGION, secrets: DRIVE_SECRETS, cors: true, memory: "512MiB", timeoutSeconds: 120, maxInstances: 20 },
  async (req, res) => {
    try {
      if (req.method !== "POST") throw new HttpError(405, "Method not allowed");

      // ── auth ──
      const header = req.get("authorization") ?? "";
      const idToken = header.startsWith("Bearer ") ? header.slice(7) : "";
      if (!idToken) throw new HttpError(401, "Please sign in again.");
      const decoded = await auth.verifyIdToken(idToken, true).catch(() => null);
      if (!decoded) throw new HttpError(401, "Your session has expired. Please sign in again.");
      if (Date.now() / 1000 - decoded.auth_time > SESSION_MAX_S) throw new HttpError(401, "Session expired. Please sign in again.");
      const role = decoded.role as string;
      if (role !== "admin" && !(role === "trainer" && decoded.approved === true)) throw new HttpError(403, "Not allowed.");

      // ── input ──
      const visitId = String(req.query.visitId ?? "");
      const schoolId = String(req.query.schoolId ?? "");
      const mimeType = (req.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
      const body: Buffer | undefined = (req as unknown as { rawBody?: Buffer }).rawBody;
      if (!visitId || !schoolId) throw new HttpError(400, "Missing visit or school.");
      if (!MIME_EXT[mimeType]) throw new HttpError(415, "Only JPEG, PNG, WebP or HEIC images are allowed.");
      if (!body?.length) throw new HttpError(400, "Empty file.");
      if (body.length > MAX_BYTES) throw new HttpError(413, "Image is too large (max 10 MB).");

      // ── allocate running number atomically ──
      const visitRef = col.visits().doc(visitId);
      const { visit, school, n } = await db.runTransaction(async (tx) => {
        const snap = await tx.get(visitRef);
        if (!snap.exists) throw new HttpError(404, "Visit not found. Save your plan first.");
        const v = { ...(snap.data() as Visit), id: snap.id };
        assertCanEditPhotos(v, decoded.uid, role);
        const s = v.schools.find((x) => x.id === schoolId);
        if (!s) throw new HttpError(404, "School not found on this visit. Save your plan first.");
        if (!s.name?.trim()) throw new HttpError(400, "Enter the school name before uploading photos.");
        const next = (v.photoCounters?.[schoolId] ?? 0) + 1;
        tx.update(visitRef, new FieldPath("photoCounters", schoolId), next);
        return { visit: v, school: s, n: next };
      });

      // ── upload to Drive ──
      const trainer = await getUser(visit.trainerId);
      const trainerName = trainer?.name ?? visit.trainerName;
      const state = trainer?.state ?? visit.state;
      const drive = getDriveService();
      const folderId = await photosFolder(state, trainerName, visit.date);
      const fileName = `${filePrefix(school.name)}_${n}.${MIME_EXT[mimeType]}`;
      const file = await drive.uploadFile({ name: fileName, parentId: folderId, mimeType, data: body });
      if (DRIVE_PUBLIC_LINKS.value()) {
        await drive.makePublic(file.id).catch((e) => logger.warn("makePublic failed", { id: file.id, e: String(e) }));
      }

      const photo: Photo = {
        id: randomUUID(),
        driveFileId: file.id,
        link: file.link,
        thumbUrl: file.thumbUrl,
        fileName,
        uploadedAt: Date.now(),
        uploadedBy: decoded.uid,
      };
      await visitRef.update(
        new FieldPath("photos", schoolId),
        FieldValue.arrayUnion(photo),
        "photoCount",
        FieldValue.increment(1),
        "updatedAt",
        FieldValue.serverTimestamp(),
      );

      res.status(200).json({ photo });
    } catch (err) {
      const status = err instanceof HttpError ? err.status : 500;
      if (status === 500) logger.error("uploadPhoto failed", err);
      res.status(status).json({ error: { message: err instanceof HttpError ? err.message : "Upload failed. Please retry." } });
    }
  },
);

/** deletePhoto({ visitId, schoolId, photoId }) – removes from the visit and trashes the Drive file. */
export const deletePhoto = onCall({ region: REGION, secrets: DRIVE_SECRETS, cors: true }, async (req) => {
  const { uid, role } = requireAuth(req);
  const visitId = String(req.data?.visitId ?? "");
  const schoolId = String(req.data?.schoolId ?? "");
  const photoId = String(req.data?.photoId ?? "");
  const ref = col.visits().doc(visitId);

  const removed = await db
    .runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists) throw new HttpError(404, "Visit not found.");
      const v = { ...(snap.data() as Visit), id: snap.id };
      assertCanEditPhotos(v, uid, role);
      const list = v.photos?.[schoolId] ?? [];
      const photo = list.find((p) => p.id === photoId);
      if (!photo) throw new HttpError(404, "Photo not found.");
      tx.update(
        ref,
        new FieldPath("photos", schoolId),
        list.filter((p) => p.id !== photoId),
        "photoCount",
        FieldValue.increment(-1),
        "updatedAt",
        FieldValue.serverTimestamp(),
      );
      return photo;
    })
    .catch((e) => {
      if (e instanceof HttpError) throw new HttpsError(e.status === 404 ? "not-found" : "permission-denied", e.message);
      throw e;
    });

  await getDriveService()
    .trash(removed.driveFileId)
    .catch((e) => logger.warn("Drive trash failed", { id: removed.driveFileId, e: String(e) }));
  if (role === "admin") await logActivity(uid, "photo.deleted", visitId, { fileName: removed.fileName });
  return { ok: true };
});
