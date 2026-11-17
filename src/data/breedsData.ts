import { Breed } from '../types';

export const BREEDS_DATABASE: Breed[] = [
  {
    id: 'b-rcc',
    code: 'RCC',
    nameEn: 'Red Chittagong Cattle (RCC)',
    nameBn: 'রেড চিটাগাং ক্যাটেল (আরসিসি)',
    origin: 'Chittagong Division, Bangladesh',
    primaryPurpose: 'dual_purpose',
    climateSuitability: 'Extremely well adapted to hot, humid, and coastal tropical climate of Bangladesh.',
    heatToleranceLevel: 'high',
    averageMaleWeightKg: 280,
    averageFemaleWeightKg: 200,
    dailyMilkYieldLiters: 4.5,
    lactationPeriodDays: 240,
    calvingIntervalMonths: 13.5,
    feedEfficiency: 'High roughage digestibility; survives and reproduces on low-quality agricultural by-products.',
    commonHealthRisks: [
      'Tick infestations in monsoon (though inherently more tick-resistant than exotics)',
      'Internal gastrointestinal nematodes during rainy season',
    ],
    advantages: [
      'National pride and heritage genetic resource of Bangladesh (BLRI conservation priority)',
      'Exceptional disease resistance and heat tolerance',
      'Short calving interval with high fertility rate (>80%)',
      'High milk fat percentage (4.5% - 5.2%) and tender meat texture',
      'Low veterinary cost and low capital requirement'
    ],
    limitations: [
      'Lower total daily milk volume compared to Holstein crosses',
      'Smaller body frame size for high-end industrial beef output'
    ],
    isVerified: true,
    verificationSource: 'Bangladesh Livestock Research Institute (BLRI) & Department of Livestock Services (DLS)',
    descriptionEn: 'The Red Chittagong Cattle is a recognized indigenous dairy-beef germplasm characterized by deep red coat color, red muzzle, eyes, and hooves, celebrated for reproductive resilience.',
    descriptionBn: 'রেড চিটাগাং ক্যাটেল (আরসিসি) বাংলাদেশের একটি অত্যন্ত মূল্যবান নিজস্ব জাত। এদের রোগ প্রতিরোধ ক্ষমতা ও প্রজনন সক্ষমতা অসাধারণ।'
  },
  {
    id: 'b-pabna',
    code: 'PABNA',
    nameEn: 'Pabna Cattle',
    nameBn: 'পাবনা জাতের গরু',
    origin: 'Pabna & Sirajganj (Bathan area), Bangladesh',
    primaryPurpose: 'dairy',
    climateSuitability: 'Well adapted to floodplains and riverside grazing systems of the Jamuna basin.',
    heatToleranceLevel: 'high',
    averageMaleWeightKg: 350,
    averageFemaleWeightKg: 250,
    dailyMilkYieldLiters: 6.5,
    lactationPeriodDays: 260,
    calvingIntervalMonths: 14.0,
    feedEfficiency: 'Excellent grazing efficiency on riverside seasonal bathan grasses and legume pastures.',
    commonHealthRisks: [
      'Fascioliasis (Liver fluke) in low-lying waterlogged bathan areas',
      'Foot problems during extended monsoon mud exposure'
    ],
    advantages: [
      'Premier indigenous dairy breed of Bangladesh with higher milk production than common deshi',
      'Developed by historic blending of Hariana, Sahiwal and indigenous stock in Pabna bathan',
      'Docile temperament, sturdy hooves, and strong maternal instincts',
      'Milk fat average 4.2% - 4.8%'
    ],
    limitations: [
      'Requires adequate green fodder to express full genetic potential',
      'Pure lines require strict selective breeding records'
    ],
    isVerified: true,
    verificationSource: 'BAU Animal Breeding Department & BLRI Bathan Studies',
    descriptionEn: 'Originating in the historic seasonal grazing bathans of Pabna and Sirajganj, Pabna cattle are prominent indigenous dairy stock with gray to white coats and moderate humps.',
    descriptionBn: 'পাবনা ও সিরাজগঞ্জের বাথান অঞ্চলে গড়ে ওঠা এ জাতটি দেশীয় গরুর মধ্যে অন্যতম সেরা দুধ উৎপাদনকারী।'
  },
  {
    id: 'b-nbg',
    code: 'NBG',
    nameEn: 'North Bengal Grey (NBG)',
    nameBn: 'উত্তরবঙ্গ ধূসর গরু',
    origin: 'Bogura, Gaibandha, Rangpur, Bangladesh',
    primaryPurpose: 'dual_purpose',
    climateSuitability: 'Excellent adaptation to northern dry winter and summer heat extremes.',
    heatToleranceLevel: 'high',
    averageMaleWeightKg: 340,
    averageFemaleWeightKg: 240,
    dailyMilkYieldLiters: 4.0,
    lactationPeriodDays: 230,
    calvingIntervalMonths: 14.5,
    feedEfficiency: 'Very hardy; thrives on paddy straw and local agricultural residues.',
    commonHealthRisks: [
      'Winter respiratory sensitivity in vulnerable newborn calves',
      'LSD skin lesions during pre-monsoon vector peaks'
    ],
    advantages: [
      'Strong compact body with powerful draft and beef conformation',
      'Uniform silver-grey to ash coat with darker shading on shoulders in males',
      'Very resilient against local seasonal temperature fluctuations'
    ],
    limitations: [
      'Moderate milk production strictly suited for dual/subsistence purpose'
    ],
    isVerified: true,
    verificationSource: 'BLRI Indigenous Germplasm Survey',
    descriptionEn: 'A native strain of northern Bangladesh noted for its distinctive ash-gray coloration, compact musculoskeletal frame, and resistance to harsh weather.',
    descriptionBn: 'উত্তরবঙ্গের নিজস্ব ঐতিহ্যবাহী ধূসর জাতের গরু, যা শক্ত গঠন এবং প্রতিকূল আবহাওয়ায় টিকে থাকার জন্য সুপরিচিত।'
  },
  {
    id: 'b-sahiwal',
    code: 'SAHIWAL',
    nameEn: 'Sahiwal Cross',
    nameBn: 'শাহীওয়াল ক্রস',
    origin: 'Punjab / Subcontinent (widely adopted in Bangladesh through DLS AI)',
    primaryPurpose: 'dual_purpose',
    climateSuitability: 'High heat tolerance and high tropical tick resistance.',
    heatToleranceLevel: 'high',
    averageMaleWeightKg: 500,
    averageFemaleWeightKg: 380,
    dailyMilkYieldLiters: 8.5,
    lactationPeriodDays: 280,
    calvingIntervalMonths: 15.0,
    feedEfficiency: 'Good converter of both green fodder and dry roughages.',
    commonHealthRisks: [
      'Occasional pendulous udder injuries if beddings are rough',
      'Calving difficulties if crossed with excessively large sire lines'
    ],
    advantages: [
      'Considered the finest zebu dairy breed in the tropics',
      'Reddish-dun coat, prominent loose skin dewlap, and calm demeanor',
      'High milk yield with sweet taste and 4.5% butterfat',
      'Very popular for beef fattening and Eid-ul-Adha trade due to heavy frame and attractive color'
    ],
    limitations: [
      'Slightly longer gestation and calving interval if nutritional balance is neglected',
      'Moderate growth rate compared to European beef crosses'
    ],
    isVerified: true,
    verificationSource: 'DLS Central Cattle Breeding & Dairy Farm (CCBDF), Savar',
    descriptionEn: 'The Sahiwal cross is among the most preferred breeds in Bangladesh for both commercial milk production and high-value Eid sacrificial bull rearing.',
    descriptionBn: 'শাহীওয়াল ক্রস বাংলাদেশে অত্যন্ত জনপ্রিয়। উন্নত দুধের পাশাপাশি আকর্ষণীয় লালচে রঙের কারণে কুরবানি হাটে এর বিশেষ চাহিদা রয়েছে।'
  },
  {
    id: 'b-hf-cross',
    code: 'HF_CROSS',
    nameEn: 'Holstein Friesian Cross (50% - 62.5%)',
    nameBn: 'হোলস্টেইন ফ্রিসিয়ান ক্রস',
    origin: 'Netherlands / DLS Artificial Insemination Program',
    primaryPurpose: 'dairy',
    climateSuitability: 'Moderate. Requires shed cooling, misting fans, and heat stress protection during summer and humid monsoon.',
    heatToleranceLevel: 'low',
    averageMaleWeightKg: 650,
    averageFemaleWeightKg: 460,
    dailyMilkYieldLiters: 16.0,
    lactationPeriodDays: 305,
    calvingIntervalMonths: 14.5,
    feedEfficiency: 'High nutritional demand; requires high-density concentrate and quality green fodder (silage/Napier).',
    commonHealthRisks: [
      'High susceptibility to severe Heat Stress (respiratory panting, milk drop)',
      'High vulnerability to Mastitis (requires strict milking parlor hygiene)',
      'Foot rot / lameness under damp unhygienic shed flooring',
      'High risk of Tick-borne diseases (Babesiosis, Theileriosis)'
    ],
    advantages: [
      'Unmatched daily milk production volume (12 to 24+ liters/day depending on management)',
      'Rapid growth rate and massive adult body frame',
      'Foundation of organized commercial dairy farming in Bangladesh'
    ],
    limitations: [
      'Higher feed cost and high management sensitivity',
      'Lower milk fat percentage (3.4% - 3.8%) compared to zebu cattle',
      'High mortality risk if biosecurity or heat mitigation fails'
    ],
    isVerified: true,
    verificationSource: 'DLS Dairy Development Guidelines & Milk Vita Breeder Surveys',
    descriptionEn: 'The commercial dairy backbone in Bangladesh, yielding substantial milk volume when maintained with proper crossbred genetics (<=62.5% HF) and well-ventilated housing.',
    descriptionBn: 'বাংলাদেশের বাণিজ্যিক ডেইরি খামারের প্রধান ভিত্তি। সঠিক পরিচর্যা ও ফ্যান-কুলিং ব্যবস্থা দিলে প্রচুর দুধ দেয়।'
  },
  {
    id: 'b-brahman-cross',
    code: 'BRAHMAN',
    nameEn: 'Brahman Cross (Beef Fattening)',
    nameBn: 'ব্রাহমা ক্রস (মাংস উৎপাদন)',
    origin: 'USA / DLS Beef Cattle Improvement Project',
    primaryPurpose: 'beef',
    climateSuitability: 'Exceptional tropical climate resistance and heat tolerance.',
    heatToleranceLevel: 'high',
    averageMaleWeightKg: 750,
    averageFemaleWeightKg: 500,
    dailyMilkYieldLiters: 3.0,
    lactationPeriodDays: 200,
    calvingIntervalMonths: 15.0,
    feedEfficiency: 'Superior Average Daily Gain (ADG) of 800g - 1200g/day under intensive beef fattening ration.',
    commonHealthRisks: [
      'Rumen acidosis if concentrate feeds are ramped up without adequate roughage fiber',
      'Joint strain if excessive weight is gained too rapidly on slippery concrete'
    ],
    advantages: [
      'Fastest weight gain and muscular carcass development in Bangladesh',
      'Massive hump, broad chest, and heavy muscular hindquarters',
      'Commands top-tier premium prices in Eid-ul-Adha sacrificial markets',
      'Excellent resistance to external ticks and hot sun'
    ],
    limitations: [
      'Not suitable for commercial dairy production',
      'Government policy strictly reserves semen for beef production, not dairy herds'
    ],
    isVerified: true,
    verificationSource: 'Department of Livestock Services (DLS) Beef Cattle Project',
    descriptionEn: 'Introduced specifically to address the national meat deficit and optimize beef fattening programs for high-value sacrificial cattle.',
    descriptionBn: 'মাংস উৎপাদন ও কুরবানির বাজারের জন্য দ্রুত বর্ধনশীল জাত। সঠিক সুষম খাবার পেলে দৈনিক ৮০০ থেকে ১২০০ গ্রাম পর্যন্ত ওজন বাড়ে।'
  },
  {
    id: 'b-jersey-cross',
    code: 'JERSEY_CROSS',
    nameEn: 'Jersey Cross',
    nameBn: 'জার্সি ক্রস',
    origin: 'Channel Island of Jersey / DLS AI',
    primaryPurpose: 'dairy',
    climateSuitability: 'Better heat tolerance than Holstein Friesian, adapts well to Bangladesh sub-tropical conditions.',
    heatToleranceLevel: 'moderate',
    averageMaleWeightKg: 450,
    averageFemaleWeightKg: 340,
    dailyMilkYieldLiters: 11.0,
    lactationPeriodDays: 290,
    calvingIntervalMonths: 13.5,
    feedEfficiency: 'High feed conversion ratio per kilogram of body weight.',
    commonHealthRisks: [
      'Subclinical hypocalcemia (Milk fever) during peak early lactation',
      'Occasional parasite burden if pasture-grazed'
    ],
    advantages: [
      'Exceptional milk butterfat (4.8% - 5.5%), golden yellow milk with rich aroma',
      'Smaller body weight means lower maintenance feed requirement than Friesians',
      'Earlier maturity and easier calving with lower dystocia incidence',
      'Docile temperament'
    ],
    limitations: [
      'Lower male calf beef price compared to heavy Friesian or Brahman cross'
    ],
    isVerified: true,
    verificationSource: 'BLRI Dairy Cattle Breeding Division',
    descriptionEn: 'A compact, highly efficient dairy cross with rich, high-fat milk and superior heat tolerance compared to larger European breeds.',
    descriptionBn: 'মাঝারি আকারের অথচ চমৎকার দুধ ও ফ্যাটের জন্য আদর্শ জাত। হোলস্টেইনের চেয়ে গরম সহ্য করার ক্ষমতা বেশি।'
  },
  {
    id: 'b-deshi',
    code: 'DESHI',
    nameEn: 'Indigenous Non-descript Deshi Cattle',
    nameBn: 'দেশি সাধারণ গরু',
    origin: 'Native across all 64 districts of Bangladesh',
    primaryPurpose: 'dual_purpose',
    climateSuitability: '100% natural adaptation to local floods, humidity, heat, and seasonal diseases.',
    heatToleranceLevel: 'high',
    averageMaleWeightKg: 220,
    averageFemaleWeightKg: 160,
    dailyMilkYieldLiters: 2.5,
    lactationPeriodDays: 210,
    calvingIntervalMonths: 13.0,
    feedEfficiency: 'Survives on poor-quality straw and roadside foraging.',
    commonHealthRisks: [
      'Low baseline productivity; vulnerable to severe liver flukes in waterlogged areas'
    ],
    advantages: [
      'Lowest mortality and lowest disease incidence',
      'Lowest investment cost; highly accessible across rural haats',
      'Highly valued for organic natural beef flavor in urban markets'
    ],
    limitations: [
      'Low commercial volume for specialized dairy or industrial feedlots'
    ],
    isVerified: true,
    verificationSource: 'DLS Annual Livestock Census',
    descriptionEn: 'The traditional indigenous cattle of Bangladesh, providing vital draft, domestic milk, and rural savings with maximum hardiness.',
    descriptionBn: 'গ্রামবাংলার চিরাচরিত দেশি জাতের গরু। প্রতিকূল পরিবেশে টিকে থাকার অসীম ক্ষমতা সম্পন্ন।'
  }
];
