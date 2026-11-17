import React, { useState } from 'react';
import { 
  Menu, Search, Globe, Plus, Bell, ShieldCheck, 
  Database, AlertTriangle, X, CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useFarm } from '../../context/FarmContext';
import { isSupabaseConfigured } from '../../services/supabase';

interface HeaderProps {
  onMenuClick: () => void;
  onOpenQuickAction: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick, onOpenQuickAction }) => {
  const { language, setLanguage, t } = useLanguage();
  const { settings, metrics } = useFarm();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-stone-200 px-4 lg:px-6 flex items-center justify-between shadow-soft">
      {/* Left section: Mobile menu & Farm Location info */}
      <div className="flex items-center space-x-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-xl text-stone-600 hover:bg-stone-100 lg:hidden focus:outline-none"
          title="Open Menu"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center space-x-2">
            <h1 className="text-sm font-bold text-stone-800 tracking-tight">
              {settings.farmName}
            </h1>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-100 text-forest-800 border border-forest-200">
              {settings.location.district}, {settings.location.division}
            </span>
          </div>
          <p className="text-[11px] text-stone-500">
            {language === 'bn' 
              ? `মোট জমি: ${settings.totalLandDecimals} শতক | শেড: ${settings.shedAreaSqft} বর্গফুট`
              : `Total Land: ${settings.totalLandDecimals} decimals | Covered Shed: ${settings.shedAreaSqft} sqft`}
          </p>
        </div>
      </div>

      {/* Middle: Seasonal Advisory Pill */}
      <div className="hidden md:flex items-center px-3 py-1.5 rounded-full bg-cream-200 border border-cream-300 text-xs text-stone-700">
        <span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse" />
        <span className="font-semibold text-stone-900 mr-1.5">
          {language === 'bn' ? 'হেমন্ত কাল (Late Autumn):' : 'Late Autumn Season:'}
        </span>
        <span className="text-stone-600">
          {language === 'bn' 
            ? 'পোস্ট-মনসুন কৃমিনাশক ও শীতকালীন বাছুর সুরক্ষা পর্যায়' 
            : 'Post-monsoon deworming & winter calf shelter protocol'}
        </span>
      </div>

      {/* Right controls: Language, Quick Actions, Database state, Profile */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
          className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 transition shadow-xs"
          title="Change Language"
        >
          <Globe size={14} className="text-forest-600" />
          <span>{language === 'bn' ? 'English' : 'বাংলা'}</span>
        </button>

        {/* Quick Action Button */}
        <button
          onClick={onOpenQuickAction}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-forest-700 hover:bg-forest-800 text-white text-xs font-semibold shadow-xs transition active:scale-95"
        >
          <Plus size={15} />
          <span className="hidden sm:inline">{language === 'bn' ? 'দ্রুত এন্ট্রি' : 'Quick Action'}</span>
        </button>

        {/* Database Status indicator */}
        <div 
          className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border bg-stone-50 border-stone-200 text-stone-600"
          title={isSupabaseConfigured ? 'Connected to Supabase PostgreSQL' : 'Operating in Secure Local Persistence Mode'}
        >
          <Database size={13} className={isSupabaseConfigured ? 'text-emerald-600' : 'text-stone-400'} />
          <span>{isSupabaseConfigured ? 'Supabase Sync' : 'Local Mode'}</span>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-stone-600 hover:bg-stone-100 hover:text-stone-900 transition relative"
            title="Notifications"
          >
            <Bell size={18} />
            {(metrics.upcomingVaccinationsCount > 0 || metrics.underTreatmentCattle > 0) && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            )}
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-stone-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  {language === 'bn' ? 'জরুরি খামার নোটিফিকেশন' : 'Farm Notifications'}
                </h4>
                <button onClick={() => setShowNotifications(false)} className="text-stone-400 hover:text-stone-600">
                  <X size={15} />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                {metrics.underTreatmentCattle > 0 && (
                  <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-2">
                    <AlertTriangle size={15} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{metrics.underTreatmentCattle} {language === 'bn' ? 'টি গরু চিকিৎসাধীন' : 'cattle under veterinary care'}</p>
                      <p className="text-[11px] text-amber-700">{language === 'bn' ? 'ওষুধ প্রয়োগ ও দুধ উইথড্রয়াল সময় মেনে চলুন।' : 'Monitor prescribed dosage & milk withdrawal.'}</p>
                    </div>
                  </div>
                )}

                {metrics.upcomingVaccinationsCount > 0 && (
                  <div className="p-2.5 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 flex items-start space-x-2">
                    <CheckCircle2 size={15} className="text-forest-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{metrics.upcomingVaccinationsCount} {language === 'bn' ? 'টি টিকা নির্ধারিত আছে' : 'vaccinations due soon'}</p>
                      <p className="text-[11px] text-forest-700">{language === 'bn' ? 'পোস্ট-মনসুন কৃমিনাশক ক্যাম্পেইন চলমান।' : 'Post-monsoon routine immunization scheduled.'}</p>
                    </div>
                  </div>
                )}

                {metrics.lowStockItemsCount > 0 && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start space-x-2">
                    <AlertTriangle size={15} className="text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{metrics.lowStockItemsCount} {language === 'bn' ? 'টি খাদ্যের স্টক কম' : 'feed items low in stock'}</p>
                      <p className="text-[11px] text-rose-700">{language === 'bn' ? 'ইনভেন্টরি ট্যাব থেকে পুনঃমজুদ করুন।' : 'Restock threshold reached in inventory.'}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* User avatar */}
        <div className="w-8 h-8 rounded-full bg-forest-800 text-white flex items-center justify-center font-bold text-xs ring-2 ring-forest-200">
          TI
        </div>
      </div>
    </header>
  );
};
