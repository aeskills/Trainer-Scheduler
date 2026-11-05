import { logger } from "firebase-functions";
import { onSchedule } from "firebase-functions/v2/scheduler";
import { EMAIL_SECRETS, REGION, TIMEZONE } from "../config";
import { missedEmail, reminderEmail } from "../email/templates";
import { getAdmins, getSettings, getUser } from "../lib/common";
import { col, db, FieldValue } from "../lib/firebase";
import { displayDate, hhmmToMinutes, istDateKey, istMinutesNow } from "../lib/ist";
import { appLink, notifyUser } from "../notify/notifyUser";
import { Visit } from "../types";

type ReminderSlot = "reminder1SentAt" | "reminder2SentAt";

/**
 * Atomically claim a send-flag on a visit so each reminder fires at most once,
 * even if two scheduler runs overlap. Returns false if already claimed or no longer PLANNED.
 */
async function claimFlag(visitId: string, field: ReminderSlot | "missedNotifiedAt", requireStatus: string) {
  const ref = col.visits().doc(visitId);
  return db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists || snap.get(field) || snap.get("status") !== requireStatus) return false;
    tx.update(ref, { [field]: FieldValue.serverTimestamp() });
    return true;
  });
}

/** Core reminder logic – exported for testing / manual trigger. */
export async function runReminders(now = new Date()) {
  const settings = await getSettings();
  const minutes = istMinutesNow(now);
  const slots: { field: ReminderSlot; second: boolean }[] = [];
  if (minutes >= hhmmToMinutes(settings.reminderTimes.first)) slots.push({ field: "reminder1SentAt", second: false });
  if (settings.reminderTimes.secondEnabled && minutes >= hhmmToMinutes(settings.reminderTimes.second)) {
    slots.push({ field: "reminder2SentAt", second: true });
  }
  if (!slots.length) return { sent: 0 };

  const today = istDateKey(now);
  const planned = await col.visits().where("status", "==", "PLANNED").where("dateKey", "==", today).get();
  let sent = 0;

  for (const doc of planned.docs) {
    const v = { ...(doc.data() as Visit), id: doc.id };
    for (const slot of slots) {
      if (v[slot.field]) continue;
      // Already past reminder 2 with nothing sent yet → mark reminder 1 silently, only send the final one.
      if (!slot.second && slots.length === 2 && !v.reminder2SentAt) {
        await claimFlag(v.id, "reminder1SentAt", "PLANNED");
        continue;
      }
      if (!(await claimFlag(v.id, slot.field, "PLANNED"))) continue;

      const trainer = await getUser(v.trainerId);
      if (!trainer || trainer.status !== "Approved") continue;
      const link = `/visit/${v.date}`;
      await notifyUser(trainer, {
        title: slot.second ? "Final reminder: submit your day's work" : "Submit your day's work",
        body: `You haven't submitted your work for ${displayDate(v.date)} yet.`,
        link,
        kind: "reminder",
        email: settings.emailRemindersEnabled
          ? {
              type: slot.second ? "reminder_2" : "reminder_1",
              message: reminderEmail({
                to: trainer.email,
                name: trainer.name,
                displayDate: displayDate(v.date),
                schools: v.schools.map((s) => s.name),
                link: appLink(link),
                second: slot.second,
              }),
            }
          : undefined,
      });
      sent++;
    }
  }
  logger.info(`Reminders processed: ${sent} sent for ${today}`);
  return { sent };
}

/** Marks every past, still-PLANNED day as MISSED and notifies trainer + admins. */
export async function runMissed(now = new Date()) {
  const today = istDateKey(now);
  const stale = await col.visits().where("status", "==", "PLANNED").where("dateKey", "<", today).get();
  const missed: Visit[] = [];

  for (const doc of stale.docs) {
    const ref = doc.ref;
    const changed = await db.runTransaction(async (tx) => {
      const s = await tx.get(ref);
      if (s.get("status") !== "PLANNED" || s.get("dateKey") >= today) return false;
      tx.update(ref, {
        status: "MISSED",
        missedAt: FieldValue.serverTimestamp(),
        adminFlag: true,
        updatedAt: FieldValue.serverTimestamp(),
      });
      return true;
    });
    if (changed) missed.push({ ...(doc.data() as Visit), id: doc.id });
  }

  for (const v of missed) {
    if (!(await claimFlag(v.id, "missedNotifiedAt", "MISSED"))) continue;
    const trainer = await getUser(v.trainerId);
    if (!trainer) continue;
    await notifyUser(trainer, {
      title: "Day missed",
      body: `Your work for ${displayDate(v.date)} was not submitted and is marked as missed.`,
      link: `/visit/${v.date}`,
      kind: "missed",
      email: {
        type: "missed",
        message: missedEmail({ to: trainer.email, name: trainer.name, displayDate: displayDate(v.date), link: appLink("/") }),
      },
    });
  }

  if (missed.length) {
    const admins = await getAdmins();
    const names = [...new Set(missed.map((m) => m.trainerName))];
    await Promise.allSettled(
      admins.map((a) =>
        notifyUser(a, {
          title: `${missed.length} day${missed.length > 1 ? "s" : ""} missed`,
          body: `${names.slice(0, 5).join(", ")}${names.length > 5 ? ` +${names.length - 5} more` : ""} did not submit.`,
          link: "/admin/visits?status=MISSED",
          kind: "missed_admin",
          push: true,
        }),
      ),
    );
  }
  logger.info(`Missed job: ${missed.length} visits marked MISSED (before ${today})`);
  return { missed: missed.length };
}

export const reminderTick = onSchedule(
  { schedule: "every 10 minutes", timeZone: TIMEZONE, region: REGION, secrets: EMAIL_SECRETS, retryCount: 0 },
  async () => {
    await runReminders();
  },
);

export const missedJob = onSchedule(
  { schedule: "5 0 * * *", timeZone: TIMEZONE, region: REGION, secrets: EMAIL_SECRETS, retryCount: 2 },
  async () => {
    await runMissed();
  },
);
