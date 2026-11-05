import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, CheckCheck, ExternalLink, Clock } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { subscribeToNotifications, markNotificationAsRead } from "../../services/notificationsApi";
import { AppNotification } from "../../types";
import { Button } from "../../components/ui/Button";

export const NotificationsPage: React.FC = () => {
  const { appUser } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!appUser?.uid) return;
    const unsub = subscribeToNotifications(appUser.uid, (list) => {
      setNotifications(list);
      setLoading(false);
    });
    return () => unsub();
  }, [appUser?.uid]);

  const handleMarkAllRead = async () => {
    const unread = notifications.filter((n) => !n.read);
    await Promise.all(unread.map((n) => markNotificationAsRead(n.id)));
  };

  const handleItemClick = async (notif: AppNotification) => {
    if (!notif.read) {
      await markNotificationAsRead(notif.id);
    }
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Reminders, submit alerts and admin notifications
            </p>
          </div>
        </div>

        {notifications.some((n) => !n.read) && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllRead}
            icon={<CheckCheck className="w-4 h-4 text-violet-600" />}
          >
            Mark all read
          </Button>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-slate-800/80">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-400">
            You're all caught up! No notifications.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleItemClick(notif)}
              className={`p-4 sm:p-5 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors ${
                !notif.read ? "bg-violet-50/40 dark:bg-violet-950/20" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 ${
                    !notif.read ? "bg-violet-600 animate-pulse" : "bg-transparent"
                  }`}
                />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {notif.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    {notif.body}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>
                      {notif.createdAt?.toDate
                        ? notif.createdAt.toDate().toLocaleString("en-IN")
                        : "Just now"}
                    </span>
                  </p>
                </div>
              </div>

              {notif.link && (
                <span className="p-2 text-slate-400 hover:text-violet-600 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </span>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
