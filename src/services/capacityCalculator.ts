import { HousingSystem } from '../types';

export interface SpacePlannerInputs {
  totalLandDecimals: number;
  landLengthFt: number;
  landWidthFt: number;
  shedLengthFt: number;
  shedWidthFt: number;
  housingSystem: HousingSystem;
  cattleCategory: 'adult_crossbred_dairy' | 'indigenous_deshi' | 'fattening_bull' | 'growing_heifer' | 'young_calf';
  feedingBunkLengthFt: number;
  openPaddockSqft: number;
  ventilationQuality: 'excellent_high_roof' | 'moderate' | 'poor_low_roof';
  drainageSlopePercent: number;
  hasDedicatedManurePit: boolean;
  hasIsolationPen: boolean;
}

export interface CapacityCalculationResult {
  coveredShedAreaSqft: number;
  usableAnimalFloorAreaSqft: number; // Excluding central passage and gutters
  capacityByCoveredSpace: number;
  capacityByFeedingBunk: number;
  capacityByOpenPaddock: number;
  recommendedSafeCapacity: number;
  limitingFactor: string;
  limitingFactorBn: string;
  spacePerAnimalSqft: number;
  feedingLengthPerAnimalFt: number;
  openExercisePerAnimalSqft: number;
  ventilationStatus: {
    isAdequate: boolean;
    noteEn: string;
    noteBn: string;
  };
  drainageStatus: {
    isAdequate: boolean;
    slope: number;
    noteEn: string;
    noteBn: string;
  };
  manureManagementAssessment: {
    isAdequate: boolean;
    estimatedDailyDungKg: number;
    estimatedDailyUrineLiters: number;
    recommendationBn: string;
    recommendationEn: string;
  };
  safetyWarnings: string[];
  safetyWarningsBn: string[];
}

export function calculateFarmCapacity(inputs: SpacePlannerInputs): CapacityCalculationResult {
  const coveredShedAreaSqft = inputs.shedLengthFt * inputs.shedWidthFt;

  // Deduction for service alleys, feeding alley, and manure gutters (approx 30% of total shed)
  const usableFloorFraction = inputs.housingSystem === 'tie_stall' ? 0.70 : 0.75;
  const usableAnimalFloorAreaSqft = coveredShedAreaSqft * usableFloorFraction;

  // Space standards derived from Bangladesh DLS & BAU Livestock Housing guidelines
  let requiredCoveredSqftPerHead = 45;
  let requiredFeedingLengthFt = 2.5;
  let requiredOpenPaddockSqft = 80;
  let dailyDungPerHeadKg = 25;
  let dailyUrinePerHeadL = 15;

  switch (inputs.cattleCategory) {
    case 'adult_crossbred_dairy':
      requiredCoveredSqftPerHead = 48; // 45-50 sqft
      requiredFeedingLengthFt = 2.5;
      requiredOpenPaddockSqft = 90;
      dailyDungPerHeadKg = 28;
      dailyUrinePerHeadL = 16;
      break;
    case 'fattening_bull':
      requiredCoveredSqftPerHead = 50; // 45-55 sqft
      requiredFeedingLengthFt = 2.6;
      requiredOpenPaddockSqft = 80;
      dailyDungPerHeadKg = 24;
      dailyUrinePerHeadL = 14;
      break;
    case 'indigenous_deshi':
      requiredCoveredSqftPerHead = 32; // 30-35 sqft
      requiredFeedingLengthFt = 2.0;
      requiredOpenPaddockSqft = 60;
      dailyDungPerHeadKg = 15;
      dailyUrinePerHeadL = 10;
      break;
    case 'growing_heifer':
      requiredCoveredSqftPerHead = 30;
      requiredFeedingLengthFt = 1.8;
      requiredOpenPaddockSqft = 50;
      dailyDungPerHeadKg = 14;
      dailyUrinePerHeadL = 8;
      break;
    case 'young_calf':
      requiredCoveredSqftPerHead = 18;
      requiredFeedingLengthFt = 1.2;
      requiredOpenPaddockSqft = 25;
      dailyDungPerHeadKg = 6;
      dailyUrinePerHeadL = 4;
      break;
  }

  // Calculate capacities based on individual physical infrastructure constraints
  const capacityByCoveredSpace = Math.max(1, Math.floor(usableAnimalFloorAreaSqft / requiredCoveredSqftPerHead));
  const capacityByFeedingBunk = Math.max(1, Math.floor(inputs.feedingBunkLengthFt / requiredFeedingLengthFt));
  const capacityByOpenPaddock = inputs.openPaddockSqft > 0 
    ? Math.max(1, Math.floor(inputs.openPaddockSqft / requiredOpenPaddockSqft))
    : capacityByCoveredSpace; // In zero-grazing tie stall, paddock might be minimal

  // The true biological and humane safe capacity is strictly dictated by the BOTTLENECK (limiting factor), NEVER by land size!
  let recommendedSafeCapacity = Math.min(capacityByCoveredSpace, capacityByFeedingBunk);
  if (inputs.housingSystem === 'loose_housing' && inputs.openPaddockSqft > 0) {
    recommendedSafeCapacity = Math.min(recommendedSafeCapacity, capacityByOpenPaddock);
  }

  // Adjust for ventilation limitations
  let ventWarning = '';
  let ventWarningBn = '';
  if (inputs.ventilationQuality === 'poor_low_roof') {
    recommendedSafeCapacity = Math.max(1, Math.floor(recommendedSafeCapacity * 0.8)); // 20% reduction to prevent ammonia buildup
    ventWarning = 'Ventilation is rated poor (low ceiling/insufficient airflow). Capacity reduced by 20% to safeguard against respiratory illness and heat stress.';
    ventWarningBn = 'বাতাস চলাচল অপর্যাপ্ত বা চাল নিচু হওয়ায় শ্বাসকষ্ট ও গরমের ধকল এড়াতে ধারণক্ষমতা ২০% কমানো হয়েছে।';
  }

  let limitingFactor = 'Covered Shed Space';
  let limitingFactorBn = 'শেডের অভ্যন্তরীণ কার্যকর জায়গা';
  if (capacityByFeedingBunk < capacityByCoveredSpace && capacityByFeedingBunk <= recommendedSafeCapacity) {
    limitingFactor = 'Feeding Bunk Length (Cattle will compete and fight if not enough manger space)';
    limitingFactorBn = 'খাবারের পাত্র বা চাড়ির দৈর্ঘ্য (পর্যাপ্ত খাবার পাত্র না থাকলে গরু মারামারি করবে)';
  } else if (inputs.openPaddockSqft > 0 && capacityByOpenPaddock < recommendedSafeCapacity) {
    limitingFactor = 'Open Exercise Paddock Area';
    limitingFactorBn = 'খোলা হাঁটার জায়গা (প্যাডক)';
  }

  // Drainage analysis
  const isDrainageAdequate = inputs.drainageSlopePercent >= 1.5;

  // Waste calculation for the safe herd capacity
  const totalDungKg = recommendedSafeCapacity * dailyDungPerHeadKg;
  const totalUrineL = recommendedSafeCapacity * dailyUrinePerHeadL;

  const safetyWarnings: string[] = [];
  const safetyWarningsBn: string[] = [];

  if (!isDrainageAdequate) {
    safetyWarnings.push('Drainage slope is under 1.5%. Water pooling will cause severe hoof rot (Interdigital Dermatitis) and high humidity.');
    safetyWarningsBn.push('ড্রেনের ঢাল ১.৫%-এর কম। পানি জমে খুর পচা রোগ ও আর্দ্রতাজনিত রোগ সৃষ্টি হতে পারে।');
  }

  if (!inputs.hasDedicatedManurePit) {
    safetyWarnings.push('No dedicated covered dung pit or biogas plant detected. Accumulating 100+ kg dung daily near shed invites flies and LSD vector outbreaks.');
    safetyWarningsBn.push('নির্দিষ্ট গোবর পিট বা বায়োগ্যাস প্ল্যান্ট নেই। খোলা গোবর থাকলে মাছি ও এলএসডি রোগের বাহক দ্রুত বংশবৃদ্ধি করে।');
  }

  if (!inputs.hasIsolationPen) {
    safetyWarnings.push('No designated isolation/quarantine pen. Introduce an isolated pen at least 15m away for newly purchased or sick cattle.');
    safetyWarningsBn.push('পৃথক কোয়ারেন্টাইন শেড নেই। নতুন বা অসুস্থ গরুর জন্য মূল শেড থেকে ১৫ মিটার দূরে আলাদা শেড থাকা আবশ্যক।');
  }

  return {
    coveredShedAreaSqft,
    usableAnimalFloorAreaSqft,
    capacityByCoveredSpace,
    capacityByFeedingBunk,
    capacityByOpenPaddock,
    recommendedSafeCapacity,
    limitingFactor,
    limitingFactorBn,
    spacePerAnimalSqft: requiredCoveredSqftPerHead,
    feedingLengthPerAnimalFt: requiredFeedingLengthFt,
    openExercisePerAnimalSqft: requiredOpenPaddockSqft,
    ventilationStatus: {
      isAdequate: inputs.ventilationQuality !== 'poor_low_roof',
      noteEn: ventWarning || 'Adequate roof height and natural cross-ventilation maintained.',
      noteBn: ventWarningBn || 'পর্যাপ্ত চালের উচ্চতা ও স্বাভাবিক বাতাস চলাচলের অনুকূল পরিবেশ রয়েছে।'
    },
    drainageStatus: {
      isAdequate: isDrainageAdequate,
      slope: inputs.drainageSlopePercent,
      noteEn: isDrainageAdequate 
        ? 'Slope is optimal (1.5% - 2.5%) for rapid runoff and dry bedding.'
        : 'Slope is too flat (<1.5%). Concrete floor must be regraded towards the collection gutter.',
      noteBn: isDrainageAdequate
        ? 'ড্রেনের ঢাল উপযুক্ত (১.৫% - ২.৫%), পানি ও প্রস্রাব দ্রুত নিষ্কাশিত হবে।'
        : 'ড্রেনের ঢাল অপ্রতুল (<১.৫%)। মেঝেতে পানি জমে খুর নরম ও সংক্রামিত হতে পারে।'
    },
    manureManagementAssessment: {
      isAdequate: inputs.hasDedicatedManurePit,
      estimatedDailyDungKg: totalDungKg,
      estimatedDailyUrineLiters: totalUrineL,
      recommendationBn: `প্রতিদিন আনুমানিক ${totalDungKg} কেজি গোবর এবং ${totalUrineL} লিটার প্রস্রাব নির্গত হবে। একটি ৮-১০ ঘনমিটারের বায়োগ্যাস প্ল্যান্ট বা ভার্মিকম্পোস্ট শেড তৈরি করলে মাসে অতিরিক্ত ৮,০০০-১২,০০০ টাকা আয় সম্ভব।`,
      recommendationEn: `Estimated daily output is ${totalDungKg} kg dung and ${totalUrineL} liters urine. Installing an 8-10 m³ biogas unit or vermicompost pit can generate BDT 8,000-12,000 monthly in clean gas and organic fertilizer.`
    },
    safetyWarnings,
    safetyWarningsBn
  };
}
