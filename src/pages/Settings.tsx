import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Database, CheckCircle2, 
  AlertTriangle, RotateCcw, Copy, ExternalLink, 
  Save, ShieldCheck, MapPin, Building2, Cloud,
  RefreshCw, Lock, Key, Check, Users
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { useAuth } from '../context/AuthContext';
import { isFirebaseConfigured, testFirebaseConnection } from '../services/firebase';
import { syncAllLocalDataToFirestore } from '../services/firestoreService';

export const SettingsPage: React.FC = () => {
  const { language } = useLanguage();
  const { settings, updateSettings, resetDemoData, cattleList, healthRecords, vaccinations, transactions, tasks, feedInventory } = useFarm();
  const { currentUser, role, switchDemoRole } = useAuth();

  const [farmName, setFarmName] = useState(settings.farmName);
  const [ownerName, setOwnerName] = useState(settings.ownerName);
  const [phone, setPhone] = useState(settings.phone);
  const [district, setDistrict] = useState(settings.location.district);
  const [upazila, setUpazila] = useState(settings.location.upazila);
  const [totalLand, setTotalLand] = useState(settings.totalLandDecimals.toString());
  const [shedArea, setShedArea] = useState(settings.shedAreaSqft.toString());
  const [fodderLand, setFodderLand] = useState(settings.fodderLandDecimals.toString());
  const [businessModel, setBusinessModel] = useState(settings.primaryBusinessModel);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string; latencyMs?: number } | null>(null);

  const [syncingData, setSyncingData] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [copiedRules, setCopiedRules] = useState<'firestore' | 'storage' | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      farmName,
      ownerName,
      phone,
      totalLandDecimals: parseFloat(totalLand) || 30,
      shedAreaSqft: parseFloat(shedArea) || 3000,
      fodderLandDecimals: parseFloat(fodderLand) || 20,
      primaryBusinessModel: businessModel as any,
      location: {
        ...settings.location,
        district,
        upazila
      }
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setTestResult(null);
    try {
      const res = await testFirebaseConnection();
      setTestResult(res);
    } catch (err: any) {
      setTestResult({
        success: false,
        message: err?.message || 'Connection test encountered an error.'
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSyncToFirestore = async () => {
    if (!isFirebaseConfigured) {
      alert(language === 'bn' 
        ? 'ফায়ারবেস এখনও কনফিগার করা হয়নি। আপনার .env ফাইলে Firebase ক্রেডেনশিয়াল যোগ করুন।' 
        : 'Firebase is not yet configured. Add your Firebase credentials to your .env file.');
      return;
    }

    setSyncingData(true);
    setSyncResult(null);
    try {
      const res = await syncAllLocalDataToFirestore({
        settings,
        cattleList,
        healthRecords,
        vaccinations,
        transactions,
        tasks,
        feedInventory
      });

      if (res.success) {
        setSyncResult(language === 'bn' ? 'সব খামার ডেটা সফলভাবে ক্লাউড ফায়ারস্টোরে সিঙ্ক হয়েছে!' : 'All farm data successfully uploaded to Cloud Firestore!');
      } else {
        setSyncResult(language === 'bn' ? `সিঙ্ক ব্যর্থ: ${res.error}` : `Sync failed: ${res.error}`);
      }
    } catch (err: any) {
      setSyncResult(err.message || 'Sync error');
    } finally {
      setSyncingData(false);
    }
  };

  const copyFirestoreRules = () => {
    navigator.clipboard?.writeText(`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Direct Access Mode (No Login Required)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}`);
    setCopiedRules('firestore');
    setTimeout(() => setCopiedRules(null), 2000);
  };

  const copyStorageRules = () => {
    navigator.clipboard?.writeText(`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Direct Access Mode (No Login Required)
    match /{allPaths=**} {
      allow read, write: if request.resource.size < 15 * 1024 * 1024;
    }
  }
}`);
    setCopiedRules('storage');
    setTimeout(() => setCopiedRules(null), 2000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
              <SettingsIcon size={14} />
              <span>{language === 'bn' ? 'খামার প্রোফাইল ও ক্লাউড কনফিগারেশন' : 'Farm Profile & Cloud Configuration'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'bn' ? 'খামার সেটিংস ও ফায়ারবেস ক্লাউড ইন্টিগ্রেশন' : 'Farm Settings & Firebase Cloud Integration'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'খামারের অবস্থান, শেডের আয়তন, জমির হিসাব এবং ফায়ারবেস (Cloud Firestore, Auth & Storage) সংযোগ ব্যবস্থাপনা।'
                : 'Configure farm parameters, land holdings, Firebase Cloud Firestore, Authentication, and Storage.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Farm Profile Settings Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-soft space-y-5">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
              <Building2 size={16} className="text-forest-700" />
              <span>{language === 'bn' ? 'খামার ও মালিকের সাধারণ তথ্য' : 'Farm & Ownership Profile'}</span>
            </h3>
            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 flex items-center space-x-1">
                <CheckCircle2 size={14} />
                <span>{language === 'bn' ? 'সংরক্ষিত হয়েছে' : 'Saved'}</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'খামারের নাম' : 'Farm Name'}
                </label>
                <input
                  type="text"
                  value={farmName}
                  onChange={e => setFarmName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'মালিক / পরিচালকের নাম' : 'Owner / Manager Name'}
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={e => setOwnerName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-semibold text-stone-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'মোবাইল নম্বর' : 'Phone Number'}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'জেলা' : 'District'}
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'উপজেলা' : 'Upazila'}
                </label>
                <input
                  type="text"
                  value={upazila}
                  onChange={e => setUpazila(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-stone-100">
              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'মোট জমি (শতক)' : 'Total Land (Decimals)'}
                </label>
                <input
                  type="number"
                  value={totalLand}
                  onChange={e => setTotalLand(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'শেড এলাকা (বর্গফুট)' : 'Covered Shed (sq ft)'}
                </label>
                <input
                  type="number"
                  value={shedArea}
                  onChange={e => setShedArea(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-semibold mb-1">
                  {language === 'bn' ? 'ঘাসের জমি (শতক)' : 'Fodder Land (Decimals)'}
                </label>
                <input
                  type="number"
                  value={fodderLand}
                  onChange={e => setFodderLand(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-stone-700 font-semibold mb-1">
                {language === 'bn' ? 'প্রধান ব্যবসায়িক উদ্দেশ্য' : 'Primary Business Model'}
              </label>
              <select
                value={businessModel}
                onChange={e => setBusinessModel(e.target.value as any)}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-semibold"
              >
                <option value="integrated">Integrated Farm (সমন্বিত ডেইরি ও ষাঁড় মোটাতাজাকরণ)</option>
                <option value="beef_fattening">Beef Fattening (কুরবানি ষাঁড় মোটাতাজাকরণ)</option>
                <option value="dairy">Commercial Dairy (বাণিজ্যিক দুগ্ধ উৎপাদন)</option>
                <option value="breeding">Breeding & Seedstock (উন্নত বাছুর প্রজনন)</option>
              </select>
            </div>

            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-2xl bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs shadow-xs transition flex items-center space-x-1.5"
              >
                <Save size={15} />
                <span>{language === 'bn' ? 'সেটিংস সংরক্ষণ করুন' : 'Save Farm Settings'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right 5 Cols: Firebase Cloud Suite & Security Rules */}
        <div className="lg:col-span-5 space-y-5">
          {/* Firebase Suite Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
                <Cloud size={16} className="text-amber-500" />
                <span>Firebase Cloud Platform</span>
              </h3>

              {isFirebaseConfigured ? (
                <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                  <CheckCircle2 size={11} />
                  <span>Configured</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-stone-100 text-stone-700 border border-stone-200">
                  Local Storage Mode
                </span>
              )}
            </div>

            <p className="text-stone-600 leading-relaxed">
              {isFirebaseConfigured
                ? (language === 'bn'
                    ? 'ফায়ারবেস ক্লাউড ফায়ারস্টোর, অথেনটিকেশন ও স্টোরেজ কনফিগারেশন অ্যাক্টিভ আছে।'
                    : 'Your app has Firebase credentials configured for Cloud Firestore, Auth, and Storage.')
                : (language === 'bn' 
                    ? 'বর্তমানে অ্যাপটি নির্ভরযোগ্য লোকাল মোডে চলছে। আপনার ক্লাউড ডাটাবেস ও স্টোরেজ সক্রিয় করতে `.env` ফাইলে Firebase ক্রেডেনশিয়াল যুক্ত করুন।'
                    : 'The app is running in resilient local storage mode. To activate real-time sync and cloud file uploads, provide your Firebase keys in .env.')}
            </p>

            {/* Test Connection Button & Status */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800 text-[11px]">
                  {language === 'bn' ? 'সংযোগ পরীক্ষা (Live Test)' : 'Connectivity Diagnostics'}
                </span>
                <button
                  onClick={handleTestConnection}
                  disabled={testingConnection}
                  className="px-3 py-1 rounded-xl bg-forest-700 hover:bg-forest-800 disabled:opacity-50 text-white font-semibold text-[11px] flex items-center space-x-1 shadow-xs transition"
                >
                  <RefreshCw size={11} className={testingConnection ? 'animate-spin' : ''} />
                  <span>{testingConnection ? (language === 'bn' ? 'পরীক্ষা চলছে...' : 'Testing...') : (language === 'bn' ? 'কানেকশন টেস্ট' : 'Test Connection')}</span>
                </button>
              </div>

              {testResult && (
                <div className={`p-2.5 rounded-xl border text-[11px] ${
                  testResult.success 
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="flex items-start space-x-1.5">
                    {testResult.success ? (
                      <CheckCircle2 size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={14} className="text-rose-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{testResult.message}</p>
                      {testResult.latencyMs !== undefined && (
                        <p className="text-[10px] text-emerald-700 mt-0.5">Response latency: {testResult.latencyMs}ms</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cloud Sync Button */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-800 text-[11px] block">
                    {language === 'bn' ? 'লোকাল ডেটা ফায়ারস্টোরে আপলোড' : 'Push Local Data to Firestore'}
                  </span>
                  <span className="text-[10px] text-stone-500">
                    {cattleList.length} cattle, {transactions.length} tx, {healthRecords.length} health logs
                  </span>
                </div>
                <button
                  onClick={handleSyncToFirestore}
                  disabled={syncingData}
                  className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold text-[11px] flex items-center space-x-1 shadow-xs transition"
                >
                  <Database size={12} className={syncingData ? 'animate-spin' : ''} />
                  <span>{syncingData ? (language === 'bn' ? 'সিঙ্ক হচ্ছে...' : 'Syncing...') : (language === 'bn' ? 'ক্লাউড সিঙ্ক' : 'Sync to Cloud')}</span>
                </button>
              </div>

              {syncResult && (
                <p className="text-[11px] text-forest-800 bg-forest-50 p-2 rounded-xl border border-forest-200 font-medium">
                  {syncResult}
                </p>
              )}
            </div>

            {/* Security Rules Export */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500 font-medium">Security Rules:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={copyFirestoreRules}
                  className="text-[10px] font-semibold text-stone-600 hover:text-forest-700 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-lg border border-stone-200 flex items-center space-x-1 transition"
                >
                  {copiedRules === 'firestore' ? <Check size={10} className="text-emerald-600" /> : <Copy size={10} />}
                  <span>{copiedRules === 'firestore' ? 'Copied' : 'firestore.rules'}</span>
                </button>
                <button
                  onClick={copyStorageRules}
                  className="text-[10px] font-semibold text-stone-600 hover:text-forest-700 bg-stone-100 hover:bg-stone-200 px-2 py-1 rounded-lg border border-stone-200 flex items-center space-x-1 transition"
                >
                  {copiedRules === 'storage' ? <Check size={10} className="text-emerald-600" /> : <Copy size={10} />}
                  <span>{copiedRules === 'storage' ? 'Copied' : 'storage.rules'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Current Auth & Access Mode Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
                <ShieldCheck size={16} className="text-forest-700" />
                <span>{language === 'bn' ? 'সিস্টেম এক্সেস মোড' : 'System Access Mode'}</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider bg-forest-100 text-forest-800 border border-forest-200">
                {language === 'bn' ? 'সরাসরি এক্সেস (Direct Access)' : 'Direct Access'}
              </span>
            </div>

            <p className="text-stone-600 leading-relaxed">
              {language === 'bn' 
                ? 'বর্তমানে কোনো লগইন বাধ্যবাধকতা ছাড়া সরাসরি মালিক/ম্যানেজার মোডে সিস্টেমের সকল ফিচার (গবাদিপশু ব্যবস্থাপনা, ওজন ট্র্যাকিং, আর্থিক হিসাব ও এআই অ্যাডভাইজার) সম্পূর্ণ উন্মুক্ত রয়েছে।' 
                : 'The system is running in frictionless direct access mode. All 18 modules (cattle inventory, weight logs, financials, AI advisor, and veterinary records) are fully unlocked with Owner/Admin permissions.'}
            </p>

            <div className="p-3 rounded-2xl bg-forest-50/60 border border-forest-200 text-forest-900 text-[11px] space-y-1">
              <span className="font-bold block">
                {language === 'bn' ? 'লগইন সিস্টেমের অবস্থা:' : 'Authentication Status:'}
              </span>
              <p className="text-forest-800 leading-relaxed text-[10px]">
                {language === 'bn'
                  ? 'ফায়ারবেস অথেনটিকেশন ও রোল-ভিত্তিক এক্সেস কোডবেসে প্রস্তুত রাখা হয়েছে। পরবর্তীতে প্রয়োজন অনুসারে লগইন গেটওয়ে সক্রিয় করা যাবে।'
                  : 'Firebase Authentication with Role-Based Access Control is pre-built in the codebase and can be connected whenever you decide to activate it.'}
              </p>
            </div>
          </div>

          {/* Reset Demo Data Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-3 text-xs">
            <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
              <RotateCcw size={16} className="text-amber-600" />
              <span>{language === 'bn' ? 'ডেমো ডেটা রিস্টোর' : 'Restore Authentic Sample Data'}</span>
            </h3>
            <p className="text-stone-600 leading-relaxed">
              {language === 'bn'
                ? 'বাস্তবসম্মত ১২টি গরু, ওজন বৃদ্ধির চার্ট, প্রেসক্রিপশন ও হিসাবের ডেমো ডাটাবেসে ফেরত যান।'
                : 'Reset your system back to the rich initial demo dataset containing authentic Bangladesh breeds, weight history, and veterinary logs.'}
            </p>
            <button
              onClick={() => {
                if (window.confirm(language === 'bn' ? 'আপনি কি ডেমো ডাটাবেস রিস্টোর করতে চান?' : 'Restore default demo cattle records?')) {
                  resetDemoData();
                  alert(language === 'bn' ? 'ডেমো ডেটা সফলভাবে রিস্টোর হয়েছে!' : 'Demo data restored!');
                }
              }}
              className="px-4 py-2 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 font-semibold transition"
            >
              {language === 'bn' ? 'ডিফল্ট ডেমো ডেটা রিস্টোর করুন' : 'Restore Demo Records'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
