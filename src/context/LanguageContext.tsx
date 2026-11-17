import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, { en: string; bn: string }> = {
  // Navigation items (Section 7)
  'nav.overview': { en: 'Overview', bn: 'ড্যাশবোর্ড ওভারভিউ' },
  'nav.ai_advisor': { en: 'AI Farm Advisor', bn: 'এআই খামার উপদেষ্টা' },
  'nav.business_planning': { en: 'Business Planning', bn: 'ব্যবসায়িক পরিকল্পনা' },
  'nav.seasonal_planner': { en: 'Seasonal Planner', bn: 'মৌসুমি ক্যালেন্ডার' },
  'nav.space_planner': { en: 'Farm Space Planner', bn: 'শেড ও স্থান পরিকল্পনা' },
  'nav.cattle_management': { en: 'Cattle Management', bn: 'গবাদিপশু ব্যবস্থাপনা' },
  'nav.breed_intelligence': { en: 'Breed Intelligence', bn: 'জাত পরিচিতি ও নির্দেশিকা' },
  'nav.feed_nutrition': { en: 'Feed & Nutrition', bn: 'খাদ্য ও পুষ্টি ব্যবস্থাপনা' },
  'nav.health_veterinary': { en: 'Health & Veterinary', bn: 'চিকিৎসা ও স্বাস্থ্য রেকর্ড' },
  'nav.disease_intelligence': { en: 'Disease Intelligence', bn: 'রোগবালাই তথ্যভাণ্ডার' },
  'nav.vaccination_calendar': { en: 'Vaccination Calendar', bn: 'টিকা ও কৃমিনাশক ক্যালেন্ডার' },
  'nav.purchase_planner': { en: 'Purchase Planner', bn: 'ক্রয় ও লাভজনকতা গণক' },
  'nav.financial_management': { en: 'Financial Management', bn: 'আর্থিক হিসাব ও ক্যাশফ্লো' },
  'nav.daily_operations': { en: 'Daily Operations', bn: 'দৈনিক খামার রুটিন' },
  'nav.inventory': { en: 'Inventory', bn: 'খাদ্য ও ওষুধ মজুদ' },
  'nav.knowledge_center': { en: 'Knowledge Center', bn: 'সরকারি নির্দেশিকা ও গবেষণা' },
  'nav.reports_analytics': { en: 'Reports & Analytics', bn: 'প্রতিবেদন ও অ্যানালিটিক্স' },
  'nav.settings': { en: 'Settings', bn: 'খামার সেটিংস ও সুপাবেস' },

  // Common UI
  'common.appName': { en: 'Smart Cattle Farm', bn: 'স্মার্ট ক্যাটেল ফার্ম' },
  'common.tagline': { en: 'Farm Intelligence & Management System', bn: 'খামার বুদ্ধিমত্তা ও ব্যবস্থাপনা প্ল্যাটফর্ম' },
  'common.save': { en: 'Save', bn: 'সংরক্ষণ করুন' },
  'common.cancel': { en: 'Cancel', bn: 'বাতিল' },
  'common.delete': { en: 'Delete', bn: 'মুছে ফেলুন' },
  'common.edit': { en: 'Edit', bn: 'সম্পাদনা' },
  'common.add': { en: 'Add New', bn: 'নতুন যোগ করুন' },
  'common.search': { en: 'Search...', bn: 'অনুসন্ধান করুন...' },
  'common.filter': { en: 'Filter', bn: 'ফিল্টার' },
  'common.all': { en: 'All', bn: 'সকল' },
  'common.status': { en: 'Status', bn: 'অবস্থা' },
  'common.date': { en: 'Date', bn: 'তারিখ' },
  'common.actions': { en: 'Actions', bn: 'পদক্ষেপ' },
  'common.verified': { en: 'Verified Source', bn: 'যাচাইকৃত তথ্যসূত্র' },
  'common.bdt': { en: 'BDT', bn: 'টাকা' }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('scf_lang') as Language) || 'bn';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('scf_lang', lang);
  };

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en;
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
