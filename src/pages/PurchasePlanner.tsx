import React, { useState } from 'react';
import { 
  ShoppingCart, Calculator, TrendingUp, AlertTriangle, 
  ShieldCheck, Sparkles, Scale, DollarSign, CheckCircle2 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { evaluatePurchaseScenario } from '../services/purchasePlanner';
import { PurchaseScenario, PurchaseEvaluationResult } from '../types';
import { BREEDS_DATABASE } from '../data/breedsData';

export const PurchasePlanner: React.FC = () => {
  const { language } = useLanguage();

  // Inputs for purchase scenario
  const [params, setParams] = useState<PurchaseScenario>({
    breedId: 'b-brahman-cross',
    estimatedAgeMonths: 28,
    initialWeightKg: 280,
    purchasePriceBdt: 110000,
    transportCostBdt: 3500,
    veterinaryCostBdt: 1500,
    dailyFeedCostBdt: 120,
    holdingDays: 100,
    expectedDailyGainGrams: 900,
    expectedSellingPricePerKgBdt: 580,
    contingencyPercent: 4
  });

  const evalResult: PurchaseEvaluationResult = evaluatePurchaseScenario(params);

  // Preset comparative options (e.g. 100-day Brahman fattening vs 180-day Sahiwal bull vs 90-day Deshi)
  const PRESET_OPTIONS = [
    {
      titleBn: 'বিকল্প ১: ব্রাহমা ক্রস ষাঁড় (১০০ দিন নিবিড় মোটাতাজাকরণ)',
      titleEn: 'Option 1: Brahman Cross (100-Day Intensive Fattening)',
      params: {
        breedId: 'b-brahman-cross',
        estimatedAgeMonths: 28,
        initialWeightKg: 280,
        purchasePriceBdt: 110000,
        transportCostBdt: 3500,
        veterinaryCostBdt: 1500,
        dailyFeedCostBdt: 125,
        holdingDays: 100,
        expectedDailyGainGrams: 950,
        expectedSellingPricePerKgBdt: 580,
        contingencyPercent: 4
      }
    },
    {
      titleBn: 'বিকল্প ২: শাহীওয়াল বাছুর (১৮০ দিন লং-টার্ম গ্রোথ)',
      titleEn: 'Option 2: Sahiwal Bull (180-Day Long Cycle)',
      params: {
        breedId: 'b-sahiwal',
        estimatedAgeMonths: 20,
        initialWeightKg: 210,
        purchasePriceBdt: 85000,
        transportCostBdt: 3000,
        veterinaryCostBdt: 2000,
        dailyFeedCostBdt: 105,
        holdingDays: 180,
        expectedDailyGainGrams: 800,
        expectedSellingPricePerKgBdt: 560,
        contingencyPercent: 5
      }
    },
    {
      titleBn: 'বিকল্প ৩: দেশি বড় খাসি ষাঁড় (৭০ দিন শর্ট টার্ম)',
      titleEn: 'Option 3: Indigenous Deshi Bull (70-Day Quick Turn)',
      params: {
        breedId: 'b-deshi',
        estimatedAgeMonths: 32,
        initialWeightKg: 220,
        purchasePriceBdt: 75000,
        transportCostBdt: 2500,
        veterinaryCostBdt: 1200,
        dailyFeedCostBdt: 95,
        holdingDays: 70,
        expectedDailyGainGrams: 650,
        expectedSellingPricePerKgBdt: 590,
        contingencyPercent: 3
      }
    }
  ];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
              <ShoppingCart size={14} />
              <span>{language === 'bn' ? 'ক্রয় সিদ্ধান্ত ও আর্থিক ঝুঁকি মূল্যায়ন' : 'Procurement & Investment Feasibility'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'bn' ? 'গরু ক্রয় ও লাভজনকতা গণক (Eid ROI Modeler)' : 'Cattle Purchase & Investment Modeler'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'হাটে গরু কেনার আগেই পরিবহন, খাদ্য ব্যয়, প্রত্যাশিত ওজন বৃদ্ধি ও ব্রেক-ইভেন বিক্রয়মূল্য যাচাই করে সঠিক সিদ্ধান্ত নিন।'
                : 'Simulate cattle acquisition, holding feeds, projected liveweight gain, break-even price, and risk-adjusted margins before purchasing.'}
            </p>
          </div>
        </div>
      </div>

      {/* Preset Quick Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PRESET_OPTIONS.map((opt, i) => (
          <button
            key={i}
            onClick={() => setParams(opt.params)}
            className="p-4 rounded-3xl bg-white border border-stone-200 shadow-soft hover:border-forest-400 hover:bg-forest-50/50 transition text-left text-xs"
          >
            <span className="font-bold text-stone-900 block mb-1">
              {language === 'bn' ? opt.titleBn : opt.titleEn}
            </span>
            <p className="text-[11px] text-stone-500">
              ক্রয়: ৳{opt.params.purchasePriceBdt.toLocaleString()} • {opt.params.holdingDays} দিন মেয়াদ
            </p>
          </button>
        ))}
      </div>

      {/* Parameters on Left, Evaluation on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Input Parameters */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm flex items-center space-x-1.5">
              <Calculator size={16} className="text-forest-700" />
              <span>{language === 'bn' ? 'ক্রয় পরামিতি ও অনুমিত ব্যয়' : 'Purchase Parameters'}</span>
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">{language === 'bn' ? 'গরুর জাত' : 'Target Breed'}</label>
              <select
                value={params.breedId}
                onChange={e => setParams({ ...params, breedId: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 font-medium"
              >
                {BREEDS_DATABASE.map(b => (
                  <option key={b.id} value={b.id}>{language === 'bn' ? b.nameBn : b.nameEn}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">{language === 'bn' ? 'হাটে ক্রয়মূল্য (টাকা)' : 'Purchase Price (BDT)'}</label>
                <input
                  type="number"
                  step="5000"
                  value={params.purchasePriceBdt}
                  onChange={e => setParams({ ...params, purchasePriceBdt: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{language === 'bn' ? 'বর্তমান লাইভ ওজন (কেজি)' : 'Initial Weight (kg)'}</label>
                <input
                  type="number"
                  value={params.initialWeightKg}
                  onChange={e => setParams({ ...params, initialWeightKg: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">{language === 'bn' ? 'পরিবহন ও হাসিল খরচ' : 'Transport & Haat Tax'}</label>
                <input
                  type="number"
                  value={params.transportCostBdt}
                  onChange={e => setParams({ ...params, transportCostBdt: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{language === 'bn' ? 'দৈনিক খাদ্য ব্যয় (টাকা)' : 'Daily Feed Cost'}</label>
                <input
                  type="number"
                  value={params.dailyFeedCostBdt}
                  onChange={e => setParams({ ...params, dailyFeedCostBdt: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-amber-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">{language === 'bn' ? 'পালন মেয়াদ (দিন)' : 'Holding Period (days)'}</label>
                <input
                  type="number"
                  value={params.holdingDays}
                  onChange={e => setParams({ ...params, holdingDays: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">{language === 'bn' ? 'দৈনিক ওজন বৃদ্ধি (গ্রাম)' : 'Expected ADG (g/day)'}</label>
                <input
                  type="number"
                  step="50"
                  value={params.expectedDailyGainGrams}
                  onChange={e => setParams({ ...params, expectedDailyGainGrams: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold text-forest-800"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">{language === 'bn' ? 'প্রত্যাশিত বিক্রয়মূল্য (টাকা/কেজি লাইভ)' : 'Expected Sale Rate (BDT/kg live)'}</label>
              <input
                type="number"
                value={params.expectedSellingPricePerKgBdt}
                onChange={e => setParams({ ...params, expectedSellingPricePerKgBdt: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 font-bold"
              />
              <p className="text-[10px] text-stone-400 mt-1">কুরবানি হাটের স্ট্যান্ডার্ড লাইভ রেট: ৳৫৫০ - ৬২০ / কেজি</p>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Financial ROI & Break-even Scenarios */}
        <div className="lg:col-span-7 space-y-5">
          {/* ROI Scoreboard Card */}
          <div className="bg-forest-900 text-white p-6 rounded-3xl shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-forest-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                {language === 'bn' ? 'বিনিয়োগ মূল্যায়ন সারসংক্ষেপ' : 'Investment Projection'}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold
                ${evalResult.riskRating === 'Low' ? 'bg-emerald-500 text-forest-950' : evalResult.riskRating === 'Moderate' ? 'bg-amber-400 text-stone-900' : 'bg-rose-500 text-white'}
              `}>
                Risk: {evalResult.riskRating}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div>
                <span className="text-[10px] text-forest-200 block">{language === 'bn' ? 'মোট বিনিয়োগ ব্যয়' : 'Total Investment'}</span>
                <div className="text-2xl font-black text-white">৳{evalResult.totalInvestment.toLocaleString()}</div>
                <p className="text-[10px] text-forest-300">Acquisition + Feeds + Vet</p>
              </div>

              <div>
                <span className="text-[10px] text-forest-200 block">{language === 'bn' ? 'প্রত্যাশিত বিক্রয়মূল্য' : 'Projected Sale Price'}</span>
                <div className="text-2xl font-black text-emerald-300">৳{evalResult.projectedSellingPriceBdt.toLocaleString()}</div>
                <p className="text-[10px] text-forest-300">@ {evalResult.projectedFinalWeightKg} kg liveweight</p>
              </div>

              <div>
                <span className="text-[10px] text-forest-200 block">{language === 'bn' ? 'প্রত্যাশিত নীট লাভ' : 'Net Profit (ROI)'}</span>
                <div className="text-2xl font-black text-emerald-400">৳{evalResult.projectedNetProfitBdt.toLocaleString()}</div>
                <p className="text-[10px] text-emerald-300 font-bold">{evalResult.projectedRoiPercent}% ROI</p>
              </div>
            </div>
          </div>

          {/* Break-even & Cost Breakdown Details */}
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-4 text-xs">
            <h4 className="font-bold text-stone-900 text-sm">
              {language === 'bn' ? 'ব্যয় বিশ্লেষণ ও ব্রেক-ইভেন থ্রেশহোল্ড' : 'Cost Breakdown & Break-Even Margin'}
            </h4>

            <div className="space-y-2.5">
              <div className="flex justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-600">{language === 'bn' ? '১. গরু অধিগ্রহণ ব্যয় (ক্রয় + পরিবহন)' : '1. Total Acquisition Cost'}</span>
                <strong className="text-stone-900">৳{evalResult.totalAcquisitionCost.toLocaleString()}</strong>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-600">{language === 'bn' ? '২. মোট খাদ্য ব্যয় (মেয়াদভিত্তিক)' : '2. Total Feeding Cost'}</span>
                <strong className="text-amber-700">৳{evalResult.totalFeedingCost.toLocaleString()}</strong>
              </div>

              <div className="flex justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
                <span className="text-stone-600">{language === 'bn' ? '৩. অপ্রত্যাশিত ঝুঁকি তহবিল (Contingency)' : '3. Risk Contingency Buffer'}</span>
                <strong className="text-stone-700">৳{evalResult.contingencyCost.toLocaleString()}</strong>
              </div>

              <div className="flex justify-between p-3 rounded-xl bg-forest-50 border border-forest-200 text-forest-950 font-bold">
                <span>{language === 'bn' ? 'ব্রেক-ইভেন ন্যূনতম বিক্রয়মূল্য:' : 'Break-Even Minimum Sale Price:'}</span>
                <span className="text-forest-900">৳{evalResult.breakEvenSellingPriceBdt.toLocaleString()}</span>
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 text-stone-800 leading-relaxed">
              <strong>{language === 'bn' ? 'এআই উপদেষ্টা বিশ্লেষণ:' : 'Advisory Assessment:'} </strong>
              {language === 'bn' ? evalResult.recommendationBn : evalResult.recommendationEn}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
