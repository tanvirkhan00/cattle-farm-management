export type DiseaseCategory = 'viral' | 'bacterial' | 'parasitic' | 'metabolic' | 'fungal' | 'toxic';

export type BangladeshSeason = 
  | 'summer'      // Grishma (বৈশাখ-জ্যৈষ্ঠ: Mid-Apr to Mid-Jun)
  | 'monsoon'     // Barsha (আষাঢ়-শ্রাবণ: Mid-Jun to Mid-Aug)
  | 'autumn'      // Sharat (ভাদ্র-আশ্বিন: Mid-Aug to Mid-Oct)
  | 'late_autumn' // Hemanta (কার্তিক-অগ্রহায়ণ: Mid-Oct to Mid-Dec)
  | 'winter'      // Sheet (পৌষ-মাঘ: Mid-Dec to Mid-Feb)
  | 'spring'      // Basanta (ফাল্গুন-চৈত্র: Mid-Feb to Mid-Apr)
  | 'all_year';

export type DiseaseRiskLevel = 'low' | 'moderate' | 'high';

export interface PrescribedMedicine {
  medicineName: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  withdrawalPeriodDays: number;
  instructions?: string;
}

export interface Disease {
  id: string;
  code: string;
  nameEn: string;
  nameBn: string;
  scientificName?: string;
  category: DiseaseCategory;
  causeTransmission: string;
  primarySeason: BangladeshSeason;
  riskLevel: DiseaseRiskLevel;
  vulnerableGroups: string[];
  earlySymptoms: string[];
  advancedSymptoms: string[];
  emergencyWarningSigns: string[];
  preventionMethods: string[];
  biosecurityGuidelines: string[];
  vaccineAvailable: boolean;
  vaccineName?: string;
  vaccineScheduleInfo?: string;
  immediateResponseActions: string[];
  veterinaryAdvisoryProtocol: string;
  milkMeatWithdrawalGuidelines?: string;
  officialSource: string;
  lastVerifiedDate: string;
}

export interface HealthRecord {
  id: string;
  cattleId: string;
  cattleTagId?: string;
  examinationDate: string;
  attendingVeterinarian: string;
  vetRegNumber?: string;
  suspectedDiseaseId?: string;
  diseaseName?: string;
  symptomsObserved: string[];
  bodyTemperatureF?: number;
  clinicalObservations: string;
  prescribedTreatment: string;
  prescribedMedicines: PrescribedMedicine[];
  treatmentStartDate: string;
  followUpDate?: string;
  recoveryStatus: 'under_treatment' | 'improved' | 'recovered' | 'chronic' | 'deceased';
  milkWithdrawalUntil?: string;
  meatWithdrawalUntil?: string;
  vetPrescriptionFileUrl?: string;
  isEmergency?: boolean;
  notes?: string;
}

export interface VaccinationRecord {
  id: string;
  cattleId: string;
  cattleTagId?: string;
  procedureType: 'vaccine' | 'deworming' | 'vitamin_mineral_booster';
  diseaseId?: string;
  medicineOrVaccineName: string;
  batchLotNumber?: string;
  administeredDate?: string;
  scheduledDate: string;
  nextDueDate?: string;
  status: 'scheduled' | 'administered' | 'postponed' | 'overdue' | 'cancelled';
  administeredBy?: string;
  vetApprovalStatus: 'pending' | 'approved' | 'waived';
  notes?: string;
}

export interface BiosecurityRecord {
  id: string;
  eventType: 'quarantine_entry' | 'quarantine_release' | 'shed_disinfection' | 'visitor_log' | 'pest_control' | 'water_sanitation';
  cattleId?: string;
  eventDate: string;
  locationDetails: string;
  chemicalOrDisinfectantUsed?: string;
  administeredBy: string;
  observations?: string;
  nextActionDate?: string;
  status: 'pending' | 'completed' | 'active';
}
