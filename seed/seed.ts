/**
 * Seed script for TrainerPlan:
 *  - Reads seed/trainers.json
 *  - Creates Auth users and assigns custom claims (role, approved)
 *  - Writes Firestore user documents
 *  - Initializes settings/app
 *  - In production mode with Google Drive configured, creates AE Trainer/{State}/{Trainer}
 *
 * Usage:
 *   Against local emulator: npm run seed:local
 *   Against live project:   GOOGLE_APPLICATION_CREDENTIALS=./service-account.json npm run seed
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { initializeApp, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!getApps().length) {
  initializeApp({
    projectId: process.env.GCLOUD_PROJECT || process.env.FIREBASE_PROJECT_ID || "demo-trainerplan",
  });
}

const auth = getAuth();
const db = getFirestore();
db.settings({ ignoreUndefinedProperties: true });

async function seed() {
  console.log("🌱 Starting TrainerPlan database seed...");

  const dataPath = path.join(__dirname, "trainers.json");
  const raw = fs.readFileSync(dataPath, "utf-8");
  const data = JSON.parse(raw);

  const allUsers = [data.admin, ...data.trainers];

  // 1. Initialize Settings
  console.log("⚙️  Configuring default settings/app...");
  await db.collection("settings").doc("app").set(
    {
      stateLinks: {
        UP: "https://new.express.adobe.com",
        UK: "https://new.express.adobe.com",
        Delhi: "https://new.express.adobe.com",
      },
      states: ["UP", "UK", "Delhi"],
      reminderTimes: {
        first: "18:00",
        second: "21:00",
        secondEnabled: false,
      },
      emailRemindersEnabled: true,
      autoApprove: false,
      updatedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  // 2. Create Users
  for (const u of allUsers) {
    const email = u.email.trim().toLowerCase();
    let uid: string;

    try {
      const existing = await auth.getUserByEmail(email);
      uid = existing.uid;
      await auth.updateUser(uid, {
        displayName: u.name,
        disabled: u.status === "Deactivated",
      });
      console.log(`👤 Updated Auth user: ${u.name} (${email}) [${uid}]`);
    } catch {
      const created = await auth.createUser({
        email,
        displayName: u.name,
        emailVerified: true,
      });
      uid = created.uid;
      console.log(`✨ Created Auth user: ${u.name} (${email}) [${uid}]`);
    }

    // Assign custom claims
    await auth.setCustomUserClaims(uid, {
      role: u.role,
      approved: u.status === "Approved",
    });

    // Write Firestore user document
    await db.collection("users").doc(uid).set(
      {
        uid,
        name: u.name,
        email,
        phone: u.phone,
        state: u.state,
        role: u.role,
        status: u.status,
        fcmTokens: [],
        createdAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  console.log(`\n🎉 Seed completed successfully! Created 1 admin and ${data.trainers.length} trainers.`);
  console.log("Admin account:", data.admin.email);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
