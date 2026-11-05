import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FolderGit2, ExternalLink, Building2, Phone, Search, X, CheckCircle2 } from "lucide-react";
import { MonthCalendar } from "../../components/calendar/MonthCalendar";
import { subscribeToMonthVisits } from "../../services/visitsApi";
import { getAppSettings } from "../../services/adminApi";
import { useAuth } from "../../hooks/useAuth";
import { Visit, AppSettings } from "../../types";
import { Skeleton } from "../../components/ui/Skeleton";
import { formatISTDate, getNowInIST } from "../../lib/dates";

export const CalendarPage: React.FC = () => {
  const navigate = useNavigate();
  const { appUser } = useAuth();
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [showSchoolsModal, setShowSchoolsModal] = useState<boolean>(false);
  const [schoolSearch, setSchoolSearch] = useState<string>("");

  useEffect(() => {
    getAppSettings().then(setSettings).catch(console.error);
  }, []);

  useEffect(() => {
    if (!appUser?.uid) return;

    // Fetch visits for a wide 6-month window surrounding current year
    const now = getNowInIST();
    const currentYear = now.getFullYear();
    const startKey = (currentYear - 1) * 10000 + 101;
    const endKey = (currentYear + 1) * 10000 + 1231;

    const unsub = subscribeToMonthVisits(appUser.uid, startKey, endKey, (list) => {
      setVisits(list);
      setLoading(false);
    });

    return () => unsub();
  }, [appUser?.uid]);

  const handleSelectDate = (dateStr: string) => {
    navigate(`/visit/${dateStr}`);
  };

  const userState = appUser?.state || "UP";
  const driveUrl = settings?.driveLinks?.[userState];
  const galleryUrl = settings?.stateLinks?.[userState];
  const assignedSchools = appUser?.assignedSchools || [];

  const filteredSchools = assignedSchools.filter((s) => {
    if (!schoolSearch.trim()) return true;
    const q = schoolSearch.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      (s.district && s.district.toLowerCase().includes(q)) ||
      (s.principalName && s.principalName.toLowerCase().includes(q)) ||
      (s.spocName && s.spocName.toLowerCase().includes(q))
    );
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white p-5 sm:p-7 shadow-lg shadow-violet-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-200">
            Field Trainer Dashboard
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5">
            Welcome, {appUser?.name || "Trainer"}!
          </h1>
          <p className="text-xs text-violet-100/90 mt-1">
            State: <strong>{userState}</strong> • Today is{" "}
            <strong>{formatISTDate(getNowInIST())}</strong>
          </p>
        </div>

        <button
          onClick={() => navigate(`/visit/${formatISTDate(getNowInIST())}`)}
          className="px-5 py-3 rounded-xl bg-white text-violet-700 hover:bg-violet-50 font-bold text-xs shadow-md transition-all active:scale-[0.98] self-start sm:self-auto"
        >
          Open Today's Visit
        </button>
      </div>

      {/* Quick Resource Cards (State Drive, Gallery & Assigned Schools) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Drive Card */}
        {driveUrl ? (
          <a
            href={driveUrl}
            target="_blank"
            rel="noreferrer"
            className="group p-4 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60 bg-gradient-to-br from-emerald-50/60 to-white dark:from-emerald-950/20 dark:to-slate-900 flex items-center justify-between hover:shadow-md hover:border-emerald-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold">
                📁
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Google Drive</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 font-bold">
                    {userState}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Open State Folder
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          </a>
        ) : null}

        {/* Gallery Card */}
        {galleryUrl ? (
          <a
            href={galleryUrl}
            target="_blank"
            rel="noreferrer"
            className="group p-4 rounded-xl border border-violet-200/80 dark:border-violet-800/60 bg-gradient-to-br from-violet-50/60 to-white dark:from-violet-950/20 dark:to-slate-900 flex items-center justify-between hover:shadow-md hover:border-violet-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300 flex items-center justify-center font-bold">
                🎨
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                  <span>Adobe Express</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-violet-100 dark:bg-violet-900 text-violet-800 dark:text-violet-300 font-bold">
                    {userState}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  State Photo Gallery
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
          </a>
        ) : null}

        {/* Assigned Schools Button */}
        <button
          type="button"
          onClick={() => setShowSchoolsModal(true)}
          className="group p-4 rounded-xl border border-indigo-200/80 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50/60 to-white dark:from-indigo-950/20 dark:to-slate-900 flex items-center justify-between hover:shadow-md hover:border-indigo-300 transition-all text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                <span>My Assigned Schools</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 font-bold">
                  {assignedSchools.length}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                View list & contacts
              </div>
            </div>
          </div>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">
            View
          </span>
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      ) : (
        <MonthCalendar
          visits={visits}
          isAdmin={false}
          onSelectDate={handleSelectDate}
        />
      )}

      {/* Modal: Assigned Schools Directory */}
      {showSchoolsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-scaleIn">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-violet-600" />
                  Assigned Schools ({assignedSchools.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Allocated schools for {appUser?.name} ({userState})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSchoolsModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search school name, district, or contact..."
                  value={schoolSearch}
                  onChange={(e) => setSchoolSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* List */}
            <div className="p-4 overflow-y-auto flex flex-col gap-2.5 flex-1">
              {filteredSchools.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No schools found matching "{schoolSearch}".
                </div>
              ) : (
                filteredSchools.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/60 flex flex-col gap-1.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {s.name}
                      </h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                        Target: {s.targetStudents} students
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                      {s.district && (
                        <span>
                          District: <strong className="text-slate-700 dark:text-slate-200">{s.district}</strong>
                        </span>
                      )}
                      {s.principalContact && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          Principal: {s.principalName ? `${s.principalName} (${s.principalContact})` : s.principalContact}
                        </span>
                      )}
                      {s.spocContact && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          SPOC: {s.spocName ? `${s.spocName} (${s.spocContact})` : s.spocContact}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSchoolsModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

