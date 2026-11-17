import { Cattle, CattlePurpose } from '../types';

export interface NutritionRequirements {
  dryMatterKg: number; // DM
  crudeProteinGrams: number; // CP
  tdnKg: number; // Total Digestible Nutrients
  calciumGrams: number;
  phosphorusGrams: number;
  drinkingWaterLiters: number;
}

export interface RecommendedRation {
  greenFodderKg: number; // Napier/Corn/German
  dryFodderKg: number; // Paddy Straw / UMS
  concentrateMixKg: number; // Wheat bran, crushed corn, oil cake
  mineralPremixGrams: number;
  cleanWaterLiters: number;
  estimatedDailyCostBdt: number;
  nutritionalBreakdown: {
    providedDmKg: number;
    providedCpGrams: number;
    providedTdnKg: number;
    dmFulfillmentPercent: number;
    cpFulfillmentPercent: number;
    tdnFulfillmentPercent: number;
  };
  rationFormulaNotesBn: string;
  rationFormulaNotesEn: string;
}

/**
 * Calculates scientific nutrient requirement based on ICAR & BLRI Ruminant Nutrition Standards
 * adjusted for tropical Bangladesh conditions.
 */
export function calculateNutrientRequirements(
  bodyWeightKg: number,
  purpose: CattlePurpose,
  dailyMilkYieldLiters: number = 0,
  pregnancyMonths: number = 0,
  targetDailyGainGrams: number = 0
): NutritionRequirements {
  // 1. Dry Matter (DM) Intake baseline
  // Normal ruminants consume 2.5% to 3.2% of body weight in DM.
  // High yielding lactating cows consume up to 3.5% - 3.8% of body weight.
  let dmPercentOfBodyWeight = 2.6;

  if (purpose === 'dairy') {
    if (dailyMilkYieldLiters > 10) {
      dmPercentOfBodyWeight = 3.4;
    } else if (dailyMilkYieldLiters > 5) {
      dmPercentOfBodyWeight = 3.0;
    } else {
      dmPercentOfBodyWeight = 2.7;
    }
  } else if (purpose === 'beef_fattening') {
    dmPercentOfBodyWeight = 2.9; // High intake for rapid rumen conversion
  } else if (purpose === 'heifer') {
    dmPercentOfBodyWeight = 2.8;
  }

  const dryMatterKg = Number(((bodyWeightKg * dmPercentOfBodyWeight) / 100).toFixed(2));

  // 2. Maintenance CP & TDN
  // Maintenance: ~300g - 400g CP per 400kg animal + 2.5kg - 3.2kg TDN
  let maintenanceCpGrams = bodyWeightKg * 0.95; // ~380g for 400kg
  let maintenanceTdnKg = (bodyWeightKg / 100) * 0.75; // ~3.0kg for 400kg

  // Production addition: Milk yield
  // Each liter of 4.0% fat cow milk requires ~75g - 85g Crude Protein and ~0.35kg TDN
  const milkCpGrams = dailyMilkYieldLiters * 82;
  const milkTdnKg = dailyMilkYieldLiters * 0.36;

  // Production addition: Beef Gain
  // Each 100g of daily live weight gain requires ~40g CP and ~0.35kg TDN
  const gainCpGrams = (targetDailyGainGrams / 100) * 42;
  const gainTdnKg = (targetDailyGainGrams / 100) * 0.38;

  // Pregnancy addition (Last trimester > 6 months)
  let pregnancyCpGrams = 0;
  let pregnancyTdnKg = 0;
  if (pregnancyMonths >= 7) {
    pregnancyCpGrams = 180;
    pregnancyTdnKg = 0.9;
  }

  const crudeProteinGrams = Math.round(maintenanceCpGrams + milkCpGrams + gainCpGrams + pregnancyCpGrams);
  const tdnKg = Number((maintenanceTdnKg + milkTdnKg + gainTdnKg + pregnancyTdnKg).toFixed(2));

  // Minerals: Calcium (Ca) & Phosphorus (P)
  const calciumGrams = Math.round(15 + (dailyMilkYieldLiters * 3.0) + (bodyWeightKg * 0.05));
  const phosphorusGrams = Math.round(11 + (dailyMilkYieldLiters * 2.0) + (bodyWeightKg * 0.035));

  // Water requirement in Bangladesh climate: 4 - 6 Liters per kg of DM consumed + 2.5L per Liter of milk
  const drinkingWaterLiters = Math.round((dryMatterKg * 4.8) + (dailyMilkYieldLiters * 2.5));

  return {
    dryMatterKg,
    crudeProteinGrams,
    tdnKg,
    calciumGrams,
    phosphorusGrams,
    drinkingWaterLiters
  };
}

/**
 * Formulates a balanced practical ration using common Bangladesh feed ingredients:
 * - Napier Grass (20% DM, 9.5% CP, 55% TDN @ 3.5 BDT/kg)
 * - Dry Paddy Straw (88% DM, 3.8% CP, 42% TDN @ 12 BDT/kg)
 * - Balanced Farm Concentrate Mix (Wheat bran, crushed corn, mustard cake, rice polish)
 *   (89% DM, 18% CP, 74% TDN @ ~45 BDT/kg)
 */
export function formulateBalancedRation(
  cattle: Cattle,
  dailyMilkYieldLiters: number = 0,
  pregnancyMonths: number = 0,
  targetDailyGainGrams: number = 0
): RecommendedRation {
  const req = calculateNutrientRequirements(
    cattle.currentWeightKg,
    cattle.purpose,
    dailyMilkYieldLiters,
    pregnancyMonths,
    targetDailyGainGrams
  );

  let greenFodderKg = 0;
  let dryFodderKg = 0;
  let concentrateMixKg = 0;
  let mineralPremixGrams = 50;

  if (cattle.purpose === 'dairy') {
    // Dairy: High green roughage + adequate concentrate for production
    greenFodderKg = Math.round((cattle.currentWeightKg * 0.06) * 10) / 10; // ~24-28 kg for 450kg
    dryFodderKg = Math.round((cattle.currentWeightKg * 0.01) * 10) / 10; // ~4-5 kg straw
    concentrateMixKg = Number((1.5 + (dailyMilkYieldLiters * 0.4)).toFixed(2)); // 1.5kg maintenance + 400g per liter
    mineralPremixGrams = 60;
  } else if (cattle.purpose === 'beef_fattening') {
    // Beef fattening: 60% roughage + 40% energy-dense concentrate for fast ADG (800g+)
    greenFodderKg = Math.round((cattle.currentWeightKg * 0.045) * 10) / 10;
    dryFodderKg = Math.round((cattle.currentWeightKg * 0.012) * 10) / 10;
    concentrateMixKg = Number((cattle.currentWeightKg * 0.012).toFixed(2)); // ~5.5kg for 450kg bull
    mineralPremixGrams = 50;
  } else if (cattle.purpose === 'heifer') {
    greenFodderKg = Math.round((cattle.currentWeightKg * 0.05) * 10) / 10;
    dryFodderKg = Math.round((cattle.currentWeightKg * 0.01) * 10) / 10;
    concentrateMixKg = Number((1.2 + (cattle.currentWeightKg * 0.003)).toFixed(2));
    mineralPremixGrams = 40;
  } else {
    // Indigenous/Maintenance
    greenFodderKg = Math.round((cattle.currentWeightKg * 0.05) * 10) / 10;
    dryFodderKg = Math.round((cattle.currentWeightKg * 0.01) * 10) / 10;
    concentrateMixKg = 1.0;
    mineralPremixGrams = 30;
  }

  // Calculate actual supplied nutrients from the formulated ration
  // Napier: 20% DM, 9.5% CP, 55% TDN
  const dmFromGreen = greenFodderKg * 0.20;
  const cpFromGreen = (greenFodderKg * 0.20 * 0.095) * 1000;
  const tdnFromGreen = greenFodderKg * 0.20 * 0.55;

  // Straw: 88% DM, 3.8% CP, 42% TDN
  const dmFromStraw = dryFodderKg * 0.88;
  const cpFromStraw = (dryFodderKg * 0.88 * 0.038) * 1000;
  const tdnFromStraw = dryFodderKg * 0.88 * 0.42;

  // Concentrate: 89% DM, 18.5% CP, 74% TDN
  const dmFromConc = concentrateMixKg * 0.89;
  const cpFromConc = (concentrateMixKg * 0.89 * 0.185) * 1000;
  const tdnFromConc = concentrateMixKg * 0.89 * 0.74;

  const totalProvidedDmKg = Number((dmFromGreen + dmFromStraw + dmFromConc).toFixed(2));
  const totalProvidedCpG = Math.round(cpFromGreen + cpFromStraw + cpFromConc);
  const totalProvidedTdnKg = Number((tdnFromGreen + tdnFromStraw + tdnFromConc).toFixed(2));

  // Costs in BDT: Green Napier @ 3.5 BDT, Paddy Straw @ 12 BDT, Concentrate mix @ 45 BDT, Mineral mix @ 120 BDT/kg
  const dailyCost = Math.round(
    (greenFodderKg * 3.5) +
    (dryFodderKg * 12.0) +
    (concentrateMixKg * 45.0) +
    ((mineralPremixGrams / 1000) * 120.0)
  );

  return {
    greenFodderKg,
    dryFodderKg,
    concentrateMixKg,
    mineralPremixGrams,
    cleanWaterLiters: req.drinkingWaterLiters,
    estimatedDailyCostBdt: dailyCost,
    nutritionalBreakdown: {
      providedDmKg: totalProvidedDmKg,
      providedCpGrams: totalProvidedCpG,
      providedTdnKg: totalProvidedTdnKg,
      dmFulfillmentPercent: Math.min(100, Math.round((totalProvidedDmKg / req.dryMatterKg) * 100)),
      cpFulfillmentPercent: Math.min(100, Math.round((totalProvidedCpG / req.crudeProteinGrams) * 100)),
      tdnFulfillmentPercent: Math.min(100, Math.round((totalProvidedTdnKg / req.tdnKg) * 100))
    },
    rationFormulaNotesBn: `রেশনে ৬০-৬৫% আঁশযুক্ত ঘাস (নেপিয়ার ও খড়) এবং ৩৫-৪০% পুষ্টিকর দানাদার মিশ্রণ (গমের ভুসি, ভুট্টা ভাঙা ও সরিষার খৈল) অন্তর্ভুক্ত রয়েছে। সাথে দৈনিক ${mineralPremixGrams} গ্রাম মিনারেল প্রিমিক্স ও পর্যাপ্ত পরিষ্কার বিশুদ্ধ পানি সরবরাহ নিশ্চিত করুন।`,
    rationFormulaNotesEn: `Ration balances 60-65% fibrous roughage (Napier grass & paddy straw) with 35-40% concentrated energy/protein mix (wheat bran, crushed corn, oil cake). Supplement with ${mineralPremixGrams}g mineral premix and ad-libitum clean drinking water.`
  };
}
