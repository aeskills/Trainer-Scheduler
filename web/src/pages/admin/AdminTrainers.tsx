import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Plus,
  Check,
  X,
  Edit,
  Trash2,
  MapPin,
  Calendar,
  Download,
  KeyRound,
  Copy,
  RefreshCw,
} from "lucide-react";
import {
  fetchAllTrainers,
  adminCreateUserCallable,
  adminUpdateUserCallable,
  adminDeleteUserCallable,
} from "../../services/adminApi";
import { AppUser } from "../../types";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { Modal } from "../../components/ui/Modal";
import { Skeleton } from "../../components/ui/Skeleton";

export const AdminTrainers: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialStatusFilter = searchParams.get("status") || "ALL";

  const [trainers, setTrainers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [stateFilter, setStateFilter] = useState<string>("ALL");
  const [copiedUid, setCopiedUid] = useState<string | null>(null);

  // Modals
  const [isAddOpen, setIsAddOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editingTrainer, setEditingTrainer] = useState<AppUser | null>(null);

  // Form states
  const [formName, setFormName] = useState<string>("");
  const [formEmail, setFormEmail] = useState<string>("");
  const [formPassword, setFormPassword] = useState<string>("");
  const [formPhone, setFormPhone] = useState<string>("");
  const [formState, setFormState] = useState<string>("UP");
  const [formRole, setFormRole] = useState<"trainer" | "admin">("trainer");
  const [formStatus, setFormStatus] = useState<any>("Approved");
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await fetchAllTrainers();
      setTrainers(list);
    } catch (err) {
      console.error("Error loading trainers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (trainer: AppUser) => {
    try {
      await adminUpdateUserCallable({ uid: trainer.uid, status: "Approved" });
      setTrainers((prev) =>
        prev.map((t) => (t.uid === trainer.uid ? { ...t, status: "Approved" } : t))
      );
    } catch (err: any) {
      alert("Approve failed: " + err.message);
    }
  };

  const handleReject = async (trainer: AppUser) => {
    if (!confirm(`Are you sure you want to reject ${trainer.name}?`)) return;
    try {
      await adminUpdateUserCallable({ uid: trainer.uid, status: "Rejected" });
      setTrainers((prev) =>
        prev.map((t) => (t.uid === trainer.uid ? { ...t, status: "Rejected" } : t))
      );
    } catch (err: any) {
      alert("Reject failed: " + err.message);
    }
  };

  const handleDelete = async (trainer: AppUser) => {
    if (!confirm(`Are you sure you want to completely delete ${trainer.name} (${trainer.email})?`)) return;
    try {
      await adminDeleteUserCallable(trainer.uid, true);
      setTrainers((prev) => prev.filter((t) => t.uid !== trainer.uid));
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  // Open Edit Modal
  const openEditModal = (t: AppUser) => {
    setEditingTrainer(t);
    setFormName(t.name);
    setFormEmail(t.email);
    setFormPassword(t.password || `${t.name.toLowerCase().replace(/[^a-z0-9]/g, "")}123`);
    setFormPhone(t.phone || "");
    setFormState(t.state || "UP");
    setFormRole(t.role);
    setFormStatus(t.status);
    setFormError(null);
    setIsEditOpen(true);
  };

  // Save Edit (including updating registered email & password)
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrainer) return;

    setActionLoading(true);
    setFormError(null);

    try {
      await adminUpdateUserCallable({
        uid: editingTrainer.uid,
        name: formName.trim(),
        email: formEmail.trim().toLowerCase(),
        password: formPassword.trim() || undefined,
        phone: formPhone.trim(),
        state: formState,
        role: formRole,
        status: formStatus,
      });

      await loadData();
      setIsEditOpen(false);
    } catch (err: any) {
      setFormError(err.message || "Failed to update trainer");
    } finally {
      setActionLoading(false);
    }
  };

  // Create New User (Trainer or Admin) with custom Password
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setFormError(null);

    const generatedPass =
      formPassword.trim() || `${formName.toLowerCase().replace(/[^a-z0-9]/g, "")}123`;

    try {
      await adminCreateUserCallable({
        name: formName.trim(),
        email: formEmail.trim().toLowerCase(),
        password: generatedPass,
        phone: formPhone.trim(),
        state: formState,
        role: formRole,
        status: formStatus,
      });

      await loadData();
      setIsAddOpen(false);
    } catch (err: any) {
      setFormError(err.message || "Failed to create user");
    } finally {
      setActionLoading(false);
    }
  };

  // Download all trainers credentials in one click
  const handleDownloadCredentials = () => {
    const headers = ["Trainer Name", "Email / Login ID", "Password", "State", "Phone", "Status"];
    const rows = trainers.map((t) => [
      `"${(t.name || "").replace(/"/g, '""')}"`,
      `"${(t.email || "").replace(/"/g, '""')}"`,
      `"${(t.password || `${(t.name || "trainer").toLowerCase().replace(/[^a-z0-9]/g, "")}123`).replace(/"/g, '""')}"`,
      `"${(t.state || "").replace(/"/g, '""')}"`,
      `"${(t.phone || "").replace(/"/g, '""')}"`,
      `"${(t.status || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `TrainerPlan_Credentials_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generateAutoPassword = (name: string) => {
    const clean = name.trim().toLowerCase().replace(/[^a-z0-9]/g, "");
    return clean ? `${clean}123` : "trainer123";
  };

  const filtered = trainers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()) ||
      (t.phone && t.phone.includes(search));

    const matchesStatus = statusFilter === "ALL" || t.status === statusFilter;
    const matchesState = stateFilter === "ALL" || t.state === stateFilter;

    return matchesSearch && matchesStatus && matchesState;
  });

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 sm:p-6 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">Trainers Directory</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Create field trainers, assign login credentials, and export ID/passwords
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="md"
            onClick={handleDownloadCredentials}
            icon={<Download className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
            className="border-emerald-200 text-emerald-700 bg-emerald-50/50 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300 font-semibold"
          >
            Download ID/Pass (CSV)
          </Button>

          <Button
            size="md"
            onClick={() => {
              setFormName("");
              setFormEmail("");
              setFormPassword("");
              setFormPhone("");
              setFormState("UP");
              setFormRole("trainer");
              setFormStatus("Approved");
              setFormError(null);
              setIsAddOpen(true);
            }}
            icon={<Plus className="w-4 h-4" />}
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-sm"
          >
            Add New Trainer
          </Button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="w-full sm:w-80">
          <Input
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<Search className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
          >
            <option value="ALL">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
            <option value="Deactivated">Deactivated</option>
          </select>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
          >
            <option value="ALL">All States</option>
            <option value="UP">UP</option>
            <option value="UK">UK</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>
      </div>

      {/* Trainers Table */}
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
                  <th className="py-3.5 px-4">Trainer</th>
                  <th className="py-3.5 px-4">Login Password</th>
                  <th className="py-3.5 px-4">State</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No trainers found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((t) => {
                    const pass =
                      t.password ||
                      `${(t.name || "trainer").toLowerCase().replace(/[^a-z0-9]/g, "")}123`;
                    return (
                      <tr key={t.uid} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</div>
                          <div className="text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="font-mono text-[11px] text-violet-700 dark:text-violet-300 font-medium">
                              {t.email}
                            </span>
                            {t.phone && <span>• {t.phone}</span>}
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700/60">
                            <KeyRound className="w-3 h-3 text-violet-500 shrink-0" />
                            <span className="font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200">
                              {pass}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                navigator.clipboard.writeText(pass);
                                setCopiedUid(t.uid);
                                setTimeout(() => setCopiedUid(null), 2000);
                              }}
                              title="Copy password"
                              className="text-slate-400 hover:text-violet-600 transition-colors ml-1 p-0.5"
                            >
                              {copiedUid === t.uid ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="inline-flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {t.state || "—"}
                          </span>
                        </td>

                        <td className="py-3.5 px-4">
                          <Badge status={t.status} size="sm" />
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {t.status === "Pending" && (
                              <>
                                <button
                                  onClick={() => handleApprove(t)}
                                  title="Approve registration"
                                  className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400 transition-colors"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleReject(t)}
                                  title="Reject registration"
                                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400 transition-colors"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </>
                            )}
                            <Link
                              to={`/admin/calendar?trainerId=${t.uid}`}
                              title="View Trainer Calendar"
                              className="p-1.5 rounded-lg text-violet-600 hover:text-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/40 transition-colors"
                            >
                              <Calendar className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => openEditModal(t)}
                              title="Edit details & password"
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(t)}
                              title="Delete trainer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit Trainer Details & Password">
        <form onSubmit={handleSaveEdit} className="flex flex-col gap-4">
          {formError && (
            <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl font-medium">{formError}</p>
          )}

          <Input
            label="Full Name"
            required
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          <Input
            label="Login Email / ID"
            type="email"
            required
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setFormPassword(generateAutoPassword(formName))}
                className="text-[11px] font-bold text-violet-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Auto Generate
              </button>
            </div>
            <Input
              required
              placeholder="e.g. sachin123"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              icon={<KeyRound className="w-4 h-4 text-violet-400" />}
            />
          </div>

          <Input
            label="Mobile Number"
            type="tel"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">State</label>
              <select
                value={formState}
                onChange={(e) => setFormState(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
              >
                <option value="UP">UP</option>
                <option value="UK">UK</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Status</label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
                <option value="Deactivated">Deactivated</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="md" type="button" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button size="md" type="submit" loading={actionLoading}>
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add New Trainer">
        <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
          {formError && (
            <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl font-medium">{formError}</p>
          )}

          <Input
            label="Full Name"
            required
            placeholder="e.g. Anand Sharma"
            value={formName}
            onChange={(e) => {
              setFormName(e.target.value);
              if (!formPassword) {
                setFormPassword(generateAutoPassword(e.target.value));
              }
            }}
          />

          <Input
            label="Login Email Address"
            type="email"
            required
            placeholder="trainer@gmail.com"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <button
                type="button"
                onClick={() => setFormPassword(generateAutoPassword(formName))}
                className="text-[11px] font-bold text-violet-600 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Auto Generate
              </button>
            </div>
            <Input
              required
              placeholder="e.g. anand123"
              value={formPassword}
              onChange={(e) => setFormPassword(e.target.value)}
              icon={<KeyRound className="w-4 h-4 text-violet-400" />}
              helperText="Give this password to the trainer to sign in."
            />
          </div>

          <Input
            label="Mobile Number"
            type="tel"
            placeholder="9876543210"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">State</label>
              <select
                value={formState}
                onChange={(e) => setFormState(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
              >
                <option value="UP">UP</option>
                <option value="UK">UK</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Status</label>
              <select
                value={formStatus}
                onChange={(e: any) => setFormStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2.5 text-sm"
              >
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="md" type="button" onClick={() => setIsAddOpen(false)}>
              Cancel
            </Button>
            <Button size="md" type="submit" loading={actionLoading} className="bg-violet-600 hover:bg-violet-700 text-white font-semibold">
              Create Trainer
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
