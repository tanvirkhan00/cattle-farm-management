import React, { useState } from 'react';
import { 
  Briefcase, TrendingUp, AlertTriangle, ShieldCheck, 
  Sparkles, CheckCircle2, ChevronRight, Calculator, 
  HelpCircle, Info, Landmark 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useFarm } from '../context/FarmContext';

export const BusinessPlanning: React.FC = () => {
  const { language } = useLanguage();
  const { settings } = useFarm();

  // User input states
  const [capitalBdt, setCapitalBdt] = useState<number>(500000);
  const [landDecimals, setLandDecimals] = useState<number>(settings.totalLandDecimals || 20);
  const [farmDistrict, setFarmDistrict] = useState<string>(settings.location.district || 'Gazipur');
  const [laborCount, setLaborCount] = useState<number>(2);
  const [infrastructure, setInfrastructure] = useState<'none' | 'basic_shed' | 'developed_shed'>('basic_shed');
  const [preferredModel, setPreferredModel] = useState<'dairy' | 'beef_fattening' | 'breeding' | 'integrated'>('beef_fattening');
  const [hasOwnFodderLand, setHasOwnFodderLand] = useState<boolean>(true);

  // Business models comparison matrix
  const MODEL_COMPARISONS = [
    {
      id: 'beef_fattening',
      titleEn: 'Beef Cattle Fattening (Eid-ul-Adha)',
      titleBn: 'কুরবানি ষাঁড় মোটাতাজাকরণ',
      cycleMonths: '3 - 4 Months',
      capitalRequirement: 'BDT 3.5L - 10L+',
      cashflowLiquidity: language === 'bn' ? 'উচ্চ (৯০-১২০ দিনে নগদ ফেরত)' : 'High (Liquidity in 90-120 days)',
      riskLevel: language === 'bn' ? 'মাঝারি' : 'Moderate',
      recommendedBreeds: 'Sahiwal Cross, Brahman Cross, Pabna Bull',
      suitabilityBn: 'শর্ট-টার্ম মুনাফা প্রত্যাশী উদ্যোক্তাদের জন্য সবচেয়ে কার্যকর। দুধের বাজার খোঁজার ঝামেলা নেই।',
      suitabilityEn: 'Best for entrepreneurs seeking fast capital turnaround without dealing with perishable daily milk marketing.'
    },
    {
      id: 'dairy',
      titleEn: 'Commercial Dairy Farming',
      titleBn: 'বাণিজ্যিক দুগ্ধ উৎপাদন (ডেইরি)',
      cycleMonths: 'Continuous (Daily cash)',
      capitalRequirement: 'BDT 8L - 25L+',
      cashflowLiquidity: language === 'bn' ? 'দৈনিক নগদ আয়' : 'Daily Cash Flow',
      riskLevel: language === 'bn' ? 'উচ্চ' : 'High',
      recommendedBreeds: 'Holstein Friesian Cross (<=62.5%), Jersey Cross, Sahiwal',
      suitabilityBn: 'নিয়মিত দৈনিক ক্যাশফ্লো দেয়, তবে উন্নত কুলিং শেড, সুষম খাদ্য ও ওলান প্রদাহ (Mastitis) নিয়ন্ত্রণে সর্বোচ্চ সতর্কতা আবশ্যক।',
      suitabilityEn: 'Provides reliable daily milk revenue, but demands strict cooling infrastructure, green fodder, and mastitis surveillance.'
    },
    {
      id: 'breeding',
      titleEn: 'Seedstock & Heifer Calf Breeding',
      titleBn: 'উন্নত জাতের বাছুর প্রজনন খামার',
      cycleMonths: '14 - 18 Months',
      capitalRequirement: 'BDT 6L - 15L',
      cashflowLiquidity: language === 'bn' ? 'ধীরগতির' : 'Slow',
      riskLevel: language === 'bn' ? 'মাঝারি' : 'Moderate',
      recommendedBreeds: 'Pure Red Chittagong (RCC), Sahiwal',
      suitabilityBn: 'উন্নত জেনেটিক্স সংরক্ষণ ও ভবিষ্যতের জন্য প্রজনন মানসম্পন্ন গাভী তৈরি।',
      suitabilityEn: 'Focused on conservation of high genetic merit cows and heifers for high-value sale.'
    },
    {
      id: 'integrated',
      titleEn: 'Integrated Dairy, Beef & Bio-fertilizer',
      titleBn: 'সমন্বিত খামার (দুধ + মাংস + বায়োগ্যাস ও কেঁচোসার)',
      cycleMonths: 'Year-round combined',
      capitalRequirement: 'BDT 12L - 30L+',
      cashflowLiquidity: language === 'bn' ? 'খুব ভালো' : 'Excellent',
      riskLevel: language === 'bn' ? 'ভারসাম্যপূর্ণ' : 'Balanced',
      recommendedBreeds: 'Mixed Crossbred herd',
      suitabilityBn: 'ঝুঁকি সর্বনিম্ন। ডেইরি থেকে দৈনন্দিন খরচ চলে, ষাঁড় বিক্রি থেকে এককালীন বড় মুনাফা আসে এবং গোবর থেকে বায়োগ্যাস সাশ্রয় হয়।',
      suitabilityEn: 'Lowest composite risk. Daily milk covers operating wages, annual bull sales deliver capital growth, and dung fuels biogas.'
    }
  ];

  // Dynamic calculations based on user inputs
  const calculateProjections = () => {
    let cattleCount = 3;
    let initialCattleCost = 0;
    let shedInvestment = 0;
    let feedCostMonthly = 0;
    let revenueMonthlyEstimate = 0;
    let paybackMonths = 12;

    if (preferredModel === 'beef_fattening') {
      const perBullCost = 90000;
      const budgetForCattle = capitalBdt * 0.55;
      cattleCount = Math.max(2, Math.floor(budgetForCattle / perBullCost));
      initialCattleCost = cattleCount * perBullCost;
      shedInvestment = infrastructure === 'none' ? 65000 : infrastructure === 'basic_shed' ? 30000 : 15000;
      
      // Feed cost per bull per day: ~110 BDT if own fodder, ~150 BDT if purchased
      const dailyFeedPerHead = hasOwnFodderLand ? 110 : 155;
      feedCostMonthly = cattleCount * dailyFeedPerHead * 30;
      
      // Net profit per cycle of 100 days: ~BDT 25,000 to 35,000 per bull
      const cycleNetProfit = cattleCount * 28000;
      revenueMonthlyEstimate = Math.round(cycleNetProfit / 3.5);
      paybackMonths = Math.round((capitalBdt / (cycleNetProfit * 2.5)) * 12);
    } else if (preferredModel === 'dairy') {
      const perCowCost = 165000; // Good crossbred milking cow
      const budgetForCattle = capitalBdt * 0.60;
      cattleCount = Math.max(1, Math.floor(budgetForCattle / perCowCost));
      initialCattleCost = cattleCount * perCowCost;
      shedInvestment = infrastructure === 'none' ? 95000 : 35000;
      
      const dailyFeedPerCow = hasOwnFodderLand ? 180 : 250;
      feedCostMonthly = cattleCount * dailyFeedPerCow * 30;
      
      // Average 12 liters/day @ 75 BDT/L
      const monthlyMilkSales = cattleCount * 12 * 75 * 30;
      revenueMonthlyEstimate = monthlyMilkSales;
      paybackMonths = 24;
    } else {
      // Integrated / Breeding
      cattleCount = Math.max(3, Math.floor((capitalBdt * 0.55) / 110000));
      initialCattleCost = cattleCount * 110000;
      shedInvestment = 60000;
      feedCostMonthly = cattleCount * (hasOwnFodderLand ? 130 : 180) * 30;
      revenueMonthlyEstimate = Math.round(capitalBdt * 0.08);
      paybackMonths = 18;
    }

    const netOperatingMonthly = revenueMonthlyEstimate - feedCostMonthly - (laborCount * 10000) - 4000;

    return {
      cattleCount,
      initialCattleCost,
      shedInvestment,
      feedCostMonthly,
      revenueMonthlyEstimate,
      netOperatingMonthly,
      paybackMonths: Math.max(6, paybackMonths)
    };
  };

  const proj = calculateProjections();

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
              <Landmark size={14} />
              <span>{language === 'bn' ? 'অর্থনৈতিক সম্ভাব্যতা ও মডেলিং' : 'Economic Feasibility & Modeling'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'bn' ? 'খামার ব্যবসায়িক পরিকল্পনা ও মূলধন উপদেষ্টা' : 'Farm Business Advisory & Investment Planner'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'আপনার মূলধন, জমির পরিমাণ ও আঞ্চলিক প্রেক্ষাপট অনুযায়ী সবচেয়ে উপযুক্ত ব্যবসায়িক মডেল এবং আনুমানিক লাভ-ক্ষতির চিত্র।'
                : 'Scientific financial projections tailored to your working capital, land holding, and Bangladesh market parameters.'}
            </p>
          </div>
        </div>
      </div>

      {/* Input Parameters Form Card */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex items-center space-x-2 pb-4 mb-4 border-b border-stone-100">
          <Calculator size={18} className="text-forest-700" />
          <h3 className="font-bold text-stone-900 text-sm">
            {language === 'bn' ? '১. খামারের ইনপুট ও প্রাথমিক তথ্য দিন' : '1. Enter Capital & Infrastructure Inputs'}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Capital */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'প্রারম্ভিক মূলধন (টাকা)' : 'Available Working Capital (BDT)'}
            </label>
            <input
              type="number"
              step="50000"
              value={capitalBdt}
              onChange={e => setCapitalBdt(Math.max(100000, Number(e.target.value)))}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 font-bold text-stone-900"
            />
            <p className="text-[10px] text-stone-400 mt-1">৳{(capitalBdt / 100000).toFixed(1)} {language === 'bn' ? 'লাখ টাকা' : 'Lakh BDT'}</p>
          </div>

          {/* Land */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'জমির পরিমাণ (শতক)' : 'Total Land Size (Decimals)'}
            </label>
            <input
              type="number"
              value={landDecimals}
              onChange={e => setLandDecimals(Math.max(2, Number(e.target.value)))}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 font-bold text-stone-900"
            />
            <p className="text-[10px] text-stone-400 mt-1">~{(landDecimals * 435.6).toFixed(0)} {language === 'bn' ? 'বর্গফুট' : 'sq ft'}</p>
          </div>

          {/* District */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'খামারের জেলা' : 'Farm District'}
            </label>
            <select
              value={farmDistrict}
              onChange={e => setFarmDistrict(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-stone-900"
            >
              <option value="Gazipur">Gazipur (গাজীপুর)</option>
              <option value="Dhaka">Dhaka (ঢাকা)</option>
              <option value="Sirajganj">Sirajganj (সিরাজগঞ্জ - বাথান অঞ্চল)</option>
              <option value="Pabna">Pabna (পাবনা)</option>
              <option value="Bogura">Bogura (বগুড়া)</option>
              <option value="Chittagong">Chittagong (চট্টগ্রাম)</option>
              <option value="Mymensingh">Mymensingh (ময়মনসিংহ)</option>
            </select>
          </div>

          {/* Preferred Model */}
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'পছন্দের ব্যবসায়িক মডেল' : 'Preferred Model'}
            </label>
            <select
              value={preferredModel}
              onChange={e => setPreferredModel(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 text-stone-900 font-semibold"
            >
              <option value="beef_fattening">{language === 'bn' ? 'কুরবানি মোটাতাজাকরণ' : 'Beef Fattening (Eid)'}</option>
              <option value="dairy">{language === 'bn' ? 'বাণিজ্যিক ডেইরি (দুধ)' : 'Commercial Dairy'}</option>
              <option value="integrated">{language === 'bn' ? 'সমন্বিত খামার' : 'Integrated Model'}</option>
              <option value="breeding">{language === 'bn' ? 'প্রজনন ও বাছুর খামার' : 'Breeding / Seedstock'}</option>
            </select>
          </div>
        </div>

        {/* Infrastructure & Fodder Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 pt-4 border-t border-stone-100 text-xs">
          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'বিদ্যমান শেড অবকাঠামো' : 'Existing Shed Infrastructure'}
            </label>
            <select
              value={infrastructure}
              onChange={e => setInfrastructure(e.target.value as any)}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500"
            >
              <option value="none">{language === 'bn' ? 'কোনো শেড নেই (নতুন বানাতে হবে)' : 'No Shed (Full construction needed)'}</option>
              <option value="basic_shed">{language === 'bn' ? 'প্রাথমিক শেড আছে (কিছু মেরামত প্রয়োজন)' : 'Basic Shed Available'}</option>
              <option value="developed_shed">{language === 'bn' ? 'পাকা আধুনিক শেড প্রস্তুত আছে' : 'Modern Concrete Shed Ready'}</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'নিজস্ব জমিতে কাঁচা ঘাস চাষ' : 'Dedicated Fodder Land Available?'}
            </label>
            <div className="flex space-x-2 mt-1">
              <button
                type="button"
                onClick={() => setHasOwnFodderLand(true)}
                className={`flex-1 py-1.5 px-3 rounded-xl font-bold border transition
                  ${hasOwnFodderLand ? 'bg-forest-100 border-forest-400 text-forest-900' : 'bg-stone-50 border-stone-200 text-stone-600'}
                `}
              >
                {language === 'bn' ? 'হ্যাঁ (নেপিয়ার চাষ আছে)' : 'Yes (Own Fodder)'}
              </button>
              <button
                type="button"
                onClick={() => setHasOwnFodderLand(false)}
                className={`flex-1 py-1.5 px-3 rounded-xl font-bold border transition
                  ${!hasOwnFodderLand ? 'bg-rose-50 border-rose-300 text-rose-900' : 'bg-stone-50 border-stone-200 text-stone-600'}
                `}
              >
                {language === 'bn' ? 'না (বাইরে থেকে কেনা)' : 'No (Purchased Feed)'}
              </button>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-stone-700 mb-1">
              {language === 'bn' ? 'কর্মরত শ্রমিক সংখ্যা' : 'Dedicated Labor / Workers'}
            </label>
            <input
              type="number"
              value={laborCount}
              onChange={e => setLaborCount(Math.max(1, Number(e.target.value)))}
              className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-forest-500 font-bold"
            />
          </div>
        </div>
      </div>

      {/* Generated Feasibility Projection Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Financial Feasibility Summary */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div>
              <h3 className="font-bold text-stone-900 text-sm">
                {language === 'bn' ? '২. আপনার জন্য তৈরি অর্থনৈতিক প্রাক্কলন' : '2. Tailored Financial Projections'}
              </h3>
              <p className="text-xs text-stone-500">
                {language === 'bn' ? 'বিএলআরআই স্ট্যান্ডার্ড ও বর্তমান বাজার দরের ভিত্তিতে' : 'Based on BLRI standard feed conversion ratios'}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-forest-100 text-forest-800 border border-forest-200">
              {proj.cattleCount} {language === 'bn' ? 'টি পশুর জন্য প্রস্তাবিত' : 'Head Recommended'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <span className="text-stone-500 font-medium">{language === 'bn' ? 'গরু ক্রয় বাজেট' : 'Cattle Acquisition'}</span>
              <div className="text-base font-black text-stone-900 mt-1">৳{proj.initialCattleCost.toLocaleString()}</div>
              <p className="text-[10px] text-stone-400">~{Math.round((proj.initialCattleCost / capitalBdt) * 100)}% {language === 'bn' ? 'মূলধনের' : 'of capital'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <span className="text-stone-500 font-medium">{language === 'bn' ? 'শেড ও অবকাঠামো' : 'Shed Setup'}</span>
              <div className="text-base font-black text-stone-900 mt-1">৳{proj.shedInvestment.toLocaleString()}</div>
              <p className="text-[10px] text-stone-400">{language === 'bn' ? 'এককালীন ব্যয়' : 'one-time setup'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/80">
              <span className="text-stone-500 font-medium">{language === 'bn' ? 'মাসিক খাদ্য বাজেট' : 'Monthly Feed'}</span>
              <div className="text-base font-black text-amber-700 mt-1">৳{proj.feedCostMonthly.toLocaleString()}</div>
              <p className="text-[10px] text-amber-600 font-semibold">{hasOwnFodderLand ? 'ঘাস থাকায় ৩০% সাশ্রয়' : 'Higher feed cost'}</p>
            </div>

            <div className="p-3 rounded-2xl bg-forest-50 border border-forest-200">
              <span className="text-forest-700 font-medium">{language === 'bn' ? 'আনুমানিক পে-ব্যাক' : 'Payback Period'}</span>
              <div className="text-base font-black text-forest-900 mt-1">{proj.paybackMonths} {language === 'bn' ? 'মাস' : 'Months'}</div>
              <p className="text-[10px] text-forest-700 font-semibold">{language === 'bn' ? 'মূলধন ফেরত আসার চক্র' : 'capital recovery'}</p>
            </div>
          </div>

          {/* Strategic Narrative Guidance */}
          <div className="p-4 rounded-2xl bg-cream-100 border border-cream-300 text-xs text-stone-800 space-y-2">
            <h4 className="font-bold text-stone-900 flex items-center space-x-1.5">
              <Sparkles size={15} className="text-forest-700" />
              <span>{language === 'bn' ? 'বিশেষজ্ঞ খামার সুপারিশ ও কৌশল' : 'Strategic Advisor Recommendation'}</span>
            </h4>
            <p className="leading-relaxed">
              {language === 'bn'
                ? `আপনার ৳${capitalBdt.toLocaleString()} মূলধন এবং ${landDecimals} শতক জমির প্রেক্ষাপটে ${proj.cattleCount}টি গরু দিয়ে শুরু করাই বিজ্ঞানসম্মত। মোট মূলধনের ২০-২৫% নগদ জরুরি তহবিল (Contingency fund) হিসেবে সংরক্ষিত রাখা হয়েছে যাতে খাদ্যের বাজারমূল্য বাড়লেও খামার সংকটে না পড়ে।`
                : `Given your capital of BDT ${capitalBdt.toLocaleString()} and ${landDecimals} decimals land, starting with ${proj.cattleCount} head is the optimal risk-adjusted strategy. A 20-25% cash buffer is reserved for contingency.`}
            </p>
            {!hasOwnFodderLand && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] font-medium flex items-center space-x-2">
                <AlertTriangle size={15} className="text-amber-600 flex-shrink-0" />
                <span>
                  {language === 'bn'
                    ? 'সতর্কতা: নিজস্ব কাঁচা ঘাস না থাকায় খাদ্য খরচ প্রায় ৩৫% বৃদ্ধি পাবে। অন্তত ৫-১০ শতক জমি লিজ নিয়ে পাকচং নেপিয়ার চাষের পরামর্শ দেওয়া হচ্ছে।'
                    : 'Notice: Lack of on-farm green fodder inflates feeding overheads by 35%. Cultivating Napier on 5-10 decimals leased land is strongly advised.'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Business Models Comparison */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-stone-900 text-sm mb-1">
              {language === 'bn' ? 'ব্যবসায়িক মডেলের তুলনা' : 'Model Comparison'}
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              {language === 'bn' ? 'বাংলাদেশের বাস্তবতায় ৪টি মডেলের বিশ্লেষণ' : 'Comparative pros & cons for Bangladesh'}
            </p>

            <div className="space-y-3">
              {MODEL_COMPARISONS.map(model => (
                <div 
                  key={model.id}
                  onClick={() => setPreferredModel(model.id as any)}
                  className={`p-3 rounded-2xl border text-xs cursor-pointer transition
                    ${preferredModel === model.id ? 'bg-forest-50 border-forest-400 ring-2 ring-forest-500/20' : 'bg-stone-50/50 border-stone-200 hover:bg-stone-100/60'}
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-stone-900">{language === 'bn' ? model.titleBn : model.titleEn}</span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-stone-200/70 text-stone-700">
                      {model.cycleMonths}
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-snug">
                    {language === 'bn' ? model.suitabilityBn : model.suitabilityEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 text-[10px] text-stone-400 text-center italic mt-4">
            {language === 'bn' ? '*কোনো বাণিজ্যিক মডেলে নির্দিষ্ট মুনাফার নিশ্চয়তা দেওয়া হয় না।' : '*Profits are realistic projections and never guaranteed.'}
          </div>
        </div>
      </div>
    </div>
  );
};
