import React, { useState } from 'react';
import { 
  ShieldAlert, Search, Filter, AlertTriangle, 
  CheckCircle2, BookOpen, ChevronRight, Activity, 
  Syringe, Clock, Flame, Droplets, Info 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { DISEASES_DATABASE } from '../data/diseasesData';
import { Disease, BangladeshSeason, DiseaseRiskLevel } from '../types';

export const DiseaseIntelligence: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [seasonFilter, setSeasonFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedDisease, setSelectedDisease] = useState<Disease>(DISEASES_DATABASE[0]);

  const filteredDiseases = DISEASES_DATABASE.filter(dis => {
    const matchesSearch = 
      dis.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dis.nameBn.includes(searchTerm) ||
      dis.code.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeason = seasonFilter === 'all' || dis.primarySeason === seasonFilter || dis.primarySeason === 'all_year';
    const matchesCat = categoryFilter === 'all' || dis.category === categoryFilter;

    return matchesSearch && matchesSeason && matchesCat;
  });

  const getRiskBadge = (risk: DiseaseRiskLevel) => {
    switch (risk) {
      case 'high':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">HIGH RISK</span>;
      case 'moderate':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">MODERATE</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">LOW</span>;
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
              <ShieldAlert size={14} />
              <span>{language === 'bn' ? 'বাংলাদেশ ভেটেরিনারি রোগ জ্ঞানভাণ্ডার' : 'Bangladesh Veterinary Disease Intelligence'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'bn' ? 'মৌসুমি রোগবালাই ও মহামারী প্রতিরোধ ড্যাশবোর্ড' : 'Seasonal Disease Intelligence & Outbreak Prevention'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'ডিএলএস ও বিএলআরআই স্বীকৃত গবাদিপশুর সংক্রামক ও মেটাবলিক রোগসমূহের লক্ষণ, জরুরি সতর্কবার্তা, টিকা নির্দেশিকা ও প্রাথমিক পদক্ষেপ।'
                : 'Validated epidemiological data on Bangladesh livestock diseases: FMD, LSD, Anthrax, HS, BQ, Babesiosis, Mastitis, and Pneumonia.'}
            </p>
          </div>
        </div>
      </div>

      {/* Seasonal Active Risk Matrix Pill Banner */}
      <div className="bg-amber-50 border-2 border-amber-200 p-5 rounded-3xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-950 font-bold text-sm">
            <AlertTriangle size={18} className="text-amber-600" />
            <span>{language === 'bn' ? 'চলতি হেমন্ত ও শীতকালীন পূর্বপ্রস্তুতি সতর্কতা:' : 'Current Late Autumn & Pre-Winter Risk Assessment:'}</span>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
            DLS Surveillance Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-xs">
            <span className="text-stone-500 block text-[10px]">{language === 'bn' ? 'শীর্ষ ঝুঁকিপূর্ণ রোগ' : 'High Threat Disease'}</span>
            <strong className="text-rose-700 font-bold text-sm">FMD (ক্ষুরারোগ) & LSD</strong>
            <p className="text-[11px] text-stone-600 mt-0.5">টিকা ও গেটে ফুটবাথ জীবাণুনাশক নিশ্চিত করুন।</p>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-xs">
            <span className="text-stone-500 block text-[10px]">{language === 'bn' ? 'বাছুর স্বাস্থ্য সতর্কতা' : 'Calf Health Focus'}</span>
            <strong className="text-amber-800 font-bold text-sm">নিউমোনিয়া ও ঠাণ্ডাজনিত ধকল</strong>
            <p className="text-[11px] text-stone-600 mt-0.5">শেডের উত্তর পাশে চটের পর্দা ও শুকনো লিটার।</p>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-amber-200 shadow-xs">
            <span className="text-stone-500 block text-[10px]">{language === 'bn' ? 'পরজীবী নিয়ন্ত্রণ' : 'Parasite Protocol'}</span>
            <strong className="text-forest-800 font-bold text-sm">পোস্ট-মনসুন কৃমিনাশক ক্যাম্পেইন</strong>
            <p className="text-[11px] text-stone-600 mt-0.5">কলিজা কৃমি ও পেট কৃমির ব্রড-স্পেকট্রাম ডোজ।</p>
          </div>
        </div>
      </div>

      {/* Search & Disease Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Disease Directory */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-soft space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'রোগের নাম বা কোড দিয়ে খুঁজুন...' : 'Search disease name...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-500 bg-stone-50/50"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <select
                value={seasonFilter}
                onChange={e => setSeasonFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white"
              >
                <option value="all">{language === 'bn' ? 'সকল ঋতু' : 'All Seasons'}</option>
                <option value="monsoon">{language === 'bn' ? 'বর্ষাকাল' : 'Monsoon'}</option>
                <option value="summer">{language === 'bn' ? 'গ্রীষ্মকাল' : 'Summer'}</option>
                <option value="winter">{language === 'bn' ? 'শীতকাল' : 'Winter'}</option>
              </select>

              <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl border border-stone-200 bg-white"
              >
                <option value="all">{language === 'bn' ? 'সকল ক্যাটাগরি' : 'All Types'}</option>
                <option value="viral">{language === 'bn' ? 'ভাইরাল' : 'Viral'}</option>
                <option value="bacterial">{language === 'bn' ? 'ব্যাকটেরিয়াল' : 'Bacterial'}</option>
                <option value="parasitic">{language === 'bn' ? 'পরজীবী' : 'Parasitic'}</option>
                <option value="metabolic">{language === 'bn' ? 'মেটাবলিক' : 'Metabolic'}</option>
              </select>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredDiseases.map(dis => {
              const isSelected = selectedDisease.id === dis.id;
              return (
                <div
                  key={dis.id}
                  onClick={() => setSelectedDisease(dis)}
                  className={`p-4 rounded-3xl border text-xs cursor-pointer transition flex items-center justify-between
                    ${isSelected 
                      ? 'bg-forest-50 border-forest-400 ring-2 ring-forest-500/20 shadow-xs' 
                      : 'bg-white border-stone-200 hover:bg-stone-50/80 shadow-soft'}
                  `}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-stone-900 text-sm">
                        {language === 'bn' ? dis.nameBn : dis.nameEn}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px]">
                      <span className="text-stone-500 capitalize">{dis.category} • Season: {dis.primarySeason}</span>
                    </div>
                  </div>
                  <div>
                    {getRiskBadge(dis.riskLevel)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Detailed Disease Protocol Dossier */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-soft space-y-6">
          {/* Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-black text-stone-900 tracking-tight">
                  {language === 'bn' ? selectedDisease.nameBn : selectedDisease.nameEn}
                </h3>
                {getRiskBadge(selectedDisease.riskLevel)}
              </div>
              <p className="text-xs text-stone-500 italic mt-0.5">
                {selectedDisease.scientificName || selectedDisease.code}
              </p>
            </div>

            {selectedDisease.vaccineAvailable && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                <Syringe size={14} />
                <span>{language === 'bn' ? 'টিকা বিদ্যমান' : 'Vaccine Available'}</span>
              </span>
            )}
          </div>

          {/* Emergency Warning Signs Callout */}
          {selectedDisease.emergencyWarningSigns.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-xs text-rose-950 space-y-1.5">
              <h4 className="font-bold text-rose-900 flex items-center space-x-1.5 text-sm">
                <Flame size={16} className="text-rose-600" />
                <span>{language === 'bn' ? 'জরুরি বিপদ সংকেত (Emergency Warning Signs):' : 'Emergency Life-Threatening Signs:'}</span>
              </h4>
              <ul className="space-y-1 pl-4 list-disc text-rose-900">
                {selectedDisease.emergencyWarningSigns.map((sign, i) => (
                  <li key={i}>{sign}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Symptoms Grid: Early vs Advanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <h4 className="font-bold text-amber-950 flex items-center space-x-1.5">
                <AlertTriangle size={15} className="text-amber-700" />
                <span>{language === 'bn' ? 'প্রাথমিক লক্ষণসমূহ (Early Signs)' : 'Early Symptoms'}</span>
              </h4>
              <ul className="space-y-1 text-amber-900 pl-4 list-disc">
                {selectedDisease.earlySymptoms.map((sym, i) => (
                  <li key={i}>{sym}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 flex items-center space-x-1.5">
                <Activity size={15} className="text-stone-700" />
                <span>{language === 'bn' ? 'তীব্র/উন্নত লক্ষণসমূহ (Advanced Signs)' : 'Advanced Manifestations'}</span>
              </h4>
              <ul className="space-y-1 text-stone-700 pl-4 list-disc">
                {selectedDisease.advancedSymptoms.map((sym, i) => (
                  <li key={i}>{sym}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Immediate First Response Protocol */}
          <div className="p-5 rounded-2xl bg-cream-100 border border-cream-300 text-xs space-y-2.5">
            <h4 className="font-bold text-stone-900 flex items-center space-x-1.5 text-sm">
              <CheckCircle2 size={16} className="text-forest-700" />
              <span>{language === 'bn' ? 'খামারির তাৎক্ষণিক করণীয় পদক্ষেপ (Immediate Action):' : 'Immediate Response Protocol:'}</span>
            </h4>
            <div className="space-y-1.5 text-stone-800 leading-relaxed">
              {selectedDisease.immediateResponseActions.map((act, i) => (
                <p key={i} className="font-medium">• {act}</p>
              ))}
            </div>
          </div>

          {/* Prevention, Vaccine Schedule & Biosecurity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-forest-50/70 border border-forest-200 space-y-2">
              <h4 className="font-bold text-forest-950 flex items-center space-x-1.5">
                <Syringe size={15} className="text-forest-700" />
                <span>{language === 'bn' ? 'টিকা ও প্রতিরোধ ব্যবস্থা' : 'Vaccine Schedule & Prevention'}</span>
              </h4>
              <p className="font-semibold text-forest-900">{selectedDisease.vaccineName || 'No universal vaccine'}</p>
              <p className="text-forest-800 leading-relaxed">{selectedDisease.vaccineScheduleInfo}</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <h4 className="font-bold text-stone-900 flex items-center space-x-1.5">
                <ShieldAlert size={15} className="text-stone-700" />
                <span>{language === 'bn' ? 'জৈব নিরাপত্তা বিধান' : 'Biosecurity Directives'}</span>
              </h4>
              <ul className="space-y-1 text-stone-700 pl-4 list-disc">
                {selectedDisease.biosecurityGuidelines.map((bio, i) => (
                  <li key={i}>{bio}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Official Verification Citation & Legal Protocol */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
            <div className="font-semibold text-stone-800">
              {language === 'bn' ? 'ভেটেরিনারি ক্লিনিক্যাল নির্দেশিকা:' : 'Veterinary Clinical Note:'}{' '}
              <span className="font-normal text-stone-600">{selectedDisease.veterinaryAdvisoryProtocol}</span>
            </div>
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] text-stone-500">
              <span className="flex items-center space-x-1">
                <BookOpen size={12} className="text-forest-700" />
                <span>Source: {selectedDisease.officialSource}</span>
              </span>
              <span>Last Verified: {selectedDisease.lastVerifiedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
