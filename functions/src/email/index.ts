import { logger } from "firebase-functions";
import { IS_EMULATOR, SMTP_APP_PASSWORD, SMTP_FROM_NAME, SMTP_USER, secretValue } from "../config";
import { col, FieldValue } from "../lib/firebase";
import { ConsoleEmailService } from "./ConsoleEmailService";
import { EmailMessage, EmailService, EmailType } from "./EmailService";
import { NodemailerGmailService } from "./NodemailerGmailService";

let cached: EmailService | null = null;

/** Factory – change this one function to switch email providers. */
export function getEmailService(): EmailService {
  if (cached) return cached;
  const pass = secretValue(SMTP_APP_PASSWORD);
  if (!pass) {
    if (!IS_EMULATOR) logger.warn("SMTP_APP_PASSWORD not set – falling back to console email.");
    cached = new ConsoleEmailService();
  } else {
    cached = new NodemailerGmailService(SMTP_USER.value(), pass, SMTP_FROM_NAME.value());
  }
  return cached;
}

/** Send an email and record the outcome in `emailLogs`. Never throws unless `throwOnError`. */
export async function sendLoggedEmail(
  type: EmailType,
  msg: EmailMessage,
  opts: { throwOnError?: boolean; meta?: Record<string, unknown> } = {},
): Promise<boolean> {
  const service = getEmailService();
  try {
    const { messageId } = await service.send(msg);
    await col.emailLogs().add({
      to: msg.to,
      type,
      subject: msg.subject,
      status: "sent",
      provider: service.provider,
      messageId: messageId ?? null,
      meta: opts.meta ?? null,
      sentAt: FieldValue.serverTimestamp(),
    });
    return true;
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err);
    logger.error("Email send failed", { to: msg.to, type, error });
    await col.emailLogs().add({
      to: msg.to,
      type,
      subject: msg.subject,
      status: "failed",
      provider: service.provider,
      error,
      meta: opts.meta ?? null,
      sentAt: FieldValue.serverTimestamp(),
    });
    if (opts.throwOnError) throw err;
    return false;
  }
}
