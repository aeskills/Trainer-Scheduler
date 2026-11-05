import { AppUser, Visit, AppSettings, AppNotification, ActivityLog, EmailLog, School, Photo } from "../types";
import { formatISTDate, getNowInIST } from "./dates";
import { DEFAULT_ADMIN_USER, INITIAL_TRAINERS, DEFAULT_SETTINGS } from "./trainersData";

const STORAGE_KEY = "tp_mock_store_v7";

interface MockState {
  users: AppUser[];
  visits: Record<string, Visit>;
  settings: AppSettings;
  notifications: AppNotification[];
  activityLogs: ActivityLog[];
  emailLogs: EmailLog[];
  currentUserUid: string | null;
}

const todayStr = formatISTDate(getNowInIST());

const defaultUsers: AppUser[] = [DEFAULT_ADMIN_USER, ...INITIAL_TRAINERS];

// Helper to compute date string offsets
function offsetDate(days: number): string {
  const d = getNowInIST();
  d.setDate(d.getDate() + days);
  return formatISTDate(d);
}

// Sample school photos with realistic thumbnails
const samplePhotoThumbs = [
  "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=480&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=480&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=480&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=480&auto=format&fit=crop&q=80",
];

function buildSamplePhoto(trainerId: string, schoolName: string, idx: number, daysAgo: number): Photo {
  const thumb = samplePhotoThumbs[(idx + daysAgo) % samplePhotoThumbs.length];
  return {
    id: `photo_${trainerId}_${daysAgo}_${idx}`,
    driveFileId: `drive_f_${trainerId}_${daysAgo}_${idx}`,
    fileName: `${schoolName.replace(/\s+/g, "_")}_${idx + 1}.jpg`,
    link: "https://drive.google.com",
    thumbUrl: thumb,
    uploadedAt: Date.now() - daysAgo * 86400000,
    uploadedBy: trainerId,
  };
}

function generateRichSeedVisits(): Record<string, Visit> {
  const visits: Record<string, Visit> = {};

  const trainerConfigs = INITIAL_TRAINERS.map((t, idx) => ({
    id: t.uid,
    name: t.name,
    state: t.state,
    schoolsPool: (t.assignedSchools && t.assignedSchools.length > 0)
      ? t.assignedSchools.map((s) => s.name)
      : ["Govt Composite School", "PM Shri Primary School"],
    missedDays: idx % 3 === 1 ? [2] : idx % 3 === 2 ? [3, 7] : [],
  }));

  // Generate 12 days of history for each of the 9 trainers
  for (let daysAgo = 0; daysAgo <= 11; daysAgo++) {
    const dateStr = offsetDate(-daysAgo);
    const dateKey = Number(dateStr.replace(/-/g, ""));

    trainerConfigs.forEach((t) => {
      const visitId = `${t.id}_${dateStr}`;
      const schoolName = t.schoolsPool[daysAgo % t.schoolsPool.length];

      // Determine status
      let status: "PLANNED" | "SUBMITTED" | "MISSED" = "SUBMITTED";
      if (daysAgo === 0) {
        // Today: half submitted, half planned
        status = t.id === "trainer_anirudh" || t.id === "trainer_sachin" || t.id === "trainer_ritika"
          ? "SUBMITTED"
          : "PLANNED";
      } else if (t.missedDays.includes(daysAgo)) {
        status = "MISSED";
      }

      const target = 40 + ((daysAgo * 7 + t.id.length * 3) % 35);
      const trained = status === "SUBMITTED" ? Math.max(30, target - 5 + ((daysAgo + 2) % 10)) : null;

      const photosCount = status === "SUBMITTED" ? 2 + (daysAgo % 2) : 0;
      const photosList: Photo[] = [];
      for (let p = 0; p < photosCount; p++) {
        photosList.push(buildSamplePhoto(t.id, schoolName, p, daysAgo));
      }

      const schoolId = `s_${daysAgo}`;
      visits[visitId] = {
        id: visitId,
        trainerId: t.id,
        trainerName: t.name,
        state: t.state,
        date: dateStr,
        dateKey,
        status,
        schools: [
          {
            id: schoolId,
            name: schoolName,
            targetStudents: target,
            trainedStudents: trained,
          },
        ],
        photos: photosCount > 0 ? { [schoolId]: photosList } : {},
        photoCounters: { [schoolId]: photosCount },
        photoCount: photosCount,
        adobeGalleryDone: status === "SUBMITTED",
        submittedAt: status === "SUBMITTED" ? { toDate: () => new Date(Date.now() - daysAgo * 86400000 + 17 * 3600000) } : undefined,
      };
    });
  }

  return visits;
}

const defaultVisits = generateRichSeedVisits();

function deduplicateUsers(users: AppUser[]): AppUser[] {
  const byId = new Map<string, AppUser>();
  const byEmail = new Map<string, string>(); // normalized email -> uid

  for (const u of users) {
    if (!u) continue;
    const emailKey = u.email ? u.email.trim().toLowerCase() : "";

    const existingUid = (u.uid && byId.has(u.uid))
      ? u.uid
      : (emailKey && byEmail.has(emailKey))
      ? byEmail.get(emailKey)!
      : null;

    if (existingUid) {
      const existing = byId.get(existingUid)!;
      byId.set(existingUid, {
        ...existing,
        ...u,
        uid: existingUid,
        password: u.password || existing.password || `${(u.name || "trainer").toLowerCase().replace(/[^a-z0-9]/g, "")}123`,
      });
    } else {
      const finalUid = u.uid || (emailKey ? `u_${emailKey.replace(/[^a-z0-9]/g, "_")}` : `u_${Date.now()}`);
      byId.set(finalUid, {
        ...u,
        uid: finalUid,
        password: u.password || `${(u.name || "trainer").toLowerCase().replace(/[^a-z0-9]/g, "")}123`,
      });
      if (emailKey) byEmail.set(emailKey, finalUid);
    }
  }

  return Array.from(byId.values());
}

class MockStore {
  private state: MockState;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.state = this.load();

    // Cross-tab synchronization: sync whenever another tab updates localStorage
    if (typeof window !== "undefined") {
      window.addEventListener("storage", (e) => {
        if (e.key === STORAGE_KEY || e.key === "tp_mock_store_v6") {
          this.syncWithStorage();
        }
      });

      // Proactively fetch server-persisted custom trainers on load
      fetch("/api/custom-trainers")
        .then((res) => (res.ok ? res.json() : []))
        .then((list) => {
          if (Array.isArray(list) && list.length > 0) {
            for (const t of list) {
              const idx = this.state.users.findIndex(
                (u) => u.uid === t.uid || (t.email && u.email?.toLowerCase() === t.email.toLowerCase())
              );
              if (idx >= 0) {
                this.state.users[idx] = { ...this.state.users[idx], ...t };
              } else {
                this.state.users.push(t);
              }
            }
            this.save();
          }
        })
        .catch(() => {});
    }
  }

  public syncWithStorage() {
    try {
      if (typeof window === "undefined") return;
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("tp_mock_store_v6");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.users) && parsed.users.length > 0) {
          const rawList = [...defaultUsers, ...parsed.users];
          const cleanUsers = deduplicateUsers(rawList);
          this.state.users = cleanUsers;
          if (parsed.visits) this.state.visits = { ...this.state.visits, ...parsed.visits };
          if (parsed.settings) this.state.settings = { ...this.state.settings, ...parsed.settings };
          if (parsed.currentUserUid !== undefined) this.state.currentUserUid = parsed.currentUserUid;
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
          } catch {}
          this.listeners.forEach((fn) => fn());
        }
      }
    } catch {}
  }

  private load(): MockState {
    try {
      if (typeof window !== "undefined") {
        const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("tp_mock_store_v6");
        if (raw) {
          const parsed = JSON.parse(raw);
          const rawList = [...defaultUsers, ...(Array.isArray(parsed.users) ? parsed.users : [])];
          parsed.users = deduplicateUsers(rawList);

          if (!parsed.visits || Object.keys(parsed.visits).length < 20) {
            parsed.visits = { ...defaultVisits, ...(parsed.visits || {}) };
          }
          parsed.settings = { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) };

          if (!parsed.currentUserUid || !parsed.users.some((u: any) => u.uid === parsed.currentUserUid)) {
            parsed.currentUserUid = null;
          }

          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          } catch {}
          return parsed;
        }
      }
    } catch {}
    return {
      users: defaultUsers,
      visits: defaultVisits,
      settings: DEFAULT_SETTINGS,
      notifications: [
        {
          id: "n1",
          userId: "trainer_anirudh",
          title: "Submit your day's work",
          body: "Reminder: You planned school visits for today. Submit before 11:59 PM.",
          link: `/visit/${todayStr}`,
          read: false,
          createdAt: { toDate: () => new Date() },
        },
      ],
      activityLogs: [
        {
          id: "act_1",
          actorId: "admin_1",
          actorName: "System Administrator",
          action: "system.init",
          timestamp: { toDate: () => new Date() },
          meta: { message: "System initialized with trainers" },
        },
      ],
      emailLogs: [
        {
          id: "em_1",
          to: "sb19991319@gmail.com",
          type: "otp_login",
          subject: "Your TrainerPlan verification code",
          status: "sent",
          provider: "gmail-smtp (aeskills2026@gmail.com)",
          sentAt: { toDate: () => new Date() },
        },
      ],
      currentUserUid: null,
    };
  }

  private save() {
    try {
      if (typeof window !== "undefined") {
        this.state.users = deduplicateUsers(this.state.users);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      }
    } catch {}
    this.listeners.forEach((fn) => fn());
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  getState() {
    return this.state;
  }

  setCurrentUser(uid: string | null) {
    this.state.currentUserUid = uid;
    this.save();
  }

  getCurrentUser(): AppUser | null {
    this.syncWithStorage();
    if (!this.state.currentUserUid) return null;
    return this.state.users.find((u) => u.uid === this.state.currentUserUid) || null;
  }

  getUsers(): AppUser[] {
    this.syncWithStorage();
    return deduplicateUsers(this.state.users);
  }

  getTrainers(): AppUser[] {
    this.syncWithStorage();
    return deduplicateUsers(this.state.users).filter((u) => u.role === "trainer");
  }

  saveUser(user: Partial<AppUser> & { uid: string }) {
    this.syncWithStorage();
    const idx = this.state.users.findIndex(
      (u) => u.uid === user.uid || (user.email && u.email?.toLowerCase() === user.email.toLowerCase())
    );
    if (idx >= 0) {
      this.state.users[idx] = { ...this.state.users[idx], ...user };
    } else {
      this.state.users.push(user as AppUser);
    }
    this.save();
  }

  deleteUser(uid: string) {
    this.syncWithStorage();
    this.state.users = this.state.users.filter((u) => u.uid !== uid);
    this.save();
  }

  getVisit(id: string): Visit | null {
    return this.state.visits[id] || null;
  }

  getVisitsForTrainer(trainerId: string): Visit[] {
    return Object.values(this.state.visits).filter((v) => v.trainerId === trainerId);
  }

  getAllVisits(): Visit[] {
    return Object.values(this.state.visits);
  }

  saveVisit(v: Partial<Visit> & { id: string }) {
    const existing = this.state.visits[v.id] || {};
    this.state.visits[v.id] = { ...existing, ...v } as Visit;
    this.save();
  }

  deleteVisit(id: string) {
    delete this.state.visits[id];
    this.save();
  }

  getSettings(): AppSettings {
    return this.state.settings;
  }

  saveSettings(s: Partial<AppSettings>) {
    this.state.settings = { ...this.state.settings, ...s };
    this.save();
  }

  getNotifications(userId: string): AppNotification[] {
    return this.state.notifications.filter((n) => n.userId === userId);
  }

  markNotificationRead(id: string) {
    const n = this.state.notifications.find((x) => x.id === id);
    if (n) {
      n.read = true;
      this.save();
    }
  }

  addActivityLog(actorName: string, action: string, meta: any) {
    this.state.activityLogs.unshift({
      id: `act_${Date.now()}`,
      actorId: "actor",
      actorName,
      action,
      meta,
      timestamp: { toDate: () => new Date() },
    });
    this.save();
  }

  resetToDefault() {
    localStorage.removeItem(STORAGE_KEY);
    this.state = this.load();
    this.save();
  }
}

export const mockStore = new MockStore();
