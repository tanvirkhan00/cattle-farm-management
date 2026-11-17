export interface AdvisorMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  dataSourcesCited?: string[];
  assumptionsUsed?: string[];
  disclaimers?: string[];
  isFlaggedMedicalEmergency?: boolean;
  suggestedFollowUps?: string[];
}

export interface BusinessPlanParams {
  availableCapitalBdt: number;
  totalLandDecimals: number;
  locationDistrict: string;
  availableLaborCount: number;
  existingInfrastructure: 'none' | 'basic_shed' | 'developed_shed';
  preferredModel: 'dairy' | 'beef_fattening' | 'breeding' | 'integrated';
  ownFodderAvailable: boolean;
}

export interface BusinessPlanProjection {
  planTitle: string;
  initialInvestmentBdt: number;
  recommendedCattleCount: number;
  recommendedBreeds: string[];
  monthlyOperatingCostBdt: number;
  monthlyRevenueEstimateBdt: number;
  annualNetProfitBdt: number;
  paybackPeriodMonths: number;
  breakevenMonth: number;
  keyRisks: string[];
  riskMitigation: string[];
  fodderStrategy: string;
  seasonalActionTimeline: {
    period: string;
    actionBn: string;
    actionEn: string;
  }[];
}

export interface KnowledgeDocument {
  id: string;
  titleEn: string;
  titleBn: string;
  publisherOrganization: 'DLS' | 'BLRI' | 'BAU' | 'DAE' | 'FAO' | 'WOAH';
  publicationYear: number;
  sourceUrl?: string;
  topic: 'nutrition' | 'veterinary' | 'breeding' | 'housing' | 'seasonal_care' | 'business_feasibility';
  geographicRelevance: string;
  summaryBn: string;
  summaryEn: string;
  keyRecommendations: string[];
  isVerified: boolean;
  lastVerifiedDate: string;
}
