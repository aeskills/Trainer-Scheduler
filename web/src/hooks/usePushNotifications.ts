import { useState, useEffect } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { app } from "../lib/firebase";
import { saveUserFcmToken } from "../services/notificationsApi";
import { useAuth } from "./useAuth";

export function usePushNotifications() {
  const { appUser } = useAuth();
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [supported, setSupported] = useState<boolean>(false);
  const [requesting, setRequesting] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
      setSupported(true);
      setPermission(Notification.permission);
    }
  }, []);

  const requestPushPermission = async () => {
    if (!supported || !appUser) return;
    setRequesting(true);

    try {
      const perm = await Notification.requestPermission();
      setPermission(perm);

      if (perm === "granted") {
        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
        if (!vapidKey) {
          console.warn("VITE_FIREBASE_VAPID_KEY not configured in env");
          return;
        }

        const messaging = getMessaging(app);
        const registration = await navigator.serviceWorker.ready;
        const currentToken = await getToken(messaging, {
          vapidKey,
          serviceWorkerRegistration: registration,
        });

        if (currentToken) {
          await saveUserFcmToken(appUser.uid, currentToken);
          console.log("🔔 Push notification token registered");
        }
      }
    } catch (err) {
      console.warn("Push registration error:", err);
    } finally {
      setRequesting(false);
    }
  };

  return {
    supported,
    permission,
    requesting,
    requestPushPermission,
  };
}
