import { createHash } from "node:crypto";
import { DRIVE_ROOT_FOLDER_ID } from "../config";
import { col, FieldValue } from "../lib/firebase";
import { displayDate } from "../lib/ist";
import { DriveService, getDriveService } from "./DriveService";

/** Drive folder names can't sensibly contain slashes; keep them tidy. */
export function cleanName(s: string): string {
  return s.replace(/[\\/:*?"<>|#%]+/g, " ").replace(/\s+/g, " ").trim() || "Unnamed";
}

/** File-name-safe school prefix: "St. Mary's School" → "St_Marys_School". */
export function filePrefix(schoolName: string): string {
  return (
    schoolName
      .normalize("NFKD")
      .replace(/[^\p{L}\p{N}\s_-]/gu, "")
      .trim()
      .replace(/\s+/g, "_")
      .slice(0, 60) || "School"
  );
}

export function rootFolderId(): string {
  const id = DRIVE_ROOT_FOLDER_ID.value();
  if (!id) throw new Error("DRIVE_ROOT_FOLDER_ID is not configured. See docs/SETUP.md.");
  return id;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Find-or-create one folder under `parentId`, cached in Firestore. A create()
 * lock prevents duplicate folders when several uploads race.
 */
async function ensureChild(drive: DriveService, parentId: string, name: string): Promise<string> {
  const key = createHash("sha256").update(`${drive.mode}|${parentId}|${name}`).digest("hex").slice(0, 40);
  const ref = col.driveFolders().doc(key);

  const cached = await ref.get();
  if (cached.get("folderId")) return cached.get("folderId");

  let haveLock = false;
  try {
    await ref.create({ parentId, name, status: "creating", createdAt: FieldValue.serverTimestamp() });
    haveLock = true;
  } catch {
    // Someone else holds the lock – wait for their result (max ~10s), else take over.
    for (let i = 0; i < 20; i++) {
      await sleep(500);
      const s = await ref.get();
      if (s.get("folderId")) return s.get("folderId");
    }
  }

  try {
    const folderId = (await drive.findFolder(name, parentId)) ?? (await drive.createFolder(name, parentId));
    await ref.set({ parentId, name, folderId, status: "ready", updatedAt: FieldValue.serverTimestamp() }, { merge: true });
    return folderId;
  } catch (e) {
    if (haveLock) await ref.delete().catch(() => undefined);
    throw e;
  }
}

/** Ensure a nested path under the root and return the deepest folder ID. */
export async function ensurePath(segments: string[], drive: DriveService = getDriveService()): Promise<string> {
  let parent = rootFolderId();
  for (const seg of segments) parent = await ensureChild(drive, parent, cleanName(seg));
  return parent;
}

/** AE Trainer/{State}/{Trainer Name} */
export function trainerFolder(state: string, trainerName: string) {
  return ensurePath([state, trainerName]);
}

/** AE Trainer/{State}/{Trainer Name}/{2 Nov 2026}/Photos */
export function photosFolder(state: string, trainerName: string, date: string) {
  return ensurePath([state, trainerName, displayDate(date), "Photos"]);
}
