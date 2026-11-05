import { createHash } from "node:crypto";
import { HttpsError } from "firebase-functions/v2/https";
import { OTP } from "../config";
import { auth, col, db, FieldValue, Timestamp } from "../lib/firebase";
import { AppUser } from "../types";
import { generateOtp, hashOtp, newSalt, verifyOtpHash } from "./otpUtils";

export type OtpPurpose = "login" | "register";

const emailKey = (email: string) => createHash("sha256").update(email).digest("hex").slice(0, 40);

/**
 * Per-email rate limit: max 5 OTP requests/hour and a 30-second cooldown.
 * Applied to every email (registered or not) so responses don't leak existence.
 */
export async function enforceOtpRateLimit(email: string): Promise<void> {
  const ref = col.rateLimits().doc(`otp_${emailKey(email)}`);
  const now = Date.now();
  const outcome = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const recent: number[] = ((snap.data()?.timestamps as number[]) ?? []).filter((t) => now - t < 3600_000);
    const last = recent.length ? Math.max(...recent) : 0;
    if (now - last < OTP.RESEND_COOLDOWN_MS) {
      return { ok: false as const, reason: "cooldown" as const, retryAfter: Math.ceil((OTP.RESEND_COOLDOWN_MS - (now - last)) / 1000) };
    }
    if (recent.length >= OTP.MAX_PER_HOUR) {
      const oldest = Math.min(...recent);
      return { ok: false as const, reason: "hourly" as const, retryAfter: Math.ceil((3600_000 - (now - oldest)) / 1000) };
    }
    tx.set(ref, { timestamps: [...recent, now], updatedAt: FieldValue.serverTimestamp() });
    return { ok: true as const };
  });

  if (!outcome.ok) {
    const msg =
      outcome.reason === "cooldown"
        ? `Please wait ${outcome.retryAfter}s before requesting another code.`
        : `Too many code requests. Try again in ${Math.ceil(outcome.retryAfter / 60)} minutes.`;
    throw new HttpsError("resource-exhausted", msg, { retryAfter: outcome.retryAfter });
  }
}

/** Invalidate older codes, store a new hashed one and return the plain code (to email it). */
export async function issueOtp(email: string, purpose: OtpPurpose): Promise<string> {
  const previous = await col.otpRequests().where("email", "==", email).orderBy("createdAt", "desc").limit(10).get();
  const batch = db.batch();
  previous.docs.forEach((d) => {
    if (!d.get("used") && d.get("purpose") === purpose) batch.update(d.ref, { used: true, invalidatedAt: FieldValue.serverTimestamp() });
  });

  const code = generateOtp();
  const salt = newSalt();
  batch.set(col.otpRequests().doc(), {
    email,
    purpose,
    codeHash: hashOtp(code, salt),
    salt,
    attempts: 0,
    used: false,
    expiresAt: Timestamp.fromMillis(Date.now() + OTP.TTL_MS),
    createdAt: FieldValue.serverTimestamp(),
  });
  await batch.commit();
  return code;
}

/**
 * Verify and consume an OTP. Wrong attempts are counted (max 5, then the code is
 * invalidated). Throws a generic error on failure.
 */
export async function consumeOtp(email: string, purpose: OtpPurpose, code: string): Promise<void> {
  const q = col.otpRequests().where("email", "==", email).orderBy("createdAt", "desc").limit(5);

  const result = await db.runTransaction(async (tx) => {
    const snap = await tx.get(q);
    const doc = snap.docs.find((d) => d.get("purpose") === purpose && !d.get("used"));
    if (!doc) return { ok: false as const, reason: "invalid" as const };

    const data = doc.data();
    if ((data.expiresAt as FirebaseFirestore.Timestamp).toMillis() < Date.now()) {
      tx.update(doc.ref, { used: true });
      return { ok: false as const, reason: "expired" as const };
    }
    if (data.attempts >= OTP.MAX_ATTEMPTS) {
      tx.update(doc.ref, { used: true });
      return { ok: false as const, reason: "locked" as const };
    }
    if (!verifyOtpHash(code, data.salt, data.codeHash)) {
      const attempts = data.attempts + 1;
      tx.update(doc.ref, { attempts, used: attempts >= OTP.MAX_ATTEMPTS });
      return { ok: false as const, reason: "wrong" as const, remaining: OTP.MAX_ATTEMPTS - attempts };
    }
    tx.update(doc.ref, { used: true, usedAt: FieldValue.serverTimestamp() });
    return { ok: true as const };
  });

  if (result.ok) return;
  switch (result.reason) {
    case "wrong":
      throw new HttpsError(
        "invalid-argument",
        result.remaining > 0
          ? `Incorrect code. ${result.remaining} attempt${result.remaining === 1 ? "" : "s"} left.`
          : "Too many incorrect attempts. Please request a new code.",
        { remaining: result.remaining },
      );
    case "expired":
      throw new HttpsError("deadline-exceeded", "This code has expired. Please request a new one.");
    case "locked":
      throw new HttpsError("permission-denied", "Too many incorrect attempts. Please request a new code.");
    default:
      throw new HttpsError("not-found", "Invalid or expired code. Please request a new one.");
  }
}

/** Make sure a Firebase Auth user exists for this app user and has up-to-date claims. */
export async function syncAuthUser(user: AppUser): Promise<void> {
  const claims = { role: user.role, approved: user.status === "Approved" };
  try {
    await auth.getUser(user.uid);
    await auth.updateUser(user.uid, { email: user.email, displayName: user.name, disabled: user.status === "Deactivated" });
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "auth/user-not-found") {
      await auth.createUser({ uid: user.uid, email: user.email, displayName: user.name, emailVerified: true });
    } else {
      throw e;
    }
  }
  await auth.setCustomUserClaims(user.uid, claims);
}

export async function mintToken(user: AppUser): Promise<string> {
  await syncAuthUser(user);
  return auth.createCustomToken(user.uid, { role: user.role, approved: user.status === "Approved" });
}

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
