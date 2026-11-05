/** Domain types shared across Cloud Functions. Mirrors web/src/types. */

export type Role = "trainer" | "admin";
export type UserStatus = "Pending" | "Approved" | "Rejected" | "Deactivated";
export type VisitStatus = "PLANNED" | "SUBMITTED" | "MISSED";

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  role: Role;
  status: UserStatus;
  fcmTokens?: string[];
  createdAt?: FirebaseFirestore.Timestamp;
}

export interface School {
  id: string;
  name: string;
  targetStudents: number | null;
  trainedStudents: number | null;
}

export interface Photo {
  id: string;
  driveFileId: string;
  link: string;
  thumbUrl: string;
  fileName: string;
  uploadedAt: number;
  uploadedBy: string;
}

export interface Visit {
  id: string;
  trainerId: string;
  trainerName: string;
  state: string;
  date: string; // yyyy-MM-dd (IST)
  dateKey: number; // yyyymmdd
  status: VisitStatus;
  schools: School[];
  photos?: Record<string, Photo[]>;
  photoCounters?: Record<string, number>;
  photoCount?: number;
  adobeGalleryDone: boolean;
  reminder1SentAt?: FirebaseFirestore.Timestamp;
  reminder2SentAt?: FirebaseFirestore.Timestamp;
  missedNotifiedAt?: FirebaseFirestore.Timestamp;
  submittedAt?: FirebaseFirestore.Timestamp;
  updatedAt?: FirebaseFirestore.Timestamp;
}

export interface AppSettings {
  stateLinks: Record<string, string>;
  states: string[];
  reminderTimes: { first: string; second: string; secondEnabled: boolean };
  emailRemindersEnabled: boolean;
  autoApprove: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  stateLinks: { UP: "", UK: "", Delhi: "" },
  states: ["UP", "UK", "Delhi"],
  reminderTimes: { first: "18:00", second: "21:00", secondEnabled: false },
  emailRemindersEnabled: true,
  autoApprove: false,
};
