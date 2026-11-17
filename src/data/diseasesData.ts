import { Disease } from '../types';

export const DISEASES_DATABASE: Disease[] = [
  {
    id: 'dis-fmd',
    code: 'FMD',
    nameEn: 'Foot-and-Mouth Disease (FMD)',
    nameBn: 'ক্ষুরারোগ (এফএমডি)',
    scientificName: 'Aphthovirus (Picornaviridae family, Serotypes O, A, Asia-1 in BD)',
    category: 'viral',
    causeTransmission: 'Aerosol inhalation, direct animal-to-animal contact, contaminated feed, water, transport trucks, and visitor clothing.',
    primarySeason: 'monsoon', // Also high late-autumn / winter transitions
    riskLevel: 'high',
    vulnerableGroups: [
      'High-producing Holstein crossbred cows',
      'Young calves under 6 months (high risk of fatal myocarditis / tiger heart)',
      'Newly purchased unvaccinated cattle brought from cattle markets (Haat)'
    ],
    earlySymptoms: [
      'High fever (104°F - 106°F / 40°C - 41°C)',
      'Sudden drop in milk production by 60% - 90%',
      'Excessive stringy, ropy salivation (drooling from mouth)',
      'Reluctance to walk or standing with arched back, shivering'
    ],
    advancedSymptoms: [
      'Vesicles/blisters on tongue, dental pad, gums, and inside lips which burst into painful ulcers',
      'Painful lesions and deep erosions in interdigital cleft (hoof cleft) and coronary band',
      'Severe lameness, animals unable or refusing to stand',
      'Secondary bacterial infection and maggot infestation in foot lesions',
      'Blisters on teats causing mastitis and permanent milk loss'
    ],
    emergencyWarningSigns: [
      'Sudden death in calves without obvious blisters (myocarditis collapse)',
      'Severe recumbency (animal unable to rise for >24 hours)',
      'Complete dehydration and sloughing of tongue epithelium'
    ],
    preventionMethods: [
      'Bi-annual vaccination with Trivalent FMD Vaccine (O, A, Asia-1) strictly according to DLS guidelines',
      'Strict quarantine of newly purchased cattle for at least 21 days before joining main herd',
      'Footbaths containing 4% Sodium Carbonate (Washing Soda) or Potassium Permanganate at shed entrances',
      'Restrict outside visitors, middle-traders, and haat footwear from entering the shed'
    ],
    biosecurityGuidelines: [
      'Immediately isolate affected animals to a dedicated, separate sick pen at least 50 meters downwind',
      'Designate separate workers, feeding troughs, and cleaning equipment for sick animals',
      'Spray shed perimeter daily with 2% Caustic Soda or Virkon-S'
    ],
    vaccineAvailable: true,
    vaccineName: 'DLS Trivalent FMD Vaccine / Inactivated Ingelvac / Raksha-Ovac',
    vaccineScheduleInfo: 'First dose at 3-4 months of age, booster after 3-4 weeks, then revaccinate every 6 months (March/April & September/October recommended in Bangladesh).',
    immediateResponseActions: [
      'Step 1: Immediately quarantine the animal away from all healthy cows.',
      'Step 2: Contact your Upazila Livestock Officer (ULO) or a registered Veterinary Surgeon immediately.',
      'Step 3: Wash mouth lesions gently with 1% Alum (ফিটকিরি) water or 2% Sodium Bicarbonate solution 2-3 times daily.',
      'Step 4: Wash foot lesions with 0.1% Potassium Permanganate (পটাশ) solution and apply zinc oxide/antiseptic cream.',
      'Step 5: Provide soft, easily digestible green fodder paste, rice gruel (জাউ ভাত), and electrolyte water.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: FMD is viral; antibiotics have NO direct effect on the virus. Registered veterinarians administer symptomatic antipyretics and broad-spectrum antibiotics exclusively to prevent fatal secondary bacterial infections. Never self-administer steroids. Observe strict milk/meat withdrawal periods.',
    milkMeatWithdrawalGuidelines: 'Discard milk from affected animals during active lesions. Observe at least 7-14 days withdrawal period for any prescribed veterinary antibiotics.',
    officialSource: 'Department of Livestock Services (DLS) Disease Surveillance Manual & WOAH Terrestrial Manual',
    lastVerifiedDate: '2026-08-15'
  },
  {
    id: 'dis-lsd',
    code: 'LSD',
    nameEn: 'Lumpy Skin Disease (LSD)',
    nameBn: 'লাম্পি স্কিন ডিজিজ (এলএসডি)',
    scientificName: 'Capripoxvirus (Poxviridae family)',
    category: 'viral',
    causeTransmission: 'Biting vectors: mosquitoes (Culex, Aedes), biting flies (Stomoxys calcitrans), and ticks (Rhipicephalus, Amblyomma); direct contact with skin lesions, saliva, and unsterilized needles.',
    primarySeason: 'monsoon', // Peak monsoon and post-monsoon vector explosion
    riskLevel: 'high',
    vulnerableGroups: [
      'Exotic crossbreds (Holstein Friesian crosses are severely affected compared to native RCC/Deshi)',
      'Lactating cows and bulls in peak fattening phase',
      'Unvaccinated herds in humid riverside or swampy areas'
    ],
    earlySymptoms: [
      'Sudden fever spike (104°F - 105.8°F / 40°C - 41.5°C)',
      'Enlarged superficial lymph nodes (prescapular and precrural nodes become visibly swollen)',
      'Watery discharge from eyes and nasal cavities',
      'Depression, anorexia, and drop in daily milk yield'
    ],
    advancedSymptoms: [
      'Hard, round, circumscribed skin nodules (2 - 5 cm diameter) all over body, head, neck, udder, and perineum',
      'Nodules become necrotic, core forms deep "sitfast" holes with wound discharge',
      'Severe edema and fluid swelling of dewlap, brisket, and lower limbs',
      'Secondary fly strike and maggot infestation in open crater lesions',
      'Severe permanent hide damage and emaciation'
    ],
    emergencyWarningSigns: [
      'Severe respiratory distress caused by internal nodules in trachea and lungs',
      'Massive ventral and leg edema preventing animal from rising',
      'Secondary systemic septicemia from untreated ulcerated nodules'
    ],
    preventionMethods: [
      'Homologous LSD Vaccine or Heterologous Goat Pox Vaccine (3x dose) as officially authorized by DLS',
      'Intensive vector control: use mosquito nets around sheds during evening hours',
      'Install UV light fly traps, smoke repellents, and spray Deltamethrin 1.25% on shed walls',
      'Ensure no stagnant water pools or open drains exist within 50 meters of cattle shed'
    ],
    biosecurityGuidelines: [
      'Separate affected cattle to prevent flies from biting and transmitting virus to healthy pen mates',
      'Never reuse needles between animals during vaccination or treatment',
      'Apply non-toxic herbal fly repellent (neem oil + camphor paste) around healthy cattle skins'
    ],
    vaccineAvailable: true,
    vaccineName: 'DLS Heterologous Goat Pox Vaccine / Lumpyvac (Homologous attenuated)',
    vaccineScheduleInfo: 'Annual vaccination prior to onset of monsoon vector season (April - May in Bangladesh). Calves vaccinated from 3-4 months.',
    immediateResponseActions: [
      'Step 1: Immediately separate infected cattle and place under a physical mosquito net.',
      'Step 2: Clean open skin wounds with 1% Povidone-iodine solution or Neem-bark decoction.',
      'Step 3: Apply sterile fly-repellent antiseptic ointment to prevent painful maggot formation.',
      'Step 4: Contact registered veterinarian for antipyretics, antihistamines, and liver tonic.',
      'Step 5: Provide easily digestible green fodder, glucose water, and vitamin C supplements.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: Supportive therapy is the cornerstone of recovery. Treatment includes veterinarian-prescribed NSAIDs (paracetamol/meloxicam), antihistamines, and broad-spectrum antibiotics to curb secondary bacterial dermato-necrosis. Do not burst or incise hard nodules.',
    milkMeatWithdrawalGuidelines: 'Meat of severely emaciated or active LSD-lesioned cattle is condemned at slaughter. Follow 14-28 days withdrawal period for all injectable veterinary drugs.',
    officialSource: 'DLS LSD Control Guidelines & Bangladesh Veterinary Council (BVC)',
    lastVerifiedDate: '2026-07-20'
  },
  {
    id: 'dis-anthrax',
    code: 'ANTHRAX',
    nameEn: 'Anthrax (Tarka)',
    nameBn: 'তড়কা / অ্যানথ্রাক্স',
    scientificName: 'Bacillus anthracis (Spore-forming Gram-positive bacterium)',
    category: 'bacterial',
    causeTransmission: 'Ingestion of bacterial spores from contaminated pasture, alkaline soil, or flooded grazing fields; spores survive for decades in soil.',
    primarySeason: 'summer', // Hot humid season and post-flood soil disturbance
    riskLevel: 'high',
    vulnerableGroups: [
      'All cattle of all ages, especially grazing cattle in historic Anthrax belt districts (Sirajganj, Pabna, Meherpur, Kushtia, Tangail)'
    ],
    earlySymptoms: [
      'Hyperacute peracute death often occurs without prior observable symptoms',
      'Sudden high fever (106°F - 108°F), staggering gait, severe muscle tremors',
      'Grinding of teeth and extreme respiratory difficulty'
    ],
    advancedSymptoms: [
      'Rapid death usually within 2 to 24 hours of onset',
      'Post-mortem sign: Incomplete rigor mortis (body remains limp and does not stiffen)',
      'Discharge of dark, tarry, unclotted blood from all natural orifices (mouth, nostrils, anus, vulva)',
      'Rapid bloating of carcass'
    ],
    emergencyWarningSigns: [
      'CRITICAL ZOONOTIC EMERGENCY: Anthrax spreads rapidly to humans handling blood or meat',
      'NEVER OPEN OR DISSECT A SUSPECTED ANTHRAX CARCASS: Exposure to air causes vegetative bacteria to form indestructible spores in soil'
    ],
    preventionMethods: [
      'Mandatory annual Anthrax spore vaccination in endemic flood-prone zones (March - April)',
      'Strict prohibition of grazing in pasture areas with historic anthrax casualty reports',
      'Immediate safe deep carcass burial: Dig minimum 6-8 feet deep pit, cover carcass with quicklime (কলিচুন) before filling with soil'
    ],
    biosecurityGuidelines: [
      'Do not slaughter sick, dying, or dead animals showing unexplained blood discharge',
      'Immediately notify Upazila Livestock Officer and local administration',
      'Disinfect contaminated premises with 5% Formalin or 10% Sodium Hydroxide'
    ],
    vaccineAvailable: true,
    vaccineName: 'DLS Anthrax Spore Vaccine (Live attenuated Sterne strain)',
    vaccineScheduleInfo: 'Single annual subcutaneous injection for all cattle over 6 months of age, ideally 1 month before summer grazing season.',
    immediateResponseActions: [
      'CRITICAL: If an animal dies suddenly with dark unclotted blood discharge, STOP EVERYTHING.',
      'Step 1: Do NOT touch or skin the carcass with bare hands.',
      'Step 2: Do NOT butcher, sell, or allow dogs or vultures near the body.',
      'Step 3: Alert Upazila Livestock Officer (ULO) for ear-swab blood smear confirmation in field lab.',
      'Step 4: Quarantine the entire herd and administer prophylactic antibiotic therapy under vet direction to in-contact animals.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: High doses of Penicillin or Oxytetracycline can save animals ONLY if administered in early pyrexic phase before bacteremia. Anthrax is a Class-A notifiable disease under Bangladesh Livestock Law. Strict biosecurity is mandatory.',
    milkMeatWithdrawalGuidelines: 'Total condemnation: Milk and meat from anthrax-affected or in-contact animals is strictly prohibited from human or animal consumption.',
    officialSource: 'DLS National Anthrax Surveillance Protocol & BLRI Zoonotic Disease Unit',
    lastVerifiedDate: '2026-09-01'
  },
  {
    id: 'dis-hs',
    code: 'HS',
    nameEn: 'Hemorrhagic Septicemia (Galaphula)',
    nameBn: 'গলাফুলা রোগ (এইচএস)',
    scientificName: 'Pasteurella multocida (Serotypes B:2 and E:2)',
    category: 'bacterial',
    causeTransmission: 'Commensal organism in nasopharynx multiplying rapidly when animal undergoes stress (monsoon rains, sudden temperature shifts, exhausting transport, poor nutrition).',
    primarySeason: 'monsoon', // Peak rainy season and waterlogged conditions
    riskLevel: 'high',
    vulnerableGroups: [
      'Young stock and draft cattle working in flooded rice fields',
      'High-producing dairy cattle during sudden weather shifts',
      'Stressed cattle after long road journeys from distant animal markets'
    ],
    earlySymptoms: [
      'Sudden high fever (104°F - 107°F / 40°C - 41.5°C)',
      'Complete loss of appetite, cessation of rumination, dullness',
      'Profuse salivation and rapid shallow breathing'
    ],
    advancedSymptoms: [
      'Hot, painful, tense inflammatory swelling in throat, dewlap, submandibular space, and brisket region',
      'Severe respiratory distress with loud, stertorous (snoring/wheezing) breathing',
      'Tongue becomes swollen, cyanotic (bluish), and protrudes from mouth',
      'Death typically occurs in 12 - 36 hours from asphyxiation and septicemia'
    ],
    emergencyWarningSigns: [
      'Severe throat swelling causing asphyxiation/gasping for air',
      'High fever with subnormal drop immediately preceding death'
    ],
    preventionMethods: [
      'Pre-monsoon vaccination with DLS HS Alum Precipitated Vaccine (May - June)',
      'Minimize animal stress, provide clean dry bedding, avoid sudden feed changes',
      'Isolate newly arriving cattle and protect from heavy monsoon downpours'
    ],
    biosecurityGuidelines: [
      'Keep shed floors dry using slaked lime (চুন) powder',
      'Burn or bury contaminated nasal discharges and fodder leftovers',
      'Disinfect water troughs with bleaching powder weekly'
    ],
    vaccineAvailable: true,
    vaccineName: 'DLS Hemorrhagic Septicemia Vaccine (Alum-precipitated or Oil-adjuvant)',
    vaccineScheduleInfo: 'Administer annually at 4 months of age and above, 1 month before monsoon season (May).',
    immediateResponseActions: [
      'EMERGENCY: Immediate treatment by registered veterinarian within the first 6-12 hours is vital.',
      'Step 1: Call veterinary surgeon immediately upon spotting throat swelling and fever.',
      'Step 2: Keep animal in a calm, shaded, well-ventilated dry area.',
      'Step 3: Do NOT force-feed or drench fluids by mouth (high risk of aspiration pneumonia).',
      'Step 4: Follow veterinarian prescription for early intravenous antibiotic and anti-inflammatory therapy.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: Highly responsive to early intravenous therapy with Sulfonamides, Oxytetracycline, or Ceftiofur sodium combined with Flunixin meglumine. If delayed until severe brisket edema and cyanosis develop, prognosis is grave.',
    milkMeatWithdrawalGuidelines: 'Observe minimum 14 days withdrawal for meat and 3-5 days for milk following veterinary antibiotic treatment.',
    officialSource: 'Department of Livestock Services (DLS) & BAU Veterinary Faculty',
    lastVerifiedDate: '2026-08-10'
  },
  {
    id: 'dis-bq',
    code: 'BQ',
    nameEn: 'Black Quarter / Blackleg (Badla)',
    nameBn: 'বাদলা রোগ (বি-কিউ)',
    scientificName: 'Clostridium chauvoei (Anaerobic spore-forming bacterium)',
    category: 'bacterial',
    causeTransmission: 'Ingestion of soil spores or entry through minor wound punctures; spores germinate in damaged muscle tissue.',
    primarySeason: 'monsoon', // Also late summer
    riskLevel: 'high',
    vulnerableGroups: [
      'Healthy, rapidly growing calves and bulls aged 6 to 24 months in prime nutritional state',
      'Cattle pastured on soil disturbed by seasonal plowing or flood silt'
    ],
    earlySymptoms: [
      'Sudden onset of severe lameness in one hindquarter or shoulder',
      'High fever (105°F - 107°F), depression, anorexia, shivering'
    ],
    advancedSymptoms: [
      'Hot, painful swelling developing in heavy muscles of hip, thigh, shoulder, or neck',
      'Swelling becomes cold, painless, and produces distinct crackling / crepitation sound (বায়ুর বুদবুদ শব্দ) on finger pressure due to gas production',
      'Skin over swelling turns dry, dark, and leathery',
      'Severe toxemia, prostration, and death within 12 - 48 hours'
    ],
    emergencyWarningSigns: [
      'Crepitating gas swelling in hindquarter with severe lameness',
      'Rapid hypothermia and coma'
    ],
    preventionMethods: [
      'Annual vaccination with DLS Black Quarter Vaccine prior to rainy season (April - May)',
      'Prompt disinfection of any mechanical wounds or castration incisions'
    ],
    biosecurityGuidelines: [
      'Never skin or open an animal carcass with black quarter swelling',
      'Deep burial with lime to prevent spore dispersal onto farm grazing land'
    ],
    vaccineAvailable: true,
    vaccineName: 'DLS BQ Vaccine / Combined HS-BQ Bivalent Vaccine',
    vaccineScheduleInfo: 'Primary vaccination at 6 months of age, revaccinate annually prior to monsoon.',
    immediateResponseActions: [
      'Step 1: Isolate the animal immediately.',
      'Step 2: Emergency call to registered veterinarian for early high-dose crystalline penicillin or ampicillin.',
      'Step 3: Restrict movement to avoid muscle trauma and rapid toxin circulation.',
      'Step 4: Do NOT incise or lance the gas swelling without sterile veterinary surgical supervision.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: High early doses of Procaine Penicillin or crystalline penicillin G injected both systemically and locally around lesion margin are effective only if given in first few hours. Once extensive muscle necrosis occurs, recovery is rare.',
    milkMeatWithdrawalGuidelines: 'Meat strictly condemned. Milk withdrawal as per antibiotic administered (minimum 5 days).',
    officialSource: 'DLS Veterinary Vaccine Bulletin & BLRI Animal Health Division',
    lastVerifiedDate: '2026-07-30'
  },
  {
    id: 'dis-mastitis',
    code: 'MASTITIS',
    nameEn: 'Bovine Mastitis (Olan Prodahe)',
    nameBn: 'ওলান প্রদাহ / ওলান ফোলা',
    scientificName: 'Staphylococcus aureus, Streptococcus agalactiae, E. coli, Klebsiella spp.',
    category: 'bacterial',
    causeTransmission: 'Unclean milking hand hygiene, contaminated stall flooring, teat injury, improper milking machine vacuum, incomplete milking.',
    primarySeason: 'all_year', // Peak during damp monsoon and post-calving
    riskLevel: 'moderate',
    vulnerableGroups: [
      'High-yielding Holstein cross dairy cows in early lactation (first 60 days in milk)',
      'Cows housed on wet, muddy concrete floors or dirty bedding'
    ],
    earlySymptoms: [
      'Subclinical: No visible swelling, but California Mastitis Test (CMT) shows gel formation; somatic cell count (SCC) rises',
      'Clinical: Watery, yellowish milk, or tiny clots/flakes appearing in strip cup test',
      'Mild heat and sensitivity in one quarter of the udder'
    ],
    advancedSymptoms: [
      'Quarter becomes severely enlarged, hot, rock-hard, and intensely painful to touch',
      'Milk transforms into curd-like clumps, bloody fluid, or foul-smelling serum',
      'Systemic illness: High fever (103°F - 105°F), refusal to eat, dehydration',
      'Gangrenous mastitis: Quarter becomes cold, purplish-black, sloughing off with septic shock'
    ],
    emergencyWarningSigns: [
      'Cold, discolored (blue/black) teat or quarter (Gangrenous mastitis)',
      'Severe toxemia with recumbency and trembling following E. coli endotoxin shock'
    ],
    preventionMethods: [
      'Practice strict post-milking teat dipping in 0.5% Povidone-iodine or chlorhexidine after EVERY milking',
      'Provide feed to cows immediately after milking so they stand for at least 30-45 minutes while teat sphincters close',
      'Dry cow therapy: Infuse veterinarian-approved dry cow intramammary tubes at end of lactation',
      'Maintain clean, dry, lime-dusted stall bedding daily'
    ],
    biosecurityGuidelines: [
      'Milk healthy heifers first, older clean cows second, and infected/treated cows last of all',
      'Always wash milkers hands with soap and dry teats with individual clean towels before milking',
      'Perform weekly CMT (California Mastitis Test) on every lactating cow for early detection'
    ],
    vaccineAvailable: false,
    vaccineName: 'Autogenous herd bacterins exist internationally; no universal vaccine in Bangladesh',
    vaccineScheduleInfo: 'Management and teat-dip hygiene are the primary verified defenses.',
    immediateResponseActions: [
      'Step 1: Strip out infected quarter completely every 2 hours into a disinfectant container (never on floor).',
      'Step 2: Apply cold water / ice packs to hot inflamed udder to reduce engorgement.',
      'Step 3: Contact registered veterinarian for aseptic intramammary infusion and systemic therapy.',
      'Step 4: Never drink or sell the milk from treated or affected cows.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: Vet prescription based on California Mastitis Test and culture/sensitivity. Intramammary antibiotic infusion must follow strict aseptic teat-end scrub. Systemic NSAIDs (meloxicam/ketoprofen) reduce inflammation. Adhere strictly to antibiotic withdrawal periods.',
    milkMeatWithdrawalGuidelines: 'MANDATORY: Milk from treated cows MUST be discarded throughout treatment plus the specified milk withdrawal period (typically 72 to 96 hours post-last treatment). Meat withdrawal: 14-21 days.',
    officialSource: 'DLS National Dairy Guidelines & Bangladesh Agricultural University (BAU) Dairy Science',
    lastVerifiedDate: '2026-08-25'
  },
  {
    id: 'dis-babesiosis',
    code: 'BABESIOSIS',
    nameEn: 'Bovine Babesiosis / Redwater (Tick Fever)',
    nameBn: 'বেবেসিওসিস / রক্ত প্রস্রাব রোগ (টিক ফিভার)',
    scientificName: 'Babesia bigemina, Babesia bovis (Transmitted by Rhipicephalus microplus ticks)',
    category: 'parasitic',
    causeTransmission: 'Bite of infected cattle ticks (Rhipicephalus microplus); thrives during warm, humid months.',
    primarySeason: 'summer', // Also early monsoon
    riskLevel: 'moderate',
    vulnerableGroups: [
      'Adult crossbred dairy cows (Holstein Friesian and Jersey crosses lack innate tick immunity)',
      'Calves over 9 months when maternal antibodies decline'
    ],
    earlySymptoms: [
      'Sudden high fever (105°F - 107°F / 40.5°C - 41.5°C)',
      'Animal stops eating, rumen motility stops, breathing is rapid and shallow',
      'Severe restlessness, shivering, and rapid heartbeats'
    ],
    advancedSymptoms: [
      'Hemoglobinuria: Dark coffee-colored, port-wine or reddish urine (রক্ত প্রস্রাব)',
      'Severe progressive anemia: Pale white, then jaundiced (yellowish) mucous membranes of eyes and vulva',
      'Severe dehydration, weakness, muscular trembling, and inability to stand',
      'Rapid death from severe intravascular hemolysis and organ failure if untreated'
    ],
    emergencyWarningSigns: [
      'Dark red/coffee-colored urine with extreme pallor or jaundice in eye conjunctiva',
      'Animal collapsing with heart pounding audible from several feet away'
    ],
    preventionMethods: [
      'Strict tick control: Routine acaricide spraying or pour-on (Cypermethrin, Flumethrin, or Ivermectin injection under vet supervision)',
      'Regular flame-gunning or lime whitewashing of shed cracks and crevices where ticks hide and lay eggs',
      'Quarantine and de-tick all newly introduced cattle before mixing with the herd'
    ],
    biosecurityGuidelines: [
      'Inspect dewlap, inner thighs, udder skin, and ears of cattle weekly for attached ticks',
      'Cut overgrown weeds and bushes around farm boundaries that harbor tick nymphs'
    ],
    vaccineAvailable: false,
    vaccineName: 'Blood-based vaccines available in Australia; not routinely manufactured in Bangladesh',
    vaccineScheduleInfo: 'Control relies on vector acaricide management and early veterinary diagnosis.',
    immediateResponseActions: [
      'Step 1: Keep animal in a calm, shaded place; minimize physical exertion immediately.',
      'Step 2: Collect fresh blood smear from ear vein for quick veterinary laboratory confirmation under microscope.',
      'Step 3: Call registered veterinary surgeon for specific antiprotozoal injection (e.g. Diminazene diaceturate or Imidocarb dipropionate).',
      'Step 4: Provide fresh cool water, oral electrolytes, and liver tonics with iron supplements.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: Diminazene diaceturate or Imidocarb dipropionate are specific prescription antiprotozoals administered strictly by registered veterinarians according to body weight. Blood transfusion and supportive hematinics (iron, vitamin B12) are critical in advanced anemia.',
    milkMeatWithdrawalGuidelines: 'Meat withdrawal: 21-28 days. Milk withdrawal: 5-7 days following antiprotozoal therapy.',
    officialSource: 'BAU Faculty of Veterinary Science & BLRI Parasitology Laboratory',
    lastVerifiedDate: '2026-06-15'
  },
  {
    id: 'dis-bloat',
    code: 'BLOAT',
    nameEn: 'Ruminal Tympany / Bloat',
    nameBn: 'পেট ফাঁপা রোগ (ব্লোট)',
    scientificName: 'Acute Ruminal Tympany (Frothy or Free-gas Bloat)',
    category: 'metabolic',
    causeTransmission: 'Excessive consumption of lush immature leguminous green fodder (e.g., young Khesari, clover) causing stable foam, or esophageal obstruction by whole root tubers (potatoes, onions).',
    primarySeason: 'spring', // Early spring flush of lush grasses and winter vegetable surplus
    riskLevel: 'moderate',
    vulnerableGroups: [
      'Greedy feeder cattle, beef bulls on high-concentrate carbohydrate diets',
      'Cattle fed moldy, wet fodder or sudden transition from dry straw to lush green grass'
    ],
    earlySymptoms: [
      'Rapid enlargement and distension of the left flank (বাম পাশের পেট ফুলে যাওয়া)',
      'Discomfort, animal repeatedly kicking at its belly, looking back at flanks',
      'Frequent urination, tail swishing, and anxious behavior'
    ],
    advancedSymptoms: [
      'Left paralumbar fossa bulging tightly like an inflated drum; produces hollow drum sound when tapped',
      'Severe respiratory distress, mouth breathing, tongue protruding, loud groaning',
      'Staggering, collapsing on floor due to diaphragm compression against lungs',
      'Death by suffocation and cardiac failure within 30 minutes to a few hours in acute frothy cases'
    ],
    emergencyWarningSigns: [
      'Severe left belly distension with animal gasping for air with open mouth and cyanotic tongue',
      'Imminent asphyxiation: Immediate veterinary decompression required'
    ],
    preventionMethods: [
      'Never feed lush, wet green legume fodder early in the morning on an empty stomach; always feed dry straw first',
      'Chop root crops (sweet potatoes, whole tubers) into small slices before feeding to prevent esophageal choking',
      'Gradually introduce concentrate grain changes over a 10 to 14 day period'
    ],
    biosecurityGuidelines: [
      'Ensure constant access to clean water; never starve and then overfeed cattle'
    ],
    vaccineAvailable: false,
    vaccineName: 'Non-infectious metabolic disorder; no vaccine applicable',
    vaccineScheduleInfo: 'Prevented entirely through proper nutritional ration management.',
    immediateResponseActions: [
      'Step 1: Emergency: Stand animal with forequarters elevated on an incline to relieve diaphragm pressure.',
      'Step 2: Place a smooth wooden bit or rope in the mouth to encourage chewing and salivation to release gas.',
      'Step 3: Drench 250ml - 500ml of vegetable oil (Mustard oil / Soybean oil) or Simethicone/Bloatosil anti-frothing agent under supervision.',
      'Step 4: If animal is suffocating, registered veterinarian will perform emergency trocarization of left flank.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: Differentiate free-gas bloat (relieved by stomach tube) from frothy bloat (requires surface-active antifoaming agents like Simethicone, Poloxalene, or edible oils). Trocar and cannula is an emergency life-saving procedure reserved for impending death.',
    milkMeatWithdrawalGuidelines: 'No withdrawal needed for edible oils or simethicone. If medications administered, follow product instructions.',
    officialSource: 'DLS Animal Health Fact Sheet & BLRI Ruminant Nutrition Manual',
    lastVerifiedDate: '2026-08-05'
  },
  {
    id: 'dis-pneumonia',
    code: 'PNEUMONIA',
    nameEn: 'Calf Pneumonia & Respiratory Disease',
    nameBn: 'নিউমোনিয়া ও শ্বাসতন্ত্রের রোগ',
    scientificName: 'Bovine Respiratory Disease Complex (BRDC: BRSV, PI-3, Pasteurella multocida, Mannheimia haemolytica)',
    category: 'bacterial',
    causeTransmission: 'Cold damp drafts, poor shed ventilation, ammonia fume buildup, cold winter fog, overcrowding, transporting calves in open pickup vans.',
    primarySeason: 'winter', // Mid-December to Mid-February cold waves in northern Bangladesh
    riskLevel: 'moderate',
    vulnerableGroups: [
      'Young calves aged 2 weeks to 6 months (especially colostrum-deprived calves)',
      'Crossbred cattle exposed to chilly northern winds without shed curtains'
    ],
    earlySymptoms: [
      'Elevated temperature (103°F - 105°F)',
      'Dry hacking cough, especially when made to stand up in the morning',
      'Clear to cloudy nasal discharge and dull sunken eyes',
      'Decreased milk or feed intake'
    ],
    advancedSymptoms: [
      'Rapid, labored, abdominal breathing (sides pumping heavily)',
      'Thick, mucopurulent (yellow/green) nasal discharge',
      'Moist, rattling lung sounds audible with stethoscope or by ear against chest wall',
      'Calf stands with neck outstretched, elbows abducted, drooling',
      'Chronic unthriftiness, permanent lung scarring, and stunted growth'
    ],
    emergencyWarningSigns: [
      'Severe abdominal panting with grunting expiration and blue gums',
      'Body temperature plunging below 100°F (hypothermic collapse)'
    ],
    preventionMethods: [
      'Ensure newborn calves drink at least 10% of their body weight in warm maternal Colostrum (শালদুধ) within first 6 hours of life',
      'Install burlap/jute sack curtains on north and west shed walls during winter nights, while leaving ridge ventilation open for ammonia exhaust',
      'Provide thick dry straw bedding (লিটার) on calf pen floors; change damp bedding daily',
      'Never keep calves in dark, damp, poorly ventilated rooms'
    ],
    biosecurityGuidelines: [
      'Separate coughing calves immediately to prevent aerosol spread to pen mates',
      'Regularly sweep and sanitize calf pens with slaked lime'
    ],
    vaccineAvailable: false,
    vaccineName: 'BRD combo vaccines available in some countries; good colostrum and housing are standard in BD',
    vaccineScheduleInfo: 'Management and colostrum management are the primary verified defenses.',
    immediateResponseActions: [
      'Step 1: Move sick calf to a warm, draft-free, dry pen with fresh straw bedding and a burlap calf coat.',
      'Step 2: Offer warm electrolyte water and warm milk in small, frequent amounts.',
      'Step 3: Call registered veterinarian for respiratory antibiotic therapy and bronchodilators/NSAIDs.',
      'Step 4: Monitor rectal temperature twice daily.'
    ],
    veterinaryAdvisoryProtocol: 'Clinical note: Early intervention with veterinarian-prescribed antibiotics (Florfenicol, Tilmicosin, or Oxytetracycline) along with NSAIDs (Meloxicam or Flunixin) reduces irreversible pulmonary consolidation. Avoid under-dosing.',
    milkMeatWithdrawalGuidelines: 'Meat withdrawal: 28-38 days depending on veterinary antibiotic choice.',
    officialSource: 'DLS Calf Management Protocols & BAU Dept of Medicine',
    lastVerifiedDate: '2026-09-05'
  }
];
