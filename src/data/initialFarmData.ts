import { Cattle, HealthRecord, VaccinationRecord, FinancialTransaction, DailyTask, BiosecurityRecord, FarmSettings } from '../types';

export const INITIAL_FARM_SETTINGS: FarmSettings = {
  id: 'farm-001',
  farmName: 'Smart Green Cattle & Dairy Farm',
  ownerName: 'Md. Tariqul Islam',
  phone: '+880 1712-345678',
  location: {
    division: 'Dhaka',
    district: 'Gazipur',
    upazila: 'Sreepur',
    union: 'Telihati'
  },
  totalLandDecimals: 45.0,
  shedAreaSqft: 3600.0,
  openPaddockSqft: 6500.0,
  fodderLandDecimals: 30.0,
  primaryBusinessModel: 'integrated',
  currency: 'BDT (৳)',
  createdDate: '2025-01-15',
  firebaseConnected: false
};

export const INITIAL_CATTLE_LIST: Cattle[] = [
  {
    id: 'cat-101',
    tagId: 'BD-GZP-101',
    name: 'Rani (রানী)',
    breedId: 'b-hf-cross',
    breedName: 'Holstein Friesian Cross (62.5%)',
    gender: 'female',
    dateOfBirth: '2022-04-10',
    estimatedAgeMonths: 54,
    purchaseDate: '2023-08-15',
    purchasePrice: 195000,
    transportCost: 3500,
    currentWeightKg: 465,
    bodyConditionScore: 3.5,
    purpose: 'dairy',
    pregnancyStatus: 'confirmed',
    pregnancyCheckDate: '2026-09-10',
    expectedCalvingDate: '2027-02-18',
    healthStatus: 'healthy',
    housingPen: 'Dairy Shed Pen A-1',
    photoUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    notes: 'Prime milk producer in 2nd lactation, currently yielding 17.5 L/day. Inseminated with Sahiwal high-yield bull semen.',
    createdDate: '2024-01-01',
    updatedDate: '2026-11-10',
    weightHistory: [
      { id: 'w-1', cattleId: 'cat-101', weightKg: 430, recordedDate: '2026-08-10', averageDailyGainGrams: 350 },
      { id: 'w-2', cattleId: 'cat-101', weightKg: 450, recordedDate: '2026-09-15', averageDailyGainGrams: 400 },
      { id: 'w-3', cattleId: 'cat-101', weightKg: 465, recordedDate: '2026-10-25', averageDailyGainGrams: 375 }
    ]
  },
  {
    id: 'cat-102',
    tagId: 'BD-GZP-102',
    name: 'Shundori (সুন্দরী)',
    breedId: 'b-sahiwal',
    breedName: 'Sahiwal Cross',
    gender: 'female',
    dateOfBirth: '2022-09-12',
    estimatedAgeMonths: 49,
    purchaseDate: '2023-11-05',
    purchasePrice: 165000,
    transportCost: 3000,
    currentWeightKg: 395,
    bodyConditionScore: 3.5,
    purpose: 'dairy',
    pregnancyStatus: 'not_pregnant',
    healthStatus: 'healthy',
    housingPen: 'Dairy Shed Pen A-2',
    photoUrl: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
    notes: 'Sweet high-fat milk (4.7% butterfat), yielding 9.2 L/day. Docile temperament.',
    createdDate: '2024-01-01',
    updatedDate: '2026-11-12',
    weightHistory: [
      { id: 'w-4', cattleId: 'cat-102', weightKg: 375, recordedDate: '2026-08-10' },
      { id: 'w-5', cattleId: 'cat-102', weightKg: 388, recordedDate: '2026-09-20' },
      { id: 'w-6', cattleId: 'cat-102', weightKg: 395, recordedDate: '2026-11-01' }
    ]
  },
  {
    id: 'cat-103',
    tagId: 'BD-GZP-103',
    name: 'Lalita (ললিতা)',
    breedId: 'b-rcc',
    breedName: 'Red Chittagong Cattle (RCC)',
    gender: 'female',
    dateOfBirth: '2023-01-20',
    estimatedAgeMonths: 45,
    purchaseDate: '2024-02-10',
    purchasePrice: 95000,
    transportCost: 4500,
    currentWeightKg: 215,
    bodyConditionScore: 4.0,
    purpose: 'dairy',
    pregnancyStatus: 'suspected',
    healthStatus: 'healthy',
    housingPen: 'Heritage Indigenous Pen B-1',
    photoUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80',
    notes: 'Pure Red Chittagong germplasm. Zero disease incidence over 2 years. Produces 4.8 L/day with exceptional aroma.',
    createdDate: '2024-02-15',
    updatedDate: '2026-11-14',
    weightHistory: [
      { id: 'w-7', cattleId: 'cat-103', weightKg: 200, recordedDate: '2026-07-15' },
      { id: 'w-8', cattleId: 'cat-103', weightKg: 215, recordedDate: '2026-10-15' }
    ]
  },
  {
    id: 'cat-201',
    tagId: 'BD-GZP-201',
    name: 'Bahubali (বাহুবলী)',
    breedId: 'b-brahman-cross',
    breedName: 'Brahman Cross (Beef Bull)',
    gender: 'male',
    dateOfBirth: '2023-05-15',
    estimatedAgeMonths: 41,
    purchaseDate: '2025-09-10',
    purchasePrice: 175000,
    transportCost: 4000,
    currentWeightKg: 535,
    bodyConditionScore: 4.5,
    purpose: 'beef_fattening',
    pregnancyStatus: 'not_pregnant',
    healthStatus: 'healthy',
    housingPen: 'Bull Fattening Wing 1',
    photoUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=600&q=80',
    notes: 'Key sacrificial bull targeted for upcoming Eid-ul-Adha. Gaining an average of 950 grams/day on corn silage & concentrate.',
    createdDate: '2025-09-12',
    updatedDate: '2026-11-15',
    weightHistory: [
      { id: 'w-9', cattleId: 'cat-201', weightKg: 420, recordedDate: '2026-07-01' },
      { id: 'w-10', cattleId: 'cat-201', weightKg: 475, recordedDate: '2026-09-01', averageDailyGainGrams: 900 },
      { id: 'w-11', cattleId: 'cat-201', weightKg: 535, recordedDate: '2026-11-01', averageDailyGainGrams: 980 }
    ]
  },
  {
    id: 'cat-202',
    tagId: 'BD-GZP-202',
    name: 'Raja (রাজা)',
    breedId: 'b-sahiwal',
    breedName: 'Sahiwal Cross Bull',
    gender: 'male',
    dateOfBirth: '2023-08-01',
    estimatedAgeMonths: 38,
    purchaseDate: '2025-11-15',
    purchasePrice: 155000,
    transportCost: 3500,
    currentWeightKg: 460,
    bodyConditionScore: 4.0,
    purpose: 'beef_fattening',
    pregnancyStatus: 'not_pregnant',
    healthStatus: 'healthy',
    housingPen: 'Bull Fattening Wing 2',
    photoUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    notes: 'Attractive reddish brown coat with large dewlap. Projected to hit 520+ kg before Eid market.',
    createdDate: '2025-11-16',
    updatedDate: '2026-11-10',
    weightHistory: [
      { id: 'w-12', cattleId: 'cat-202', weightKg: 390, recordedDate: '2026-08-15' },
      { id: 'w-13', cattleId: 'cat-202', weightKg: 425, recordedDate: '2026-09-30', averageDailyGainGrams: 770 },
      { id: 'w-14', cattleId: 'cat-202', weightKg: 460, recordedDate: '2026-11-10', averageDailyGainGrams: 850 }
    ]
  },
  {
    id: 'cat-104',
    tagId: 'BD-GZP-104',
    name: 'Tara (তারা)',
    breedId: 'b-pabna',
    breedName: 'Pabna Cattle (Heifer)',
    gender: 'female',
    dateOfBirth: '2024-03-10',
    estimatedAgeMonths: 31,
    purchaseDate: '2024-10-12',
    purchasePrice: 85000,
    transportCost: 3000,
    currentWeightKg: 255,
    bodyConditionScore: 3.5,
    purpose: 'heifer',
    pregnancyStatus: 'not_pregnant',
    healthStatus: 'healthy',
    housingPen: 'Replacement Heifer Pen C',
    photoUrl: 'https://images.unsplash.com/photo-1588615419957-bf66d53c6b49?auto=format&fit=crop&w=600&q=80',
    notes: 'Selected replacement heifer with excellent pelvic frame. Ready for artificial insemination next month.',
    createdDate: '2024-10-15',
    updatedDate: '2026-11-05',
    weightHistory: [
      { id: 'w-15', cattleId: 'cat-104', weightKg: 210, recordedDate: '2026-06-01' },
      { id: 'w-16', cattleId: 'cat-104', weightKg: 255, recordedDate: '2026-10-20', averageDailyGainGrams: 320 }
    ]
  },
  {
    id: 'cat-105',
    tagId: 'BD-GZP-105',
    name: 'Moni (মণি)',
    breedId: 'b-jersey-cross',
    breedName: 'Jersey Cross',
    gender: 'female',
    dateOfBirth: '2022-11-05',
    estimatedAgeMonths: 47,
    purchaseDate: '2024-04-18',
    purchasePrice: 140000,
    transportCost: 3200,
    currentWeightKg: 345,
    bodyConditionScore: 3.0,
    purpose: 'dairy',
    pregnancyStatus: 'not_pregnant',
    healthStatus: 'under_observation',
    housingPen: 'Dairy Shed Pen A-3',
    photoUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=600&q=80',
    notes: 'Mild subclinical mastitis identified by California Mastitis Test (CMT). Somatic cell count elevated; under teat disinfection protocol.',
    createdDate: '2024-04-20',
    updatedDate: '2026-11-15',
    weightHistory: [
      { id: 'w-17', cattleId: 'cat-105', weightKg: 335, recordedDate: '2026-08-15' },
      { id: 'w-18', cattleId: 'cat-105', weightKg: 345, recordedDate: '2026-10-30' }
    ]
  },
  {
    id: 'cat-107',
    tagId: 'BD-GZP-107',
    name: 'Padma (পদ্মা)',
    breedId: 'b-pabna',
    breedName: 'Pabna Dairy Cow',
    gender: 'female',
    dateOfBirth: '2021-06-25',
    estimatedAgeMonths: 64,
    purchaseDate: '2023-05-10',
    purchasePrice: 130000,
    transportCost: 3000,
    currentWeightKg: 280,
    bodyConditionScore: 3.0,
    purpose: 'dairy',
    pregnancyStatus: 'not_pregnant',
    healthStatus: 'under_treatment',
    housingPen: 'Recovery Sick Bay Pen S-1',
    photoUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2ae5e81?auto=format&fit=crop&w=600&q=80',
    notes: 'Superficial interdigital foot lesion from damp bedding during late monsoon. Receiving antiseptic footbath and veterinary wound spray.',
    createdDate: '2023-05-15',
    updatedDate: '2026-11-16',
    weightHistory: [
      { id: 'w-19', cattleId: 'cat-107', weightKg: 285, recordedDate: '2026-08-10' },
      { id: 'w-20', cattleId: 'cat-107', weightKg: 280, recordedDate: '2026-10-25' }
    ]
  }
];

export const INITIAL_HEALTH_RECORDS: HealthRecord[] = [
  {
    id: 'hr-001',
    cattleId: 'cat-105',
    cattleTagId: 'BD-GZP-105',
    examinationDate: '2026-11-14',
    attendingVeterinarian: 'Dr. Mahmudul Hasan, DVM, MS (Surgery)',
    vetRegNumber: 'BVC-Reg-5421',
    suspectedDiseaseId: 'dis-mastitis',
    diseaseName: 'Bovine Mastitis (Subclinical - Left Hind Quarter)',
    symptomsObserved: ['CMT positive (+) gel formation', 'Slightly reduced milk volume in left hind quarter', 'Normal temperature (101.8°F)'],
    bodyTemperatureF: 101.8,
    clinicalObservations: 'No acute parenchymal hardening or systemic pyrexia. Early subclinical mastitis in left hind teat. Milk appears clear but strip cup shows micro-curds.',
    prescribedTreatment: 'Frequent stripping of quarter every 2 hours during daytime. Post-milking 1% Povidone iodine dip. Oral Trisodium Citrate powder (30g daily for 5 days) + Vitamin E/Selenium supplement.',
    prescribedMedicines: [
      {
        medicineName: 'Mastilep Gel (Topical herbal udder massage)',
        dosage: 'Twice daily after complete milking',
        frequency: 'Morning & Evening',
        durationDays: 5,
        withdrawalPeriodDays: 0,
        instructions: 'Gently massage after warm water wash and dry'
      },
      {
        medicineName: 'Trisodium Citrate Powder (Oral buffering agent)',
        dosage: '30 grams with jaggery water',
        frequency: 'Once daily',
        durationDays: 7,
        withdrawalPeriodDays: 0
      }
    ],
    treatmentStartDate: '2026-11-14',
    followUpDate: '2026-11-20',
    recoveryStatus: 'under_treatment',
    milkWithdrawalUntil: '2026-11-17',
    isEmergency: false,
    notes: 'No systemic antibiotics needed at this subclinical stage. Re-test with CMT in 6 days.'
  },
  {
    id: 'hr-002',
    cattleId: 'cat-107',
    cattleTagId: 'BD-GZP-107',
    examinationDate: '2026-11-12',
    attendingVeterinarian: 'Dr. Mahmudul Hasan, DVM, MS',
    vetRegNumber: 'BVC-Reg-5421',
    symptomsObserved: ['Mild limping on left forelimb', 'Erythema and superficial mud rot in interdigital cleft'],
    bodyTemperatureF: 102.1,
    clinicalObservations: 'Superficial interdigital dermatitis without deep tendon involvement or bone necrosis. Hoof trimmed and cleaned.',
    prescribedTreatment: 'Hoof cleaning with 0.1% Potassium Permanganate solution. Application of Oxytetracycline aerosol wound spray twice daily. Keep on dry wood shaving bedding.',
    prescribedMedicines: [
      {
        medicineName: 'Terramycin Topical Spray (Oxytetracycline)',
        dosage: 'Spray directly on clean dry hoof cleft',
        frequency: 'Twice daily',
        durationDays: 6,
        withdrawalPeriodDays: 0
      },
      {
        medicineName: 'Meloxicam Injection (Vet prescribed)',
        dosage: '15 ml IM (single anti-inflammatory dose)',
        frequency: 'Once only',
        durationDays: 1,
        withdrawalPeriodDays: 5,
        instructions: 'Administered directly by veterinarian'
      }
    ],
    treatmentStartDate: '2026-11-12',
    followUpDate: '2026-11-18',
    recoveryStatus: 'improved',
    meatWithdrawalUntil: '2026-11-22',
    isEmergency: false,
    notes: 'Limping noticeably reduced after 48 hours. Bedding kept dry.'
  }
];

export const INITIAL_VACCINATIONS: VaccinationRecord[] = [
  {
    id: 'vax-001',
    cattleId: 'cat-101',
    cattleTagId: 'BD-GZP-101',
    procedureType: 'vaccine',
    diseaseId: 'dis-fmd',
    medicineOrVaccineName: 'DLS Trivalent FMD Vaccine (O, A, Asia-1)',
    batchLotNumber: 'FMD-2026-08B',
    administeredDate: '2026-09-05',
    scheduledDate: '2026-09-05',
    nextDueDate: '2027-03-05',
    status: 'administered',
    administeredBy: 'Upazila Livestock Extension Officer, Sreepur',
    vetApprovalStatus: 'approved',
    notes: 'Biannual routine FMD vaccination completed without any adverse reactions.'
  },
  {
    id: 'vax-002',
    cattleId: 'cat-201',
    cattleTagId: 'BD-GZP-201',
    procedureType: 'vaccine',
    diseaseId: 'dis-lsd',
    medicineOrVaccineName: 'DLS Heterologous Goat Pox Vaccine (LSD Prevention)',
    batchLotNumber: 'GPV-441-26',
    administeredDate: '2026-05-15',
    scheduledDate: '2026-05-15',
    nextDueDate: '2027-05-15',
    status: 'administered',
    administeredBy: 'Dr. Mahmudul Hasan, DVM',
    vetApprovalStatus: 'approved',
    notes: 'Annual pre-monsoon vector immunization.'
  },
  {
    id: 'vax-003',
    cattleId: 'cat-201',
    cattleTagId: 'BD-GZP-201',
    procedureType: 'deworming',
    medicineOrVaccineName: 'Triclabendazole + Ivermectin Bolus (Broad-spectrum Fasciola & Nematode)',
    scheduledDate: '2026-11-25',
    nextDueDate: '2027-02-25',
    status: 'scheduled',
    vetApprovalStatus: 'approved',
    notes: 'Routine post-monsoon liver fluke and roundworm deworming prior to final intensive 90-day fattening phase.'
  },
  {
    id: 'vax-004',
    cattleId: 'cat-202',
    cattleTagId: 'BD-GZP-202',
    procedureType: 'deworming',
    medicineOrVaccineName: 'Albendazole Bolus (2500mg)',
    scheduledDate: '2026-11-25',
    nextDueDate: '2027-02-25',
    status: 'scheduled',
    vetApprovalStatus: 'approved',
    notes: 'Scheduled for morning on empty stomach.'
  },
  {
    id: 'vax-005',
    cattleId: 'cat-103',
    cattleTagId: 'BD-GZP-103',
    procedureType: 'vaccine',
    diseaseId: 'dis-anthrax',
    medicineOrVaccineName: 'DLS Anthrax Spore Vaccine',
    batchLotNumber: 'ANT-902',
    administeredDate: '2026-04-10',
    scheduledDate: '2026-04-10',
    nextDueDate: '2027-04-10',
    status: 'administered',
    administeredBy: 'Veterinary Field Assistant (VFA)',
    vetApprovalStatus: 'approved'
  }
];

export const INITIAL_BIOSECURITY: BiosecurityRecord[] = [
  {
    id: 'bio-001',
    eventType: 'shed_disinfection',
    eventDate: '2026-11-15',
    locationDetails: 'Main Dairy Shed Pen A, B and Exercise Paddock',
    chemicalOrDisinfectantUsed: 'Virkon-S 1% spray and Slaked Lime (চুন) powder dusting on drains',
    administeredBy: 'Md. Rafiqul (Farm Staff)',
    observations: 'All gutters cleaned and dusted with white lime. Footbaths recharged with 4% washing soda.',
    nextActionDate: '2026-11-22',
    status: 'completed'
  },
  {
    id: 'bio-002',
    eventType: 'quarantine_entry',
    cattleId: 'cat-202',
    eventDate: '2025-11-15',
    locationDetails: 'Isolation Quarantine Bay Q-1',
    administeredBy: 'Dr. Mahmudul Hasan, DVM',
    observations: 'Purchased from Gabtoli Haat. Monitored for 21 days for FMD/LSD signs. Temperature logged daily. Cleared and released to Bull Shed on Day 22.',
    status: 'completed'
  }
];

export const INITIAL_TRANSACTIONS: FinancialTransaction[] = [
  {
    id: 'tx-001',
    transactionType: 'income',
    category: 'milk_sale',
    amountBdt: 74250,
    transactionDate: '2026-11-15',
    paymentMethod: 'bank_transfer',
    vendorBuyerName: 'Aarong Dairy Chilling Center, Gazipur',
    invoiceReceiptNo: 'AR-D-2026-1102',
    description: 'Bi-weekly bulk morning & evening milk collection (990 Liters @ 75 BDT/L)'
  },
  {
    id: 'tx-002',
    transactionType: 'expense',
    category: 'feed_purchase',
    amountBdt: 42500,
    transactionDate: '2026-11-10',
    paymentMethod: 'cash',
    vendorBuyerName: 'City Flour & Feed Store, Sreepur',
    invoiceReceiptNo: 'CF-4821',
    description: 'Purchase of 15 bags Wheat Bran (গমের ভুসি) and 10 bags Crushed Maize'
  },
  {
    id: 'tx-003',
    transactionType: 'expense',
    category: 'labor_wages',
    amountBdt: 24000,
    transactionDate: '2026-11-05',
    paymentMethod: 'cash',
    vendorBuyerName: 'Farm Workers (Rafiqul & Aminul)',
    description: 'Monthly wages for two permanent farm caretakers'
  },
  {
    id: 'tx-004',
    transactionType: 'expense',
    category: 'electricity_utility',
    amountBdt: 4800,
    transactionDate: '2026-11-08',
    paymentMethod: 'bkash',
    vendorBuyerName: 'BREB (Palli Bidyut)',
    invoiceReceiptNo: 'PB-GZP-9831',
    description: 'Electricity bill for irrigation pump, shed fans, and milk chiller'
  },
  {
    id: 'tx-005',
    transactionType: 'expense',
    category: 'veterinary_fees',
    amountBdt: 3500,
    transactionDate: '2026-11-14',
    paymentMethod: 'cash',
    vendorBuyerName: 'Dr. Mahmudul Hasan, DVM',
    description: 'Monthly herd health checkup, CMT screening, and hoof inspection'
  },
  {
    id: 'tx-006',
    transactionType: 'income',
    category: 'manure_vermicompost_sale',
    amountBdt: 12000,
    transactionDate: '2026-11-02',
    paymentMethod: 'cash',
    vendorBuyerName: 'Green Nursery & Organic Farm, Mawna',
    description: 'Sale of 120 bags decomposed organic cattle dung & vermicompost'
  },
  {
    id: 'tx-007',
    transactionType: 'income',
    category: 'milk_sale',
    amountBdt: 72000,
    transactionDate: '2026-10-31',
    paymentMethod: 'bank_transfer',
    vendorBuyerName: 'Aarong Dairy Chilling Center',
    invoiceReceiptNo: 'AR-D-2026-1015',
    description: 'Bi-weekly bulk milk payment (960 Liters @ 75 BDT/L)'
  },
  {
    id: 'tx-008',
    transactionType: 'expense',
    category: 'feed_purchase',
    amountBdt: 38000,
    transactionDate: '2026-10-20',
    paymentMethod: 'bank_transfer',
    vendorBuyerName: 'Agro Silage BD',
    invoiceReceiptNo: 'ASB-993',
    description: 'Delivery of 4 tons compressed corn silage bags'
  }
];

export const INITIAL_DAILY_TASKS: DailyTask[] = [
  {
    id: 'task-1',
    titleEn: 'Morning Milking & Teat Disinfection Dip',
    titleBn: 'সকালের দুধ দোহন ও টিট ডিপিং জীবাণুমুক্তকরণ',
    category: 'milking',
    assignedWorker: 'Rafiqul Islam',
    scheduledDate: '2026-11-17',
    scheduledTime: '06:00',
    isCompleted: true,
    completedAt: '2026-11-17T07:15:00Z',
    completedBy: 'Rafiqul Islam',
    priority: 'urgent',
    notes: 'Completed. Total morning milk yield: 41.5 Liters recorded.'
  },
  {
    id: 'task-2',
    titleEn: 'Morning Fodder & Concentrate Feeding',
    titleBn: 'সকালের সবুজ ঘাস ও দানাদার খাদ্য বিতরণ',
    category: 'feeding',
    assignedWorker: 'Aminul Haque',
    scheduledDate: '2026-11-17',
    scheduledTime: '07:30',
    isCompleted: true,
    completedAt: '2026-11-17T08:45:00Z',
    completedBy: 'Aminul Haque',
    priority: 'high',
    notes: 'Freshly chopped Napier and wheat bran mix delivered to all pens.'
  },
  {
    id: 'task-3',
    titleEn: 'Shed Floor Wash, Dung Removal & Lime Dusting',
    titleBn: 'শেড ধোয়া, গোবর অপসারণ ও নালায় চুন ছিটানো',
    category: 'shed_cleaning',
    assignedWorker: 'Rafiqul Islam',
    scheduledDate: '2026-11-17',
    scheduledTime: '09:00',
    isCompleted: true,
    completedAt: '2026-11-17T10:30:00Z',
    completedBy: 'Rafiqul Islam',
    priority: 'medium',
    notes: 'Floors scrubbed dry. Drain flushed to biogas pit.'
  },
  {
    id: 'task-4',
    titleEn: 'Foot Sore Dressing for Cow BD-GZP-107 (Padma)',
    titleBn: 'গাভী পদ্মা (BD-GZP-107)-এর পায়ে অ্যান্টিসেপটিক স্প্রে প্রয়োগ',
    category: 'medication',
    assignedWorker: 'Dr. Mahmudul Hasan / Farm Owner',
    scheduledDate: '2026-11-17',
    scheduledTime: '11:00',
    isCompleted: false,
    priority: 'urgent',
    notes: 'Clean hoof with potassium permanganate first, then spray Terramycin.'
  },
  {
    id: 'task-5',
    titleEn: 'Afternoon Milking & Clean Water Trough Inspection',
    titleBn: 'বিকালের দুধ দোহন ও পানির পাত্র পরিষ্কারকরণ',
    category: 'milking',
    assignedWorker: 'Rafiqul Islam',
    scheduledDate: '2026-11-17',
    scheduledTime: '16:00',
    isCompleted: false,
    priority: 'high'
  },
  {
    id: 'task-6',
    titleEn: 'Evening Dry Hay Distribution & Night Barn Locking',
    titleBn: 'সন্ধ্যার শুকনো খড় বিতরণ ও রাতের শেড তদারকি',
    category: 'feeding',
    assignedWorker: 'Aminul Haque',
    scheduledDate: '2026-11-17',
    scheduledTime: '18:30',
    isCompleted: false,
    priority: 'medium'
  }
];
