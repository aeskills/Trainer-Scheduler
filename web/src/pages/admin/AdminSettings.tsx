import React, { useState, useEffect } from "react";
import { Settings, Save, Link as LinkIcon, Bell, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getAppSettings, updateAppSettings } from "../../services/adminApi";
import { AppSettings } from "../../types";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Skeleton } from "../../components/ui/Skeleton";

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const s = await getAppSettings();
        setSettings(s);
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setSaveSuccess(false);

    try {
      await updateAppSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      alert("Failed to save settings: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl animate-fadeIn">
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300 flex items-center justify-center">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">System Settings</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Configure Adobe Express state gallery links, automated reminder times & policies
            </p>
          </div>
        </div>

        {saveSuccess && (
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Saved</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {/* Section 1: State Google Drive Folders */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <LinkIcon className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              State Google Drive Folders
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            These links direct trainers and supervisors to the designated Google Drive cloud storage for each state.
          </p>

          <div className="flex flex-col gap-3">
            <Input
              label="Uttar Pradesh (UP) Google Drive Link"
              type="url"
              placeholder="https://drive.google.com/drive/folders/..."
              value={settings.driveLinks?.UP || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  driveLinks: { ...(settings.driveLinks || {}), UP: e.target.value },
                })
              }
            />

            <Input
              label="Delhi Google Drive Link"
              type="url"
              placeholder="https://drive.google.com/drive/folders/..."
              value={settings.driveLinks?.Delhi || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  driveLinks: { ...(settings.driveLinks || {}), Delhi: e.target.value },
                })
              }
            />

            <Input
              label="Uttarakhand (UK) Google Drive Link"
              type="url"
              placeholder="https://drive.google.com/drive/folders/..."
              value={settings.driveLinks?.UK || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  driveLinks: { ...(settings.driveLinks || {}), UK: e.target.value },
                })
              }
            />
          </div>
        </div>

        {/* Section 2: Adobe Express Gallery Links Per State */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <LinkIcon className="w-4 h-4 text-violet-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Adobe Express Gallery Links (Per State)
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            When trainers tap "Open Adobe Express Gallery", this link is opened according to their assigned state.
          </p>

          <div className="flex flex-col gap-3">
            <Input
              label="Uttar Pradesh (UP) Gallery URL"
              type="url"
              placeholder="https://new.express.adobe.com/..."
              value={settings.stateLinks?.UP || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stateLinks: { ...settings.stateLinks, UP: e.target.value },
                })
              }
            />

            <Input
              label="Uttarakhand (UK) Gallery URL"
              type="url"
              placeholder="https://new.express.adobe.com/..."
              value={settings.stateLinks?.UK || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stateLinks: { ...settings.stateLinks, UK: e.target.value },
                })
              }
            />

            <Input
              label="Delhi Gallery URL"
              type="url"
              placeholder="https://new.express.adobe.com/..."
              value={settings.stateLinks?.Delhi || ""}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  stateLinks: { ...settings.stateLinks, Delhi: e.target.value },
                })
              }
            />
          </div>
        </div>


        {/* Section 2: Reminder Schedule & Automation */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <Clock className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Reminder Schedule (IST)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Primary Reminder Time"
              type="time"
              value={settings.reminderTimes?.first || "18:00"}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  reminderTimes: { ...settings.reminderTimes, first: e.target.value },
                })
              }
              helperText="Default: 6:00 PM IST (Sends email & push to unsubmitted trainers)"
            />

            <div className="flex flex-col gap-1.5">
              <Input
                label="Secondary Reminder Time"
                type="time"
                disabled={!settings.reminderTimes?.secondEnabled}
                value={settings.reminderTimes?.second || "21:00"}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    reminderTimes: { ...settings.reminderTimes, second: e.target.value },
                  })
                }
                helperText="Optional final reminder (Default: 9:00 PM IST)"
              />
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={settings.reminderTimes?.secondEnabled || false}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      reminderTimes: {
                        ...settings.reminderTimes,
                        secondEnabled: e.target.checked,
                      },
                    })
                  }
                  className="rounded text-violet-600 focus:ring-violet-500"
                />
                <span>Enable second reminder at 9:00 PM</span>
              </label>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailRemindersEnabled}
                onChange={(e) =>
                  setSettings({ ...settings, emailRemindersEnabled: e.target.checked })
                }
                className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
              />
              <span>Send automated No-Reply emails for daily reminders and missed visits</span>
            </label>
          </div>
        </div>

        {/* Section 3: Registration Policy */}
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col gap-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              Trainer Registration Policy
            </h2>
          </div>

          <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.autoApprove}
              onChange={(e) => setSettings({ ...settings, autoApprove: e.target.checked })}
              className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500"
            />
            <span>
              Auto-approve new trainer registrations immediately upon OTP verification
            </span>
          </label>
          <p className="text-xs text-slate-500 pl-6">
            If turned off, new signups remain in "Pending" status until manually approved by an admin.
          </p>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <Button
            size="lg"
            type="submit"
            loading={saving}
            icon={<Save className="w-4 h-4" />}
          >
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
};
