/**
 * Provider-agnostic email interface. Swap the implementation in
 * `getEmailService()` (e.g. Resend / Brevo / SendGrid) without touching callers.
 */
export interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface EmailService {
  readonly provider: string;
  send(msg: EmailMessage): Promise<{ messageId?: string }>;
}

export type EmailType =
  | "otp_login"
  | "otp_register"
  | "reminder_1"
  | "reminder_2"
  | "missed"
  | "account_approved"
  | "account_rejected"
  | "new_registration";
