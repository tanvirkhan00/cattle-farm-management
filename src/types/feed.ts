export type FeedCategory = 
  | 'green_fodder' 
  | 'dry_fodder' 
  | 'concentrate' 
  | 'silage' 
  | 'hay' 
  | 'mineral_premix' 
  | 'additive';

export interface FeedType {
  id: string;
  nameEn: string;
  nameBn: string;
  category: FeedCategory;
  dryMatterPercent: number; // DM %
  crudeProteinPercent: number; // CP %
  tdnPercent: number; // Total Digestible Nutrients %
  calciumPercent?: number;
  phosphorusPercent?: number;
  costPerKgBdt: number;
  localAvailability: 'readily_available' | 'seasonal' | 'market_imported';
  description?: string;
}

export interface FeedPlan {
  id: string;
  cattleId?: string;
  cattleTagId?: string;
  planName: string;
  targetCategory: 'lactating_dairy' | 'dry_pregnant' | 'growing_calf' | 'beef_fattening_initial' | 'beef_fattening_finishing' | 'breeding_bull';
  dailyGreenFodderKg: number;
  dailyDryFodderKg: number;
  dailyConcentrateKg: number;
  mineralMixGrams: number;
  dailyWaterLiters: number;
  estimatedDailyCostBdt: number;
  nutritionistApproved: boolean;
  approvedBy?: string;
  approvalDate?: string;
  startDate: string;
  notes?: string;
}

export interface FeedInventoryItem {
  id: string;
  feedTypeId: string;
  feedNameEn: string;
  feedNameBn: string;
  category: FeedCategory;
  batchNumber?: string;
  currentStockKg: number;
  minimumThresholdKg: number;
  unitCostBdt: number;
  supplierName?: string;
  storageLocation?: string;
  expiryDate?: string;
  lastRestockedDate?: string;
}

export interface FeedingLog {
  id: string;
  cattleId?: string;
  cattleTagId?: string;
  feedTypeId: string;
  feedName: string;
  quantityKg: number;
  costBdt: number;
  feedingShift: 'morning' | 'noon' | 'evening' | 'night';
  recordedDate: string;
}
