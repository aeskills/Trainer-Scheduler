import { onCall, HttpsError, CallableOptions } from "firebase-functions/v2/https";
import { z } from "zod";
import { EMAIL_SECRETS, REGION } from "../config";
import { sendLoggedEmail } from "../email";
import { newRegistrationEmail, otpEmail } from "../email/templates";
import { EMAIL_RE, findUserByEmail, getAdmins, getSettings, logActivity, normalizeEmail } from "../lib/common";
import { auth, col, FieldValue } from "../lib/firebase";
import { appLink, notifyUser } from "../notify/notifyUser";
import { AppUser } from "../types";
import { isSixDigits } from "./otpUtils";
import { consumeOtp, enforceOtpRateLimit, issueOtp, mintToken, sleep } from "./otpStore";

const GENERIC_SENT = "If this email is registered, an OTP has been sent.";
const callOpts: CallableOptions = { region: REGION, secrets: EMAIL_SECRETS, cors: true };

/**
 * requestOtp({ email, purpose })
 *  - login: only registered (Approved/Pending) users actually receive a code.
 *  - register: always sends a code (proves ownership of the email).
 * Always returns the same generic response.
 */
export const requestOtp = onCall(callOpts, async (req) => {
  const email = normalizeEmail(req.data?.email);
  const purpose = req.data?.purpose === "register" ? "register" : "login";
  if (!EMAIL_RE.test(email)) throw new HttpsError("invalid-argument", "Please enter a valid email address.");

  await enforceOtpRateLimit(email);

  if (purpose === "login") {
    const user = await findUserByEmail(email);
    if (!user || (user.status !== "Approved" && user.status !== "Pending")) {
      // Simulate work so response timing doesn't reveal which emails exist.
      await sleep(500 + Math.random() * 700);
      return { ok: true, message: GENERIC_SENT, resendAfter: 30 };
    }
  }

  const code = await issueOtp(email, purpose);
  await sendLoggedEmail(purpose === "login" ? "otp_login" : "otp_register", otpEmail(email, code, purpose));
  return {
    ok: true,
    message: purpose === "login" ? GENERIC_SENT : "We've sent a 6-digit code to your email.",
    resendAfter: 30,
  };
});

/**
 * verifyOtp({ email, code }) → { status: "ok", token, role } | { status: "pending" }
 */
export const verifyOtp = onCall(callOpts, async (req) => {
  const email = normalizeEmail(req.data?.email);
  const code = String(req.data?.code ?? "");
  if (!EMAIL_RE.test(email) || !isSixDigits(code)) {
    throw new HttpsError("invalid-argument", "Enter the 6-digit code sent to your email.");
  }

  await consumeOtp(email, "login", code);

  const user = await findUserByEmail(email);
  if (!user) throw new HttpsError("not-found", "Invalid or expired code. Please request a new one.");
  if (user.status === "Pending") return { status: "pending", name: user.name };
  if (user.status !== "Approved") throw new HttpsError("permission-denied", "Your account is not active. Contact your admin.");

  const token = await mintToken(user);
  await col.users().doc(user.uid).update({ lastLoginAt: FieldValue.serverTimestamp() });
  await logActivity(user.uid, "auth.login", user.uid, {}, user.name);
  return { status: "ok", token, role: user.role };
});

const RegisterSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().toLowerCase().regex(EMAIL_RE, "Enter a valid email"),
  phone: z
    .string()
    .trim()
    .transform((s) => s.replace(/[\s-]/g, ""))
    .refine((s) => /^(\+91)?[6-9]\d{9}$/.test(s), "Enter a valid 10-digit mobile number"),
  state: z.string().trim().min(1),
  code: z.string().regex(/^\d{6}$/, "Enter the 6-digit code"),
});

/**
 * registerTrainer({ name, email, phone, state, code })
 * Verifies the email OTP, then creates the trainer as Pending (or Approved if auto-approve).
 */
export const registerTrainer = onCall(callOpts, async (req) => {
  const parsed = RegisterSchema.safeParse(req.data);
  if (!parsed.success) throw new HttpsError("invalid-argument", parsed.error.issues[0]?.message ?? "Invalid details.");
  const input = parsed.data;

  const settings = await getSettings();
  if (!settings.states.includes(input.state)) throw new HttpsError("invalid-argument", "Please select a valid state.");

  await consumeOtp(input.email, "register", input.code);

  if (await findUserByEmail(input.email)) {
    throw new HttpsError("already-exists", "This email is already registered. Please sign in instead.");
  }

  // Reuse an orphaned Auth account if one exists, otherwise create one.
  let uid: string;
  try {
    uid = (await auth.getUserByEmail(input.email)).uid;
  } catch {
    uid = (await auth.createUser({ email: input.email, displayName: input.name, emailVerified: true })).uid;
  }

  const status = settings.autoApprove ? "Approved" : "Pending";
  const user: AppUser = {
    uid,
    name: input.name,
    email: input.email,
    phone: input.phone,
    state: input.state,
    role: "trainer",
    status,
  };
  await col.users().doc(uid).set({ ...user, fcmTokens: [], createdAt: FieldValue.serverTimestamp() });
  await logActivity(uid, "trainer.registered", uid, { state: input.state, status }, input.name);

  const admins = await getAdmins();
  await Promise.allSettled(
    admins.map((a) =>
      notifyUser(a, {
        title: status === "Pending" ? "New registration awaiting approval" : "New trainer joined",
        body: `${input.name} (${input.state}) registered with ${input.email}.`,
        link: "/admin/trainers?status=Pending",
        kind: "registration",
        email:
          status === "Pending"
            ? {
                type: "new_registration",
                message: newRegistrationEmail({
                  to: a.email,
                  trainerName: input.name,
                  trainerEmail: input.email,
                  state: input.state,
                  link: appLink("/admin/trainers?status=Pending"),
                }),
              }
            : undefined,
      }),
    ),
  );

  if (status === "Approved") {
    return { status: "ok", token: await mintToken(user), role: "trainer" };
  }
  return { status: "pending" };
});

/**
 * adminDirectLogin({ id, pass })
 * Allows designated system admin to log in with ID/Password (admin / 7777).
 */
export const adminDirectLogin = onCall(callOpts, async (req) => {
  const id = String(req.data?.id || "").trim();
  const pass = String(req.data?.pass || "").trim();

  if (id !== "admin" || pass !== "7777") {
    throw new HttpsError("permission-denied", "Invalid Admin ID or Password.");
  }

  let adminUser = await findUserByEmail("admin@trainerplan.com");
  if (!adminUser) {
    adminUser = {
      uid: "admin_1",
      name: "System Administrator",
      email: "admin@trainerplan.com",
      phone: "+919876543210",
      state: "Delhi",
      role: "admin",
      status: "Approved",
    };
    await col.users().doc(adminUser.uid).set({ ...adminUser, createdAt: FieldValue.serverTimestamp() }, { merge: true });
  }

  const token = await mintToken(adminUser);
  return { status: "ok", token, role: "admin", user: adminUser };
});

