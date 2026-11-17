# SMART CATTLE FARM – Farm Intelligence & Management System (Bangladesh)

[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)](https://supabase.com)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?logo=netlify)](https://netlify.com)

A private, intelligent cattle farm business planning, agricultural advisory, veterinary management, and farm operations platform designed specifically for cattle farming in Bangladesh.

---

## 🌾 System Highlights

- **Bilingual Interface:** Instant one-click toggle between **বাংলা (Bengali)** and **English**.
- **Live Herd Metrics:** Real-time statistics on total cattle, sick head, pregnant cows, milking yields, and financial profit/loss computed directly from the active database.
- **AI Farm Business Advisor:** Domain-grounded intelligence answering queries in Bangla/English on 5-25 lakh startup capital models, nutrition, disease risks, and Eid-ul-Adha timing.
- **Strict Veterinary Safety Guardrails:** Adheres to DLS/BVC ethical standards: never auto-diagnoses without professional inspection, flags acute emergencies, and tracks mandatory milk/meat antibiotic withdrawal intervals.
- **Scientific Carrying Capacity Calculator:** Evaluates stocking density based on usable covered floor area (45-50 sqft/head), manger bunk length (2.5 ft/head), ventilation, and drainage gradients, rather than land area alone.
- **2D Farm Layout Visualizer:** Interactive SVG masterplan rendering covered sheds, central feeding lanes, exercise paddocks, isolation quarantine bays, and biogas slurry pits.
- **Seasonal Business Calendar:** Comprehensive coverage of all 6 Bangladesh seasons (*Grishma, Barsha, Sharat, Hemanta, Sheet, Basanta*) plus Eid-ul-Adha demand cycles.
- **Precision Nutrition Engine:** ICAR and BLRI-calibrated Dry Matter (DM), Crude Protein (CP), and TDN ration formulation using locally available ingredients (Napier Pakchong-1, corn silage, paddy straw, wheat bran, mustard cake).
- **Supabase PostgreSQL Schema:** Complete normalized relational schema with Row-Level Security (RLS) policies, triggers, and indices (`supabase/schema.sql`).
- **Resilient Offline/Local Mode:** Operates immediately out-of-the-box with persistent storage and realistic initial herd data, syncing with Supabase PostgreSQL when cloud credentials are provided.

---

## 🏛️ Application Modules

| # | Module | Description |
|---|---|---|
| 1 | **Overview / Dashboard** | High-level metrics, cashflow area charts, weight gain curves, herd health distribution pie charts, and task reminders. |
| 2 | **AI Farm Advisor** | Bilingual conversational assistant citing verified DLS, BLRI, and BAU research bulletins. |
| 3 | **Business Planning** | Compares beef fattening, commercial dairy, heifer breeding, and integrated bio-fertilizer models. |
| 4 | **Seasonal Planner** | 6-Season Bangladesh calendar detailing seasonal diseases, fodder cycles, and Eid buying windows. |
| 5 | **Farm Space Planner** | Calculates bottleneck carrying capacity and visualizes 2D architectural barn zones. |
| 6 | **Cattle Management** | Full CRUD registry with weight history logs, tag IDs, photos, and reproductive status. |
| 7 | **Breed Intelligence** | Verified dossiers on RCC, Pabna, North Bengal Grey, Sahiwal, HF Cross, Brahman Cross, and Deshi. |
| 8 | **Feed & Nutrition** | Individual precision ration balancer computing DM, CP, and TDN fulfillment with daily feed costs. |
| 9 | **Health & Veterinary** | Clinical exam records, vet registrations, prescription history, and food safety withdrawal periods. |
| 10 | **Disease Intelligence** | Epidemiological risk matrix for FMD, LSD, Anthrax, HS, BQ, Babesiosis, Mastitis, and Pneumonia. |
| 11 | **Vaccination Calendar** | DLS immunization schedule with upcoming and overdue booster alerts. |
| 12 | **Purchase Planner** | Liveweight growth projection, feed holding cost simulator, break-even pricing, and Eid ROI analysis. |
| 13 | **Financial Management** | Cashflow ledger, expense category breakdowns, cost per animal, and exportable CSV reports. |
| 14 | **Daily Operations** | Farm worker task rosters across morning, noon, and evening milking/cleaning shifts. |
| 15 | **Inventory** | Feed, silage, and medical stock levels with low-stock threshold warnings. |
| 16 | **Knowledge Center** | Document repository referencing official publications from DLS, BLRI, BAU, DAE, and FAO. |
| 17 | **Reports & Analytics** | Feed cost per liter of milk trends, bull ADG progress, and herd health indices. |
| 18 | **Settings** | Farm profile configurations, land dimensions, and Supabase database connection manager. |

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

## 🗄️ Supabase PostgreSQL Setup

1. Create a project in [Supabase](https://supabase.com).
2. Open the **SQL Editor** in your Supabase project dashboard.
3. Copy the full contents of `supabase/schema.sql` and run the script.
4. Add your project credentials to a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
5. The application will automatically detect your credentials and switch from local persistence to Supabase synchronization.

---

## 🌐 Netlify Deployment

This repository includes a pre-configured `netlify.toml` file with SPA redirection rules.

1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Optional: Configure environment variables in Netlify's **Site settings > Environment variables** (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).

---

## 📚 Official Research References

- **Department of Livestock Services (DLS), Bangladesh** – [dls.gov.bd](https://dls.gov.bd)
- **Bangladesh Livestock Research Institute (BLRI)** – [blri.gov.bd](https://blri.gov.bd)
- **Bangladesh Agricultural University (BAU), Mymensingh** – [bau.edu.bd](https://bau.edu.bd)
- **Food and Agriculture Organization (FAO), Bangladesh** – [fao.org](https://fao.org)
