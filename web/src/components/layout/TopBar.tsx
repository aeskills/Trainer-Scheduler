import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Moon, Sun, LogOut, ShieldAlert } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { subscribeToNotifications, markNotificationAsRead } from "../../services/notificationsApi";
import { AppNotification } from "../../types";

export const TopBar: React.FC = () => {
  const { appUser, role, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [showBellMenu, setShowBellMenu] = useState<boolean>(false);

  useEffect(() => {
    if (!appUser?.uid) return;
    const unsub = subscribeToNotifications(appUser.uid, (list) => {
      setNotifications(list);
    });
    return () => unsub();
  }, [appUser?.uid]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNotificationClick = async (notif: AppNotification) => {
    if (!notif.read) {
      await markNotificationAsRead(notif.id);
    }
    setShowBellMenu(false);
    if (notif.link) {
      navigate(notif.link);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-violet-500/25 group-hover:scale-105 transition-transform">
            T
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 dark:text-white text-base tracking-tight">TrainerPlan</span>
              {role === "admin" && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  Admin
                </span>
              )}
            </div>
            {appUser?.state && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">State: {appUser.state}</p>
            )}
          </div>
        </Link>

        {/* Right Action Icons */}
        <div className="flex items-center gap-2 sm:gap-3">


          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* In-app Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowBellMenu((v) => !v)}
              aria-label="Notifications"
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[16px] px-1 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {showBellMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowBellMenu(false)} />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl z-50 overflow-hidden animate-fadeIn">
                  <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="text-xs text-violet-600 dark:text-violet-400 font-medium">
                        {unreadCount} unread
                      </span>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-sm text-slate-400">No notifications yet</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => handleNotificationClick(n)}
                          className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                            !n.read ? "bg-violet-50/50 dark:bg-violet-950/20" : ""
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100">{n.title}</p>
                            {!n.read && <span className="w-2 h-2 rounded-full bg-violet-600 shrink-0 mt-1" />}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 line-clamp-2">{n.body}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 text-center">
                    <Link
                      to="/notifications"
                      onClick={() => setShowBellMenu(false)}
                      className="text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User Profile / Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <div className="hidden sm:block text-right">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-tight">
                {appUser?.name || "User"}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">{appUser?.email}</p>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
