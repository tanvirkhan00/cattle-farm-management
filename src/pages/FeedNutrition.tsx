import React, { useState } from 'react';
import { 
  Apple, Sprout, Scale, Droplet, DollarSign, 
  CheckCircle2, AlertTriangle, BookOpen, Layers, 
  Plus, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { FEEDS_DATABASE } from '../data/feedsData';
import { formulateBalancedRation, RecommendedRation } from '../services/nutritionCalculator';
import { Cattle } from '../types';

export const FeedNutrition: React.FC = () => {
  const { language } = useLanguage();
  const { cattleList, feedInventory } = useFarm();

  const [selectedCattleId, setSelectedCattleId] = useState<string>(cattleList[0]?.id || '');
  const [dailyMilkYield, setDailyMilkYield] = useState<number>(15);
  const [pregnancyMonths, setPregnancyMonths] = useState<number>(0);
  const [targetDailyGainGrams, setTargetDailyGainGrams] = useState<number>(850);

  const targetCattle: Cattle = cattleList.find(c => c.id === selectedCattleId) || cattleList[0];

  // Dynamic formulation calculation
  const ration: RecommendedRation = targetCattle ? formulateBalancedRation(
    targetCattle,
    dailyMilkYield,
    pregnancyMonths,
    targetDailyGainGrams
  ) : formulateBalancedRation({
    id: 'sample',
    tagId: 'BD-GZP-101',
    gender: 'female',
    purpose: 'dairy',
    currentWeightKg: 450,
    pregnancyStatus: 'not_pregnant',
    healthStatus: 'healthy',
    createdDate: '',
    updatedDate: '',
    breedId: 'b-sahiwal'
  }, dailyMilkYield, pregnancyMonths, targetDailyGainGrams);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
              <Apple size={14} />
              <span>{language === 'bn' ? 'ব্যক্তিগত পুষ্টি ও রেশন পরিকল্পনা' : 'Individual Precision Nutrition & Ration'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'bn' ? 'খাদ্য ও পুষ্টি ব্যবস্থাপনা (BLRI ফর্মুলেশন)' : 'Feed & Precision Nutrition Management'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'কখনোই সকল গরুকে একই ধরনের খাবার দিবেন না। দৈহিক ওজন, দুধ উৎপাদন বা মাংস বৃদ্ধির লক্ষ্যমাত্রা অনুযায়ী সুষম দানাদার, কাঁচা ঘাস ও খড়ের সঠিক বিজ্ঞানসম্মত অনুপাত।'
                : 'Formulate customized rations based on live weight, lactation stage, and ADG targets. Never use a fixed ration for diverse cattle classes.'}
            </p>
          </div>
        </div>
      </div>

      {/* Select Target Cattle & Set Goals */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
        <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
          <Scale size={16} className="text-forest-700" />
          <span>{language === 'bn' ? '১. গরু ও উৎপাদন লক্ষ্যমাত্রা নির্বাচন করুন' : '1. Select Cattle & Production Targets'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'খামারের গরু নির্বাচন করুন' : 'Select Target Cattle'}
            </label>
            <select
              value={selectedCattleId}
              onChange={e => setSelectedCattleId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              {cattleList.map(c => (
                <option key={c.id} value={c.id}>
                  {c.tagId} - {c.name || 'Unnamed'} ({c.currentWeightKg} kg • {c.purpose.replace('_', ' ')})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'বর্তমান দৈহিক ওজন' : 'Live Body Weight'}
            </label>
            <div className="px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-200 font-black text-stone-900 text-sm">
              {targetCattle?.currentWeightKg || 400} kg
            </div>
          </div>

          {targetCattle?.purpose === 'dairy' ? (
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {language === 'bn' ? 'দৈনিক দুধের লক্ষ্যমাত্রা (লিটার)' : 'Target Milk Yield (Liters/day)'}
              </label>
              <input
                type="number"
                value={dailyMilkYield}
                onChange={e => setDailyMilkYield(Math.max(0, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          ) : (
            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                {language === 'bn' ? 'দৈনিক ওজন বৃদ্ধির লক্ষ্য (গ্রাম/দিন)' : 'Target ADG Gain (grams/day)'}
              </label>
              <input
                type="number"
                step="50"
                value={targetDailyGainGrams}
                onChange={e => setTargetDailyGainGrams(Math.max(200, Number(e.target.value)))}
                className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold focus:outline-none focus:ring-2 focus:ring-forest-500"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'গর্ভধারণের মাস (০ যদি না থাকে)' : 'Pregnancy Month (0 if open)'}
            </label>
            <input
              type="number"
              min="0"
              max="9"
              value={pregnancyMonths}
              onChange={e => setPregnancyMonths(Number(e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 font-bold focus:outline-none focus:ring-2 focus:ring-forest-500"
            />
          </div>
        </div>
      </div>

      {/* Recommended Formulation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Exact Daily Feed Recipe */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? '২. দৈনিক সুষম খাদ্যের প্রেসক্রিপশন' : '2. Formulated Daily Ration Prescription'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'আঁশ ও দানাদার খাবারের সুষম পুষ্টি অনুপাত' : 'Balanced roughage-to-concentrate distribution'}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-forest-100 text-forest-800 border border-forest-200">
              ৳{ration.estimatedDailyCostBdt} / {language === 'bn' ? 'দিন' : 'day'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-emerald-800 block text-[10px] font-medium">{language === 'bn' ? 'কাঁচা নেপিয়ার ঘাস' : 'Green Fodder'}</span>
              <strong className="text-emerald-950 text-base font-black">{ration.greenFodderKg} kg</strong>
              <p className="text-[10px] text-emerald-700 mt-1">~60% DM base</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <span className="text-amber-800 block text-[10px] font-medium">{language === 'bn' ? 'শুকনো খড় (UMS)' : 'Paddy Straw'}</span>
              <strong className="text-amber-950 text-base font-black">{ration.dryFodderKg} kg</strong>
              <p className="text-[10px] text-amber-700 mt-1">Rumen cud fiber</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-forest-50 border border-forest-200">
              <span className="text-forest-800 block text-[10px] font-medium">{language === 'bn' ? 'সুষম দানাদার' : 'Concentrate Mix'}</span>
              <strong className="text-forest-950 text-base font-black">{ration.concentrateMixKg} kg</strong>
              <p className="text-[10px] text-forest-700 mt-1">Protein & Energy</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200">
              <span className="text-blue-800 block text-[10px] font-medium">{language === 'bn' ? 'বিশুদ্ধ পানি' : 'Drinking Water'}</span>
              <strong className="text-blue-950 text-base font-black">{ration.cleanWaterLiters} L</strong>
              <p className="text-[10px] text-blue-700 mt-1">Ad-libitum</p>
            </div>
          </div>

          {/* Nutritional Fulfillment Progress */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 text-xs">
            <span className="font-bold text-stone-900 block">
              {language === 'bn' ? 'পুষ্টি উপাদান পূরণ ও সন্তুষ্টি সূচক (Fulfillment Rates):' : 'Nutritional Nutrient Fulfillment Rates:'}
            </span>

            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-stone-700">
                  <span>Dry Matter (শুষ্ক পদার্থ - DM)</span>
                  <span>{ration.nutritionalBreakdown.providedDmKg} kg ({ration.nutritionalBreakdown.dmFulfillmentPercent}%)</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-forest-600 h-2 rounded-full" style={{ width: `${Math.min(100, ration.nutritionalBreakdown.dmFulfillmentPercent)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-stone-700">
                  <span>Crude Protein (ক্রুড প্রোটিন - CP)</span>
                  <span>{ration.nutritionalBreakdown.providedCpGrams}g ({ration.nutritionalBreakdown.cpFulfillmentPercent}%)</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-2 rounded-full" style={{ width: `${Math.min(100, ration.nutritionalBreakdown.cpFulfillmentPercent)}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-semibold text-stone-700">
                  <span>TDN (মোট পাচ্য পুষ্টি উপাদান)</span>
                  <span>{ration.nutritionalBreakdown.providedTdnKg} kg ({ration.nutritionalBreakdown.tdnFulfillmentPercent}%)</span>
                </div>
                <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-2 rounded-full" style={{ width: `${Math.min(100, ration.nutritionalBreakdown.tdnFulfillmentPercent)}%` }} />
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 text-xs text-stone-800 leading-relaxed">
            <strong>{language === 'bn' ? 'খাদ্য প্রয়োগের বৈজ্ঞানিক নিয়মাবলী:' : 'Feeding Management Rules:'} </strong>
            {language === 'bn' ? ration.rationFormulaNotesBn : ration.rationFormulaNotesEn}
          </div>
        </div>

        {/* Right 5 Cols: Feed Catalog & Nutritional Specs */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm">
              {language === 'bn' ? 'খাদ্য উপাদান ও পুষ্টি তালিকা' : 'Feed Nutritional Library'}
            </h3>
            <span className="text-[10px] text-stone-400 font-semibold">BLRI Standards</span>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1 text-xs">
            {FEEDS_DATABASE.map(f => (
              <div key={f.id} className="p-3 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900">
                    {language === 'bn' ? f.nameBn : f.nameEn}
                  </span>
                  <span className="font-bold text-forest-800">৳{f.costPerKgBdt}/kg</span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[10px] text-stone-500 pt-1">
                  <span>DM: {f.dryMatterPercent}%</span>
                  <span>CP: {f.crudeProteinPercent}%</span>
                  <span>TDN: {f.tdnPercent}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
