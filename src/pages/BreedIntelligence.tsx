import React, { useState } from 'react';
import { 
  Award, Search, Filter, ShieldCheck, Thermometer, 
  Droplet, Scale, CheckCircle2, AlertTriangle, BookOpen, 
  ChevronRight, ExternalLink 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BREEDS_DATABASE } from '../data/breedsData';
import { Breed } from '../types';

export const BreedIntelligence: React.FC = () => {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [purposeFilter, setPurposeFilter] = useState<string>('all');
  const [selectedBreed, setSelectedBreed] = useState<Breed>(BREEDS_DATABASE[0]);

  const filteredBreeds = BREEDS_DATABASE.filter(breed => {
    const matchesSearch = 
      breed.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.nameBn.includes(searchTerm) ||
      breed.origin.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPurpose = purposeFilter === 'all' || breed.primaryPurpose === purposeFilter;

    return matchesSearch && matchesPurpose;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
              <Award size={14} />
              <span>{language === 'bn' ? 'বাংলাদেশ জাত জ্ঞানভাণ্ডার' : 'Bangladesh Breed Knowledgebase'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'bn' ? 'গবাদিপশুর জাত পরিচিতি ও জেনেটিক বুদ্ধিমত্তা' : 'Breed Intelligence & Genetic Reference'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'বিএলআরআই ও ডিএলএস কর্তৃক যাচাইকৃত দেশি ও সংকর জাতের প্রকৃত দুধ উৎপাদন, দৈহিক বৃদ্ধি, তাপ সহনশীলতা ও রোগঝুঁকি তথ্য।'
                : 'Verified biological, reproductive, and nutritional characteristics of indigenous and crossbred cattle in Bangladesh.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Container: Breed List on Left, Comprehensive Profile on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 4 Cols: Breed Selection Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-4 rounded-3xl border border-stone-200 shadow-soft space-y-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-3 text-stone-400" />
              <input
                type="text"
                placeholder={language === 'bn' ? 'জাতের নাম দিয়ে খুঁজুন...' : 'Search breed name...'}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-200 text-xs focus:outline-none focus:ring-2 focus:ring-forest-500 bg-stone-50/50"
              />
            </div>

            <div className="flex space-x-1.5 text-[11px] overflow-x-auto pb-1">
              <button
                onClick={() => setPurposeFilter('all')}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition
                  ${purposeFilter === 'all' ? 'bg-forest-800 text-white shadow-xs' : 'bg-stone-100 text-stone-600'}
                `}
              >
                {language === 'bn' ? 'সকল' : 'All'}
              </button>
              <button
                onClick={() => setPurposeFilter('dairy')}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition
                  ${purposeFilter === 'dairy' ? 'bg-forest-800 text-white shadow-xs' : 'bg-stone-100 text-stone-600'}
                `}
              >
                {language === 'bn' ? 'দুগ্ধ' : 'Dairy'}
              </button>
              <button
                onClick={() => setPurposeFilter('beef')}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition
                  ${purposeFilter === 'beef' ? 'bg-forest-800 text-white shadow-xs' : 'bg-stone-100 text-stone-600'}
                `}
              >
                {language === 'bn' ? 'মাংস' : 'Beef'}
              </button>
              <button
                onClick={() => setPurposeFilter('dual_purpose')}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition
                  ${purposeFilter === 'dual_purpose' ? 'bg-forest-800 text-white shadow-xs' : 'bg-stone-100 text-stone-600'}
                `}
              >
                {language === 'bn' ? 'উভয়মুখী' : 'Dual'}
              </button>
            </div>
          </div>

          <div className="space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredBreeds.map(breed => {
              const isSelected = selectedBreed.id === breed.id;
              return (
                <div
                  key={breed.id}
                  onClick={() => setSelectedBreed(breed)}
                  className={`p-4 rounded-3xl border text-xs cursor-pointer transition flex items-center justify-between
                    ${isSelected 
                      ? 'bg-forest-50 border-forest-400 ring-2 ring-forest-500/20 shadow-xs' 
                      : 'bg-white border-stone-200 hover:bg-stone-50/80 shadow-soft'}
                  `}
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-stone-900 text-sm">
                        {language === 'bn' ? breed.nameBn : breed.nameEn}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 capitalize">
                      {breed.primaryPurpose.replace('_', ' ')} • {breed.origin.split(',')[0]}
                    </p>
                  </div>
                  <ChevronRight size={16} className={isSelected ? 'text-forest-700' : 'text-stone-300'} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 8 Cols: Detailed Breed Dossier */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-soft space-y-6">
          {/* Breed Title Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-100 gap-3">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="text-xl font-black text-stone-900 tracking-tight">
                  {language === 'bn' ? selectedBreed.nameBn : selectedBreed.nameEn}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center space-x-1">
                  <ShieldCheck size={12} />
                  <span>Verified</span>
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                Origin: {selectedBreed.origin}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold
                ${selectedBreed.heatToleranceLevel === 'high' ? 'bg-emerald-100 text-emerald-800' : selectedBreed.heatToleranceLevel === 'moderate' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}
              `}>
                🔥 Heat Tolerance: {selectedBreed.heatToleranceLevel.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Biological Performance Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
              <Scale size={16} className="mx-auto text-forest-700 mb-1" />
              <span className="text-[10px] text-stone-400 block">{language === 'bn' ? 'গড় ওজন (পুরুষ)' : 'Avg Male Wt'}</span>
              <strong className="text-stone-900 font-bold text-sm">{selectedBreed.averageMaleWeightKg} kg</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
              <Scale size={16} className="mx-auto text-forest-700 mb-1" />
              <span className="text-[10px] text-stone-400 block">{language === 'bn' ? 'গড় ওজন (স্ত্রী)' : 'Avg Female Wt'}</span>
              <strong className="text-stone-900 font-bold text-sm">{selectedBreed.averageFemaleWeightKg} kg</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
              <Droplet size={16} className="mx-auto text-blue-600 mb-1" />
              <span className="text-[10px] text-stone-400 block">{language === 'bn' ? 'দৈনিক গড় দুধ' : 'Daily Milk Yield'}</span>
              <strong className="text-stone-900 font-bold text-sm">{selectedBreed.dailyMilkYieldLiters} L / day</strong>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-center">
              <Thermometer size={16} className="mx-auto text-amber-600 mb-1" />
              <span className="text-[10px] text-stone-400 block">{language === 'bn' ? 'ল্যাকটেশন মেয়াদ' : 'Lactation Days'}</span>
              <strong className="text-stone-900 font-bold text-sm">{selectedBreed.lactationPeriodDays} days</strong>
            </div>
          </div>

          {/* Environmental Adaptation & Feed Efficiency */}
          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300">
              <h4 className="font-bold text-stone-900 mb-1">
                {language === 'bn' ? 'জলবায়ু উপযোগিতা ও তাপ সহনশীলতা:' : 'Climate Adaptation in Bangladesh:'}
              </h4>
              <p className="text-stone-700 leading-relaxed">{selectedBreed.climateSuitability}</p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
              <h4 className="font-bold text-stone-900 mb-1">
                {language === 'bn' ? 'খাদ্য রূপান্তর দক্ষতা ও চাহিদা (Feed Efficiency):' : 'Feed Utilization & Roughage Demand:'}
              </h4>
              <p className="text-stone-700 leading-relaxed">{selectedBreed.feedEfficiency}</p>
            </div>
          </div>

          {/* Advantages vs Limitations Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Advantages */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <h4 className="font-bold text-emerald-950 flex items-center space-x-1.5">
                <CheckCircle2 size={15} className="text-emerald-700" />
                <span>{language === 'bn' ? 'প্রধান সুবিধাসমূহ (Advantages)' : 'Primary Advantages'}</span>
              </h4>
              <ul className="space-y-1.5 text-emerald-900">
                {selectedBreed.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-emerald-600 mt-0.5">•</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations & Health Risks */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <h4 className="font-bold text-amber-950 flex items-center space-x-1.5">
                <AlertTriangle size={15} className="text-amber-700" />
                <span>{language === 'bn' ? 'সীমাবদ্ধতা ও স্বাস্থ্য ঝুঁকি' : 'Limitations & Health Vulnerabilities'}</span>
              </h4>
              <ul className="space-y-1.5 text-amber-900">
                {selectedBreed.limitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start space-x-1.5">
                    <span className="text-amber-600 mt-0.5">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
                {selectedBreed.commonHealthRisks.map((risk, idx) => (
                  <li key={`r-${idx}`} className="flex items-start space-x-1.5 text-rose-800">
                    <span className="text-rose-600 mt-0.5">⚠️</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verification Source Citation */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center justify-between">
            <span className="flex items-center space-x-1.5">
              <BookOpen size={13} className="text-forest-700" />
              <span>
                {language === 'bn' ? 'যাচাইকৃত গবেষণা উৎস:' : 'Verified Research Publication:'}{' '}
                <strong>{selectedBreed.verificationSource}</strong>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
