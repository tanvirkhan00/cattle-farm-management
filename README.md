# SMART CATTLE FARM – Farm Intelligence & Management System (Bangladesh)

[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Firebase](https://img.shields.io/badge/Firebase-13.4-FFCA28?logo=firebase)](https://firebase.google.com)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify)](https://netlify.com)

A private, intelligent cattle farm business planning, agricultural advisory, veterinary management, and farm operations platform designed specifically for cattle farming in Bangladesh. Powered by **Google Firebase** (Cloud Firestore, Authentication, and Cloud Storage).

---

## 🌾 System Highlights

- **Bilingual Interface:** Instant one-click toggle between **বাংলা (Bengali)** and **English**.
- **Firebase Authentication & RBAC:** Role-based access control distinguishing Farm Owner / Manager (**Admin**) from Staff (**Employee**).
- **Cloud Firestore Database:** Real-time synchronization of cattle profiles, veterinary records, feeding rosters, financial transactions, and daily tasks.
- **Firebase Cloud Storage:** Upload and manage cattle profile pictures and veterinary prescription documents.
- **Production-Ready Security Rules:** Granular access controls in `firestore.rules` and `storage.rules`.
- **Live Herd Metrics:** Real-time statistics on total cattle, sick head, pregnant cows, milking yields, and financial profit/loss computed directly from the active database.
- **AI Farm Business Advisor:** Domain-grounded intelligence answering queries in Bangla/English on 5-25 lakh startup capital models, nutrition, disease risks, and Eid-ul-Adha timing.
- **Strict Veterinary Safety Guardrails:** Adheres to DLS/BVC ethical standards: never auto-diagnoses without professional inspection, flags acute emergencies, and tracks mandatory milk/meat antibiotic withdrawal intervals.
- **Scientific Carrying Capacity Calculator:** Evaluates stocking density based on usable covered floor area (45-50 sqft/head), manger bunk length (2.5 ft/head), ventilation, and drainage gradients, rather than land area alone.
- **2D Farm Layout Visualizer:** Interactive SVG masterplan rendering covered sheds, central feeding lanes, exercise paddocks, isolation quarantine bays, and biogas slurry pits.
- **Seasonal Business Calendar:** Comprehensive coverage of all 6 Bangladesh seasons (*Grishma, Barsha, Sharat, Hemanta, Sheet, Basanta*) plus Eid-ul-Adha demand cycles.
- **Precision Nutrition Engine:** ICAR and BLRI-calibrated Dry Matter (DM), Crude Protein (CP), and TDN ration formulation using locally available ingredients (Napier Pakchong-1, corn silage, paddy straw, wheat bran, mustard cake).
- **Resilient Offline/Local Mode:** Operates immediately out-of-the-box with persistent storage and realistic initial herd data, seamlessly syncing with Firebase when cloud credentials are provided.

---

## 🏛️ Application Modules

| # | Module | Description |
|---|---|---|
| 1 | **Overview / Dashboard** | High-level metrics, cashflow area charts, weight gain curves, herd health distribution pie charts, and task reminders. |
| 2 | **AI Farm Advisor** | Bilingual conversational assistant citing verified DLS, BLRI, and BAU research bulletins. |
| 3 | **Business Planning** | Compares beef fattening, commercial dairy, heifer breeding, and integrated bio-fertilizer models. |
| 4 | **Seasonal Planner** | 6-Season Bangladesh calendar detailing seasonal diseases, fodder cycles, and Eid buying windows. |
| 5 | **Farm Space Planner** | Calculates bottleneck carrying capacity and visualizes 2D architectural barn zones. |
| 6 | **Cattle Management** | Full CRUD registry with weight history logs, tag IDs, cloud photos, and reproductive status. |
| 7 | **Breed Intelligence** | Verified dossiers on RCC, Pabna, North Bengal Grey, Sahiwal, HF Cross, Brahman Cross, and Deshi. |
| 8 | **Feed & Nutrition** | Individual precision ration balancer computing DM, CP, and TDN fulfillment with daily feed costs. |
| 9 | **Health & Veterinary** | Clinical exam records, vet registrations, prescription cloud documents, and food safety withdrawal periods. |
| 10 | **Disease Intelligence** | Epidemiological risk matrix for FMD, LSD, Anthrax, HS, BQ, Babesiosis, Mastitis, and Pneumonia. |
| 11 | **Vaccination Calendar** | DLS immunization schedule with upcoming and overdue booster alerts. |
| 12 | **Purchase Planner** | Liveweight growth projection, feed holding cost simulator, break-even pricing, and Eid ROI analysis. |
| 13 | **Financial Management** | Cashflow ledger, expense category breakdowns, cost per animal, and exportable CSV reports. |
| 14 | **Daily Operations** | Farm worker task rosters across morning, noon, and evening milking/cleaning shifts. |
| 15 | **Inventory** | Feed, silage, and medical stock levels with low-stock threshold warnings. |
| 16 | **Knowledge Center** | Document repository referencing official publications from DLS, BLRI, BAU, DAE, and FAO. |
| 17 | **Reports & Analytics** | Feed cost per liter of milk trends, bull ADG progress, and herd health indices. |
| 18 | **Settings** | Farm profile configurations, land dimensions, and Firebase Cloud diagnostics and sync manager. |

---

## 🚀 Quick Start Guide

### 1. Installation
```bash
# Clone the repository and install dependencies
npm install
```

### 2. Run Locally in Development Mode
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
Compiled static assets are generated in `dist/`.

---

## 🔥 Firebase Cloud Setup

Detailed step-by-step instructions are available in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

### Quick Summary:
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password).
3. Create a **Cloud Firestore** database (select `asia-south1` or `asia-southeast1`).
4. Enable **Cloud Storage** for cattle pictures and prescriptions.
5. Deploy `firestore.rules` and `storage.rules`.
6. Add your web app credentials to `.env`:
   ```env
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=your-cattle-farm.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-cattle-farm
   VITE_FIREBASE_STORAGE_BUCKET=your-cattle-farm.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   ```
7. Open **Settings** in the app and click **"Test Connection"** and **"Sync to Cloud"**.

---

## 🌐 Netlify Deployment

This repository includes a pre-configured `netlify.toml` file with SPA redirection rules.

1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Configure environment variables in Netlify's **Site configuration > Environment variables** (`VITE_FIREBASE_*`).

---

## 📄 License & Attribution

Designed specifically for cattle farmers, veterinary surgeons, and agricultural advisors in Bangladesh.
Research citations include Bangladesh Livestock Research Institute (BLRI), Department of Livestock Services (DLS), and Bangladesh Agricultural University (BAU).
