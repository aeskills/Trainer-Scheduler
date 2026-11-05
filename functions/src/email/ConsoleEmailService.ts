import { logger } from "firebase-functions";
import { EmailMessage, EmailService } from "./EmailService";

/** Dev-only sender: prints emails to the Functions emulator log (OTP codes visible there). */
export class ConsoleEmailService implements EmailService {
  readonly provider = "console";
  async send(msg: EmailMessage) {
    logger.info(`📧 [DEV EMAIL] to=${msg.to} subject="${msg.subject}"\n${msg.text ?? ""}`);
    return { messageId: `console-${Date.now()}` };
  }
}
