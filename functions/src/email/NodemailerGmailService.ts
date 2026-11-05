import nodemailer, { Transporter } from "nodemailer";
import { EmailMessage, EmailService } from "./EmailService";

/** Gmail SMTP sender using an App Password (requires 2-Step Verification on the account). */
export class NodemailerGmailService implements EmailService {
  readonly provider = "gmail-smtp";
  private transporter: Transporter;

  constructor(
    private readonly user: string,
    appPassword: string,
    private readonly fromName: string,
  ) {
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass: appPassword.replace(/\s+/g, "") },
      pool: true,
      maxConnections: 3,
    });
  }

  async send(msg: EmailMessage) {
    const info = await this.transporter.sendMail({
      from: { name: this.fromName, address: this.user },
      to: msg.to,
      subject: msg.subject,
      html: msg.html,
      text: msg.text,
      headers: {
        "Auto-Submitted": "auto-generated",
        "X-Auto-Response-Suppress": "All",
      },
    });
    return { messageId: info.messageId };
  }
}
