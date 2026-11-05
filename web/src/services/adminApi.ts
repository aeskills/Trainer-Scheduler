import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import * as XLSX from "xlsx";
import { db, functions } from "../lib/firebase";
import { ActivityLog, AppSettings, AppUser, EmailLog, Visit } from "../types";
import { mockStore } from "../lib/mockStore";

const isDemo = import.meta.env.VITE_DEMO_MODE === "true";

export const getAppSettings = async (): Promise<AppSettings> => {
  if (isDemo) return mockStore.getSettings();
  const ref = doc(db, "settings", "app");
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    return {
      stateLinks: { UP: "", UK: "", Delhi: "" },
      states: ["UP", "UK", "Delhi"],
      reminderTimes: { first: "18:00", second: "21:00", secondEnabled: false },
      emailRemindersEnabled: true,
      autoApprove: false,
    };
  }
  return snap.data() as AppSettings;
};

export const updateAppSettings = async (data: Partial<AppSettings>): Promise<void> => {
  if (isDemo) {
    mockStore.saveSettings(data);
    return;
  }
  const ref = doc(db, "settings", "app");
  await setDoc(ref, data, { merge: true });
};

export const fetchAllTrainers = async (): Promise<AppUser[]> => {
  if (isDemo) return mockStore.getTrainers();
  const q = query(collection(db, "users"), where("role", "==", "trainer"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...d.data(), uid: d.id } as AppUser));
};

export const adminCreateUserCallable = async (userData: Partial<AppUser>): Promise<{ uid: string }> => {
  if (isDemo) {
    const normEmail = (userData.email || "").trim().toLowerCase();
    const uid = userData.uid || (normEmail ? `u_${normEmail.replace(/[^a-z0-9]/g, "_")}` : `user_${Date.now()}`);
    const fullUser = { ...userData, uid, email: normEmail } as any;
    mockStore.saveUser(fullUser);
    mockStore.addActivityLog("Admin", "user.created", { email: userData.email });

    // Sync to persistent server store so all windows/origins can log in immediately
    try {
      await fetch("/api/custom-trainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fullUser),
      });
    } catch {}

    return { uid };
  }
  const fn = httpsCallable(functions, "adminCreateUser");
  const res = await fn(userData);
  return res.data as { uid: string };
};

export const adminUpdateUserCallable = async (userData: Partial<AppUser> & { uid: string }): Promise<void> => {
  if (isDemo) {
    mockStore.saveUser(userData);
    mockStore.addActivityLog("Admin", "user.updated", { uid: userData.uid });

    // Sync to persistent server store
    try {
      await fetch("/api/custom-trainers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
    } catch {}

    return;
  }
  const fn = httpsCallable(functions, "adminUpdateUser");
  await fn(userData);
};

export const adminDeleteUserCallable = async (uid: string, deleteVisits = false): Promise<void> => {
  if (isDemo) {
    mockStore.deleteUser(uid);
    mockStore.addActivityLog("Admin", "user.deleted", { uid });

    // Sync to persistent server store
    try {
      await fetch("/api/custom-trainers", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid }),
      });
    } catch {}

    return;
  }
  const fn = httpsCallable(functions, "adminDeleteUser");
  await fn({ uid, deleteVisits });
};

export const fetchVisitsWithFilter = async (filters: {
  trainerId?: string;
  state?: string;
  status?: string;
  startDateKey?: number;
  endDateKey?: number;
  maxLimit?: number;
}): Promise<Visit[]> => {
  if (isDemo) {
    let results = mockStore.getAllVisits();
    if (filters.trainerId) results = results.filter((v) => v.trainerId === filters.trainerId);
    if (filters.state) results = results.filter((v) => v.state === filters.state);
    if (filters.status) results = results.filter((v) => v.status === filters.status);
    if (filters.startDateKey) results = results.filter((v) => v.dateKey >= filters.startDateKey!);
    if (filters.endDateKey) results = results.filter((v) => v.dateKey <= filters.endDateKey!);
    return results.sort((a, b) => b.dateKey - a.dateKey);
  }

  let q = query(collection(db, "visits"), orderBy("dateKey", "desc"), limit(filters.maxLimit || 300));

  if (filters.trainerId) {
    q = query(collection(db, "visits"), where("trainerId", "==", filters.trainerId), orderBy("dateKey", "desc"), limit(filters.maxLimit || 300));
  } else if (filters.state) {
    q = query(collection(db, "visits"), where("state", "==", filters.state), orderBy("dateKey", "desc"), limit(filters.maxLimit || 300));
  } else if (filters.status) {
    q = query(collection(db, "visits"), where("status", "==", filters.status), orderBy("dateKey", "desc"), limit(filters.maxLimit || 300));
  }

  const snap = await getDocs(q);
  let results = snap.docs.map((d) => ({ ...d.data(), id: d.id } as Visit));

  if (filters.startDateKey) {
    results = results.filter((v) => v.dateKey >= filters.startDateKey!);
  }
  if (filters.endDateKey) {
    results = results.filter((v) => v.dateKey <= filters.endDateKey!);
  }

  return results;
};

export const adminUpsertVisit = async (visit: Partial<Visit> & { id: string }): Promise<void> => {
  if (isDemo) {
    mockStore.saveVisit(visit);
    mockStore.addActivityLog("Admin", "visit.admin_upsert", { id: visit.id, status: visit.status });
    return;
  }
  const ref = doc(db, "visits", visit.id);
  await setDoc(ref, visit, { merge: true });
};

export const adminDeleteVisit = async (visitId: string): Promise<void> => {
  if (isDemo) {
    mockStore.deleteVisit(visitId);
    mockStore.addActivityLog("Admin", "visit.deleted", { id: visitId });
    return;
  }
  const ref = doc(db, "visits", visitId);
  await deleteDoc(ref);
};

export const fetchActivityLogs = async (max = 100): Promise<ActivityLog[]> => {
  if (isDemo) return mockStore.getState().activityLogs.slice(0, max);
  const q = query(collection(db, "activityLogs"), orderBy("timestamp", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...d.data(), id: d.id } as ActivityLog));
};

export const fetchEmailLogs = async (max = 100): Promise<EmailLog[]> => {
  if (isDemo) return mockStore.getState().emailLogs.slice(0, max);
  const q = query(collection(db, "emailLogs"), orderBy("sentAt", "desc"), limit(max));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ ...d.data(), id: d.id } as EmailLog));
};

export const triggerManualJob = async (job: "reminders" | "missed"): Promise<any> => {
  if (isDemo) {
    mockStore.addActivityLog("Admin", `job.${job}.manual`, { triggeredAt: new Date().toISOString() });
    return { ok: true, message: `Demo job "${job}" completed successfully!` };
  }
  const fn = httpsCallable(functions, "adminRunJob");
  const res = await fn({ job });
  return res.data;
};

/**
 * Export visits data into Excel (.xlsx) or CSV
 */
export const exportVisitsToSpreadsheet = (visits: Visit[], formatType: "xlsx" | "csv" = "xlsx") => {
  const rows: any[] = [];

  visits.forEach((v) => {
    if (!v.schools || v.schools.length === 0) {
      rows.push({
        "Visit Date": v.date,
        "Trainer Name": v.trainerName,
        "State": v.state,
        "Status": v.status,
        "School Name": "-",
        "Target Students": 0,
        "Trained Students": 0,
        "Photos Count": v.photoCount || 0,
        "Adobe Gallery Done": v.adobeGalleryDone ? "Yes" : "No",
        "Submitted At": v.submittedAt?.toDate ? v.submittedAt.toDate().toLocaleString("en-IN") : "-",
      });
    } else {
      v.schools.forEach((s) => {
        const photos = v.photos?.[s.id] || [];
        rows.push({
          "Visit Date": v.date,
          "Trainer Name": v.trainerName,
          "State": v.state,
          "Status": v.status,
          "School Name": s.name || "Unnamed",
          "Target Students": s.targetStudents || 0,
          "Trained Students": s.trainedStudents || 0,
          "Photos Count": photos.length,
          "Photos Links": photos.map((p) => p.link).join(", "),
          "Adobe Gallery Done": v.adobeGalleryDone ? "Yes" : "No",
          "Submitted At": v.submittedAt?.toDate ? v.submittedAt.toDate().toLocaleString("en-IN") : "-",
        });
      });
    }
  });

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Visits");

  const fileName = `TrainerPlan_Visits_${new Date().toISOString().slice(0, 10)}.${formatType}`;
  XLSX.writeFile(workbook, fileName, { bookType: formatType });
};
