import { KnowledgeDocument } from '../types';

export const KNOWLEDGE_DATABASE: KnowledgeDocument[] = [
  {
    id: 'knd-1',
    titleEn: 'National Livestock Extension Policy & Cattle Vaccination Guidelines',
    titleBn: 'জাতীয় প্রাণিসম্পদ সম্প্রসারণ নীতি ও গবাদিপশুর টিকা নির্দেশিকা',
    publisherOrganization: 'DLS',
    publicationYear: 2024,
    sourceUrl: 'https://dls.gov.bd/guidelines/livestock-vaccination-schedule',
    topic: 'veterinary',
    geographicRelevance: 'Bangladesh Nationwide (All 64 Districts)',
    summaryBn: 'ডিপার্টমেন্ট অব লাইভস্টক সার্ভিসেস (ডিএলএস) কর্তৃক প্রকাশিত সরকারি টিকা ও কৃমিনাশক নির্দেশিকা। এতে ক্ষুরারোগ (FMD), লাম্পি স্কিন ডিজিজ (LSD), গলাফুলা (HS), বাদলা (BQ) ও তড়কা (Anthrax) টিকার সঠিক প্রয়োগ বয়স, বুস্টার ডোজ ও সংরক্ষণ তাপমাত্রা উল্লেখ আছে।',
    summaryEn: 'Official government protocol on cattle immunization schedules, vaccine cold-chain preservation (2°C - 8°C), and seasonal outbreak containment issued by the Department of Livestock Services.',
    keyRecommendations: [
      'Maintain vaccine cold chain without interruption; use ice packs during field administration',
      'Deworm cattle with broad-spectrum anthelmintic 7-10 days before vaccine administration for optimal antibody titer',
      'Never vaccinate animals suffering from active fever or severe debilitating systemic illness',
      'Follow biannual FMD vaccination in March-April and September-October'
    ],
    isVerified: true,
    lastVerifiedDate: '2026-06-10'
  },
  {
    id: 'knd-2',
    titleEn: 'Scientific Beef Cattle Fattening Manual for Commercial Farms in Bangladesh',
    titleBn: 'বাণিজ্যিক খামারে বৈজ্ঞানিক পদ্ধতিতে গরু হৃষ্টপুষ্টকরণ নির্দেশিকা',
    publisherOrganization: 'BLRI',
    publicationYear: 2023,
    sourceUrl: 'https://blri.gov.bd/publications/beef-fattening-technology',
    topic: 'business_feasibility',
    geographicRelevance: 'Bangladesh (Targeted for Eid-ul-Adha fattening entrepreneurs)',
    summaryBn: 'বাংলাদেশ প্রাণিসম্পদ গবেষণা ইনস্টিটিউট (বিএলআরআই) উদ্ভাবিত নিরাপদ গরু মোটাতাজাকরণ প্রযুক্তি। ক্ষতিকর স্টেরয়েড বা হরমোন ছাড়া শুধুমাত্র সুষম খাদ্য, ইউরিয়া প্রক্রিয়াজাত খড় এবং নিয়মিত কৃমিনাশক প্রয়োগের মাধ্যমে দৈনিক ৮০০-১০০০ গ্রাম স্বাস্থ্যকর মাংস বৃদ্ধি করার সম্পূর্ণ বৈজ্ঞানিক প্যাকেজ।',
    summaryEn: 'Comprehensive BLRI guide detailing 90-to-120 day natural fattening protocols utilizing high-protein bypass concentrates and Urea Molasses Straw without banned synthetic steroids or hormones.',
    keyRecommendations: [
      'Target healthy bulls aged 2 to 2.5 years weighing 200-250 kg for optimal feed-to-meat conversion',
      'Strictly avoid illegal dexamethasone and cyproheptadine steroids which cause fatal water retention and renal toxicity',
      'Formulate rations with 60% good roughage (Napier/Silage/Straw) and 40% balanced concentrate',
      'Target purchasing 90-120 days prior to Eid-ul-Adha when prices are at rational pre-market levels'
    ],
    isVerified: true,
    lastVerifiedDate: '2026-07-15'
  },
  {
    id: 'knd-3',
    titleEn: 'Year-round High Yielding Green Fodder Production & Silage Preservation',
    titleBn: 'বছরব্যাপী উচ্চফলনশীল ঘাস চাষ ও সাইলেজ প্রস্তুতকরণ নির্দেশিকা',
    publisherOrganization: 'BLRI',
    publicationYear: 2024,
    sourceUrl: 'https://blri.gov.bd/fodder/super-napier-silage-technology',
    topic: 'nutrition',
    geographicRelevance: 'Highland, Medium-Highland and Char lands of Bangladesh',
    summaryBn: 'পাকচং-১ সুপার নেপিয়ার ও মিষ্টি ভুট্টা চাষের প্রযুক্তি। প্রতি শতক জমিতে বছরে ৮-১০ টন সবুজ ঘাস উৎপাদনের ধাপ এবং বর্ষাকালে বা বন্যায় ঘাসের সংকট মোকাবিলায় প্লাস্টিক ড্রাম বা ব্যাগে পুষ্টিকর সাইলেজ তৈরির নিয়মাবলী।',
    summaryEn: 'Technical bulletin on maximizing biomass yield per decimal using Pakchong-1 Napier and making high-energy whole-crop corn silage with lactic acid fermentation.',
    keyRecommendations: [
      'Dedicate at least 1 to 1.5 decimals of irrigated land per adult cow for zero-purchased-grass farm profitability',
      'Harvest Napier grass at 45 to 55 days for ideal crude protein (9-11%) and low lignin fiber',
      'Wilting fodder to 30-35% dry matter before compacting in airtight bags is critical for anaerobic lactic fermentation',
      'Well-prepared silage can be preserved for up to 18 months without nutritional deterioration'
    ],
    isVerified: true,
    lastVerifiedDate: '2026-05-20'
  },
  {
    id: 'knd-4',
    titleEn: 'Dairy Farm Shed Construction, Ventilation & Heat Stress Mitigation Standards',
    titleBn: 'ডেইরি শেড নির্মাণ, বাতাস চলাচল ও তাপজনিত ধকল প্রশমন নীতিমালা',
    publisherOrganization: 'BAU',
    publicationYear: 2023,
    sourceUrl: 'https://bau.edu.bd/livestock-housing-standards',
    topic: 'housing',
    geographicRelevance: 'Tropical Monsoon Climate of Bangladesh',
    summaryBn: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (বাকৃবি) ডেইরি সায়েন্স বিভাগের স্থাপত্য নির্দেশিকা। এতে শেডের পূর্ব-পশ্চিম দিকনির্দেশনা, চালের উচ্চতা (১২-১৪ ফুট), ঢালু ড্রেনেজ ব্যবস্থা (২% ঢাল), ফ্যান এবং ফগার স্প্রিংকলার ব্যবহারের হিসাব বর্ণিত হয়েছে।',
    summaryEn: 'Engineering specifications for climate-resilient dairy sheds in humid tropical Bangladesh, focusing on natural cross-ventilation, roofing materials, and water drainage gradients.',
    keyRecommendations: [
      'Orient shed length strictly East-to-West to avoid direct sun rays entering inside the shed',
      'Maintain minimum ridge height of 14 feet with monitor roof open ridge for hot ammonia convection escape',
      'Provide 40-50 sq ft covered space per adult crossbred cow plus 80-100 sq ft open exercise paddock',
      'Floor must have non-slippery groove finish with 1.5% to 2% slope towards manure collection drain'
    ],
    isVerified: true,
    lastVerifiedDate: '2026-08-02'
  },
  {
    id: 'knd-5',
    titleEn: 'Biosecurity Protocols for Farm Infection Prevention & Quarantining',
    titleBn: 'খামারের জৈব নিরাপত্তা বিধিমালা ও নতুন গবাদিপশুর সঙ্গরোধ (কোয়ারেন্টাইন)',
    publisherOrganization: 'FAO',
    publicationYear: 2024,
    sourceUrl: 'https://fao.org/bangladesh/livestock-biosecurity-toolkit',
    topic: 'veterinary',
    geographicRelevance: 'South Asia & Bangladesh Intensive Farming Clusters',
    summaryBn: 'এফএও ও প্রাণিসম্পদ অধিদপ্তরের যৌথ টেকনিক্যাল নির্দেশিকা। হাটের রোগজীবাণু যাতে খামারে প্রবেশ করতে না পারে সেজন্য নতুন পশু কমপক্ষে ২১ দিন আলাদা রাখার সুনির্দিষ্ট নিয়মনীতি এবং জীবাণুনাশক ব্যবহারের তালিকা।',
    summaryEn: 'Standard operating procedures for farm gate biosecurity, disinfection footbaths, worker sanitary gear, and 21-day quarantine protocols for newly introduced livestock.',
    keyRecommendations: [
      'Maintain a designated quarantine stall at minimum 15-20 meters distance from main cattle herd',
      'Keep newly purchased animals under observation for 21 days for incubation of FMD, LSD, or respiratory pathogens',
      'Install vehicles wheel dip and entrance personnel footbath with 4% sodium carbonate or caustic wash',
      'Prohibit unauthorized external visitors and cattle traders from entering animal sheds directly'
    ],
    isVerified: true,
    lastVerifiedDate: '2026-09-12'
  }
];
