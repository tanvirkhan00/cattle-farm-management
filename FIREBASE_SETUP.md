# Smart Cattle Farm – Firebase Setup & Configuration Guide

This guide walks you through setting up **Firebase** (Cloud Firestore, Firebase Authentication, and Cloud Storage) for the **Smart Cattle Farm** application.

---

## 📋 Overview of What We'll Set Up

1. **Firebase Authentication**: Secure login and role-based access for Farm Owner/Manager (**Admin**) and Staff (**Employee**).
2. **Cloud Firestore**: Real-time NoSQL database storing cattle profiles, breeds, feeds, health logs, vaccinations, financials, and tasks.
3. **Cloud Storage**: Secure file hosting for cattle photos and veterinary prescription documents.
4. **Security Rules**: Enforcing role-based access control (RBAC).

---

## Step 1: Create a Free Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Log in with your Google account.
3. Click **"Add project"** (or "Create a project").
4. Enter a project name, e.g., `smart-cattle-farm-bd`.
5. (Optional) You may disable Google Analytics for simplicity, or enable it if desired.
6. Click **"Create project"** and wait a few moments until the project is ready.
7. Click **"Continue"**.

---

## Step 2: Register a Web Application

1. In your project dashboard, click the **Web icon (`</>`)** to add a web app.
2. Enter an app nickname, e.g., `Smart Cattle Farm Web`.
3. Check or leave unchecked "Also set up Firebase Hosting" (you can always deploy to Netlify, Vercel, or Firebase Hosting).
4. Click **"Register app"**.
5. You will see a `firebaseConfig` snippet like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "smart-cattle-farm-bd.firebaseapp.com",
     projectId: "smart-cattle-farm-bd",
     storageBucket: "smart-cattle-farm-bd.firebasestorage.app",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```
6. Keep this open or copy these values — you'll put them in your `.env` file in Step 6.

---

## Step 3: Enable Firebase Authentication

1. In the left sidebar of the Firebase Console, go to **Build** > **Authentication**.
2. Click **"Get started"**.
3. Under the **"Sign-in method"** tab, click **Email/Password**.
4. Turn on the first toggle: **"Enable"** (Email/Password).
5. Click **"Save"**.
6. (Optional) To create your first Admin user manually:
   - Go to the **"Users"** tab inside Authentication.
   - Click **"Add user"**.
   - Enter your email (e.g., `admin@smartcattlefarm.com`) and a strong password.
   - Click **"Add user"**.

---

## Step 4: Enable Cloud Firestore Database

1. In the left sidebar, go to **Build** > **Firestore Database**.
2. Click **"Create database"**.
3. Choose a Database Location:
   - For Bangladesh, choose **`asia-south1` (Mumbai)** or **`asia-southeast1` (Singapore)** for lowest network latency.
4. Choose **"Start in production mode"** (or test mode if developing locally).
5. Click **"Create"**.
6. Deploy Security Rules:
   - Click the **"Rules"** tab in Firestore.
   - Replace the default rules with the contents of [`firestore.rules`](./firestore.rules) located in this project.
   - Click **"Publish"**.

---

## Step 5: Enable Cloud Storage

1. In the left sidebar, go to **Build** > **Storage**.
2. Click **"Get started"**.
3. Choose **"Start in production mode"**.
4. Select the default Cloud Storage location (same region as Firestore).
5. Click **"Done"**.
6. Deploy Storage Security Rules:
   - Click the **"Rules"** tab in Storage.
   - Replace the default rules with the contents of [`storage.rules`](./storage.rules) located in this project.
   - Click **"Publish"**.

---

## Step 6: Configure Environment Variables

1. In the root of your project folder, create or open the `.env` file (you can copy `.env.example`):
   ```bash
   cp .env.example .env
   ```
2. Fill in the values copied from Step 2:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyYourActualKeyFromConsole
   VITE_FIREBASE_AUTH_DOMAIN=smart-cattle-farm-bd.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=smart-cattle-farm-bd
   VITE_FIREBASE_STORAGE_BUCKET=smart-cattle-farm-bd.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456

   VITE_DEFAULT_LANGUAGE=bn
   VITE_FARM_LOCATION=Gazipur
   ```
3. Save the file.
4. Restart your development server:
   ```bash
   npm run dev
   ```

---

## Step 7: Verify Connection in the App

1. Open the application in your browser (e.g., `http://localhost:5173`).
2. Look at the top navigation bar:
   - You should see the **"Firebase Cloud"** indicator with an amber cloud icon.
3. Navigate to **"Settings"** (⚙️) from the sidebar.
4. Under **"Firebase Cloud Platform"**, click **"Test Connection"**.
   - The app will perform an authentic read/write test against Firestore.
   - If configured correctly, it will report: `✓ Connected to Cloud Firestore (Latency: XX ms)`.
5. Click **"Sync to Cloud"**:
   - This automatically seeds all 12 authentic Bangladeshi cattle records, health logs, vaccinations, feed inventory, and transactions to your Firestore database!

---

## 👥 Role-Based Access Control (RBAC)

The system supports two distinct roles:

| Role | Access Level | Permissions |
| :--- | :--- | :--- |
| **Admin** (Farm Owner / Manager) | Full Access | Can add/edit/delete cattle, view & edit financials, manage feed rations, manage settings. |
| **Employee** (Farm Staff / Worker) | Operational Access | Can view cattle, log weights, record daily tasks, view feed schedules, record health observations. Cannot delete cattle or alter financial ledger. |

### How to set roles:
- **In Development/Demo Mode**: Click on your profile avatar in the header to switch between `Admin` and `Employee` mode instantly.
- **In Production with Firebase**: Users created in Firebase Auth have a custom claim `{ role: "admin" }` or `{ role: "employee" }` set via Firebase Admin SDK or Cloud Functions, or can be assigned upon user profile document creation in the `users` collection.

---

## 🔒 Security Best Practices

- **Never commit `.env` with real credentials to a public GitHub repo.**
- The keys in `.env` (`VITE_FIREBASE_*`) are client-side public identifiers for your Firebase project. Real security is strictly enforced by **`firestore.rules`** and **`storage.rules`**, not by hiding client IDs.
- Never expose Firebase Service Account Private Keys (`serviceAccountKey.json`) in the frontend.

---

## 🚀 Deployment (Netlify, Vercel, Firebase Hosting)

When deploying to **Netlify** or **Vercel**:
1. Go to your hosting dashboard -> **Environment variables**.
2. Add all the `VITE_FIREBASE_*` variables defined in your `.env`.
3. Set Build Command: `npm run build`
4. Set Publish Directory: `dist`
5. Deploy!
