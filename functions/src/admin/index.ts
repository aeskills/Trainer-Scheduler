import { logger } from "firebase-functions";
import { onCall, HttpsError, CallableOptions } from "firebase-functions/v2/https";
import { z } from "zod";
import { DRIVE_SECRETS, EMAIL_SECRETS, REGION } from "../config";
import { syncAuthUser } from "../auth/otpStore";
import { trainerFolder } from "../drive/folders";
import { sendLoggedEmail } from "../email";
import { approvedEmail, rejectedEmail } from "../email/templates";
import { EMAIL_RE, findUserByEmail, getSettings, getUser, logActivity, requireAdmin } from "../lib/common";
import { auth, col, db, FieldValue } from "../lib/firebase";
import { appLink } from "../notify/notifyUser";
import { runMissed, runReminders } from "../scheduler";
import { AppUser } from "../types";

const opts: CallableOptions = { region: REGION, cors: true, secrets: [...EMAIL_SECRETS, ...DRIVE_SECRETS] };

const phone = z
  .string()
  .trim()
  .transform((s) => s.replace(/[\s-]/g, ""))
  .refine((s) => s === "" || /^(\+91)?[6-9]\d{9}$/.test(s), "Enter a valid 10-digit mobile number");

const CreateSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().toLowerCase().regex(EMAIL_RE, "Enter a valid email"),
  phone: phone.default(""),
  state: z.string().trim().default(""),
  role: z.enum(["trainer", "admin"]).default("trainer"),
  status: z.enum(["Pending", "Approved", "Rejected", "Deactivated"]).default("Approved"),
});

const UpdateSchema = z.object({
  uid: z.string().min(1),
  name: z.string().trim().min(2).max(80).optional(),
  email: z.string().trim().toLowerCase().regex(EMAIL_RE, "Enter a valid email").optional(),
  phone: phone.optional(),
  state: z.string().trim().optional(),
  role: z.enum(["trainer", "admin"]).optional(),
  status: z.enum(["Pending", "Approved", "Rejected", "Deactivated"]).optional(),
});

function parse<S extends z.ZodTypeAny>(schema: S, data: unknown): z.infer<S> {
  const r = schema.safeParse(data);
  if (!r.success) throw new HttpsError("invalid-argument", r.error.issues[0]?.message ?? "Invalid input.");
  return r.data;
}

async function ensureDriveFolder(u: AppUser) {
  if (u.role !== "trainer" || !u.state) return;
  try {
    await trainerFolder(u.state, u.name);
  } catch (e) {
    logger.warn("Could not create trainer Drive folder", { uid: u.uid, e: String(e) });
  }
}

/** adminCreateUser – add a trainer or another admin. */
export const adminCreateUser = onCall(opts, async (req) => {
  const actor = requireAdmin(req);
  const input = parse(CreateSchema, req.data);
  if (input.role === "trainer") {
    const { states } = await getSettings();
    if (!states.includes(input.state)) throw new HttpsError("invalid-argument", "Select a valid state.");
  }
  if (await findUserByEmail(input.email)) throw new HttpsError("already-exists", "A user with this email already exists.");

  let uid: string;
  try {
    uid = (await auth.getUserByEmail(input.email)).uid;
  } catch {
    uid = (await auth.createUser({ email: input.email, displayName: input.name, emailVerified: true })).uid;
  }
  const user: AppUser = { uid, ...input };
  await col.users().doc(uid).set({ ...user, fcmTokens: [], createdAt: FieldValue.serverTimestamp(), createdBy: actor });
  await syncAuthUser(user);
  await ensureDriveFolder(user);
  await logActivity(actor, "user.created", uid, { role: input.role, email: input.email, state: input.state });
  return { uid };
});

/** adminUpdateUser – edit profile, change registered email, approve/reject/deactivate, change role. */
export const adminUpdateUser = onCall(opts, async (req) => {
  const actor = requireAdmin(req);
  const input = parse(UpdateSchema, req.data);
  const before = await getUser(input.uid);
  if (!before) throw new HttpsError("not-found", "User not found.");
  if (input.uid === actor && (input.role === "trainer" || input.status === "Deactivated")) {
    throw new HttpsError("failed-precondition", "You can't remove your own admin access.");
  }

  if (input.email && input.email !== before.email) {
    const clash = await findUserByEmail(input.email);
    if (clash && clash.uid !== input.uid) throw new HttpsError("already-exists", "Another user already uses this email.");
  }
  if (input.state) {
    const { states } = await getSettings();
    if (!states.includes(input.state)) throw new HttpsError("invalid-argument", "Select a valid state.");
  }

  const { uid, ...changes } = input;
  const after: AppUser = { ...before, ...Object.fromEntries(Object.entries(changes).filter(([, v]) => v !== undefined)) };
  await col.users().doc(uid).update({ ...changes, updatedAt: FieldValue.serverTimestamp() });
  await syncAuthUser(after);

  const lostAccess =
    (before.status === "Approved" && after.status !== "Approved") || before.role !== after.role || before.email !== after.email;
  if (lostAccess) await auth.revokeRefreshTokens(uid);

  // Keep denormalised trainer name/state on their future visits in sync.
  if (after.name !== before.name || after.state !== before.state) {
    const future = await col.visits().where("trainerId", "==", uid).get();
    const batch = db.batch();
    future.docs.forEach((d) => batch.update(d.ref, { trainerName: after.name, state: after.state }));
    await batch.commit();
  }

  if (before.status !== "Approved" && after.status === "Approved") {
    await ensureDriveFolder(after);
    await sendLoggedEmail("account_approved", approvedEmail({ to: after.email, name: after.name, link: appLink("/login") }));
  } else if (before.status === "Pending" && after.status === "Rejected") {
    await sendLoggedEmail("account_rejected", rejectedEmail({ to: after.email, name: after.name }));
  } else if (after.status === "Approved" && (after.name !== before.name || after.state !== before.state)) {
    await ensureDriveFolder(after);
  }

  await logActivity(actor, "user.updated", uid, {
    changes: Object.keys(changes),
    ...(before.status !== after.status ? { status: `${before.status} → ${after.status}` } : {}),
    ...(before.email !== after.email ? { email: `${before.email} → ${after.email}` } : {}),
  });
  return { ok: true };
});

/** adminDeleteUser({ uid, deleteVisits? }) */
export const adminDeleteUser = onCall(opts, async (req) => {
  const actor = requireAdmin(req);
  const uid = String(req.data?.uid ?? "");
  if (!uid) throw new HttpsError("invalid-argument", "Missing user.");
  if (uid === actor) throw new HttpsError("failed-precondition", "You can't delete your own account.");
  const user = await getUser(uid);
  if (!user) throw new HttpsError("not-found", "User not found.");

  await auth.deleteUser(uid).catch(() => undefined);
  await col.users().doc(uid).delete();

  let deletedVisits = 0;
  if (req.data?.deleteVisits === true) {
    const visits = await col.visits().where("trainerId", "==", uid).get();
    for (let i = 0; i < visits.docs.length; i += 400) {
      const batch = db.batch();
      visits.docs.slice(i, i + 400).forEach((d) => batch.delete(d.ref));
      await batch.commit();
    }
    deletedVisits = visits.size;
  }
  await logActivity(actor, "user.deleted", uid, { email: user.email, name: user.name, deletedVisits });
  return { ok: true, deletedVisits };
});

/** adminRunJob({ job: "reminders" | "missed" }) – manual trigger for testing/backfill. */
export const adminRunJob = onCall(opts, async (req) => {
  const actor = requireAdmin(req);
  const job = req.data?.job;
  const result = job === "missed" ? await runMissed() : job === "reminders" ? await runReminders() : null;
  if (!result) throw new HttpsError("invalid-argument", "Unknown job.");
  await logActivity(actor, `job.${job}.manual`, null, result);
  return result;
});
