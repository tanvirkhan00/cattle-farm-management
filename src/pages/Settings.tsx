import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, Database, CheckCircle2, 
  AlertTriangle, RotateCcw, Copy, ExternalLink, 
  Save, ShieldCheck, MapPin, Building2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { isSupabaseConfigured } from '../services/supabase';

export const SettingsPage: React.FC = () => {
  const { language } = useLanguage();
  const { settings, updateSettings, resetDemoData } = useFarm();

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
  const [copiedSql, setCopiedSql] = useState(false);

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

  const handleCopySchemaNotice = () => {
    setCopiedSql(true);
    navigator.clipboard?.writeText('-- Run supabase/schema.sql in your Supabase SQL Editor');
    setTimeout(() => setCopiedSql(false), 2000);
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
              {language === 'bn' ? 'খামার সেটিংস ও সুপাবেস ডাটাবেস সংযোগ' : 'Farm Settings & Supabase Database Sync'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'খামারের অবস্থান, শেডের আয়তন, জমির হিসাব এবং সুপাবেস (Supabase PostgreSQL) সংযোগ ব্যবস্থাপনা।'
                : 'Configure farm parameters, land holdings, and Supabase PostgreSQL integration.'}
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

        {/* Right 5 Cols: Supabase PostgreSQL & Demo Data Engine */}
        <div className="lg:col-span-5 space-y-5">
          {/* Supabase Status Card */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
                <Database size={16} className="text-forest-700" />
                <span>Supabase PostgreSQL Integration</span>
              </h3>

              {isSupabaseConfigured ? (
                <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Connected
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full font-bold text-[10px] bg-stone-100 text-stone-700 border border-stone-200">
                  Local Storage Mode
                </span>
              )}
            </div>

            <p className="text-stone-600 leading-relaxed">
              {isSupabaseConfigured
                ? (language === 'bn' ? 'সুপাবেস পোস্টগ্রেস ডেটাবেস সফলভাবে সংযুক্ত রয়েছে।' : 'Your app is actively synchronizing with Supabase PostgreSQL.')
                : (language === 'bn' 
                    ? 'বর্তমানে অ্যাপটি ব্রাউজারের স্থানীয় নির্ভরযোগ্য ডেটাবেস মডেলে চলছে। রিয়েলটাইম মাল্টি-ইউজার সিঙ্কের জন্য আপনার `.env` ফাইলে Supabase প্রজেক্ট ক্রেডেনশিয়াল যুক্ত করতে পারেন।'
                    : 'The app is running in resilient local persistence mode. To connect your cloud database, supply VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.')}
            </p>

            {/* Supabase SQL Instructions */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-800 text-[11px]">Database Schema Migration</span>
                <button
                  onClick={handleCopySchemaNotice}
                  className="text-forest-700 hover:text-forest-900 font-semibold flex items-center space-x-1"
                >
                  <Copy size={12} />
                  <span>{copiedSql ? 'Copied' : 'schema.sql'}</span>
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                All 18 tables, RLS policies, and indexes are prepared in <code className="px-1 py-0.5 rounded bg-stone-200 text-stone-800">supabase/schema.sql</code>.
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
