# TrainerPlan – Setup & Deployment Guide

This guide walks through configuring Firebase, Gmail SMTP for `aeskills2026@gmail.com`, Google Drive folder permissions, FCM Web Push, and deploying TrainerPlan to production.

---

## 1. Prerequisites
- **Node.js**: v20 or v22
- **Firebase CLI**: Install globally with `npm install -g firebase-tools`
- **Firebase Project**: Created in [Firebase Console](https://console.firebase.google.com/) on the **Blaze (pay-as-you-go)** plan. (Blaze is required for Cloud Functions v2 and outbound network calls to Gmail SMTP and Google Drive).
- **Google Cloud Console**: Enabled APIs on the same project:
  - Cloud Functions API
  - Cloud Scheduler API
  - Cloud Secret Manager API
  - Google Drive API

---

## 2. Firebase Initialization

1. Login to Firebase CLI:
   ```bash
   firebase login
   ```
2. Link your Firebase project in the project root:
   ```bash
   firebase use --add
   # Select your Firebase project and alias it as "default"
   ```
3. Verify that `firebase.json` and `firestore.rules` are in the project root.

---

## 3. Gmail SMTP Setup (Sender: `aeskills2026@gmail.com`)

TrainerPlan uses **Nodemailer** inside Cloud Functions to send branded No-Reply emails (OTP codes, daily 6:00 PM submission reminders, and missed day alerts) using a dedicated Gmail account.

1. Sign in to [Google Account Security](https://myaccount.google.com/security) using **`aeskills2026@gmail.com`**.
2. Enable **2-Step Verification** if not already active.
3. Search for or navigate to **App passwords**:
   - URL: `https://myaccount.google.com/apppasswords`
   - App name: `TrainerPlan`
   - Click **Create**.
4. Copy the generated 16-character password (e.g., `abcd efgh ijkl mnop`).
5. Save the app password in Firebase Secret Manager:
   ```bash
   firebase functions:secrets:set SMTP_APP_PASSWORD
   # Paste the 16-character app password (spaces are automatically ignored)
   ```

---

## 4. Google Drive Photo Storage Setup

TrainerPlan organizes photos automatically into:
```text
AE Trainer
 └── {State}  (UP / UK / Delhi)
      └── {Trainer Name}
           └── {Date, e.g. 2 Nov 2026}
                └── Photos
```

Files are named `{SchoolName}_1.jpg`, `{SchoolName}_2.jpg`, etc.

### Option A: Personal Gmail (`aeskills2026@gmail.com`) via OAuth Refresh Token (Recommended for personal Gmail)

Because Google service accounts do not have their own Drive storage quota, uploads into a personal Gmail folder must be authenticated with an OAuth refresh token belonging to `aeskills2026@gmail.com`.

1. Go to [Google Cloud Console – Credentials](https://console.cloud.google.com/apis/credentials).
2. Ensure you are on your Firebase project.
3. Click **+ Create Credentials** → **OAuth client ID**:
   - Application type: **Desktop app**
   - Name: `TrainerPlan Drive Uploader`
   - Click **Create**.
4. Copy the **Client ID** and **Client Secret**.
5. Set the Client Secret in Firebase Secrets:
   ```bash
   firebase functions:secrets:set GOOGLE_OAUTH_CLIENT_SECRET
   ```
6. Obtain the offline refresh token using the included helper script:
   ```bash
   cd functions
   GOOGLE_OAUTH_CLIENT_ID="your_client_id" GOOGLE_OAUTH_CLIENT_SECRET="your_client_secret" npm run drive:token
   ```
   A browser window will open. Sign in with `aeskills2026@gmail.com` and grant Drive access.
7. Copy the printed refresh token and save it:
   ```bash
   firebase functions:secrets:set GOOGLE_OAUTH_REFRESH_TOKEN
   ```
8. In Google Drive under `aeskills2026@gmail.com`, create a folder named **`AE Trainer`**.
9. Open the folder in your browser and copy its folder ID from the URL (the portion after `/folders/`):
   ```text
   https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsTuVwXyZ
   Folder ID = 1aBcDeFgHiJkLmNoPqRsTuVwXyZ
   ```
10. Put the folder ID into `functions/.env`:
    ```env
    DRIVE_ROOT_FOLDER_ID=1aBcDeFgHiJkLmNoPqRsTuVwXyZ
    DRIVE_AUTH_MODE=oauth
    GOOGLE_OAUTH_CLIENT_ID=your_client_id
    APP_URL=https://your-firebase-project.web.app
    ```

---

## 5. Web Push (FCM) Setup

1. In [Firebase Console](https://console.firebase.google.com/), open **Project Settings** → **Cloud Messaging** tab.
2. Scroll to **Web configuration** → **Web Push certificates**.
3. Click **Generate key pair** and copy the **Key pair** (VAPID key).
4. Paste the VAPID key into `web/.env`:
   ```env
   VITE_FIREBASE_VAPID_KEY=BMx...
   ```

---

## 6. Web Application Configuration

1. In Firebase Console, go to **Project Settings** → **General**.
2. Under **Your apps**, click the web icon (`</>`) to add a Web App.
3. Copy the Firebase configuration parameters into `web/.env`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
   VITE_FIREBASE_APP_ID=1:1234567890:web:...
   VITE_FIREBASE_VAPID_KEY=your_vapid_key
   VITE_FUNCTIONS_REGION=asia-south1
   VITE_USE_EMULATORS=false
   ```

---

## 7. Database Seed (Admin + 6 Trainers)

1. Review and update `seed/trainers.json` with actual trainer details if available.
2. Run the seed script:
   ```bash
   cd seed
   npm install
   # For live Firebase:
   export GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
   npm run seed
   ```
   This initializes:
   - 1 Admin: `aeskills2026@gmail.com`
   - 6 Approved Trainers: 2 for UP, 2 for Delhi, 2 for UK
   - Default settings (`settings/app`) including reminder times.

---

## 8. Deployment

Build the web application and deploy functions, firestore rules, and hosting:

```bash
# 1. Build Cloud Functions
cd functions
npm run build

# 2. Build Web PWA bundle
cd ../web
npm run build

# 3. Deploy everything
cd ..
firebase deploy
```

Once deployed, visit your Firebase Hosting URL (e.g. `https://your-project.web.app`).

---

## 9. Local Development with Emulators

You can develop and test the entire stack locally without touching live data:

1. In `web/.env.development.local`, ensure `VITE_USE_EMULATORS=true`.
2. Start the Firebase emulators:
   ```bash
   firebase emulators:start
   ```
3. Run the seed script against the emulator:
   ```bash
   cd seed
   npm run seed:local
   ```
4. Start the frontend dev server:
   ```bash
   cd web
   npm run dev
   ```
5. Open `http://localhost:5173`. When an OTP is requested, the code is printed to the terminal console where the emulators are running.
