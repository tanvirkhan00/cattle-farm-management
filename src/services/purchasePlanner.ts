import { PurchaseScenario, PurchaseEvaluationResult } from '../types';

export function evaluatePurchaseScenario(params: PurchaseScenario): PurchaseEvaluationResult {
  const totalAcquisitionCost = params.purchasePriceBdt + params.transportCostBdt + params.veterinaryCostBdt;
  const totalFeedingCost = params.dailyFeedCostBdt * params.holdingDays;
  
  // Veterinary & routine health during holding (deworming, liver tonic, vaccines ~BDT 1200)
  const totalVeterinaryCost = 1500;
  
  // Contingency & mortality risk allowance (3% - 5%)
  const subtotal = totalAcquisitionCost + totalFeedingCost + totalVeterinaryCost;
  const contingencyCost = Math.round(subtotal * (params.contingencyPercent / 100));
  const totalInvestment = subtotal + contingencyCost;

  // Weight projection
  const totalWeightGainKg = (params.expectedDailyGainGrams * params.holdingDays) / 1000;
  const projectedFinalWeightKg = Math.round(params.initialWeightKg + totalWeightGainKg);

  // Projected Selling Price:
  // In Bangladesh, live weight price in Eid haat or beef butcher trades typically ranges 500 - 620 BDT/kg live weight
  const projectedSellingPriceBdt = Math.round(projectedFinalWeightKg * params.expectedSellingPricePerKgBdt);

  // Break-even price
  const breakEvenSellingPriceBdt = totalInvestment;
  const projectedNetProfitBdt = projectedSellingPriceBdt - totalInvestment;
  const projectedRoiPercent = Number(((projectedNetProfitBdt / totalInvestment) * 100).toFixed(1));

  // Risk assessment
  let riskRating: 'Low' | 'Moderate' | 'High' = 'Moderate';
  let recommendationBn = '';
  let recommendationEn = '';

  if (projectedRoiPercent >= 22) {
    riskRating = 'Low';
    recommendationBn = `চমৎকার বিনিয়োগ সম্ভাবনা! আনুমানিক মোট লাভ ৳${projectedNetProfitBdt.toLocaleString()} (ROI: ${projectedRoiPercent}%)। ${params.holdingDays} দিনের মধ্যে গরুটি ${projectedFinalWeightKg} কেজি ওজনে পৌঁছাবে। ক্রয় করা যুক্তিযুক্ত।`;
    recommendationEn = `Strong investment potential! Projected net profit BDT ${projectedNetProfitBdt.toLocaleString()} (${projectedRoiPercent}% ROI). Reaching ${projectedFinalWeightKg} kg over ${params.holdingDays} days makes this purchase financially viable.`;
  } else if (projectedRoiPercent >= 10) {
    riskRating = 'Moderate';
    recommendationBn = `মাঝারি লাভজনক বিনিয়োগ (ROI: ${projectedRoiPercent}%)। আনুমানিক নীট লাভ ৳${projectedNetProfitBdt.toLocaleString()}। খাদ্যমূল্যের ওঠানামা ও রোগবালাই নিয়ন্ত্রণের দিকে কড়া নজর রাখতে হবে।`;
    recommendationEn = `Moderate return (ROI: ${projectedRoiPercent}%). Projected net profit BDT ${projectedNetProfitBdt.toLocaleString()}. Profitability depends strictly on holding feed costs stable and preventing health setbacks.`;
  } else {
    riskRating = 'High';
    recommendationBn = `উচ্চ ঝুঁকিপূর্ণ প্রস্তাব! আনুমানিক ROI মাত্র ${projectedRoiPercent}% (লাভ ৳${projectedNetProfitBdt.toLocaleString()})। ক্রয়মূল্য বা পরিবহন খরচ বেশি হওয়ায় ব্রেক-ইভেন ঝুঁকি রয়েছে। ক্রয়মূল্য কমানোর চেষ্টা করুন।`;
    recommendationEn = `High financial risk! Projected ROI is only ${projectedRoiPercent}%. Acquisition cost or holding duration is too high relative to realistic liveweight sale prices. Renegotiate purchase price.`;
  }

  return {
    totalAcquisitionCost,
    totalFeedingCost,
    totalVeterinaryCost,
    contingencyCost,
    totalInvestment,
    projectedFinalWeightKg,
    projectedSellingPriceBdt,
    breakEvenSellingPriceBdt,
    projectedNetProfitBdt,
    projectedRoiPercent,
    riskRating,
    recommendationBn,
    recommendationEn
  };
}
