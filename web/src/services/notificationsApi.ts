import {
  collection,
  doc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import { AppNotification } from "../types";
import { mockStore } from "../lib/mockStore";

const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

export function subscribeToNotifications(userId: string, callback: (notifications: AppNotification[]) => void) {
  if (isDemo) {
    const push = () => callback(mockStore.getNotifications(userId));
    push();
    return mockStore.subscribe(push);
  }

  const q = query(
    collection(db, "notifications"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(40)
  );

  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ ...d.data(), id: d.id } as AppNotification));
      callback(items);
    },
    (err) => {
      console.warn("Notifications subscription error:", err);
    }
  );
}

export async function markNotificationAsRead(notificationId: string): Promise<void> {
  const ref = doc(db, "notifications", notificationId);
  await updateDoc(ref, { read: true });
}

export async function saveUserFcmToken(userId: string, token: string): Promise<void> {
  const ref = doc(db, "users", userId);
  await updateDoc(ref, {
    fcmTokens: arrayUnion(token),
  });
}
