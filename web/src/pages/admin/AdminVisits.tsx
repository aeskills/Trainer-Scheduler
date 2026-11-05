import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FileText, Search, Plus, Filter, Edit, Trash2, Calendar, MapPin, Eye, ExternalLink } from "lucide-react";
import {
  fetchAllTrainers,
  fetchVisitsWithFilter,
  adminUpsertVisit,
  adminDeleteVisit,
} from "../../services/adminApi";
import { AppUser, Visit, School, Photo } from "../../types";
import { formatISTDate, getNowInIST, displayDate } from "../../lib/dates";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { Skeleton } from "../../components/ui/Skeleton";

export const AdminVisits: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialStatus = searchParams.get("status") || "ALL";

  const [visits, setVisits] = useState<Visit[]>([]);
  const [trainers, setTrainers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus);
  const [stateFilter, setStateFilter] = useState<string>("ALL");
  const [trainerFilter, setTrainerFilter] = useState<string>("ALL");

  // Edit / Override Modal
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [selectedVisit, setSelectedVisit] = useState<Visit | null>(null);
  const [editStatus, setEditStatus] = useState<any>("PLANNED");
  const [editSchools, setEditSchools] = useState<School[]>([]);

  // Add on behalf of trainer Modal
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [addTrainerId, setAddTrainerId] = useState<string>("");
  const [addDate, setAddDate] = useState<string>(formatISTDate(getNowInIST()));
  const [addSchoolName, setAddSchoolName] = useState<string>("");
  const [addTarget, setAddTarget] = useState<number>(40);

  const loadData = async () => {
    setLoading(true);
    try {
      const [allTrainers, visitList] = await Promise.all([
        fetchAllTrainers(),
        fetchVisitsWithFilter({ maxLimit: 300 }),
      ]);
      setTrainers(allTrainers);
      setVisits(visitList);
      if (allTrainers.length > 0 && !addTrainerId) {
        setAddTrainerId(allTrainers[0].uid);
      }
    } catch (err) {
      console.error("Error loading visits:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openEditModal = (v: Visit) => {
    setSelectedVisit(v);
    setEditStatus(v.status);
    setEditSchools(v.schools || []);
    setIsEditOpen(true);
  };

  const handleSaveVisitOverride = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVisit) return;

    try {
      await adminUpsertVisit({
        id: selectedVisit.id,
        status: editStatus,
        schools: editSchools,
      });
      await loadData();
      setIsEditOpen(false);
    } catch (err: any) {
      alert("Failed to update visit: " + err.message);
    }
  };

  const handleDeleteVisit = async (visitId: string) => {
    if (!confirm("Are you sure you want to delete this visit record?")) return;
    try {
      await adminDeleteVisit(visitId);
      setVisits((prev) => prev.filter((v) => v.id !== visitId));
    } catch (err: any) {
      alert("Failed to delete visit: " + err.message);
    }
  };

  const handleCreateOnBehalf = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addTrainerId || !addDate) return;

    const t = trainers.find((x) => x.uid === addTrainerId);
    if (!t) return;

    const visitId = `${addTrainerId}_${addDate}`;
    const dateKey = Number(addDate.replace(/-/g, ""));

    try {
      await adminUpsertVisit({
        id: visitId,
        trainerId: t.uid,
        trainerName: t.name,
        state: t.state,
        date: addDate,
        dateKey,
        status: "PLANNED",
        schools: [
          {
            id: `s_${Date.now()}`,
            name: addSchoolName.trim() || "School 1",
            targetStudents: addTarget,
            trainedStudents: null,
          },
        ],
        photoCount: 0,
        adobeGalleryDone: false,
      });

      await loadData();
      setIsAddOpen(false);
    } catch (err: any) {
      alert("Failed to create visit on behalf of trainer: " + err.message);
    }
  };

  const filteredVisits = visits.filter((v) => {
    const matchesStatus = statusFilter === "ALL" || v.status === statusFilter;
    const matchesState = stateFilter === "ALL" || v.state === stateFilter;
    const matchesTrainer = trainerFilter === "ALL" || v.trainerId === trainerFilter;
    return matchesStatus && matchesState && matchesTrainer;
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">All Trainer Visits</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor, inspect and manually override visits across all states
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            to={trainerFilter !== "ALL" ? `/admin/calendar?trainerId=${trainerFilter}` : "/admin/calendar"}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/50 hover:bg-violet-100 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300 font-bold text-xs shadow-sm transition-colors"
          >
            <Calendar className="w-4 h-4 text-violet-600 dark:text-violet-400" />
            <span>Trainer Calendar View</span>
          </Link>

          <Button
            size="md"
            onClick={() => {
              setAddDate(formatISTDate(getNowInIST()));
              setAddSchoolName("");
              setAddTarget(40);
              setIsAddOpen(true);
            }}
            icon={<Plus className="w-4 h-4" />}
          >
            Add Visit On Behalf
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="ALL">All Statuses</option>
          <option value="PLANNED">Planned (Pending Submit)</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="MISSED">Missed</option>
        </select>

        <select
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="ALL">All States</option>
          <option value="UP">UP</option>
          <option value="UK">UK</option>
          <option value="Delhi">Delhi</option>
        </select>

        <select
          value={trainerFilter}
          onChange={(e) => setTrainerFilter(e.target.value)}
          className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="ALL">All Trainers</option>
          {trainers.map((t) => (
            <option key={t.uid} value={t.uid}>
              {t.name} ({t.state})
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex flex-col gap-3">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Trainer</th>
                  <th className="py-3.5 px-4">State</th>
                  <th className="py-3.5 px-4">Schools</th>
                  <th className="py-3.5 px-4">Photos</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filteredVisits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No visits found matching your criteria.
                    </td>
                  </tr>
                ) : (
                  filteredVisits.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                        {displayDate(v.date)}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-800 dark:text-slate-200">
                        {v.trainerName}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-semibold text-slate-600 dark:text-slate-300">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {v.state}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">
                            {v.schools?.length || 0}
                          </span>
                          <span className="text-[11px] text-slate-400 ml-1 truncate block max-w-[140px]">
                            {v.schools?.map((s) => s.name).join(", ") || "—"}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                        {v.photoCount || 0}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge status={v.status} size="sm" />
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openEditModal(v)}
                            title="Edit / Override status"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteVisit(v.id)}
                            title="Delete visit"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit / Override Status Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Visit / Override Status">
        {selectedVisit && (
          <form onSubmit={handleSaveVisitOverride} className="flex flex-col gap-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 text-xs">
              <p>
                <strong>Trainer:</strong> {selectedVisit.trainerName} ({selectedVisit.state})
              </p>
              <p className="mt-1">
                <strong>Date:</strong> {displayDate(selectedVisit.date)}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Status Override
              </label>
              <select
                value={editStatus}
                onChange={(e: any) => setEditStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
              >
                <option value="PLANNED">PLANNED (Light Purple)</option>
                <option value="SUBMITTED">SUBMITTED (Green)</option>
                <option value="MISSED">MISSED (Red)</option>
              </select>
              <p className="text-[11px] text-slate-500">
                You can manually correct a missed (red) day to submitted (green).
              </p>
            </div>

            {/* School numbers adjustment */}
            <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Schools & Numbers
              </label>
              {editSchools.map((s, idx) => (
                <div key={s.id || idx} className="grid grid-cols-3 gap-2">
                  <Input
                    label="School Name"
                    value={s.name}
                    onChange={(e) => {
                      const updated = [...editSchools];
                      updated[idx].name = e.target.value;
                      setEditSchools(updated);
                    }}
                  />
                  <Input
                    label="Target"
                    type="number"
                    value={s.targetStudents === null ? "" : s.targetStudents}
                    onChange={(e) => {
                      const updated = [...editSchools];
                      updated[idx].targetStudents = e.target.value === "" ? null : Number(e.target.value);
                      setEditSchools(updated);
                    }}
                  />
                  <Input
                    label="Trained"
                    type="number"
                    value={s.trainedStudents === null ? "" : s.trainedStudents}
                    onChange={(e) => {
                      const updated = [...editSchools];
                      updated[idx].trainedStudents = e.target.value === "" ? null : Number(e.target.value);
                      setEditSchools(updated);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <Button variant="ghost" size="md" type="button" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button size="md" type="submit">
                Save Override
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Add Visit On Behalf Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Visit On Behalf of Trainer">
        <form onSubmit={handleCreateOnBehalf} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Select Trainer
            </label>
            <select
              value={addTrainerId}
              onChange={(e) => setAddTrainerId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
            >
              {trainers.map((t) => (
                <option key={t.uid} value={t.uid}>
                  {t.name} ({t.state} - {t.email})
                </option>
              ))}
            </select>
          </div>

          <Input
            label="Visit Date (Any Date)"
            type="date"
            required
            value={addDate}
            onChange={(e) => setAddDate(e.target.value)}
          />

          <Input
            label="Initial School Name"
            placeholder="e.g. St. Xavier's School"
            value={addSchoolName}
            onChange={(e) => setAddSchoolName(e.target.value)}
          />

          <Input
            label="Target Students"
            type="number"
            min={1}
            value={addTarget}
            onChange={(e) => setAddTarget(Number(e.target.value))}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="md" type="button" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button size="md" type="submit">
              Create Visit Plan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
