import { defineSecret, defineString, defineBoolean } from "firebase-functions/params";

/** All functions are deployed to Mumbai for low latency in India. */
export const REGION = "asia-south1";
export const TIMEZONE = "Asia/Kolkata";

export const IS_EMULATOR = process.env.FUNCTIONS_EMULATOR === "true";

// ── Public app URL (used in email deep links & push click-through) ──────────
export const APP_URL = defineString("APP_URL", {
  default: "http://localhost:5173",
  description: "Public URL of the deployed PWA, e.g. https://trainerplan.web.app",
});

// ── Email (Gmail SMTP via Nodemailer) ───────────────────────────────────────
export const SMTP_USER = defineString("SMTP_USER", {
  default: "aeskills2026@gmail.com",
  description: "Sender Gmail address",
});
export const SMTP_FROM_NAME = defineString("SMTP_FROM_NAME", {
  default: "TrainerPlan (No-Reply)",
});
/** 16-char Gmail App Password for SMTP_USER. Set with `firebase functions:secrets:set SMTP_APP_PASSWORD`. */
export const SMTP_APP_PASSWORD = defineSecret("SMTP_APP_PASSWORD");

// ── Google Drive ────────────────────────────────────────────────────────────
/** ID of the "AE Trainer" root folder (the part after /folders/ in the Drive link). */
export const DRIVE_ROOT_FOLDER_ID = defineString("DRIVE_ROOT_FOLDER_ID", { default: "" });
/** "oauth" (personal Gmail, default) or "service_account" (Workspace Shared Drive). */
export const DRIVE_AUTH_MODE = defineString("DRIVE_AUTH_MODE", { default: "oauth" });
/** Make uploaded photos viewable by anyone with the link (needed for in-app thumbnails). */
export const DRIVE_PUBLIC_LINKS = defineBoolean("DRIVE_PUBLIC_LINKS", { default: true });
export const GOOGLE_OAUTH_CLIENT_ID = defineString("GOOGLE_OAUTH_CLIENT_ID", { default: "" });
export const GOOGLE_OAUTH_CLIENT_SECRET = defineSecret("GOOGLE_OAUTH_CLIENT_SECRET");
export const GOOGLE_OAUTH_REFRESH_TOKEN = defineSecret("GOOGLE_OAUTH_REFRESH_TOKEN");

/** Secrets needed by functions that send email. */
export const EMAIL_SECRETS = [SMTP_APP_PASSWORD];
/** Secrets needed by functions that talk to Drive. */
export const DRIVE_SECRETS = [GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN];

// ── OTP policy ──────────────────────────────────────────────────────────────
export const OTP = {
  LENGTH: 6,
  TTL_MS: 5 * 60 * 1000,
  MAX_ATTEMPTS: 5,
  MAX_PER_HOUR: 5,
  RESEND_COOLDOWN_MS: 30 * 1000,
} as const;

export const STATES_DEFAULT = ["UP", "UK", "Delhi"] as const;

/** Safely read a secret (returns "" if unset, e.g. in the emulator). */
export function secretValue(s: { value(): string }): string {
  try {
    return s.value() || "";
  } catch {
    return "";
  }
}
