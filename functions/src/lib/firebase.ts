import { initializeApp, getApps } from "firebase-admin/app";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getMessaging } from "firebase-admin/messaging";

if (!getApps().length) initializeApp();

export const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

export const auth = getAuth();
export const messaging = getMessaging();
export { FieldValue, Timestamp };

export const col = {
  users: () => db.collection("users"),
  visits: () => db.collection("visits"),
  otpRequests: () => db.collection("otpRequests"),
  notifications: () => db.collection("notifications"),
  emailLogs: () => db.collection("emailLogs"),
  activityLogs: () => db.collection("activityLogs"),
  driveFolders: () => db.collection("driveFolders"),
  rateLimits: () => db.collection("rateLimits"),
  settings: () => db.collection("settings"),
};
