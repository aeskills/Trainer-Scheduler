import { onCall, HttpsError } from "firebase-functions/v2/https";
import { REGION } from "../config";
import { getUser, logActivity, requireAuth } from "../lib/common";
import { col, db, FieldValue } from "../lib/firebase";
import { displayDate, istDateKey } from "../lib/ist";
import { notifyUser } from "../notify/notifyUser";
import { Visit } from "../types";
import { validateForSubmit } from "./validation";

/**
 * submitVisit({ visitId }) – validates everything server-side, then locks the day.
 * Trainers may only submit their own PLANNED visit for today (IST).
 */
export const submitVisit = onCall({ region: REGION, cors: true }, async (req) => {
  const { uid, role } = requireAuth(req);
  const visitId = String(req.data?.visitId ?? "");
  const ref = col.visits().doc(visitId);

  const visit = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists) throw new HttpsError("not-found", "Visit not found.");
    const v = { ...(snap.data() as Visit), id: snap.id };

    if (role !== "admin") {
      if (v.trainerId !== uid) throw new HttpsError("permission-denied", "You can only submit your own visits.");
      if (v.status === "SUBMITTED") throw new HttpsError("failed-precondition", "This day is already submitted.");
      if (v.status !== "PLANNED") throw new HttpsError("failed-precondition", "This day is locked. Contact your admin.");
      const today = istDateKey();
      if (v.dateKey > today) throw new HttpsError("failed-precondition", "You can only submit on the day of the visit.");
      if (v.dateKey < today) throw new HttpsError("failed-precondition", "This day has passed. Contact your admin.");
    }

    const result = validateForSubmit(v);
    if (!result.ok) {
      throw new HttpsError("failed-precondition", `Still missing: ${result.missing.join(", ")}`, { missing: result.missing });
    }

    tx.update(ref, {
      status: "SUBMITTED",
      submittedAt: FieldValue.serverTimestamp(),
      submittedBy: uid,
      updatedAt: FieldValue.serverTimestamp(),
    });
    return v;
  });

  const trainer = await getUser(visit.trainerId);
  if (trainer) {
    await notifyUser(trainer, {
      title: "Day submitted ✅",
      body: `Great work! Your visits for ${displayDate(visit.date)} were submitted.`,
      link: `/visit/${visit.date}`,
      kind: "submitted",
      push: false,
    });
  }
  await logActivity(uid, role === "admin" ? "visit.submitted_by_admin" : "visit.submitted", visitId, {
    date: visit.date,
    schools: visit.schools.length,
  });
  return { ok: true };
});
