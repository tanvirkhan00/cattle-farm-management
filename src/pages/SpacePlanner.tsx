import React, { useState } from 'react';
import { 
  Grid3X3, Layers, Compass, AlertTriangle, ShieldCheck, 
  Wind, Droplets, CheckCircle2, Ruler, Sparkles, RefreshCw 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';
import { calculateFarmCapacity, SpacePlannerInputs, CapacityCalculationResult } from '../services/capacityCalculator';
import { HousingSystem } from '../types';

export const SpacePlanner: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useFarm();

  // Space planner state inputs
  const [inputs, setInputs] = useState<SpacePlannerInputs>({
    totalLandDecimals: settings.totalLandDecimals || 35,
    landLengthFt: 140,
    landWidthFt: 110,
    shedLengthFt: 75,
    shedWidthFt: 40,
    housingSystem: 'loose_housing' as HousingSystem,
    cattleCategory: 'adult_crossbred_dairy',
    feedingBunkLengthFt: 65,
    openPaddockSqft: 3500,
    ventilationQuality: 'excellent_high_roof',
    drainageSlopePercent: 2.0,
    hasDedicatedManurePit: true,
    hasIsolationPen: true
  });

  const [activeZoneView, setActiveZoneView] = useState<'all' | 'shed' | 'paddock' | 'waste'>('all');

  // Compute scientific safe capacity based on bottleneck analysis
  const result: CapacityCalculationResult = calculateFarmCapacity(inputs);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
              <Compass size={14} />
              <span>{language === 'bn' ? 'বৈজ্ঞানিক ধারণক্ষমতা ও স্থাপত্য নকশা' : 'Scientific Carrying Capacity & Architecture'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'bn' ? 'খামার স্থান বিন্যাস ও নিরাপদ গরু ধারণক্ষমতা গণক' : 'Farm Space & Cattle Capacity Planner'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'কখনোই শুধু জমির ক্ষেত্রফল দিয়ে গরু সংখ্যা নির্ধারণ করবেন না। বৈজ্ঞানিক ধারণক্ষমতা নির্ধারিত হয় শেডের অভ্যন্তরীণ কার্যকর জায়গা, বাতাস চলাচল, খাবার পাত্র ও নিষ্কাশন ব্যবস্থার মাধ্যমে।'
                : 'Never determine stocking density by land area alone. Safe capacity is strictly constrained by usable covered floor space, feeding manger length, ventilation, and waste management.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Parameters on Left, 2D Visualization + Capacity on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Infrastructure Inputs */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-2">
              <Ruler size={16} className="text-forest-700" />
              <span>{language === 'bn' ? 'অবকাঠামো ও শেডের পরিমাপ' : 'Infrastructure Dimensions'}</span>
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            {/* Housing Type & Category */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {language === 'bn' ? 'পশুর ধরণ' : 'Target Category'}
                </label>
                <select
                  value={inputs.cattleCategory}
                  onChange={e => setInputs(prev => ({ ...prev, cattleCategory: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 font-medium"
                >
                  <option value="adult_crossbred_dairy">{language === 'bn' ? 'উন্নত গাভী (ডেইরি)' : 'Crossbred Dairy Cow'}</option>
                  <option value="fattening_bull">{language === 'bn' ? 'মোটাতাজাকরণ ষাঁড়' : 'Fattening Beef Bull'}</option>
                  <option value="indigenous_deshi">{language === 'bn' ? 'দেশি/আরসিসি গরু' : 'Indigenous / RCC'}</option>
                  <option value="growing_heifer">{language === 'bn' ? 'বকনা বাছুর' : 'Growing Heifer'}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {language === 'bn' ? 'হাউজিং পদ্ধতি' : 'Housing System'}
                </label>
                <select
                  value={inputs.housingSystem}
                  onChange={e => setInputs(prev => ({ ...prev, housingSystem: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 font-medium"
                >
                  <option value="loose_housing">{language === 'bn' ? 'লুজ হাউজিং (মুক্ত ঘর)' : 'Loose Housing'}</option>
                  <option value="tie_stall">{language === 'bn' ? 'টাই-স্টল (বাঁধা ঘর)' : 'Tie-Stall (Double row)'}</option>
                  <option value="free_stall">{language === 'bn' ? 'ফ্রি স্টল সিস্টেম' : 'Free Stall'}</option>
                </select>
              </div>
            </div>

            {/* Shed Dimensions */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <span className="font-bold text-stone-900 block">
                {language === 'bn' ? 'শেডের আকার (Shed Footprint)' : 'Covered Shed Dimensions'}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[11px] text-stone-500 block mb-1">{language === 'bn' ? 'শেডের দৈর্ঘ্য (ফুট)' : 'Length (ft)'}</span>
                  <input
                    type="number"
                    value={inputs.shedLengthFt}
                    onChange={e => setInputs(prev => ({ ...prev, shedLengthFt: Math.max(10, Number(e.target.value)) }))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-bold"
                  />
                </div>
                <div>
                  <span className="text-[11px] text-stone-500 block mb-1">{language === 'bn' ? 'শেডের প্রস্থ (ফুট)' : 'Width (ft)'}</span>
                  <input
                    type="number"
                    value={inputs.shedWidthFt}
                    onChange={e => setInputs(prev => ({ ...prev, shedWidthFt: Math.max(10, Number(e.target.value)) }))}
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 bg-white font-bold"
                  />
                </div>
              </div>
              <p className="text-[10px] text-stone-500 text-right">
                {language === 'bn' ? 'মোট ছাদ আচ্ছাদিত ক্ষেত্রফল:' : 'Total covered shed:'}{' '}
                <strong className="text-forest-800">{inputs.shedLengthFt * inputs.shedWidthFt} sq ft</strong>
              </p>
            </div>

            {/* Feeding Bunk & Open Paddock */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {language === 'bn' ? 'খাবার চাড়ির দৈর্ঘ্য (ফুট)' : 'Feeding Bunk Length (ft)'}
                </label>
                <input
                  type="number"
                  value={inputs.feedingBunkLengthFt}
                  onChange={e => setInputs(prev => ({ ...prev, feedingBunkLengthFt: Math.max(5, Number(e.target.value)) }))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {language === 'bn' ? 'খোলা চারণ এলাকা (বর্গফুট)' : 'Open Paddock (sq ft)'}
                </label>
                <input
                  type="number"
                  value={inputs.openPaddockSqft}
                  onChange={e => setInputs(prev => ({ ...prev, openPaddockSqft: Math.max(0, Number(e.target.value)) }))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>
            </div>

            {/* Ventilation & Drainage Slope */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {language === 'bn' ? 'বাতাস চলাচল মান' : 'Ventilation Quality'}
                </label>
                <select
                  value={inputs.ventilationQuality}
                  onChange={e => setInputs(prev => ({ ...prev, ventilationQuality: e.target.value as any }))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                >
                  <option value="excellent_high_roof">{language === 'bn' ? 'চমৎকার (১৪+ ফুট উঁচু চাল)' : 'Excellent (14ft+ roof)'}</option>
                  <option value="moderate">{language === 'bn' ? 'মাঝারি (১০-১২ ফুট চাল)' : 'Moderate (10-12ft)'}</option>
                  <option value="poor_low_roof">{language === 'bn' ? 'খারাপ (১০ ফুটের নিচে/গরম)' : 'Poor (<10ft roof)'}</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">
                  {language === 'bn' ? 'মেঝের ড্রেন ঢাল (%)' : 'Drainage Slope (%)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={inputs.drainageSlopePercent}
                  onChange={e => setInputs(prev => ({ ...prev, drainageSlopePercent: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>
            </div>

            {/* Environmental Checkboxes */}
            <div className="pt-2 space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.hasDedicatedManurePit}
                  onChange={e => setInputs(prev => ({ ...prev, hasDedicatedManurePit: e.target.checked }))}
                  className="rounded text-forest-600 focus:ring-forest-500"
                />
                <span className="font-medium text-stone-700">
                  {language === 'bn' ? 'নির্দিষ্ট পাকা গোবর পিট / বায়োগ্যাস প্ল্যান্ট আছে' : 'Covered dung pit / biogas plant exists'}
                </span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inputs.hasIsolationPen}
                  onChange={e => setInputs(prev => ({ ...prev, hasIsolationPen: e.target.checked }))}
                  className="rounded text-forest-600 focus:ring-forest-500"
                />
                <span className="font-medium text-stone-700">
                  {language === 'bn' ? 'মূল শেড থেকে আলাদা কোয়ারেন্টাইন শেড আছে' : 'Separate isolation quarantine bay exists'}
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Capacity Results & Interactive 2D Visualizer */}
        <div className="lg:col-span-7 space-y-5">
          {/* Safe Capacity Scoreboard Banner */}
          <div className="bg-forest-900 text-white p-6 rounded-3xl shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-300">
                {language === 'bn' ? 'চূড়ান্ত নিরাপদ ধারণক্ষমতা (Bottleneck Limit)' : 'Safe Recommended Capacity'}
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-4xl font-black text-white">{result.recommendedSafeCapacity}</span>
                <span className="text-base font-bold text-forest-200">{language === 'bn' ? 'টি গরু' : 'Head'}</span>
              </div>
              <p className="text-xs text-forest-200 mt-1 max-w-sm">
                {language === 'bn' 
                  ? `সীমাবদ্ধতাকারী ফ্যাক্টর: ${result.limitingFactorBn}` 
                  : `Primary Bottleneck: ${result.limitingFactor}`}
              </p>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-forest-800 pt-3 sm:pt-0 sm:pl-6 text-xs space-y-1.5 text-forest-200">
              <div>
                {language === 'bn' ? 'শেড জায়গার হিসাবে:' : 'By Shed Space:'}{' '}
                <strong className="text-white">{result.capacityByCoveredSpace} {language === 'bn' ? 'টি' : 'head'}</strong>
              </div>
              <div>
                {language === 'bn' ? 'খাবার চাড়ির হিসাবে:' : 'By Manger Length:'}{' '}
                <strong className="text-white">{result.capacityByFeedingBunk} {language === 'bn' ? 'টি' : 'head'}</strong>
              </div>
              <div>
                {language === 'bn' ? 'পশু প্রতি বরাদ্দ শেড:' : 'Allowance per head:'}{' '}
                <strong className="text-white">{result.spacePerAnimalSqft} sq ft</strong>
              </div>
            </div>
          </div>

          {/* 2D Farm Layout Interactive Canvas */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h4 className="font-bold text-stone-900 text-xs flex items-center space-x-1.5">
                <Layers size={14} className="text-forest-700" />
                <span>{language === 'bn' ? 'খামার মাস্টারপ্ল্যান ২ডি লেআউট ম্যাপ' : 'Interactive 2D Farm Masterplan Layout'}</span>
              </h4>
              <span className="text-[10px] text-stone-400 font-medium">East-West True Orientation</span>
            </div>

            {/* SVG Visualizer */}
            <div className="relative w-full aspect-[16/9] bg-[#f8faf8] border-2 border-dashed border-stone-300 rounded-2xl overflow-hidden p-3 shadow-inner flex flex-col justify-between">
              {/* Compass Indicator */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-stone-200 text-[10px] font-bold text-stone-700 flex items-center space-x-1 shadow-xs">
                <Compass size={13} className="text-forest-700" />
                <span>N ⬆ / E ➡ (East-West Shed Alignment)</span>
              </div>

              {/* Top Section: Open Exercise Paddock & Quarantine */}
              <div className="grid grid-cols-12 gap-2 h-2/5">
                {/* Open Paddock */}
                <div className="col-span-8 bg-emerald-50/70 border border-emerald-300 rounded-xl p-2.5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-900">
                      🏃 {language === 'bn' ? 'খোলা চারণ ও হাঁটার জায়গা (Open Paddock)' : 'Open Exercise Paddock'}
                    </span>
                    <span className="text-[9px] text-emerald-700 font-semibold">{inputs.openPaddockSqft} sq ft</span>
                  </div>
                  <p className="text-[9px] text-emerald-800">
                    {language === 'bn' ? 'দৈনিক সূর্যালোক ও অঙ্গ সঞ্চালনের জন্য' : 'Sunbathing & hoof hardness zone'}
                  </p>
                </div>

                {/* Isolation / Quarantine Pen */}
                <div className={`col-span-4 rounded-xl p-2.5 flex flex-col justify-between border
                  ${inputs.hasIsolationPen ? 'bg-amber-50/80 border-amber-300 text-amber-950' : 'bg-stone-100 border-dashed border-stone-300 text-stone-400'}
                `}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold">
                      🛡️ {language === 'bn' ? 'কোয়ারেন্টাইন শেড' : 'Isolation Bay'}
                    </span>
                    {inputs.hasIsolationPen && <span className="text-[9px] text-amber-700 font-semibold">21 Days</span>}
                  </div>
                  <p className="text-[9px]">
                    {inputs.hasIsolationPen ? (language === 'bn' ? 'নতুন ও অসুস্থ পশুর পৃথকীকরণ' : 'Biosecurity buffer stall') : 'Not Configured'}
                  </p>
                </div>
              </div>

              {/* Middle Section: Main Covered Barn with Central Feeding Manger */}
              <div className="h-2/5 bg-forest-900/90 text-white rounded-xl p-3 flex flex-col justify-between relative shadow-md">
                <div className="flex items-center justify-between border-b border-forest-800 pb-1">
                  <span className="text-[11px] font-bold text-white flex items-center space-x-1.5">
                    <span>🏠 {language === 'bn' ? 'মূল গবাদিপশু শেড' : 'Main Cattle Barn'}</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-forest-700 text-forest-200">
                      {inputs.shedLengthFt}' × {inputs.shedWidthFt}'
                    </span>
                  </span>
                  <span className="text-[10px] text-emerald-300 font-bold">
                    Capacity: {result.recommendedSafeCapacity} Head
                  </span>
                </div>

                {/* Central Feeding Alley & Gutter Graphic */}
                <div className="my-auto py-1 px-2 rounded bg-forest-800/80 border border-forest-700 flex items-center justify-between text-[9px] text-forest-200">
                  <span>◀ Pen Left Row</span>
                  <span className="font-bold text-emerald-300 px-2 py-0.5 rounded bg-forest-700">
                    🍽️ {language === 'bn' ? 'খাবার ও জাবর চাড়ি (Feeding Alley)' : 'Central Feeding Manger'} ({inputs.feedingBunkLengthFt} ft)
                  </span>
                  <span>Pen Right Row ▶</span>
                </div>

                <div className="flex items-center justify-between text-[9px] text-forest-300">
                  <span>💧 Drainage: {inputs.drainageSlopePercent}% Slope</span>
                  <span>Ventilation: {inputs.ventilationQuality.replace('_', ' ')}</span>
                </div>
              </div>

              {/* Bottom Section: Feed Storage, Water Station & Manure/Biogas Pit */}
              <div className="grid grid-cols-12 gap-2 h-1/5">
                <div className="col-span-4 bg-amber-50 border border-amber-300 rounded-xl p-1.5 text-[9px] text-amber-900 flex items-center space-x-1">
                  <span>🌾</span>
                  <span className="font-bold truncate">{language === 'bn' ? 'খাদ্য ও সাইলেজ গুদাম' : 'Feed Warehouse'}</span>
                </div>
                <div className="col-span-4 bg-blue-50 border border-blue-300 rounded-xl p-1.5 text-[9px] text-blue-900 flex items-center space-x-1">
                  <span>🚰</span>
                  <span className="font-bold truncate">{language === 'bn' ? 'পানির ট্যাংক ও পাম্প' : 'Water Troughs'}</span>
                </div>
                <div className={`col-span-4 rounded-xl p-1.5 text-[9px] flex items-center space-x-1 border
                  ${inputs.hasDedicatedManurePit ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-rose-50 border-rose-300 text-rose-800'}
                `}>
                  <span>♻️</span>
                  <span className="truncate">{inputs.hasDedicatedManurePit ? (language === 'bn' ? 'বায়োগ্যাস ও গোবর পিট' : 'Biogas Dung Pit') : 'No Dung Pit!'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Waste Management & Safety Warning Alerts */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center space-x-1.5">
              <Droplets size={15} className="text-forest-700" />
              <span>{language === 'bn' ? 'বর্জ্য ও ড্রেনেজ বিশ্লেষণ' : 'Waste & Drainage Engineering Assessment'}</span>
            </h4>
            <p className="text-stone-600 leading-relaxed">
              {language === 'bn' ? result.manureManagementAssessment.recommendationBn : result.manureManagementAssessment.recommendationEn}
            </p>

            {result.safetyWarnings.length > 0 && (
              <div className="space-y-1.5 pt-2">
                {result.safetyWarnings.map((warning, i) => (
                  <div key={i} className="flex items-start space-x-2 text-rose-800 text-[11px] bg-rose-50 p-2 rounded-xl border border-rose-200">
                    <AlertTriangle size={14} className="text-rose-600 flex-shrink-0 mt-0.5" />
                    <span>{language === 'bn' ? result.safetyWarningsBn[i] : warning}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
