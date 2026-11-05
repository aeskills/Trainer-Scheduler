import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Bell, Download, Sun, Moon, LogOut, CheckCircle2 } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

export const ProfilePage: React.FC = () => {
  const { appUser, role, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const { supported, permission, requesting, requestPushPermission } = usePushNotifications();

  const [installPrompt, setInstallPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
    }

    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstallPwa = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalled(true);
      setInstallPrompt(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto animate-fadeIn">
      {/* Header Profile Card */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-violet-500/20 shrink-0">
          {appUser?.name ? appUser.name.charAt(0).toUpperCase() : "T"}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white truncate">
              {appUser?.name || "Trainer"}
            </h1>
            <div className="flex justify-center sm:justify-end gap-1.5">
              <Badge status={appUser?.status || "Approved"} />
              {role === "admin" && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
                  Admin
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="truncate">{appUser?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-400" />
              <span>{appUser?.phone || "No phone added"}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>State: <strong>{appUser?.state || "Unassigned"}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Field Performance Banner */}
      <Link
        to="/my-performance"
        className="rounded-2xl border border-violet-200 dark:border-violet-800 bg-gradient-to-r from-violet-500/10 via-indigo-500/10 to-purple-500/10 dark:from-violet-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 p-5 shadow-sm hover:border-violet-500 transition-all flex items-center justify-between gap-4 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-violet-500/20">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
              My Field Performance & Impact
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              View your completion rate %, total students trained, and school log history.
            </p>
          </div>
        </div>
        <span className="text-xs font-bold text-violet-600 dark:text-violet-400 inline-flex items-center gap-1 shrink-0">
          <span>Scorecard</span>
          <span className="text-base leading-none">→</span>
        </span>
      </Link>

      {/* App Preferences: PWA & Notifications */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-5">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">App Preferences</h3>

        {/* PWA Install Button */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Install TrainerPlan PWA
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Add app to your home screen for quick offline access and smooth performance.
            </p>
          </div>

          {installed ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Installed</span>
            </span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              disabled={!installPrompt}
              onClick={handleInstallPwa}
              icon={<Download className="w-4 h-4 text-violet-600" />}
            >
              Install App
            </Button>
          )}
        </div>

        {/* Web Push Notification Toggle */}
        <div className="flex items-center justify-between gap-4 py-2 border-b border-slate-100 dark:border-slate-800">
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Push Notifications (FCM)
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Get timely reminder alerts at 6:00 PM IST before your daily work is due.
            </p>
          </div>

          {permission === "granted" ? (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
              <span>Enabled</span>
            </span>
          ) : (
            <Button
              variant="outline"
              size="sm"
              loading={requesting}
              disabled={!supported}
              onClick={requestPushPermission}
              icon={<Bell className="w-4 h-4 text-amber-500" />}
            >
              Enable Push
            </Button>
          )}
        </div>

        {/* Theme Preference */}
        <div className="flex items-center justify-between gap-4 py-2">
          <div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Theme</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Choose your preferred interface appearance.
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1">
            <button
              onClick={() => setTheme("light")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                theme === "light"
                  ? "bg-white text-violet-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                theme === "dark"
                  ? "bg-slate-800 text-violet-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              Dark
            </button>
            <button
              onClick={() => setTheme("system")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                theme === "system"
                  ? "bg-white dark:bg-slate-800 text-violet-600 dark:text-violet-400 shadow-sm"
                  : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              System
            </button>
          </div>
        </div>
      </div>

      {/* Logout Action */}
      <div className="flex justify-end pt-2">
        <Button
          variant="danger"
          size="md"
          onClick={logout}
          icon={<LogOut className="w-4 h-4" />}
        >
          Sign Out of Account
        </Button>
      </div>
    </div>
  );
};
