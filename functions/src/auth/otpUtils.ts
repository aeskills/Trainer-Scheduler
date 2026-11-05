import { createHmac, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { OTP } from "../config";

/** Cryptographically random, zero-padded 6-digit code. */
export function generateOtp(): string {
  return String(randomInt(0, 10 ** OTP.LENGTH)).padStart(OTP.LENGTH, "0");
}

export function newSalt(): string {
  return randomBytes(16).toString("hex");
}

/** HMAC-SHA256(code) keyed with a per-request random salt. Only the hash is stored. */
export function hashOtp(code: string, salt: string): string {
  return createHmac("sha256", salt).update(code).digest("hex");
}

export function verifyOtpHash(code: string, salt: string, expectedHash: string): boolean {
  const a = Buffer.from(hashOtp(code, salt), "hex");
  const b = Buffer.from(expectedHash, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isSixDigits(code: unknown): code is string {
  return typeof code === "string" && /^\d{6}$/.test(code);
}
