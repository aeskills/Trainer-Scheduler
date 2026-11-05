import { HttpsError, CallableRequest } from "firebase-functions/v2/https";
import { col, FieldValue } from "./firebase";
import { AppSettings, AppUser, DEFAULT_SETTINGS } from "../types";

export async function getSettings(): Promise<AppSettings> {
  const snap = await col.settings().doc("app").get();
  const data = (snap.data() ?? {}) as Partial<AppSettings>;
  return {
    ...DEFAULT_SETTINGS,
    ...data,
    stateLinks: { ...DEFAULT_SETTINGS.stateLinks, ...(data.stateLinks ?? {}) },
    reminderTimes: { ...DEFAULT_SETTINGS.reminderTimes, ...(data.reminderTimes ?? {}) },
  };
}

export function normalizeEmail(email: unknown): string {
  return String(email ?? "").trim().toLowerCase();
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function findUserByEmail(email: string): Promise<AppUser | null> {
  const q = await col.users().where("email", "==", normalizeEmail(email)).limit(1).get();
  if (q.empty) return null;
  const d = q.docs[0];
  return { ...(d.data() as AppUser), uid: d.id };
}

export async function getUser(uid: string): Promise<AppUser | null> {
  const d = await col.users().doc(uid).get();
  return d.exists ? { ...(d.data() as AppUser), uid: d.id } : null;
}

/** Require an authenticated, approved caller. Returns the uid and role. */
export function requireAuth(req: CallableRequest): { uid: string; role: "admin" | "trainer" } {
  if (!req.auth) throw new HttpsError("unauthenticated", "Please sign in again.");
  const role = req.auth.token.role;
  if (role !== "admin" && role !== "trainer") throw new HttpsError("permission-denied", "No role assigned.");
  if (role === "trainer" && req.auth.token.approved !== true) {
    throw new HttpsError("permission-denied", "Your account is not approved yet.");
  }
  return { uid: req.auth.uid, role };
}

export function requireAdmin(req: CallableRequest): string {
  const { uid, role } = requireAuth(req);
  if (role !== "admin") throw new HttpsError("permission-denied", "Admin access required.");
  return uid;
}

export async function logActivity(
  actorId: string,
  action: string,
  targetId: string | null,
  meta: Record<string, unknown> = {},
  actorName?: string,
) {
  await col.activityLogs().add({
    actorId,
    actorName: actorName ?? null,
    action,
    targetId,
    meta,
    timestamp: FieldValue.serverTimestamp(),
  });
}

export async function getAdmins(): Promise<AppUser[]> {
  const q = await col.users().where("role", "==", "admin").get();
  return q.docs
    .map((d) => ({ ...(d.data() as AppUser), uid: d.id }))
    .filter((u) => u.status !== "Deactivated");
}
