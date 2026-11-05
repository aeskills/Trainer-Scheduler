import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Users,
  Search,
  MapPin,
  CheckCircle2,
  Clock,
  XCircle,
  Plus,
  ArrowUpRight,
  TrendingUp,
  FileText,
  ExternalLink,
  Trash2,
  Edit,
  Camera,
} from "lucide-react";
import { MonthCalendar } from "../../components/calendar/MonthCalendar";
import { subscribeToMonthVisits } from "../../services/visitsApi";
import { fetchAllTrainers, adminUpsertVisit, adminDeleteVisit, getAppSettings } from "../../services/adminApi";
import { AppUser, Visit, School, Photo, AppSettings } from "../../types";
import { Skeleton } from "../../components/ui/Skeleton";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Modal } from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import { formatISTDate, getNowInIST, displayDate } from "../../lib/dates";

export const AdminCalendar: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [trainers, setTrainers] = useState<AppUser[]>([]);
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [selectedTrainerId, setSelectedTrainerId] = useState<string>("");

  const [stateFilter, setStateFilter] = useState<string>("ALL");
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loadingTrainers, setLoadingTrainers] = useState<boolean>(true);
  const [loadingVisits, setLoadingVisits] = useState<boolean>(true);

  // Day Inspection & Override Modal
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isDayModalOpen, setIsDayModalOpen] = useState<boolean>(false);
  const [activeDayVisit, setActiveDayVisit] = useState<Visit | null>(null);

  // Plan Visit on Behalf Modal
  const [isPlanModalOpen, setIsPlanModalOpen] = useState<boolean>(false);
  const [planSchoolName, setPlanSchoolName] = useState<string>("");
  const [planTarget, setPlanTarget] = useState<number>(45);
  const [submittingPlan, setSubmittingPlan] = useState<boolean>(false);

  // Load all trainers
  useEffect(() => {
    async function load() {
      setLoadingTrainers(true);
      try {
        const [list, s] = await Promise.all([fetchAllTrainers(), getAppSettings()]);
        setTrainers(list);
        setSettings(s);

        const urlTrainer = searchParams.get("trainerId");
        if (urlTrainer && list.some((t) => t.uid === urlTrainer)) {
          setSelectedTrainerId(urlTrainer);
        } else if (list.length > 0) {
          setSelectedTrainerId(list[0].uid);
        }
      } catch (err) {
        console.error("Error loading trainers:", err);
      } finally {
        setLoadingTrainers(false);
      }
    }
    load();

  }, [searchParams]);

  // Subscribe to selected trainer's visits in a wide 2-year window
  useEffect(() => {
    if (!selectedTrainerId) return;

    setLoadingVisits(true);
    const now = getNowInIST();
    const currentYear = now.getFullYear();
    const startKey = (currentYear - 1) * 10000 + 101;
    const endKey = (currentYear + 1) * 10000 + 1231;

    const unsub = subscribeToMonthVisits(selectedTrainerId, startKey, endKey, (list) => {
      setVisits(list);
      setLoadingVisits(false);
    });

    return () => unsub();
  }, [selectedTrainerId]);

  const selectedTrainer = trainers.find((t) => t.uid === selectedTrainerId) || trainers[0] || null;

  // Filter trainers for dropdown based on state
  const filteredTrainers = trainers.filter(
    (t) => stateFilter === "ALL" || t.state === stateFilter
  );

  const handleTrainerChange = (uid: string) => {
    setSelectedTrainerId(uid);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("trainerId", uid);
      return next;
    });
  };

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    const visitForDay = visits.find((v) => v.date === dateStr) || null;
    setActiveDayVisit(visitForDay);
    setIsDayModalOpen(true);
  };

  // Quick override status
  const handleOverrideStatus = async (newStatus: "PLANNED" | "SUBMITTED" | "MISSED") => {
    if (!activeDayVisit) return;
    try {
      await adminUpsertVisit({
        ...activeDayVisit,
        status: newStatus,
        submittedAt: newStatus === "SUBMITTED" ? { toDate: () => new Date() } : activeDayVisit.submittedAt,
      });
      setActiveDayVisit((prev) => (prev ? { ...prev, status: newStatus } : null));
    } catch (err) {
      console.error("Failed to override visit status:", err);
    }
  };

  // Delete visit
  const handleDeleteVisit = async () => {
    if (!activeDayVisit) return;
    if (!confirm(`Are you sure you want to delete the visit for ${activeDayVisit.date}?`)) return;
    try {
      await adminDeleteVisit(activeDayVisit.id);
      setIsDayModalOpen(false);
    } catch (err) {
      console.error("Failed to delete visit:", err);
    }
  };

  // Plan a visit on behalf of trainer for selected date
  const handleSavePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrainer || !selectedDate || !planSchoolName.trim()) return;

    setSubmittingPlan(true);
    try {
      const visitId = `${selectedTrainer.uid}_${selectedDate}`;
      const dateKey = Number(selectedDate.replace(/-/g, ""));
      const schoolId = `s_${Date.now()}`;

      await adminUpsertVisit({
        id: visitId,
        trainerId: selectedTrainer.uid,
        trainerName: selectedTrainer.name,
        state: selectedTrainer.state,
        date: selectedDate,
        dateKey,
        status: "PLANNED",
        schools: [
          {
            id: schoolId,
            name: planSchoolName.trim(),
            targetStudents: Number(planTarget) || 40,
            trainedStudents: null,
          },
        ],
        photoCounters: { [schoolId]: 0 },
        photoCount: 0,
        adobeGalleryDone: false,
      });

      setIsPlanModalOpen(false);
      setIsDayModalOpen(false);
      setPlanSchoolName("");
    } catch (err) {
      console.error("Error creating plan:", err);
    } finally {
      setSubmittingPlan(false);
    }
  };

  if (loadingTrainers) {
    return (
      <div className="flex flex-col gap-6 animate-pulse">
        <Skeleton className="h-28 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Top Banner & Trainer Selector Dropdown */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
                <CalendarIcon className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Admin Supervision
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Field Trainer Calendar
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Select any field trainer to inspect their scheduled school visits, submissions, and photo records.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to={`/admin/performance?tab=trainer&trainerId=${selectedTrainerId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/50 hover:bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-semibold text-xs transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trainer Analytics</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              to={`/admin/visits?trainerId=${selectedTrainerId}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Table View</span>
            </Link>
          </div>
        </div>

        {/* State Filter Pills & Trainer Dropdown Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 items-center">
          {/* State filter */}
          <div className="md:col-span-4 flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Region:
            </span>
            {["ALL", "UP", "UK", "Delhi"].map((st) => (
              <button
                key={st}
                onClick={() => setStateFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  stateFilter === st
                    ? "bg-violet-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Trainer Selector Dropdown */}
          <div className="md:col-span-8 flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Select Trainer:
            </span>
            <div className="relative flex-1">
              <select
                value={selectedTrainerId}
                onChange={(e) => handleTrainerChange(e.target.value)}
                className="w-full pl-3.5 pr-8 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-violet-500 cursor-pointer shadow-sm"
              >
                {filteredTrainers.map((t) => (
                  <option key={t.uid} value={t.uid}>
                    {t.name} ({t.state}) • {t.email}{t.status === "Pending" ? " ⏳ [Pending Review]" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Selected Trainer Banner Card */}
        {selectedTrainer && (
          <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white p-4 shadow-md shadow-violet-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm text-white font-extrabold text-xl flex items-center justify-center shrink-0">
                {selectedTrainer.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base font-extrabold">{selectedTrainer.name}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white uppercase">
                    {selectedTrainer.state} State
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400/30 text-emerald-100">
                    {selectedTrainer.status}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-violet-100">
                    {selectedTrainer.assignedSchools?.length || 0} Assigned Schools
                  </span>
                </div>
                <p className="text-xs text-violet-100 mt-0.5">
                  {selectedTrainer.email} • {selectedTrainer.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap self-start sm:self-auto">
              {settings?.driveLinks?.[selectedTrainer.state] && (
                <a
                  href={settings.driveLinks[selectedTrainer.state]}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors backdrop-blur-sm"
                >
                  <span>📁 Drive Folder</span>
                  <ExternalLink className="w-3 h-3 text-violet-200" />
                </a>
              )}
              {settings?.stateLinks?.[selectedTrainer.state] && (
                <a
                  href={settings.stateLinks[selectedTrainer.state]}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs transition-colors backdrop-blur-sm"
                >
                  <span>🎨 Gallery</span>
                  <ExternalLink className="w-3 h-3 text-violet-200" />
                </a>
              )}
              <div className="text-xs bg-white/10 px-3 py-1.5 rounded-xl text-violet-200">
                <strong className="text-white">{visits.length}</strong> visits
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Main Month Calendar */}
      {loadingVisits ? (
        <div className="flex flex-col gap-4">
          <Skeleton className="h-20 w-full rounded-2xl" />
          <Skeleton className="h-96 w-full rounded-2xl" />
        </div>
      ) : (
        <MonthCalendar
          visits={visits}
          isAdmin={true}
          trainerName={selectedTrainer?.name}
          onSelectDate={handleSelectDate}
        />
      )}

      {/* Day Inspection & Admin Override Modal */}
      {isDayModalOpen && selectedDate && (
        <Modal
          isOpen={isDayModalOpen}
          onClose={() => setIsDayModalOpen(false)}
          title={`Visit Inspection • ${selectedDate}`}
        >
          <div className="flex flex-col gap-5 text-xs">
            {/* Trainer & Date Meta */}
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3.5 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Field Trainer
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {selectedTrainer?.name} ({selectedTrainer?.state})
                </span>
              </div>
              {activeDayVisit ? (
                <Badge status={activeDayVisit.status} />
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500">
                  Not Scheduled
                </span>
              )}
            </div>

            {/* Visit Details if Present */}
            {activeDayVisit ? (
              <>
                {/* Schools list */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider text-[11px]">
                    Schools Planned / Visited
                  </h4>
                  <div className="flex flex-col gap-2">
                    {activeDayVisit.schools && activeDayVisit.schools.length > 0 ? (
                      activeDayVisit.schools.map((s, idx) => {
                        const schoolPhotos = activeDayVisit.photos?.[s.id] || [];
                        return (
                          <div
                            key={s.id || idx}
                            className="rounded-xl border border-slate-200 dark:border-slate-800 p-3 bg-white dark:bg-slate-900 flex flex-col gap-2"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 dark:text-white">
                                {idx + 1}. {s.name}
                              </span>
                              <span className="text-slate-400">
                                Target: <strong>{s.targetStudents || 0}</strong>
                              </span>
                            </div>

                            <div className="flex items-center justify-between text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                              <span>
                                Trained Students:{" "}
                                <strong className="text-violet-600 dark:text-violet-400">
                                  {s.trainedStudents !== null ? s.trainedStudents : "-"}
                                </strong>
                              </span>
                              <span>{schoolPhotos.length} photos</span>
                            </div>

                            {/* Photo Previews */}
                            {schoolPhotos.length > 0 && (
                              <div className="flex items-center gap-2 pt-1 overflow-x-auto">
                                {schoolPhotos.map((p, pIdx) => (
                                  <a
                                    key={p.id || pIdx}
                                    href={p.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block w-14 h-14 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 relative shrink-0 group"
                                  >
                                    <img
                                      src={p.thumbUrl}
                                      alt="School photo"
                                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                    <ExternalLink className="w-3 h-3 text-white absolute bottom-1 right-1 drop-shadow" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-slate-400">No schools listed.</p>
                    )}
                  </div>
                </div>

                {/* Status Override Controls */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50 dark:bg-slate-800/40">
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2 uppercase tracking-wider text-[11px]">
                    Admin Status Override
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleOverrideStatus("SUBMITTED")}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs transition-colors ${
                        activeDayVisit.status === "SUBMITTED"
                          ? "bg-emerald-600 text-white shadow-sm"
                          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-emerald-500"
                      }`}
                    >
                      Submitted
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOverrideStatus("PLANNED")}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs transition-colors ${
                        activeDayVisit.status === "PLANNED"
                          ? "bg-violet-600 text-white shadow-sm"
                          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-violet-500"
                      }`}
                    >
                      Planned
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOverrideStatus("MISSED")}
                      className={`flex-1 py-2 rounded-lg font-bold text-xs transition-colors ${
                        activeDayVisit.status === "MISSED"
                          ? "bg-rose-600 text-white shadow-sm"
                          : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-500"
                      }`}
                    >
                      Missed
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={handleDeleteVisit}
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                  >
                    Delete Visit
                  </Button>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/visit/${activeDayVisit.date}`}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Open Full Page
                    </Link>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setIsDayModalOpen(false)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* No Visit Scheduled for this Day */
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <CalendarIcon className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-2" />
                <p className="font-bold text-slate-800 dark:text-slate-200">
                  No Visit Scheduled on {selectedDate}
                </p>
                <p className="text-slate-400 text-xs mt-0.5 max-w-xs">
                  {selectedTrainer?.name} has not planned any school visits for this day.
                </p>

                <div className="flex items-center gap-2 mt-5">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setIsPlanModalOpen(true);
                    }}
                    icon={<Plus className="w-3.5 h-3.5" />}
                  >
                    Plan Visit for Trainer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsDayModalOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Plan Visit Modal (Admin planning on behalf of trainer) */}
      {isPlanModalOpen && selectedDate && selectedTrainer && (
        <Modal
          isOpen={isPlanModalOpen}
          onClose={() => setIsPlanModalOpen(false)}
          title={`Plan Visit • ${selectedTrainer.name}`}
        >
          <form onSubmit={handleSavePlan} className="flex flex-col gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Date: {selectedDate} ({selectedTrainer.state})
              </label>
              <p className="text-slate-400">
                You are adding a planned school visit for <strong>{selectedTrainer.name}</strong>.
              </p>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                School Name *
              </label>
              <Input
                placeholder="Type or select assigned school..."
                value={planSchoolName}
                list="admin-assigned-schools"
                onChange={(e) => {
                  const val = e.target.value;
                  setPlanSchoolName(val);
                  const match = selectedTrainer.assignedSchools?.find(
                    (s: any) => s.name.toLowerCase() === val.trim().toLowerCase()
                  );
                  if (match && typeof match.targetStudents === "number") {
                    setPlanTarget(match.targetStudents);
                  }

                }}
                required
              />
              <datalist id="admin-assigned-schools">
                {selectedTrainer.assignedSchools?.map((asSchool: any) => (
                  <option key={asSchool.id} value={asSchool.name}>
                    {asSchool.district ? `${asSchool.district} - Target: ${asSchool.targetStudents}` : `Target: ${asSchool.targetStudents}`}
                  </option>
                ))}
              </datalist>
            </div>


            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Target Students *
              </label>
              <Input
                type="number"
                min={1}
                max={500}
                value={planTarget}
                onChange={(e) => setPlanTarget(Number(e.target.value))}
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsPlanModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                loading={submittingPlan}
                icon={<Plus className="w-3.5 h-3.5" />}
              >
                Schedule Visit
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
