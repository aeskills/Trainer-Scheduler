import { logger } from "firebase-functions";
import { APP_URL } from "../config";
import { sendLoggedEmail } from "../email";
import { EmailMessage, EmailType } from "../email/EmailService";
import { col, FieldValue, messaging } from "../lib/firebase";
import { AppUser } from "../types";

export interface NotifyPayload {
  title: string;
  body: string;
  /** In-app path, e.g. "/visit/2026-11-05". */
  link?: string;
  kind?: string;
  email?: { type: EmailType; message: EmailMessage };
  push?: boolean;
  inApp?: boolean;
}

/** Fan out a notification to the in-app bell, web push (FCM) and email. */
export async function notifyUser(user: AppUser, payload: NotifyPayload): Promise<void> {
  const { title, body, link = "/", kind = "general", push = true, inApp = true } = payload;
  const tasks: Promise<unknown>[] = [];

  if (inApp) {
    tasks.push(
      col.notifications().add({
        userId: user.uid,
        title,
        body,
        link,
        kind,
        read: false,
        createdAt: FieldValue.serverTimestamp(),
      }),
    );
  }

  if (push && user.fcmTokens?.length) {
    tasks.push(sendPush(user, title, body, link));
  }

  if (payload.email) {
    tasks.push(sendLoggedEmail(payload.email.type, payload.email.message, { meta: { userId: user.uid } }));
  }

  await Promise.allSettled(tasks);
}

async function sendPush(user: AppUser, title: string, body: string, link: string) {
  const tokens = [...new Set(user.fcmTokens ?? [])];
  if (!tokens.length) return;
  const absolute = new URL(link, APP_URL.value()).toString();
  try {
    const res = await messaging.sendEachForMulticast({
      tokens,
      notification: { title, body },
      data: { link },
      webpush: {
        notification: { icon: "/icons/icon-192.png", badge: "/icons/badge-72.png", tag: link },
        fcmOptions: absolute.startsWith("https://") ? { link: absolute } : undefined,
      },
    });
    // Clean up tokens that are no longer valid.
    const dead: string[] = [];
    res.responses.forEach((r, i) => {
      const code = r.error?.code ?? "";
      if (code.includes("registration-token-not-registered") || code.includes("invalid-argument")) {
        dead.push(tokens[i]);
      }
    });
    if (dead.length) {
      await col.users().doc(user.uid).update({ fcmTokens: FieldValue.arrayRemove(...dead) });
    }
  } catch (err) {
    logger.warn("Push send failed", { uid: user.uid, err: String(err) });
  }
}

export function appLink(path: string): string {
  return new URL(path, APP_URL.value()).toString();
}
