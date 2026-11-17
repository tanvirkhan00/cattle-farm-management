import React, { useState } from 'react';
import { 
  Calendar, Sun, CloudRain, Wind, Snowflake, 
  Flower2, AlertTriangle, CheckCircle2, ShoppingCart, 
  Sprout, ShieldAlert, Sparkles, ChevronRight, Edit3 
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BangladeshSeason } from '../types';

export const SeasonalPlanner: React.FC = () => {
  const { language } = useLanguage();
  const [selectedSeason, setSelectedSeason] = useState<BangladeshSeason>('late_autumn');

  const SEASONS_DATA = [
    {
      id: 'summer' as BangladeshSeason,
      nameBn: 'গ্রীষ্ম কাল (বৈশাখের খরতাপ)',
      nameEn: 'Summer (Grishma: Mid-Apr to Mid-Jun)',
      icon: Sun,
      color: 'amber',
      temperatureRange: '34°C - 41°C',
      keyRiskBn: 'হিট স্ট্রোক, পানিশূন্যতা ও হাই-ইল্ডিং হলস্টেইন গাভীর দুধ হ্রাস',
      keyRiskEn: 'Severe Heat Stress, dehydration, drop in milk yield in Holstein crosses',
      actions: {
        purchasingBn: 'কুরবানি হাটের জন্য শেষ মুহূর্তের ক্রয় বা সাধারণ রক্ষণাবেক্ষণ। দূরবর্তী হাট থেকে দুপুরের রোদে পশু পরিবহন সম্পূর্ণ নিষিদ্ধ।',
        purchasingEn: 'Avoid long-distance cattle transport during peak midday heat. Good time for concluding Eid bull preparation.',
        fodderBn: 'পাকচং নেপিয়ার ও ভুট্টার জমিতে সপ্তাহে ২ বার গভীর সেচ প্রদান। খরায় ঘাসের গোড়ায় পাতা পুড়ে যাওয়া রোধে মালচিং।',
        fodderEn: 'Deep irrigation twice weekly for Napier and maize plots. Apply soil mulching to conserve moisture.',
        healthBn: 'শেডে ফ্যান ও ফগার স্প্রিংকলার চালু রাখা। খাবার পানিতে ইলেক্ট্রোলাইট ও ভিটামিন সি মিশিয়ে দেওয়া।',
        healthEn: 'Run exhaust fans and mist sprinklers during 11 AM - 3 PM. Add oral electrolytes to drinking troughs.',
        eidStrategyBn: 'ঈদুল আজহা যদি গ্রীষ্মে হয়, তবে পশুদের চামড়ার জেল্লা ও খুরা সতেজ রাখতে নিয়মিত ছায়ায় ঠান্ডা পানিতে গোসল করাতে হবে।',
        eidStrategyEn: 'Ensure daily cold sponging to maintain glossy hair coat and lively alertness for buyers.'
      }
    },
    {
      id: 'monsoon' as BangladeshSeason,
      nameBn: 'বর্ষা কাল (আষাঢ়-শ্রাবণ)',
      nameEn: 'Monsoon (Barsha: Mid-Jun to Mid-Aug)',
      icon: CloudRain,
      color: 'blue',
      temperatureRange: '28°C - 33°C (High Humidity >85%)',
      keyRiskBn: 'ক্ষুরারোগ (FMD), লাম্পি স্কিন ডিজিজ (LSD), গলাফুলা (HS) ও খুর পচা',
      keyRiskEn: 'FMD, Lumpy Skin Disease (LSD), Hemorrhagic Septicemia (HS), and Foot Rot',
      actions: {
        purchasingBn: 'বর্ষার পানিতে হাটের কাদা ও সংক্রমিত পশু থেকে রোগ আসার ঝুঁকি সর্বোচ্চ। যেকোনো কেনা গরু ২১ দিন কোয়ারেন্টাইনে রাখা বাধ্যতামূলক।',
        purchasingEn: 'High biosecurity hazard in flooded haats. Mandatory 21-day quarantine before mixing with main barn.',
        fodderBn: 'নিচু জমি প্লাবিত হওয়ার আগেই উচ্চফলনশীল ঘাস কেটে সাইলেজ তৈরি বা উঁচু ভিটায় প্যারা/জার্মান ঘাস চাষ।',
        fodderEn: 'Harvest and ensile surplus corn before floodplain submersion. Maintain water-tolerant Para/German grass on ridges.',
        healthBn: 'মেঝেতে শুকনো চুন (কলিচুন) গুঁড়া ছিটানো। শেডের চারপাশে মশারি টানানো ও নিমের ধোঁয়া দিয়ে মশা-মাছি দমন।',
        healthEn: 'Dust dry slaked lime along gutters twice weekly. Use physical mosquito nets around sheds at sunset.',
        eidStrategyBn: 'ভেজা স্যাঁতসেঁতে ট্রাক পরিবহনে নিউমোনিয়া ও ক্ষতের ঝুঁকি থাকে; ট্রাকে কাঠের গুঁড়া বা শুকনো খড় বিছাতে হবে।',
        eidStrategyEn: 'Line transport truck beds with dry sawdust or thick straw to prevent slipping and shipping fever.'
      }
    },
    {
      id: 'autumn' as BangladeshSeason,
      nameBn: 'শরৎ কাল (ভাদ্র-আশ্বিন)',
      nameEn: 'Autumn (Sharat: Mid-Aug to Mid-Oct)',
      icon: Wind,
      color: 'sky',
      temperatureRange: '29°C - 34°C',
      keyRiskBn: 'পোস্ট-মনসুন পরজীবী, কলিজা কৃমি (Liver Fluke) ও রক্ত প্রস্রাব (Babesiosis)',
      keyRiskEn: 'Post-flood internal flukes, gastrointestinal worms, tick-borne babesiosis',
      actions: {
        purchasingBn: 'আসন্ন শীত ও আগামী বছরের কুরবানি লক্ষ্যের জন্য আদর্শ ক্রয় উইন্ডো। উত্তরাঞ্চলের হাটে তুলনামূলক কম দামে বাছুর পাওয়া যায়।',
        purchasingEn: 'Excellent procurement window for long-cycle fattening bulls from northern regional markets at rational rates.',
        fodderBn: 'বন্যার পলিমাটিতে দ্রুত বর্ধনশীল মাসকালাই, খেসারি বা মিষ্টি ভুট্টা রোপণ। সাইলেজ প্রস্তুতকরণের সেরা সময়।',
        fodderEn: 'Sow post-monsoon legumes (Khesari, Mashkalai) and sweet maize in fertile silt soils. Prime silage making window.',
        healthBn: 'সমস্ত পশুকে ট্রাইক্লাবেন্ডাজল বা ব্রড-স্পেকট্রাম কৃমিনাশক প্রদান। গায়ের আঁটালি বা উকুন প্রতিরোধে সাইপারমেথ্রিন স্প্রে।',
        healthEn: 'Comprehensive herd deworming with Triclabendazole/Albendazole followed by liver tonics. Spray acaricides for ticks.',
        eidStrategyBn: 'আগামী কুরবানির ৬ মাস আগের পরিকল্পনা অনুযায়ী ফ্রেমওয়ালা রোগমুক্ত এঁড়ে বাছুর নির্বাচন।',
        eidStrategyEn: 'Select large-skeletal frame young bulls for 180-day structured fattening regimens.'
      }
    },
    {
      id: 'late_autumn' as BangladeshSeason,
      nameBn: 'হেমন্ত কাল (কার্তিক-অগ্রহায়ণ - বর্তমান)',
      nameEn: 'Late Autumn (Hemanta: Mid-Oct to Mid-Dec - Active)',
      icon: Sprout,
      color: 'emerald',
      temperatureRange: '22°C - 30°C (Pleasant, Low Humidity)',
      keyRiskBn: 'ঋতু পরিবর্তনের সর্দি, বাছুরের খুসখুসে কাশি ও খড়ের অভাবজনিত আঁশ ঘাটতি',
      keyRiskEn: 'Seasonal transition cough, early winter respiratory onset in newborn calves',
      actions: {
        purchasingBn: '৯০-১২০ দিনের নিবিড় মোটাতাজাকরণের জন্য গরু ক্রয়ের সবচেয়ে নিরাপদ সময়। রোগবালাই কম থাকে।',
        purchasingEn: 'Safest period to stock bulls for intensive 90-120 day feeding cycles. Low ambient pathogen pressure.',
        fodderBn: 'আমন ধান কাটার খড় সংগ্রহ ও শুকিয়ে নিরাপদে মাচায় সংরক্ষণ। খড়ের দাম এ সময় সর্বনিম্ন থাকে।',
        fodderEn: 'Procure and store dry Aman paddy straw at seasonal floor prices. Prepare winter oats and legume plots.',
        healthBn: 'শীতের প্রকোপ আসার আগেই বাছুরের নিউমোনিয়া প্রতিরোধে শেডের উত্তর ও পশ্চিম পাশের চটের পর্দা প্রস্তুত রাখা।',
        healthEn: 'Fit north-facing burlap jute curtains on barn walls to block cold night drafts while preserving ridge exhaust.',
        eidStrategyBn: 'উচ্চ প্রোটিনযুক্ত খাদ্য (গমের ভুসি, ভুট্টা ভাঙা, খৈল) দিয়ে দৈনিক ৮০০-১০০০ গ্রাম লক্ষ্যমাত্রা শুরু।',
        eidStrategyEn: 'Initiate high-density concentrate feeding aiming for 800-1000g Average Daily Gain (ADG).'
      }
    },
    {
      id: 'winter' as BangladeshSeason,
      nameBn: 'শীত কাল (পৌষ-মাঘ)',
      nameEn: 'Winter (Sheet: Mid-Dec to Mid-Feb)',
      icon: Snowflake,
      color: 'indigo',
      temperatureRange: '9°C - 24°C (Cold Waves in North BD)',
      keyRiskBn: 'বাছুরের নিউমোনিয়া (Cold Stress), ডায়রিয়া ও পায়ের বাত ব্যথা',
      keyRiskEn: 'Calf pneumonia, cold stress, neonatal diarrhea, joint stiffness in seniors',
      actions: {
        purchasingBn: 'দূরবর্তী খোলা ট্রাকে কনকনে শীতে পশু আনা নিষেধ। রাতে কুয়াশায় ঢাকা ট্রাকে বাছুর আনলে নিউমোনিয়া নিশ্চিত।',
        purchasingEn: 'Never transport open truck livestock during freezing foggy nights; causes acute shipping pneumonia.',
        fodderBn: 'শীতের সকালে শিশিরভেজা কাঁচা ঘাস সরাসরি খাওয়াবেন না (পেট ফাঁপা ও ডায়রিয়ার ঝুঁকি থাকে)। রোদে শুকিয়ে খাওয়ান।',
        fodderEn: 'Never feed frost/dew-covered lush grass on empty morning rumen; wilt in sun to prevent acute tympany.',
        healthBn: 'বাছুরের ঘরে মোটা শুকনো খড়ের লিটার বিছানো। বাছুরকে গরম কাপড় বা চটের জ্যাকেট পরানো। কুসুম গরম পানি খাওয়ানো।',
        healthEn: 'Spread thick dry straw bedding (6-8 inches) in calf pens. Offer lukewarm drinking water.',
        eidStrategyBn: 'শীতকালে গরুর ক্ষুধা বাড়ে; সুষম দানাদার খাদ্য দিলে এ সময় সর্বোচ্চ দৈহিক বৃদ্ধি ঘটে।',
        eidStrategyEn: 'Feed intake peaks during cool weather; capitalize on superior feed efficiency for maximum beef gain.'
      }
    },
    {
      id: 'spring' as BangladeshSeason,
      nameBn: 'বসন্ত কাল (ফাল্গুন-চৈত্র)',
      nameEn: 'Spring (Basanta: Mid-Feb to Mid-Apr)',
      icon: Flower2,
      color: 'rose',
      temperatureRange: '24°C - 33°C',
      keyRiskBn: 'আঁটালি পোকার আক্রমণ, ক্ষুরারোগের প্রাক-গ্রীষ্ম ঢেউ ও তাপমাত্রা বৃদ্ধিজনিত অস্বস্তি',
      keyRiskEn: 'Vector tick resurgence, pre-summer FMD wave, sudden temperature swings',
      actions: {
        purchasingBn: 'কুরবানি হাটের শেষ প্রস্তুতিমূলক পর্যায়। হাটের শেষ ভিড় শুরুর আগেই স্থানীয় বিশ্বস্ত খামার থেকে বুকিং নেওয়া।',
        purchasingEn: 'Pre-Eid concluding procurement. Lock in direct farm gate contracts before haat broker markups.',
        fodderBn: 'গ্রীষ্মের জন্য নেপিয়ার কাটিং রোপণ এবং ভুট্টার দ্বিতীয় ফসলের চাষ শুরু।',
        fodderEn: 'Plant new vegetative Napier stem cuttings and irrigate second-season fodder maize.',
        healthBn: 'ডিএলএস-এর বাৎসরিক এফএমডি ও অ্যানথ্রাক্স টিকার বসন্তকালীন বুস্টার ডোজ সম্পন্ন করা।',
        healthEn: 'Administer annual spring FMD booster and Anthrax spore vaccination as per DLS extension calendar.',
        eidStrategyBn: 'কুরবানি গরুর ওজন ও স্বাস্থ্য নিয়মিত মেপে ক্যাটালগ ও ফটো তৈরি এবং ডিজিটাল বুকিং শুরু।',
        eidStrategyEn: 'Catalogue bull liveweights, take professional photos, and initiate pre-Eid direct corporate marketing.'
      }
    }
  ];

  const currentSeasonData = SEASONS_DATA.find(s => s.id === selectedSeason) || SEASONS_DATA[3];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Seasonal Planner Title */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-50 border border-forest-200 text-xs font-semibold text-forest-800 mb-2">
              <Calendar size={14} />
              <span>{language === 'bn' ? 'বাংলাদেশ ষড়ঋতু কৃষি চক্র' : 'Bangladesh 6-Season Agro Calendar'}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-stone-900 tracking-tight">
              {language === 'bn' ? 'মৌসুমি খামার পরিকল্পনা ও কুরবানি ক্যালেন্ডার' : 'Seasonal Livestock Calendar & Eid Demand Cycles'}
            </h2>
            <p className="text-xs md:text-sm text-stone-600 mt-1 max-w-2xl">
              {language === 'bn'
                ? 'বাংলাদেশের ঋতুভেদে রোগবালাই, ঘাস চাষ, শেড ব্যবস্থাপনা ও কুরবানি হাটের সময়োপযোগী প্রস্তুতি নির্দেশিকা।'
                : 'Bangladesh-specific seasonal disease vectors, fodder cultivation scheduling, and Eid-ul-Adha procurement windows.'}
            </p>
          </div>
        </div>
      </div>

      {/* Six Seasons Navigation Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {SEASONS_DATA.map(season => {
          const Icon = season.icon;
          const isSelected = selectedSeason === season.id;

          return (
            <button
              key={season.id}
              onClick={() => setSelectedSeason(season.id)}
              className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between h-24
                ${isSelected 
                  ? 'bg-forest-900 border-forest-900 text-white shadow-card ring-2 ring-forest-500/20' 
                  : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700 shadow-soft'}
              `}
            >
              <div className="flex items-center justify-between w-full">
                <Icon size={20} className={isSelected ? 'text-emerald-400' : 'text-stone-400'} />
                {season.id === 'late_autumn' && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-forest-100 text-forest-800'}`}>
                    Active
                  </span>
                )}
              </div>
              <div>
                <p className={`text-xs font-bold truncate ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                  {language === 'bn' ? season.nameBn.split('(')[0] : season.nameEn.split('(')[0]}
                </p>
                <p className={`text-[10px] truncate ${isSelected ? 'text-forest-200' : 'text-stone-400'}`}>
                  {season.temperatureRange}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Season Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Comprehensive Guidance */}
        <div className="lg:col-span-2 space-y-4">
          {/* Key Seasonal Risk Alert Card */}
          <div className="bg-amber-50 border-2 border-amber-200/80 p-5 rounded-3xl text-xs space-y-2">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-sm">
              <ShieldAlert size={18} className="text-amber-600" />
              <span>{language === 'bn' ? 'প্রধান মৌসুমি স্বাস্থ্য ঝুঁকি:' : 'Seasonal Disease Vulnerability:'}</span>
            </div>
            <p className="text-amber-900 font-medium leading-relaxed">
              {language === 'bn' ? currentSeasonData.keyRiskBn : currentSeasonData.keyRiskEn}
            </p>
          </div>

          {/* 4 Core Management Directives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Cattle Purchasing */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft space-y-2">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-forest-50 text-forest-700 flex items-center justify-center">
                  <ShoppingCart size={15} />
                </div>
                <span>{language === 'bn' ? 'গরু ক্রয় ও পরিবহন নির্দেশিকা' : 'Procurement & Transport'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'bn' ? currentSeasonData.actions.purchasingBn : currentSeasonData.actions.purchasingEn}
              </p>
            </div>

            {/* 2. Fodder Cultivation */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft space-y-2">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Sprout size={15} />
                </div>
                <span>{language === 'bn' ? 'ঘাস চাষ ও পুষ্টি পরিকল্পনা' : 'Fodder & Pasture Schedule'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'bn' ? currentSeasonData.actions.fodderBn : currentSeasonData.actions.fodderEn}
              </p>
            </div>

            {/* 3. Shed & Biosecurity */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft space-y-2">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                  <CheckCircle2 size={15} />
                </div>
                <span>{language === 'bn' ? 'শেড পরিবেশ ও স্বাস্থ্যবিধি' : 'Shed Environment & Biosecurity'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'bn' ? currentSeasonData.actions.healthBn : currentSeasonData.actions.healthEn}
              </p>
            </div>

            {/* 4. Eid Fattening Strategy */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-soft space-y-2">
              <div className="flex items-center space-x-2 text-stone-900 font-bold text-xs">
                <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                  <Sparkles size={15} />
                </div>
                <span>{language === 'bn' ? 'কুরবানি মোটাতাজাকরণ ও বিক্রয়' : 'Eid Fattening & Marketing'}</span>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                {language === 'bn' ? currentSeasonData.actions.eidStrategyBn : currentSeasonData.actions.eidStrategyEn}
              </p>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Market Price Index & Seasonal Feed Availability */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-soft space-y-5">
          <div className="pb-3 border-b border-stone-100 flex items-center justify-between">
            <h3 className="font-bold text-stone-900 text-sm">
              {language === 'bn' ? 'মৌসুমি খাদ্য ও হাটের দরসূচক' : 'Seasonal Price Index (BDT)'}
            </h3>
            <span className="text-[10px] text-stone-400 font-semibold">Gazipur/Dhaka Region</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
              <span className="text-stone-700 font-medium">{language === 'bn' ? 'কাঁচা নেপিয়ার ঘাস' : 'Green Napier Grass'}</span>
              <span className="font-bold text-stone-900">৳৩.৫০ / কেজি</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
              <span className="text-stone-700 font-medium">{language === 'bn' ? 'শুকনো আমন খড়' : 'Dry Paddy Straw'}</span>
              <span className="font-bold text-stone-900">৳১২.০০ / কেজি</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
              <span className="text-stone-700 font-medium">{language === 'bn' ? 'ভুট্টা সাইলেজ (ব্যাগ)' : 'Maize Corn Silage'}</span>
              <span className="font-bold text-stone-900">৳৯.০০ / কেজি</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
              <span className="text-stone-700 font-medium">{language === 'bn' ? 'গমের ভুসি' : 'Wheat Bran'}</span>
              <span className="font-bold text-stone-900">৳৪৪.০০ / কেজি</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
              <span className="text-stone-700 font-medium">{language === 'bn' ? 'ভুট্টা ভাঙা' : 'Crushed Maize Grain'}</span>
              <span className="font-bold text-stone-900">৳৩৮.০০ / কেজি</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50 border border-stone-200/60">
              <span className="text-stone-700 font-medium">{language === 'bn' ? 'কুরবানি লাইভওয়েট দর' : 'Liveweight Beef Rate'}</span>
              <span className="font-bold text-emerald-700">৳৫৫০ - ৬২০ / কেজি</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-forest-50 border border-forest-200 text-[11px] text-forest-900">
            <p className="font-bold mb-1">{language === 'bn' ? '💡 মৌসুমি সাশ্রয় টিপস:' : '💡 Seasonal Savings Tip:'}</p>
            <p className="leading-relaxed">
              {language === 'bn'
                ? 'কার্তিক-অগ্রহায়ণে আমন ধান কাটার সময় সারা বছরের প্রয়োজনীয় শুকনো খড় কিনে মাচায় পলিথিন দিয়ে ঢেকে রাখুন। ভরা বর্ষায় খড়ের দাম দ্বিগুণ হয়ে যায়।'
                : 'Bulk buy dry Aman paddy straw immediately post-harvest in late autumn. Straw costs rise by 80-100% during prolonged monsoon floods.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
