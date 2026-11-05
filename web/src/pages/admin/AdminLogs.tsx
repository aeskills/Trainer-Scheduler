import React, { useState, useEffect } from "react";
import { Activity, Mail, Play, CheckCircle2, XCircle, Clock, Shield } from "lucide-react";
import { fetchActivityLogs, fetchEmailLogs, triggerManualJob } from "../../services/adminApi";
import { ActivityLog, EmailLog } from "../../types";
import { Button } from "../../components/ui/Button";
import { Skeleton } from "../../components/ui/Skeleton";

export const AdminLogs: React.FC = () => {
  const [tab, setTab] = useState<"activity" | "emails">("activity");
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [runningJob, setRunningJob] = useState<string | null>(null);
  const [jobResult, setJobResult] = useState<string | null>(null);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const [act, em] = await Promise.all([fetchActivityLogs(100), fetchEmailLogs(100)]);
      setActivityLogs(act);
      setEmailLogs(em);
    } catch (err) {
      console.error("Failed to load logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const handleRunJob = async (job: "reminders" | "missed") => {
    setRunningJob(job);
    setJobResult(null);
    try {
      const res = await triggerManualJob(job);
      setJobResult(`Job completed: ${JSON.stringify(res)}`);
      await loadLogs();
    } catch (err: any) {
      alert("Job execution failed: " + err.message);
    } finally {
      setRunningJob(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">System Audit & Email Logs</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Audit history of administrator actions, trainer registrations and automated emails
          </p>
        </div>

        {/* Manual Trigger Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            disabled={runningJob !== null}
            loading={runningJob === "reminders"}
            onClick={() => handleRunJob("reminders")}
            icon={<Play className="w-3.5 h-3.5 text-violet-600" />}
          >
            Trigger Reminders
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={runningJob !== null}
            loading={runningJob === "missed"}
            onClick={() => handleRunJob("missed")}
            icon={<Play className="w-3.5 h-3.5 text-rose-600" />}
          >
            Trigger Missed Job
          </Button>
        </div>
      </div>

      {jobResult && (
        <div className="p-3.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 text-xs text-violet-800 dark:text-violet-300 font-mono">
          {jobResult}
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setTab("activity")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            tab === "activity"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Activity Audit ({activityLogs.length})</span>
        </button>

        <button
          onClick={() => setTab("emails")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            tab === "emails"
              ? "bg-violet-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Email Logs ({emailLogs.length})</span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : tab === "activity" ? (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 font-mono">
                {activityLogs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-slate-400 font-sans">
                      No activity logged yet.
                    </td>
                  </tr>
                ) : (
                  activityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                        {log.timestamp?.toDate ? log.timestamp.toDate().toLocaleString("en-IN") : "—"}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white font-sans">
                        {log.actorName || log.actorId}
                      </td>
                      <td className="py-3 px-4 text-violet-600 dark:text-violet-400 font-bold">
                        {log.action}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-xs truncate font-sans">
                        {log.meta ? JSON.stringify(log.meta) : "—"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Recipient</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {emailLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No emails sent yet.
                    </td>
                  </tr>
                ) : (
                  emailLogs.map((em) => (
                    <tr key={em.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 text-slate-400 whitespace-nowrap font-mono text-[11px]">
                        {em.sentAt?.toDate ? em.sentAt.toDate().toLocaleString("en-IN") : "—"}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        {em.to}
                      </td>
                      <td className="py-3 px-4 font-mono text-violet-600 dark:text-violet-400">
                        {em.type}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400 max-w-sm truncate">
                        {em.subject}
                      </td>
                      <td className="py-3 px-4">
                        {em.status === "sent" ? (
                          <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Sent</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 font-bold text-rose-600" title={em.error}>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Failed</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
