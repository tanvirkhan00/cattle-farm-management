import { Cattle, FinancialTransaction, FeedInventoryItem, BangladeshSeason } from '../types';
import { BREEDS_DATABASE } from '../data/breedsData';
import { DISEASES_DATABASE } from '../data/diseasesData';

export interface FarmContextForAdvisor {
  cattleList: Cattle[];
  transactions: FinancialTransaction[];
  feedInventory: FeedInventoryItem[];
  currentSeason: BangladeshSeason;
  farmLocation: string;
  totalLandDecimals: number;
}

export interface AdvisorAnalysisResult {
  reply: string;
  language: 'bn' | 'en';
  dataSourcesCited: string[];
  assumptionsUsed: string[];
  disclaimers: string[];
  isFlaggedMedicalEmergency: boolean;
  suggestedFollowUps: string[];
}

/**
 * Intelligent Bangladesh livestock advisor engine with natural language understanding
 * in both Bengali (বাংলা) and English.
 */
export function processAdvisorQuery(
  query: string,
  context: FarmContextForAdvisor
): AdvisorAnalysisResult {
  const normalized = query.toLowerCase().trim();

  // Language detection: Bengali Unicode range \u0980-\u09FF
  const hasBengali = /[\u0980-\u09ff]/.test(query);
  const lang: 'bn' | 'en' = hasBengali ? 'bn' : 'en';

  // Check for critical veterinary medical emergency indicators
  const emergencyKeywords = [
    'হঠাৎ মারা', 'রক্ত প্রস্রাব', 'মুখ দিয়ে লালা', 'দম বন্ধ', 'তড়কা', 'অ্যানথ্রাক্স', 'bloody urine',
    'choking', 'convulsion', 'collapsed', 'open mouth breathing', 'bleeding from nose', 'unclotted blood'
  ];
  const isEmergency = emergencyKeywords.some(kw => normalized.includes(kw));

  const dataSourcesCited: string[] = [
    'Department of Livestock Services (DLS) Guidelines',
    'Bangladesh Livestock Research Institute (BLRI) Beef & Dairy Protocols',
    'Active Farm Database Records'
  ];

  const assumptionsUsed: string[] = [];
  const disclaimers: string[] = [
    'All financial numbers are realistic economic projections based on local Bangladesh market averages and never guaranteed.',
    'For clinical symptoms or prescription treatments, immediately contact your local Upazila Livestock Officer or a registered Veterinary Surgeon.'
  ];

  let reply = '';
  let suggestedFollowUps: string[] = [];

  // 1. Critical Veterinary Emergency Handling
  if (isEmergency) {
    if (lang === 'bn') {
      reply = `🚨 **জরুরি প্রাণিসম্পদ সতর্কতা (Veterinary Alert):**\n\n` +
        `আপনার বর্ণনায় জরুরি জীবনসংশয়ী বা অতি-সংক্রামক রোগের লক্ষণ প্রকাশ পেয়েছে (যেমন: তড়কা/অ্যানথ্রাক্স, বিষক্রিয়া বা তীব্র শ্বাসকষ্ট)।\n\n` +
        `**তাৎক্ষণিক করণীয়:**\n` +
        `১. অবিলম্বে আক্রান্ত পশুটিকে সুস্থ খামার পশুদের থেকে কমপক্ষে ৫০ মিটার দূরে আলাদা করুন।\n` +
        `২. মৃত বা অসুস্থ গরুর রক্ত বা স্রাব খালি হাতে স্পর্শ করবেন না (এটি মানুষেও ছড়াতে পারে)।\n` +
        `৩. মুখে কোনো তরল বা তেল জোর করে খাওয়াবেন না (ফুসফুসে গিয়ে তৎক্ষণাৎ মৃত্যু হতে পারে)।\n` +
        `৪. এই মুহূর্তে আপনার নিকটস্থ উপজেলা প্রাণিসম্পদ কর্মকর্তা (ULO) বা রেজিস্টার্ড ভেটেরিনারি সার্জনকে কল করুন।`;
    } else {
      reply = `🚨 **CRITICAL VETERINARY EMERGENCY ALERT:**\n\n` +
        `The symptoms you described indicate a potential acute life-threatening emergency (such as Anthrax, hyperacute bloat, or severe toxemia).\n\n` +
        `**Immediate Mandatory Steps:**\n` +
        `1. Immediately isolate the animal at least 50 meters downwind from the healthy herd.\n` +
        `2. Do NOT touch blood or discharges with bare hands (Anthrax is zoonotic and lethal to humans).\n` +
        `3. Do NOT force-drench fluids or oil into the throat (high risk of fatal lung aspiration).\n` +
        `4. Contact your local Upazila Livestock Officer (ULO) or a registered Veterinary Surgeon immediately.`;
    }
    return {
      reply,
      language: lang,
      dataSourcesCited: ['DLS Emergency Veterinary Protocols', 'BVC Code of Conduct'],
      assumptionsUsed: ['Emergency safety triage priority applied'],
      disclaimers,
      isFlaggedMedicalEmergency: true,
      suggestedFollowUps: lang === 'bn' 
        ? ['ভেটেরিনারি সার্জনকে কীভাবে কল করব?', 'তড়কা রোগের লক্ষণ কী?']
        : ['How to contact local ULO?', 'What are early Anthrax symptoms?']
    };
  }

  // 2. Budget / Capital Planning (e.g. "আমার ৫ লাখ টাকা বাজেট" or "5 lakh budget")
  if (
    normalized.includes('৫ লাখ') || normalized.includes('5 lakh') || 
    normalized.includes('বাজেট') || normalized.includes('budget') ||
    normalized.includes('শুরু করা') || normalized.includes('start farm')
  ) {
    assumptionsUsed.push('Assumes 5-10 decimals available land and pre-cultivated Napier green fodder');
    assumptionsUsed.push('Cattle purchase price based on northern haat standards (Mawna, Gabtoli, Pakundia)');

    if (lang === 'bn') {
      reply = `💼 **৫ লাখ টাকা বাজেটে খামার শুরুর বাস্তবসম্মত পরিকল্পনা (বিএলআরআই ও ডিএলএস সুপারিশ):**\n\n` +
        `৫ লাখ টাকা প্রাথমিক মূলধন নিয়ে বাংলাদেশে সবচেয়ে নিরাপদ ও দ্রুত লাভজনক মডেল হলো: **"৩-৪টি ষাঁড় গরু নিয়ে কুরবানি মোটাতাজাকরণ (Beef Fattening)"**।\n\n` +
        `**কেন ডেইরি নয়, মোটাতাজাকরণ?**\n` +
        `• ৫ লাখ টাকায় মাত্র ১-২টি উন্নত জাতের গাভী কেনা যাবে। গাভীর রোগবালাই বেশি, বাছুর জন্মানো ও দুধ বিক্রির অবকাঠামো ছাড়া এটি ঝুঁকিপূর্ণ।\n` +
        `• বিপরীতে, মোটাতাজাকরণে ৩-৪ মাস মেয়াদে নগদ অর্থ ফেরত আসে।\n\n` +
        `**আনুমানিক ব্যয় বিভাজন (৫,০০,০০০ টাকার বাজেট):**\n` +
        `১. **গরু ক্রয় (৩টি ষাঁড়):** ৳২,৭০,০০০ (প্রতিটি ৯০,০০০ টাকা মূল্যে, ২০০-২৩০ কেজি ওজনের শাহীওয়াল/ব্রাহমা ক্রস)\n` +
        `২. **প্রাথমিক শেড ও পানির ব্যবস্থা:** ৳৬৫,০০০ (টিনের চালা, বাঁশ, পাকা মেঝে ও পানির চাড়ি)\n` +
        `৩. **৩ মাসের খাবার ব্যয়:** ৳১,০৫,০০০ (প্রতিদিন প্রতি গরুতে ৳১১০-১২০ টাকার নেপিয়ার ঘাস, সাইলেজ ও দানাদার)\n` +
        `৪. **টিকা, কৃমিনাশক ও ভেটেরিনারি চেকআপ:** ৳১০,০০০\n` +
        `৫. **জরুরি ব্যাকআপ ও অপ্রত্যাশিত তহবিল (Contingency):** ৳৫০,০০০\n\n` +
        `**প্রত্যাশিত ফলাফল:**\n` +
        `• ৩-৪ মাস ভালো খাবার ও পরিচর্যায় প্রতিটি গরু দৈনিক ৮০০-১০০০ গ্রাম বাড়বে।\n` +
        `• কুরবানি হাটে প্রতিটি গরু ১,৪০,০০০-১,৬০,০০০ টাকায় বিক্রির সম্ভাবনা থাকে।\n` +
        `• আনুমানিক নীট লাভ: ৳৭০,০০০ - ৳১,১০,০০০ (ROI: ১৬% - ২২% প্রতি চক্রে)।\n\n` +
        `⚠️ *সতর্কতা: ঘাস চাষের জমি না থাকলে কেনা ঘাস বা সাইলেজ দিয়ে মোটাতাজাকরণে মুনাফা অনেক কমে যায়।*`;
    } else {
      reply = `💼 **Realistic Farm Startup Plan for BDT 5 Lakh Budget (BLRI/DLS Model):**\n\n` +
        `With a capital of BDT 500,000 in Bangladesh, the most commercially viable and lower-risk model is **"Short-cycle Bull Fattening (3-4 bulls)"** targeting Eid-ul-Adha.\n\n` +
        `**Why Fattening over Dairy?**\n` +
        `• BDT 500,000 only purchases 1-2 good crossbred dairy cows with zero buffer for milk price drops or mastitis.\n` +
        `• Beef fattening cycles return liquidity within 90-120 days.\n\n` +
        `**Budget Allocation (BDT 500,000):**\n` +
        `1. **Cattle Purchase (3 young bulls):** BDT 270,000 (BDT 90,000 each @ 200-230 kg)\n` +
        `2. **Basic Shed & Water Setup:** BDT 65,000 (Corrugated sheet, brick floor, feeding mangers)\n` +
        `3. **Feed for 90 Days:** BDT 105,000 (~BDT 115-120/day/head for Napier, silage, bran, and corn)\n` +
        `4. **Veterinary & Deworming:** BDT 10,000\n` +
        `5. **Emergency Cash Reserve (Contingency):** BDT 50,000\n\n` +
        `**Projected Return:**\n` +
        `• Average Daily Gain (ADG): 800g - 1000g/day with balanced ration.\n` +
        `• Projected Eid sale price: BDT 145,000 - 160,000 per head.\n` +
        `• Estimated Net Margin: BDT 70,000 - 110,000 (16% - 22% ROI per cycle).`;
    }

    suggestedFollowUps = lang === 'bn'
      ? ['কুরবানির জন্য কখন গরু কেনা উচিত?', 'নেপিয়ার ঘাস চাষের খরচ কত?']
      : ['When to buy bulls for Eid-ul-Adha?', 'What is Napier cultivation cost?'];

    return {
      reply,
      language: lang,
      dataSourcesCited,
      assumptionsUsed,
      disclaimers,
      isFlaggedMedicalEmergency: false,
      suggestedFollowUps
    };
  }

  // 3. Monsoon / Rainy Season Diseases (বর্ষাকালে রোগবালাই)
  if (
    normalized.includes('বর্ষাকাল') || normalized.includes('বৃষ্টি') || 
    normalized.includes('monsoon') || normalized.includes('rainy') ||
    normalized.includes('রোগ') || normalized.includes('disease')
  ) {
    if (lang === 'bn') {
      reply = `🌧️ **বাংলাদেশে বর্ষাকালে (Monsoon) গবাদিপশুর প্রধান রোগঝুঁকি ও প্রতিকার:**\n\n` +
        `বর্ষাকালে অতিরিক্ত আর্দ্রতা, কাঁচা স্যাঁতসেঁতে মেঝে এবং মশা-মাছির উপদ্রবের কারণে ৪টি রোগের ঝুঁকি সর্বোচ্চ থাকে:\n\n` +
        `১. **ক্ষুরারোগ (FMD / Foot-and-Mouth Disease):**\n` +
        `• *ঝুঁকি:* বর্ষার পানিতে খুর নরম হয়ে ভাইরাস দ্রুত ঢোকে। মুখে ঘা ও পা পচে যায়।\n` +
        `• *প্রতিরোধ:* বর্ষা শুরুর আগেই ট্রাইভ্যালেন্ট এফএমডি টিকা দিন। শেডের গেটে পটাশ বা ৪% সোডা পানির ফুটবাথ রাখুন।\n\n` +
        `২. **লাম্পি স্কিন ডিজিজ (LSD):**\n` +
        `• *ঝুঁকি:* মশা, মাছি ও ডাঁশের মাধ্যমে সারা শরীরে গুটি বা ফোসকা ওঠে।\n` +
        `• *প্রতিরোধ:* শেডে মশারি টানানো, নিমের ধোঁয়া ও এপ্রিলে এলএসডি/গোটপক্স টিকা নিশ্চিত করা।\n\n` +
        `৩. **গলাফুলা (Hemorrhagic Septicemia - HS):**\n` +
        `• *ঝুঁকি:* পানিতে ভেজা বা ঠাণ্ডা বাতাসে হঠাৎ আক্রমণ করে; গলায় পানি জমে শ্বাস বন্ধ হয়ে ২৪ ঘণ্টার মধ্যে মারা যেতে পারে।\n` +
        `• *প্রতিরোধ:* মে মাসে সরকারি এইচএস টিকা দিতে হবে।\n\n` +
        `৪. **খুর পচা রোগ (Foot Rot / Interdigital Dermatitis):**\n` +
        `• *প্রতিরোধ:* মেঝের পানি দ্রুত নিষ্কাশন করুন এবং সপ্তাহে ২ দিন মেঝের নালায় শুকনো চুন (কলিচুন) ছিটান।`;
    } else {
      reply = `🌧️ **Monsoon Season Cattle Disease Risks in Bangladesh (BLRI/DLS):**\n\n` +
        `High humidity, waterlogging, and vector proliferation make the monsoon period the most critical health window:\n\n` +
        `1. **Foot-and-Mouth Disease (FMD):**\n` +
        `• *Risk:* Softened hooves from damp bedding invite viral entry. Drooling, tongue blisters, severe lameness.\n` +
        `• *Action:* Pre-monsoon trivalent vaccination; 4% washing soda footbath at barn entrances.\n\n` +
        `2. **Lumpy Skin Disease (LSD):**\n` +
        `• *Risk:* Massive surge in biting mosquitoes and stable flies. Large circular nodules across skin.\n` +
        `• *Action:* Physical mosquito nets around sheds at sunset; annual homologous/goat-pox vaccine.\n\n` +
        `3. **Hemorrhagic Septicemia (HS):**\n` +
        `• *Risk:* Acute pasteurellosis triggered by rain stress. Severe throat edema and asphyxiation within 12-24 hours.\n` +
        `• *Action:* Annual alum-precipitated HS vaccine in May before first monsoon showers.\n\n` +
        `4. **Foot Rot & Interdigital Dermatitis:**\n` +
        `• *Action:* Maintain dry grooved concrete floors and dust drainage alleys with dry slaked lime twice weekly.`;
    }

    suggestedFollowUps = lang === 'bn'
      ? ['এফএমডি টিকার সরকারি মূল্য কত?', 'শেডের মেঝে শুকনা রাখার উপায় কী?']
      : ['What is the FMD vaccine schedule?', 'How to control flies in cattle shed?'];

    return {
      reply,
      language: lang,
      dataSourcesCited: ['DLS Disease Surveillance Report', 'BAU Veterinary Epidemiology'],
      assumptionsUsed: ['Applies across all ecological zones of Bangladesh during monsoon'],
      disclaimers,
      isFlaggedMedicalEmergency: false,
      suggestedFollowUps
    };
  }

  // 4. Feed planning for 250kg cattle (খাবারের পরিকল্পনা)
  if (
    normalized.includes('খাবার') || normalized.includes('ration') || 
    normalized.includes('feed') || normalized.includes('২৫০') || normalized.includes('250')
  ) {
    if (lang === 'bn') {
      reply = `🌾 **২৫০ কেজি ওজনের গরুর দৈনিক বৈজ্ঞানিক পুষ্টি ও খাবার তালিকা (BLRI স্ট্যান্ডার্ড):**\n\n` +
        `একটি ২৫০ কেজি ওজনের গরুর দৈনিক শুষ্ক পদার্থ (Dry Matter - DM) প্রয়োজন দৈহিক ওজনের ২.৮% - ৩.০% অর্থাৎ **প্রায় ৭.০ থেকে ৭.৫ কেজি**।\n\n` +
        `**দৈনিক সুষম খাবারের ফর্মুলা:**\n` +
        `১. **কাঁচা সবুজ ঘাস (নেপিয়ার বা জার্মান):** ১২ থেকে ১৫ কেজি (যা থেকে ২.৫-৩.০ কেজি শুষ্ক পদার্থ পাওয়া যাবে)\n` +
        `২. **শুকনো ধানের খড় (কুচি করে কাটা):** ২.৫ থেকে ৩.০ কেজি (আঁশ ও জাবর কাটার জন্য আবশ্যক)\n` +
        `৩. **দানাদার খাদ্য মিশ্রণ:** ২.৫ থেকে ৩.০ কেজি (মোটাতাজাকরণ হলে ৩.২ কেজি)\n\n` +
        `**দানাদার মিশ্রণ তৈরির অনুপাত (১০০ কেজির জন্য):**\n` +
        `• গমের ভুসি: ৩৫ কেজি\n` +
        `• ভুট্টা ভাঙা: ২৫ কেজি (শক্তির উৎস)\n` +
        `• সরিষার খৈল (ভিজানো): ২০ কেজি (প্রোটিনের উৎস)\n` +
        `• চালের কুঁড়া (অটো পলিশ): ১৫ কেজি\n` +
        `• খনিজ মিশ্রণ (মিনারেল প্রিমিক্স): ২ কেজি\n` +
        `• খাবার লবণ: ২ কেজি\n` +
        `• ডাইক্যালসিয়াম ফসফেট (ডিসিপি): ১ কেজি\n\n` +
        `**পানি:** দৈনিক ৩০ থেকে ৪০ লিটার পরিষ্কার বিশুদ্ধ পানি সার্বক্ষণিক রাখতে হবে।\n` +
        `**দৈনিক আনুমানিক খরচ:** ৳১১০ - ৳১২৫ (নিজস্ব কাঁচা ঘাস থাকলে খরচ ৩০% কমে যাবে)।`;
    } else {
      reply = `🌾 **Scientific Daily Ration Plan for a 250 kg Cattle (BLRI Standard):**\n\n` +
        `A 250 kg animal requires roughly 2.8% to 3.0% of its body weight in Dry Matter (DM), equating to **7.0 - 7.5 kg DM daily**.\n\n` +
        `**Daily Feed Formulation:**\n` +
        `1. **Green Fodder (Napier/Corn):** 12 - 15 kg (provides ~2.5 - 3.0 kg DM)\n` +
        `2. **Chopped Paddy Straw:** 2.5 - 3.0 kg (essential fiber for healthy rumen fermentation)\n` +
        `3. **Balanced Concentrate Mix:** 2.5 - 3.0 kg (up to 3.2 kg if targeted for rapid fattening)\n\n` +
        `**Balanced Concentrate Composition (per 100 kg batch):**\n` +
        `• Wheat Bran: 35 kg\n` +
        `• Crushed Maize: 25 kg (starch energy)\n` +
        `• Mustard Oil Cake: 20 kg (vegetable protein)\n` +
        `• Rice Auto Polish: 15 kg\n` +
        `• Mineral Premix: 2 kg\n` +
        `• Feed Salt: 2 kg\n` +
        `• Di-calcium Phosphate (DCP): 1 kg\n\n` +
        `**Water:** 30 - 40 Liters of ad-libitum clean fresh drinking water.\n` +
        `**Estimated Daily Feed Cost:** BDT 110 - 125 (30% cheaper if farm cultivates own Napier).`;
    }

    suggestedFollowUps = lang === 'bn'
      ? ['ইউরিয়া মোলাসেস খড় কীভাবে বানায়?', 'গরুর কৃমিনাশক কখন দিব?']
      : ['How to make Urea Molasses Straw (UMS)?', 'When to administer deworming?'];

    return {
      reply,
      language: lang,
      dataSourcesCited: ['BLRI Dairy & Beef Nutrition Standards', 'FAO Ruminant Nutrition Toolkit'],
      assumptionsUsed: ['Calculated for 250 kg growing cattle with 750g target daily gain'],
      disclaimers,
      isFlaggedMedicalEmergency: false,
      suggestedFollowUps
    };
  }

  // 5. Land Capacity: 10 decimals (১০ শতক জমিতে কতগুলো গরু)
  if (
    normalized.includes('১০ শতক') || normalized.includes('10 শতক') || 
    normalized.includes('10 decimal') || normalized.includes('ধারণক্ষমতা') ||
    normalized.includes('capacity') || normalized.includes('জমি')
  ) {
    if (lang === 'bn') {
      reply = `📐 **১০ শতক জমিতে গবাদিপশুর নিরাপদ ধারণক্ষমতা ও স্থান বিন্যাস:**\n\n` +
        `⚠️ *গুরুত্বপূর্ণ নীতিমালা: শুধুমাত্র জমির মোট ক্ষেত্রফল দেখে গরুর সংখ্যা নির্ধারণ করা যায় না। বৈজ্ঞানিক ধারণক্ষমতা নির্ভর করে শেডের আকার, বাতাস চলাচল, খাবার পাত্র ও বর্জ্য ব্যবস্থাপনার উপর।*\n\n` +
        `**১০ শতক (প্রায় ৪,৩৫৬ বর্গফুট) জমির সর্বোত্তম ব্যবহার নকশা:**\n` +
        `১. **মূল শেড (Covered Shed):** ২.৫ শতক (~১,১০০ বর্গফুট)\n` +
        `• প্রতিটি পূর্ণবয়স্ক গরুর জন্য কার্যকর ৪৫-৪৮ বর্গফুট শেড জায়গা ধরলে:\n` +
        `• **সর্বোচ্চ নিরাপদ ধারণক্ষমতা: ১৮ থেকে ২২টি পূর্ণবয়স্ক গরু** (টাই-স্টল পদ্ধতিতে)।\n\n` +
        `২. **খোলা চারণ ও হাঁটার জায়গা (Paddock):** ২.৫ শতক (~১,১০০ বর্গফুট)\n` +
        `• স্বাস্থ্য ও প্রজনন স্বাভাবিক রাখতে প্রতিদিন রোদে ঘোরাঘুরির জন্য।\n\n` +
        `৩. **ঘাস চাষের জমি:** ৫ শতক (~২,১৭৮ বর্গফুট)\n` +
        `• ১০ শতকের বাকি ৫ শতকে নেপিয়ার চাষ করলে মাত্র ৩-৪টি গরুর বার্ষিক ঘাস চাহিদা পূরণ সম্ভব। তাই বাকি ১৫-১৮টি গরুর জন্য বাইরে থেকে ঘাস বা সাইলেজ ক্রয় করতে হবে।\n\n` +
        `৪. **অবকাঠামো সতর্কতা:**\n` +
        `• শেডের চাল পূর্ব-পশ্চিমে লম্বা রাখুন যাতে ভেতরে সরাসরি রোদ না ঢুকে।\n` +
        `• খাবারের পাত্রের দৈর্ঘ্য প্রতি গরুর জন্য কমপক্ষে ২.৫ ফুট রাখতে হবে।`;
    } else {
      reply = `📐 **Safe Cattle Capacity for a 10-Decimal Plot (~4,356 sq ft):**\n\n` +
        `⚠️ *Rule: Never determine stocking density based on total land area alone. Carrying capacity is strictly constrained by covered shed dimensions, ventilation, and manger access.*\n\n` +
        `**Optimal Infrastructure Allocation for 10 Decimals:**\n` +
        `1. **Covered Barn Shed:** 2.5 Decimals (~1,100 sq ft)\n` +
        `• Standard allowance: 48 - 50 sq ft per adult crossbred cow.\n` +
        `• **Preliminary Safe Capacity: 18 to 22 adult head** in a well-ventilated double-row tie-stall.\n\n` +
        `2. **Open Exercise Paddock:** 2.5 Decimals (~1,100 sq ft)\n` +
        `• Prevents limb stiffness and improves heat dissipation.\n\n` +
        `3. **Fodder Support Limitation:**\n` +
        `• 5 Decimals allocated to Pakchong Napier can sustain only 3-4 adult cows year-round. An 18-22 cow herd will require sourcing additional green forage or commercial corn silage externally.\n\n` +
        `4. **Ventilation & Orientation:** Shed length must strictly align East-West with 14-foot ridge height.`;
    }

    suggestedFollowUps = lang === 'bn'
      ? ['শেডের ড্রেন ও মেঝের ঢাল কত হওয়া উচিত?', 'বায়োগ্যাস প্ল্যান্টের জন্য কত জায়গা লাগে?']
      : ['What is the ideal floor drainage slope?', 'How much space for a biogas plant?'];

    return {
      reply,
      language: lang,
      dataSourcesCited: ['BAU Livestock Housing Standards', 'DLS Technical Guidelines'],
      assumptionsUsed: ['Assumes 1 decimal = 435.6 sq ft; Double-row face-out shed configuration'],
      disclaimers,
      isFlaggedMedicalEmergency: false,
      suggestedFollowUps
    };
  }

  // 6. Eid-ul-Adha timing (ঈদুল আজহার জন্য কখন গরু কেনা উচিত)
  if (
    normalized.includes('কুরবানি') || normalized.includes('কোরবানি') || 
    normalized.includes('ঈদ') || normalized.includes('eid') || 
    normalized.includes('fattening') || normalized.includes('কেনা')
  ) {
    if (lang === 'bn') {
      reply = `🎯 **আগামী ঈদুল আজহার জন্য গরু ক্রয়ের সর্বোত্তম সময় ও কৌশল (BLRI গাইডলাইন):**\n\n` +
        `বাংলাদেশে কুরবানি মোটাতাজাকরণের জন্য **৩টি সুস্পষ্ট ক্রয় উইন্ডো** রয়েছে:\n\n` +
        `১. **৯০ থেকে ১২০ দিনের শর্ট-টার্ম চক্র (সবচেয়ে জনপ্রিয় ও নিরাপদ):**\n` +
        `• *ক্রয়ের উপযুক্ত সময়:* ঈদুল আজহার ঠিক ৩ থেকে ৪ মাস পূর্বে (শাবান / রমজান মাসের শুরুতে)।\n` +
        `• *সুবিধা:* গরুর রোগবালাইয়ের ঝুঁকি কম থাকে এবং খাদ্যের অতিরিক্ত দীর্ঘমেয়াদী মূল্যবৃদ্ধি এড়ানো যায়।\n` +
        `• *গরুর ধরন:* ২ দাঁত বিশিষ্ট, ফ্রেম ভালো কিন্তু কিছুটা শুকনা, ২৫০-৩০০ কেজি ওজনের ষাঁড়।\n\n` +
        `২. **৬ মাসের মিডিয়াম-টার্ম চক্র (সর্বোচ্চ শারীরিক বৃদ্ধির জন্য):**\n` +
        `• *ক্রয়ের উপযুক্ত সময়:* ঈদের ৫-৬ মাস আগে (অগ্রহায়ন-পৌষ মাসে শীতের শুরুতে)।\n` +
        `• *সুবিধা:* উত্তরাঞ্চলের গ্রামীণ হাটে (যেমন নীলফামারী, রংপুর, গাইবান্ধা, পাবনা) তুলনামূলক কম দামে ফ্রেমওয়ালা বাছুর পাওয়া যায়।\n\n` +
        `৩. **সতর্কতামূলক ক্রয় কৌশল:**\n` +
        `• হাটের দালালের প্ররোচনায় না পড়ে স্থানীয় কৃষক বা বিশ্বস্ত বাথান থেকে সরাসরি গরু সংগ্রহ করুন।\n` +
        `• কেনার পরপরই কমপক্ষে ২১ দিন কোয়ারেন্টাইন শেডে রাখুন এবং এফএমডি ও এলএসডি টিকা দিন।\n` +
        `• ঈদের শেষ ১-২ সপ্তাহে হাটের সিন্ডিকেট ঝুঁকি এড়াতে ঈদের ৭-১০ দিন আগেই কর্পোরেট বা পরিচিত ক্রেতার কাছে বিক্রি নিশ্চিত করা লাভজনক।`;
    } else {
      reply = `🎯 **Optimal Buying Windows for Eid-ul-Adha Beef Fattening (BLRI):**\n\n` +
        `In Bangladesh, cattle commercial fattening is categorized into three strategic purchasing windows:\n\n` +
        `1. **90-to-120 Day Cycle (Most Recommended & Financially Resilient):**\n` +
        `• *Target Purchase Date:* Exactly 3 to 4 months prior to Eid-ul-Adha.\n` +
        `• *Advantages:* Minimizes cumulative feeding inflation risk and avoids long-term disease exposure.\n` +
        `• *Target Profile:* 2-tooth young bulls, large structural skeletal frame with low body fat score (200 - 280 kg).\n\n` +
        `2. **180-Day Cycle (Maximum Frame & Weight Accumulation):**\n` +
        `• *Target Purchase Date:* 6 months prior to Eid (late autumn/early winter).\n` +
        `• *Advantages:* Procured from northern rural haats (Pabna, Bogura, Rangpur) at lower off-peak prices.\n\n` +
        `3. **Risk Mitigation Rule:**\n` +
        `• Enforce strict 21-day quarantine upon arrival with broad-spectrum deworming and FMD/LSD vaccinations before intensive concentrate feeding.`;
    }

    suggestedFollowUps = lang === 'bn'
      ? ['ব্রাহমা নাকি শাহীওয়াল—কুরবানির জন্য কোনটি ভালো?', 'স্টেরয়েড ছাড়া দ্রুত ওজন বাড়ানোর উপায় কী?']
      : ['Brahman vs Sahiwal cross for Eid sale?', 'Natural feed additives for 1 kg daily ADG?'];

    return {
      reply,
      language: lang,
      dataSourcesCited: ['BLRI Beef Fattening Manual', 'DLS Eid Livestock Market Statistics'],
      assumptionsUsed: ['Assumes targeted selling in major urban consumer haats (Dhaka/Chittagong)'],
      disclaimers,
      isFlaggedMedicalEmergency: false,
      suggestedFollowUps
    };
  }

  // 7. Farm active financial analysis (এই মাসে খামারের খরচ কত)
  if (
    normalized.includes('খরচ') || normalized.includes('expense') || 
    normalized.includes('লাভ') || normalized.includes('profit') ||
    normalized.includes('cost') || normalized.includes('টাকা')
  ) {
    const totalExpenses = context.transactions
      .filter(t => t.transactionType === 'expense')
      .reduce((sum, t) => sum + t.amountBdt, 0);
    const totalIncome = context.transactions
      .filter(t => t.transactionType === 'income')
      .reduce((sum, t) => sum + t.amountBdt, 0);
    const netProfit = totalIncome - totalExpenses;
    const feedExpenses = context.transactions
      .filter(t => t.transactionType === 'expense' && t.category === 'feed_purchase')
      .reduce((sum, t) => sum + t.amountBdt, 0);

    if (lang === 'bn') {
      reply = `📊 **খামারের বর্তমান আর্থিক ডেটাবেস বিশ্লেষণ (সরাসরি রেকর্ড অনুযায়ী):**\n\n` +
        `• **মোট রেকর্ডকৃত আয়:** ৳${totalIncome.toLocaleString()}\n` +
        `• **মোট রেকর্ডকৃত ব্যয়:** ৳${totalExpenses.toLocaleString()}\n` +
        `• **বর্তমান কার্যকরী নীট লাভ/ক্ষতি:** ৳${netProfit.toLocaleString()} (${netProfit >= 0 ? 'মুনাফাজনক' : 'ঘাটতি'})\n` +
        `• **খাদ্য খাতে মোট ব্যয়:** ৳${feedExpenses.toLocaleString()} (যা মোট ব্যয়ের প্রায় ${totalExpenses > 0 ? Math.round((feedExpenses / totalExpenses) * 100) : 0}%)\n\n` +
        `💡 **পরামর্শ:** একটি টেকসই খামারে খাদ্য ব্যয় মোট ব্যয়ের ৬৫%-এর নিচে থাকা উচিত। নিজস্ব নেপিয়ার ঘাস উৎপাদন বাড়ালে এবং পাইকারি ভুট্টার সাইলেজ সংরক্ষণ করলে এই খরচ আরো ১২-১৫% কমানো সম্ভব।`;
    } else {
      reply = `📊 **Current Farm Financial Audit (From Active System Records):**\n\n` +
        `• **Total Recorded Revenue:** BDT ${totalIncome.toLocaleString()}\n` +
        `• **Total Recorded Operating Expenses:** BDT ${totalExpenses.toLocaleString()}\n` +
        `• **Net Operating Margin:** BDT ${netProfit.toLocaleString()} (${netProfit >= 0 ? 'Surplus' : 'Deficit'})\n` +
        `• **Feed Expenditure:** BDT ${feedExpenses.toLocaleString()} (~${totalExpenses > 0 ? Math.round((feedExpenses / totalExpenses) * 100) : 0}% of all farm overheads)\n\n` +
        `💡 **Advisory Note:** Healthy commercial cattle units maintain feed expenditure below 65% of gross revenue. Expanding on-farm silage or Napier production reduces concentrate dependence significantly.`;
    }

    suggestedFollowUps = lang === 'bn'
      ? ['দুধের উৎপাদন বৃদ্ধির উপায় কী?', 'খাদ্য খরচ কীভাবে কমানো যায়?']
      : ['How to optimize milk production economics?', 'How to lower feed cost per liter?'];

    return {
      reply,
      language: lang,
      dataSourcesCited: ['Active Farm Financial Transactions Database'],
      assumptionsUsed: ['Calculated from current live transaction database entries'],
      disclaimers,
      isFlaggedMedicalEmergency: false,
      suggestedFollowUps
    };
  }

  // General / Default intelligent guidance
  if (lang === 'bn') {
    reply = `🌾 **স্মার্ট ক্যাটেল ফার্ম ইন্টেলিজেন্স অ্যাসিস্ট্যান্ট:**\n\n` +
      `আপনার খামারে বর্তমানে **${context.cattleList.length}টি গরু** নথিবদ্ধ রয়েছে।\n` +
      `বর্তমান ঋতু: **${context.currentSeason === 'monsoon' ? 'বর্ষাকাল' : context.currentSeason === 'summer' ? 'গ্রীষ্মকাল' : context.currentSeason === 'winter' ? 'শীতকাল' : 'শরৎকাল'}**।\n\n` +
      `আমি আপনাকে নিম্নলিখিত বিষয়ে তথ্য দিয়ে সহায়তা করতে পারি:\n` +
      `• **বাজেট ও ব্যবসায়িক মডেল:** ৫-২৫ লাখ টাকার বিনিয়োগ পরিকল্পনা ও লাভজনকতা।\n` +
      `• **পুষ্টি ও রেশন:** ওজন ও দুধ অনুযায়ী সুষম দানাদার ও ঘাসের হিসাব।\n` +
      `• **রোগ ও জৈব নিরাপত্তা:** ক্ষুরারোগ, লাম্পি স্কিন, গলাফুলা প্রতিরোধ ও সরকারি টিকা তালিকা।\n` +
      `• **কুরবানি পরিকল্পনা:** গরু কেনার সঠিক সময় ও দৈনিক ওজন বৃদ্ধির কৌশল।\n` +
      `• **শেড ও স্থান পরিকল্পনা:** জমিতে সর্বোচ্চ নিরাপদ গরুর ধারণক্ষমতা।\n\n` +
      `অনুগ্রহ করে আপনার সুনির্দিষ্ট প্রশ্ন বা বিষয় জানান।`;
  } else {
    reply = `🌾 **Smart Cattle Farm Intelligence Assistant:**\n\n` +
      `Your system currently tracks **${context.cattleList.length} active cattle** in **${context.farmLocation}**.\n` +
      `Active season context: **${context.currentSeason.toUpperCase()}**.\n\n` +
      `I can help you with:\n` +
      `• **Business Feasibility:** Capital allocation (BDT 5L - 25L), ROI scenarios, and cash-flow forecasting.\n` +
      `• **Nutrition & Ration:** Dry matter, crude protein, and cost optimization based on live weight.\n` +
      `• **Veterinary Intelligence:** Seasonal FMD, LSD, HS risks, vaccination schedules, and withdrawal safety.\n` +
      `• **Eid-ul-Adha Planner:** Purchasing windows, liveweight gain models, and break-even pricing.\n` +
      `• **Farm Capacity:** Infrastructure space constraints and ventilation assessment.\n\n` +
      `Please ask any farm management or planning question in Bangla or English.`;
  }

  suggestedFollowUps = lang === 'bn'
    ? ['আমার ৫ লাখ টাকা বাজেট। কোন ধরনের খামার শুরু করব?', 'বর্ষাকালে আমার গরুর কী কী রোগ হতে পারে?', '২৫০ কেজি গরুর খাবার কীভাবে বানাব?']
    : ['I have 5 lakh budget. How to start?', 'What are the main monsoon disease risks?', 'Feed plan for 250 kg cattle'];

  return {
    reply,
    language: lang,
    dataSourcesCited,
    assumptionsUsed,
    disclaimers,
    isFlaggedMedicalEmergency: false,
    suggestedFollowUps
  };
}
