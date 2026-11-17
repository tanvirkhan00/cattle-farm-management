export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'cattle_purchase'
  | 'feed_purchase'
  | 'veterinary_medicine'
  | 'veterinary_fees'
  | 'labor_wages'
  | 'electricity_utility'
  | 'transportation'
  | 'farm_maintenance'
  | 'infrastructure'
  | 'cattle_sale'
  | 'milk_sale'
  | 'manure_vermicompost_sale'
  | 'other_income'
  | 'other_expense';

export type PaymentMethod = 'cash' | 'bank_transfer' | 'bkash' | 'nagad' | 'credit';

export interface FinancialTransaction {
  id: string;
  cattleId?: string;
  cattleTagId?: string;
  transactionType: TransactionType;
  category: TransactionCategory;
  amountBdt: number;
  transactionDate: string;
  paymentMethod: PaymentMethod;
  vendorBuyerName?: string;
  invoiceReceiptNo?: string;
  description: string;
}

export interface PurchaseScenario {
  breedId: string;
  estimatedAgeMonths: number;
  initialWeightKg: number;
  purchasePriceBdt: number;
  transportCostBdt: number;
  veterinaryCostBdt: number;
  dailyFeedCostBdt: number;
  holdingDays: number;
  expectedDailyGainGrams: number;
  expectedSellingPricePerKgBdt: number;
  contingencyPercent: number;
}

export interface PurchaseEvaluationResult {
  totalAcquisitionCost: number;
  totalFeedingCost: number;
  totalVeterinaryCost: number;
  contingencyCost: number;
  totalInvestment: number;
  projectedFinalWeightKg: number;
  projectedSellingPriceBdt: number;
  breakEvenSellingPriceBdt: number;
  projectedNetProfitBdt: number;
  projectedRoiPercent: number;
  riskRating: 'Low' | 'Moderate' | 'High';
  recommendationBn: string;
  recommendationEn: string;
}
