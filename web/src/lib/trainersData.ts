import { AppUser, AppSettings, AssignedSchool } from "../types";
import rawTrainers from "./extractedTrainers.json";
import customTrainers from "./customTrainers.json";

export type { AssignedSchool };


export const DEFAULT_ADMIN_USER: AppUser = {
  uid: "admin_1",
  name: "System Administrator",
  email: "admin@trainerplan.com",
  phone: "+919876543210",
  state: "Delhi",
  role: "admin",
  status: "Approved",
  createdAt: { seconds: Math.floor(Date.now() / 1000) },
};

export const INITIAL_TRAINERS: AppUser[] = [
  ...rawTrainers.map((t) => ({
    uid: t.uid,
    name: t.name,
    email: t.email,
    password: `${t.name.toLowerCase().replace(/[^a-z0-9]/g, "")}123`,
    phone: t.phone,
    state: t.state,
    role: "trainer" as const,
    status: "Approved" as const,
    assignedSchools: t.schools as any,
    createdAt: { seconds: Math.floor(Date.now() / 1000) },
  })),
  ...customTrainers.map((t: any) => ({
    uid: t.uid || `u_${t.email?.replace(/[^a-z0-9]/g, "_")}`,
    name: t.name,
    email: t.email,
    password: t.password || `${(t.name || "trainer").toLowerCase().replace(/[^a-z0-9]/g, "")}123`,
    phone: t.phone || "",
    state: t.state || "UP",
    role: (t.role || "trainer") as any,
    status: (t.status || "Approved") as any,
    assignedSchools: t.schools || [],
    createdAt: t.createdAt || { seconds: Math.floor(Date.now() / 1000) },
  })),
];

export const DEFAULT_SETTINGS: AppSettings = {
  stateLinks: {
    UP: "https://new.express.adobe.com/gallery/urn:aaid:sc:AP:6e62f80d-2347-4ecc-b1cc-fa106d97113e?accept=true&invite=true",
    Delhi: "https://new.express.adobe.com/gallery/urn:aaid:sc:AP:6e62f80d-2347-4ecc-b1cc-fa106d97113e?accept=true&invite=true",
    UK: "https://new.express.adobe.com/gallery/urn:aaid:sc:AP:6e62f80d-2347-4ecc-b1cc-fa106d97113e?accept=true&invite=true",
  },
  driveLinks: {
    UP: "https://drive.google.com/drive/folders/1XISxYlTtcbOOtL3zMM27BsVZFv0zZ9Zt?usp=drive_link",
    Delhi: "https://drive.google.com/drive/folders/1tLXE5QQ-OMbW0GovbGnFDQf7iNswNiz3?usp=drive_link",
    UK: "https://drive.google.com/drive/folders/1Ef6U5bfCbJw5Vw7uZB4Vu8VxopOpR_ks?usp=sharing",
  },
  activitySheetLinks: {
    Delhi: "https://docs.google.com/spreadsheets/d/1DLLKjvoUoo0DO45w3EZJGMBQfJfUztDY4W8tfNnr2uw/edit?usp=sharing",
    UP: "https://docs.google.com/spreadsheets/d/1Em3sqjwpjDO-dLffBrdNL5GDB3GxU3UBPMW5Qs3w3a8/edit?usp=drivesdk",
    UK: "https://docs.google.com/spreadsheets/d/1lSU9ZybieHdrja7jgcHETfouwvraljRQJm50lBI4EJU/edit?usp=drive_link",
  },
  states: ["UP", "UK", "Delhi"],
  reminderTimes: { first: "18:00", second: "21:00", secondEnabled: false },
  emailRemindersEnabled: true,
  autoApprove: false,
};
