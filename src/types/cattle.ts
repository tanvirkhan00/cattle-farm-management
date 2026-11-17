export type CattleGender = 'male' | 'female' | 'castrated_bull';

export type CattlePurpose = 'dairy' | 'beef_fattening' | 'breeding' | 'draft' | 'heifer';

export type CattleHealthStatus = 
  | 'healthy' 
  | 'under_observation' 
  | 'sick' 
  | 'under_treatment' 
  | 'quarantined' 
  | 'sold' 
  | 'deceased';

export type PregnancyStatus = 'not_pregnant' | 'suspected' | 'confirmed' | 'calved';

export interface WeightRecord {
  id: string;
  cattleId: string;
  weightKg: number;
  recordedDate: string;
  chestGirthInches?: number;
  bodyLengthInches?: number;
  averageDailyGainGrams?: number;
  notes?: string;
}

export interface Breed {
  id: string;
  code: string;
  nameEn: string;
  nameBn: string;
  origin: string;
  primaryPurpose: 'dairy' | 'beef' | 'dual_purpose' | 'draft';
  climateSuitability: string;
  heatToleranceLevel: 'high' | 'moderate' | 'low';
  averageMaleWeightKg: number;
  averageFemaleWeightKg: number;
  dailyMilkYieldLiters: number;
  lactationPeriodDays: number;
  calvingIntervalMonths: number;
  feedEfficiency: string;
  commonHealthRisks: string[];
  advantages: string[];
  limitations: string[];
  isVerified: boolean;
  verificationSource?: string;
  descriptionEn?: string;
  descriptionBn?: string;
}

export interface Cattle {
  id: string;
  tagId: string;
  name?: string;
  breedId: string;
  breedName?: string;
  gender: CattleGender;
  dateOfBirth?: string;
  estimatedAgeMonths?: number;
  purchaseDate?: string;
  purchasePrice?: number;
  transportCost?: number;
  currentWeightKg: number;
  bodyConditionScore?: number; // 1.0 to 5.0
  purpose: CattlePurpose;
  pregnancyStatus: PregnancyStatus;
  pregnancyCheckDate?: string;
  expectedCalvingDate?: string;
  healthStatus: CattleHealthStatus;
  housingPen?: string;
  photoUrl?: string;
  notes?: string;
  createdDate: string;
  updatedDate: string;
  weightHistory?: WeightRecord[];
}
