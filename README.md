# TrainerPlan – Field Trainer Scheduler & Visit Tracker
**Official Web Application — Owned & Maintained by AESkills Foundation**

A fast, smooth, mobile-first web app and installable PWA designed for field trainers conducting daily school visits across UP, UK, and Delhi.

---

## Key Highlights

- **Mobile-First PWA**: Installable on Android & iOS home screens with offline caching and Web Push notifications.
- **Custom Email OTP Auth**: Serverless 6-digit cryptographic OTP sent via Gmail SMTP with custom Firebase auth tokens and 30-day persistent sessions. No SMS or Phone auth required.
- **Interactive Calendar**: Color-coded month grid (Empty, Planned, Submitted, Reminder ⚠, Missed) with today highlight and past-date locking.
- **Step 1 Morning Plan**: Dynamic 1–10 school container cards with target student counts, instantly turning the calendar cell light purple.
- **Step 2 Daily Submission**: Students trained recording, client-side photo compression, direct-to-Google Drive uploads with progress tracking, state Adobe Express gallery links, and locked submission.
- **Automated Google Drive Organization**: Creates nested folder structures: `AE Trainer/{State}/{Trainer Name}/{Date}/Photos` with numbered naming (`{School}_1.jpg`, `{School}_2.jpg`).
- **Automated Reminders & Missed Logic**: Cloud Scheduler triggers automated 6:00 PM IST reminders and marks unsubmitted visits as Missed at 12:00 AM IST.
- **Full Admin Panel**: Analytics dashboards, trainer approvals, status overrides (fixing missed days), Excel (.xlsx) / CSV export with SheetJS, and system audit logs.

---

## Tech Stack

- **Frontend**: React 18, Vite 6, TypeScript, Tailwind CSS v4, Framer Motion, TanStack Query, date-fns, Lucide Icons, Sonner, SheetJS (`xlsx`), Recharts.
- **Backend / Database**: Firebase (Firestore, Cloud Functions v2 in `asia-south1`, Cloud Scheduler, FCM).
- **Email Service**: Nodemailer inside Cloud Functions with an `EmailService` swappable interface (configured with `aeskills2026@gmail.com`).
- **File Storage**: Google Drive API v3 via personal Gmail OAuth loopback refresh token or service account.

---

## Project Structure

```text
Trainer Scheduler/
├── docs/
│   └── SETUP.md                 # Full Firebase, Gmail App Password, Drive, FCM & deployment guide
├── firebase.json                # Firebase emulators, Firestore, Functions & Hosting setup
├── firestore.rules              # Security rules: role-based access, 30-day freshness, IST validations
├── firestore.indexes.json       # Composite query indexes
│
├── web/                         # React + Vite PWA frontend
│   ├── src/
│   │   ├── components/          # UI kit, Calendar, Visit cards, App layout
│   │   ├── hooks/               # useAuth, useTheme, usePushNotifications, useAutosaveDraft
│   │   ├── lib/                 # firebase, dates (IST), imageCompress, idb (drafts)
│   │   ├── pages/
│   │   │   ├── auth/            # Login (OTP), Register, PendingApproval
│   │   │   ├── trainer/         # CalendarPage, VisitPage, NotificationsPage, ProfilePage
│   │   │   └── admin/           # Dashboard, Trainers, Visits, Settings, Export, Logs
│   │   ├── services/            # authApi, visitsApi, adminApi, notificationsApi
│   │   └── sw.ts                # Service Worker: Workbox precaching & FCM background push
│   └── public/icons/            # Generated PWA icons (192, 512, maskable, apple-touch, badge)
│
├── functions/                   # Cloud Functions v2 (Node 22, TS, region: asia-south1)
│   ├── src/
│   │   ├── auth/                # requestOtp, verifyOtp, registerTrainer
│   │   ├── drive/               # DriveService, folder auto-creator, uploadPhoto, deletePhoto
│   │   ├── email/               # Nodemailer Gmail sender, EmailService interface & HTML templates
│   │   ├── scheduler/           # reminderTick (every 10m) & missedJob (00:05 IST)
│   │   ├── visits/              # submitVisit transactional lock
│   │   └── admin/               # user management, status overrides, manual job triggers
│   └── scripts/
│       └── get-drive-token.mjs  # Loopback script to acquire Drive OAuth refresh token
│
└── seed/
    ├── trainers.json            # 1 Admin + 6 Trainers template across UP, UK, Delhi
    └── seed.ts                  # Database seeder script
```

---

## Quickstart (Local Dev with Emulators)

1. **Install dependencies:**
   ```bash
   cd functions && npm install
   cd ../web && npm install
   cd ../seed && npm install
   ```

2. **Run tests & verification:**
   ```bash
   # Test cloud functions
   cd functions && npm test
   # Test web build
   cd ../web && npm run build
   ```

3. **Start Firebase Emulators:**
   ```bash
   cd ..
   firebase emulators:start
   ```

4. **Seed database (in another terminal):**
   ```bash
   cd seed
   npm run seed:local
   ```

5. **Start Web Dev Server:**
   ```bash
   cd web
   npm run dev
   ```
   Open `http://localhost:5173`. When requesting an OTP, the 6-digit code will appear in your Functions emulator console log!

---

## Deployment & Credentials

For full production deployment, setting up the Gmail App Password for `aeskills2026@gmail.com`, Google Drive folder permissions, and FCM Web Push, read [docs/SETUP.md](docs/SETUP.md).

---

© 2026 AESkills Foundation. All rights reserved.
