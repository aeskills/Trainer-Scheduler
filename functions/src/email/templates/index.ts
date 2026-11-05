/**
 * Branded, email-client-safe HTML templates (table layout + inline styles).
 * Every template ends with the "do not reply" notice.
 */
import { EmailMessage } from "../EmailService";

const BRAND = "#6D28D9"; // violet-700
const BRAND_2 = "#4F46E5"; // indigo-600

function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function layout(opts: { preheader: string; title: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(opts.title)}</title></head>
<body style="margin:0;padding:0;background:#F4F3FF;font-family:Inter,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#1F1B2E;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F4F3FF;padding:32px 12px;">
<tr><td align="center">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#FFFFFF;border-radius:20px;overflow:hidden;box-shadow:0 8px 30px rgba(79,70,229,0.12);">
    <tr><td style="background:${BRAND};background-image:linear-gradient(135deg,${BRAND} 0%,${BRAND_2} 100%);padding:28px 32px;">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="width:40px;height:40px;background:rgba(255,255,255,0.18);border-radius:12px;text-align:center;vertical-align:middle;font-size:20px;color:#fff;font-weight:700;">T</td>
        <td style="padding-left:12px;color:#FFFFFF;font-size:20px;font-weight:700;letter-spacing:-0.2px;">TrainerPlan</td>
      </tr></table>
    </td></tr>
    <tr><td style="padding:32px;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#1F1B2E;">${esc(opts.title)}</h1>
      ${opts.bodyHtml}
    </td></tr>
    <tr><td style="padding:20px 32px;background:#FAFAFF;border-top:1px solid #EEECFB;font-size:12px;line-height:1.6;color:#6B6880;">
      This is an automated message from TrainerPlan, please do not reply.<br>
      <strong>Do not reply to this email</strong> – this mailbox is not monitored.
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

function button(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0;"><tr>
<td style="border-radius:12px;background:${BRAND};background-image:linear-gradient(135deg,${BRAND},${BRAND_2});">
<a href="${esc(href)}" style="display:inline-block;padding:14px 28px;color:#FFFFFF;text-decoration:none;font-weight:600;font-size:15px;border-radius:12px;">${esc(label)}</a>
</td></tr></table>`;
}

const p = (html: string) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.6;color:#3B3750;">${html}</p>`;

// ── OTP ──────────────────────────────────────────────────────────────────────
export function otpEmail(to: string, code: string, purpose: "login" | "register"): EmailMessage {
  const action = purpose === "login" ? "sign in to" : "verify your email for";
  const digits = code
    .split("")
    .map(
      (d) =>
        `<td style="width:44px;height:54px;background:#F4F3FF;border:1px solid #DDD8FB;border-radius:12px;text-align:center;font-size:26px;font-weight:700;color:${BRAND};font-family:'SF Mono',Menlo,Consolas,monospace;">${d}</td>`,
    )
    .join('<td style="width:8px;"></td>');
  return {
    to,
    subject: `${code} is your TrainerPlan verification code`,
    text: `Your TrainerPlan code is ${code}. It expires in 5 minutes. If you didn't request this, ignore this email. Do not reply to this email.`,
    html: layout({
      preheader: `Your code is ${code}. It expires in 5 minutes.`,
      title: "Your verification code",
      bodyHtml:
        p(`Use this code to ${action} <strong>TrainerPlan</strong>:`) +
        `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:20px 0 24px;"><tr>${digits}</tr></table>` +
        p(`This code expires in <strong>5 minutes</strong> and can be used only once.`) +
        p(`<span style="color:#6B6880;font-size:13px;">If you didn't request this code, you can safely ignore this email. Never share this code with anyone.</span>`),
    }),
  };
}

// ── Reminder ─────────────────────────────────────────────────────────────────
export function reminderEmail(opts: {
  to: string;
  name: string;
  displayDate: string;
  schools: string[];
  link: string;
  second?: boolean;
}): EmailMessage {
  const list = opts.schools.length
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">${opts.schools
        .map(
          (s, i) =>
            `<tr><td style="padding:10px 14px;background:#F8F7FF;border-radius:10px;font-size:14px;color:#1F1B2E;border-bottom:4px solid #fff;"><span style="color:${BRAND};font-weight:700;margin-right:8px;">${i + 1}.</span>${esc(s || "Unnamed school")}</td></tr>`,
        )
        .join("")}</table>`
    : "";
  return {
    to: opts.to,
    subject: `${opts.second ? "Final reminder" : "Reminder"}: Submit your day's work – ${opts.displayDate}`,
    text: `Hi ${opts.name}, you planned visits for ${opts.displayDate} (${opts.schools.join(", ")}) but haven't submitted your day's work yet. Submit now: ${opts.link}\n\nThis is an automated message, please do not reply.`,
    html: layout({
      preheader: `You haven't submitted your work for ${opts.displayDate} yet.`,
      title: opts.second ? "Final reminder: submit today's work" : "Submit your day's work",
      bodyHtml:
        p(`Hi ${esc(opts.name)},`) +
        p(`You planned the following school visits for <strong>${esc(opts.displayDate)}</strong>, but your day's work hasn't been submitted yet:`) +
        list +
        button(opts.link, "Submit Now") +
        p(`<span style="color:#B45309;">Days not submitted by 11:59 PM are automatically marked as <strong>Missed</strong>.</span>`) +
        p(`<span style="color:#6B6880;font-size:13px;">This is an automated message, please do not reply.</span>`),
    }),
  };
}

// ── Missed ───────────────────────────────────────────────────────────────────
export function missedEmail(opts: { to: string; name: string; displayDate: string; link: string }): EmailMessage {
  return {
    to: opts.to,
    subject: `Day missed – ${opts.displayDate}`,
    text: `Hi ${opts.name}, your work for ${opts.displayDate} was not submitted and has been marked as Missed. Please contact your admin if this is a mistake.\n\nThis is an automated message, please do not reply.`,
    html: layout({
      preheader: `Your work for ${opts.displayDate} was marked as missed.`,
      title: "Day marked as missed",
      bodyHtml:
        p(`Hi ${esc(opts.name)},`) +
        p(`Your planned work for <strong>${esc(opts.displayDate)}</strong> was not submitted before midnight and has been marked as <strong style="color:#DC2626;">Missed</strong>.`) +
        p(`If this is a mistake, please contact your admin. They can review and correct it.`) +
        button(opts.link, "Open Calendar") +
        p(`<span style="color:#6B6880;font-size:13px;">This is an automated message, please do not reply.</span>`),
    }),
  };
}

// ── Account status ───────────────────────────────────────────────────────────
export function approvedEmail(opts: { to: string; name: string; link: string }): EmailMessage {
  return {
    to: opts.to,
    subject: "Your TrainerPlan account is approved 🎉",
    text: `Hi ${opts.name}, your TrainerPlan account has been approved. Sign in with your Gmail address: ${opts.link}`,
    html: layout({
      preheader: "You can now sign in to TrainerPlan.",
      title: "You're approved!",
      bodyHtml:
        p(`Hi ${esc(opts.name)},`) +
        p(`Your TrainerPlan account has been approved by an admin. Sign in with your registered Gmail address – we'll send you a one-time code.`) +
        button(opts.link, "Sign in to TrainerPlan"),
    }),
  };
}

export function rejectedEmail(opts: { to: string; name: string }): EmailMessage {
  return {
    to: opts.to,
    subject: "Update on your TrainerPlan registration",
    text: `Hi ${opts.name}, your TrainerPlan registration was not approved. Please contact your coordinator for details.`,
    html: layout({
      preheader: "Your registration was not approved.",
      title: "Registration update",
      bodyHtml:
        p(`Hi ${esc(opts.name)},`) +
        p(`Unfortunately, your TrainerPlan registration was not approved. Please contact your coordinator for more details.`),
    }),
  };
}

export function newRegistrationEmail(opts: {
  to: string;
  trainerName: string;
  trainerEmail: string;
  state: string;
  link: string;
}): EmailMessage {
  return {
    to: opts.to,
    subject: `New trainer registration: ${opts.trainerName} (${opts.state})`,
    text: `${opts.trainerName} (${opts.trainerEmail}, ${opts.state}) registered and is awaiting approval: ${opts.link}`,
    html: layout({
      preheader: `${opts.trainerName} is awaiting approval.`,
      title: "New registration awaiting approval",
      bodyHtml:
        p(`<strong>${esc(opts.trainerName)}</strong> (${esc(opts.trainerEmail)}) from <strong>${esc(opts.state)}</strong> has registered as a trainer.`) +
        button(opts.link, "Review in Admin Panel"),
    }),
  };
}
