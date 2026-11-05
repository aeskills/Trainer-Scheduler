export type Role = "trainer" | "admin";
export type UserStatus = "Pending" | "Approved" | "Rejected" | "Deactivated";
export type VisitStatus = "PLANNED" | "SUBMITTED" | "MISSED";

export interface AssignedSchool {
  id: string;
  name: string;
  district?: string;
  targetStudents?: number;
  principalName?: string;
  principalContact?: string;
  spocName?: string;
  spocContact?: string;
}

export interface AppUser {
  uid: string;
  name: string;
  email: string;
  password?: string;
  phone: string;
  state: string;
  role: Role;
  status: UserStatus;
  fcmTokens?: string[];
  theme?: "light" | "dark" | "system";
  pushPrompted?: boolean;
  assignedSchools?: AssignedSchool[];
  createdAt?: { seconds: number; nanoseconds: number } | any;
  lastLoginAt?: { seconds: number; nanoseconds: number } | any;
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
  id: string; // {trainerId}_{date}
  trainerId: string;
  trainerName: string;
  state: string;
  date: string; // yyyy-MM-dd
  dateKey: number; // yyyymmdd
  status: VisitStatus;
  schools: School[];
  photos?: Record<string, Photo[]>;
  photoCounters?: Record<string, number>;
  photoCount?: number;
  adobeGalleryDone: boolean;
  adobeSubmissionLinks?: string[];
  adobeSubmissionStatus?: "PENDING" | "SUBMITTED";
  adobeSubmissionDate?: string;
  reminder1SentAt?: any;
  reminder2SentAt?: any;
  missedNotifiedAt?: any;
  submittedAt?: any;
  submittedBy?: string;
  updatedAt?: any;
  createdAt?: any;
}

export interface AppSettings {
  stateLinks: Record<string, string>; // { "UP": "url", "UK": "url", "Delhi": "url" }
  driveLinks?: Record<string, string>; // { "UP": "url", "UK": "url", "Delhi": "url" }
  activitySheetLinks?: Record<string, string>; // { "Delhi": "url", "UP": "url", "UK": "url" }
  states: string[];
  reminderTimes: {
    first: string; // "18:00"
    second: string; // "21:00"
    secondEnabled: boolean;
  };
  emailRemindersEnabled: boolean;
  autoApprove: boolean;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  body: string;
  link?: string;
  kind?: string;
  read: boolean;
  createdAt: any;
}

export interface ActivityLog {
  id: string;
  actorId: string;
  actorName?: string;
  action: string;
  targetId?: string;
  meta?: Record<string, any>;
  timestamp: any;
}

export interface EmailLog {
  id: string;
  to: string;
  type: string;
  subject: string;
  status: "sent" | "failed";
  provider: string;
  messageId?: string;
  error?: string;
  meta?: any;
  sentAt: any;
}

export interface DayStatusInfo {
  status: "EMPTY" | "PLANNED" | "SUBMITTED" | "REMINDER" | "MISSED";
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
}
