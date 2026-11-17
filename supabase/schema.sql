-- SMART CATTLE FARM – Database Schema & Initial Migrations
-- Designed for PostgreSQL / Supabase
-- Target: Bangladesh Cattle Farm Intelligence & Management System

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles & Farm Settings
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'farm_owner' CHECK (role IN ('farm_owner', 'farm_manager', 'veterinarian', 'livestock_officer', 'staff')),
    phone TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'bn' CHECK (preferred_language IN ('bn', 'en')),
    avatar_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS farm_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    farm_name TEXT NOT NULL DEFAULT 'Smart Green Dairy & Beef Farm',
    division TEXT NOT NULL DEFAULT 'Dhaka',
    district TEXT NOT NULL DEFAULT 'Gazipur',
    upazila TEXT NOT NULL DEFAULT 'Sreepur',
    union_name TEXT,
    total_land_decimals NUMERIC(8, 2) NOT NULL DEFAULT 40.0,
    shed_area_sqft NUMERIC(8, 2) NOT NULL DEFAULT 3200.0,
    open_paddock_sqft NUMERIC(8, 2) NOT NULL DEFAULT 5000.0,
    fodder_land_decimals NUMERIC(8, 2) NOT NULL DEFAULT 25.0,
    primary_business_model TEXT NOT NULL DEFAULT 'integrated' CHECK (primary_business_model IN ('dairy', 'beef_fattening', 'breeding', 'integrated')),
    currency TEXT NOT NULL DEFAULT 'BDT',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Breeds & Scientific References
CREATE TABLE IF NOT EXISTS breeds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    origin TEXT NOT NULL,
    primary_purpose TEXT NOT NULL CHECK (primary_purpose IN ('dairy', 'beef', 'dual_purpose', 'draft')),
    climate_suitability TEXT NOT NULL,
    heat_tolerance_level TEXT NOT NULL CHECK (heat_tolerance_level IN ('high', 'moderate', 'low')),
    average_male_weight_kg NUMERIC(6, 2) NOT NULL,
    average_female_weight_kg NUMERIC(6, 2) NOT NULL,
    daily_milk_yield_liters NUMERIC(5, 2) DEFAULT 0,
    lactation_period_days INT DEFAULT 240,
    calving_interval_months NUMERIC(4, 1) DEFAULT 14,
    feed_efficiency TEXT NOT NULL,
    common_health_risks TEXT[] NOT NULL DEFAULT '{}',
    advantages TEXT[] NOT NULL DEFAULT '{}',
    limitations TEXT[] NOT NULL DEFAULT '{}',
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    verification_source TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Cattle Master Table
CREATE TABLE IF NOT EXISTS cattle (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farm_settings(id) ON DELETE CASCADE,
    tag_id TEXT UNIQUE NOT NULL,
    name TEXT,
    breed_id UUID REFERENCES breeds(id) ON DELETE SET NULL,
    gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'castrated_bull')),
    date_of_birth DATE,
    estimated_age_months INT,
    purchase_date DATE,
    purchase_price NUMERIC(10, 2) DEFAULT 0,
    transport_cost NUMERIC(8, 2) DEFAULT 0,
    current_weight_kg NUMERIC(6, 2) NOT NULL,
    body_condition_score NUMERIC(3, 1) CHECK (body_condition_score BETWEEN 1.0 AND 5.0),
    purpose TEXT NOT NULL CHECK (purpose IN ('dairy', 'beef_fattening', 'breeding', 'draft', 'heifer')),
    pregnancy_status TEXT NOT NULL DEFAULT 'not_pregnant' CHECK (pregnancy_status IN ('not_pregnant', 'suspected', 'confirmed', 'calved')),
    pregnancy_check_date DATE,
    expected_calving_date DATE,
    health_status TEXT NOT NULL DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'under_observation', 'sick', 'under_treatment', 'quarantined', 'sold', 'deceased')),
    housing_pen TEXT,
    photo_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Cattle Weight Records
CREATE TABLE IF NOT EXISTS cattle_weights (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cattle_id UUID NOT NULL REFERENCES cattle(id) ON DELETE CASCADE,
    weight_kg NUMERIC(6, 2) NOT NULL,
    recorded_date DATE NOT NULL,
    chest_girth_inches NUMERIC(5, 2),
    body_length_inches NUMERIC(5, 2),
    average_daily_gain_grams NUMERIC(6, 2),
    recorded_by TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Feeds, Nutrition & Inventory
CREATE TABLE IF NOT EXISTS feed_types (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('green_fodder', 'dry_fodder', 'concentrate', 'silage', 'hay', 'mineral_premix', 'additive')),
    dry_matter_percent NUMERIC(5, 2) NOT NULL,
    crude_protein_percent NUMERIC(5, 2) NOT NULL,
    tdn_percent NUMERIC(5, 2) NOT NULL,
    calcium_percent NUMERIC(5, 2) DEFAULT 0,
    phosphorus_percent NUMERIC(5, 2) DEFAULT 0,
    cost_per_kg_bdt NUMERIC(6, 2) NOT NULL,
    local_availability TEXT NOT NULL DEFAULT 'readily_available' CHECK (local_availability IN ('readily_available', 'seasonal', 'market_imported')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feed_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cattle_id UUID REFERENCES cattle(id) ON DELETE CASCADE,
    plan_name TEXT NOT NULL,
    target_category TEXT NOT NULL,
    daily_green_fodder_kg NUMERIC(6, 2) NOT NULL,
    daily_dry_fodder_kg NUMERIC(6, 2) NOT NULL,
    daily_concentrate_kg NUMERIC(6, 2) NOT NULL,
    mineral_mix_grams NUMERIC(6, 2) NOT NULL DEFAULT 50,
    daily_water_liters NUMERIC(6, 2) NOT NULL DEFAULT 40,
    estimated_daily_cost_bdt NUMERIC(8, 2) NOT NULL,
    nutritionist_approved BOOLEAN NOT NULL DEFAULT FALSE,
    approved_by TEXT,
    approval_date DATE,
    start_date DATE NOT NULL,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feed_inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farm_settings(id) ON DELETE CASCADE,
    feed_type_id UUID REFERENCES feed_types(id) ON DELETE CASCADE,
    batch_number TEXT,
    current_stock_kg NUMERIC(10, 2) NOT NULL DEFAULT 0,
    minimum_threshold_kg NUMERIC(10, 2) NOT NULL DEFAULT 100,
    unit_cost_bdt NUMERIC(8, 2) NOT NULL,
    supplier_name TEXT,
    storage_location TEXT,
    expiry_date DATE,
    last_restocked_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS feed_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farm_settings(id) ON DELETE CASCADE,
    cattle_id UUID REFERENCES cattle(id) ON DELETE SET NULL,
    feed_type_id UUID REFERENCES feed_types(id) ON DELETE CASCADE,
    quantity_kg NUMERIC(8, 2) NOT NULL,
    cost_bdt NUMERIC(8, 2) NOT NULL,
    feeding_shift TEXT NOT NULL CHECK (feeding_shift IN ('morning', 'noon', 'evening', 'night')),
    recorded_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Diseases & Seasonal Risks Intelligence
CREATE TABLE IF NOT EXISTS diseases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    scientific_name TEXT,
    category TEXT NOT NULL CHECK (category IN ('viral', 'bacterial', 'parasitic', 'metabolic', 'fungal', 'toxic')),
    cause_transmission TEXT NOT NULL,
    primary_season TEXT NOT NULL CHECK (primary_season IN ('summer', 'monsoon', 'autumn', 'late_autumn', 'winter', 'spring', 'all_year')),
    risk_level TEXT NOT NULL CHECK (risk_level IN ('high', 'moderate', 'low')),
    vulnerable_groups TEXT[] NOT NULL DEFAULT '{}',
    early_symptoms TEXT[] NOT NULL DEFAULT '{}',
    advanced_symptoms TEXT[] NOT NULL DEFAULT '{}',
    emergency_warning_signs TEXT[] NOT NULL DEFAULT '{}',
    prevention_methods TEXT[] NOT NULL DEFAULT '{}',
    biosecurity_guidelines TEXT[] NOT NULL DEFAULT '{}',
    vaccine_available BOOLEAN NOT NULL DEFAULT FALSE,
    vaccine_name TEXT,
    vaccine_schedule_info TEXT,
    immediate_response_actions TEXT[] NOT NULL DEFAULT '{}',
    veterinary_advisory_protocol TEXT NOT NULL,
    milk_meat_withdrawal_guidelines TEXT,
    official_source TEXT NOT NULL,
    last_verified_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Health Records & Veterinary Management
CREATE TABLE IF NOT EXISTS health_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cattle_id UUID NOT NULL REFERENCES cattle(id) ON DELETE CASCADE,
    examination_date DATE NOT NULL,
    attending_veterinarian TEXT NOT NULL,
    vet_reg_number TEXT,
    suspected_disease_id UUID REFERENCES diseases(id) ON DELETE SET NULL,
    symptoms_observed TEXT[] NOT NULL DEFAULT '{}',
    body_temperature_f NUMERIC(5, 2),
    clinical_observations TEXT NOT NULL,
    prescribed_treatment TEXT NOT NULL,
    prescribed_medicines JSONB NOT NULL DEFAULT '[]', -- [{name, dosage, frequency, duration_days, withdrawal_period_days}]
    treatment_start_date DATE NOT NULL,
    follow_up_date DATE,
    recovery_status TEXT NOT NULL DEFAULT 'under_treatment' CHECK (recovery_status IN ('under_treatment', 'improved', 'recovered', 'chronic', 'deceased')),
    milk_withdrawal_until DATE,
    meat_withdrawal_until DATE,
    vet_prescription_file_url TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Vaccination & Deworming Calendar
CREATE TABLE IF NOT EXISTS vaccination_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cattle_id UUID NOT NULL REFERENCES cattle(id) ON DELETE CASCADE,
    procedure_type TEXT NOT NULL CHECK (procedure_type IN ('vaccine', 'deworming', 'vitamin_mineral_booster')),
    disease_id UUID REFERENCES diseases(id) ON DELETE SET NULL,
    medicine_or_vaccine_name TEXT NOT NULL,
    batch_lot_number TEXT,
    administered_date DATE,
    scheduled_date DATE NOT NULL,
    next_due_date DATE,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'administered', 'postponed', 'overdue', 'cancelled')),
    administered_by TEXT,
    vet_approval_status TEXT NOT NULL DEFAULT 'approved' CHECK (vet_approval_status IN ('pending', 'approved', 'waived')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. Biosecurity & Quarantine Records
CREATE TABLE IF NOT EXISTS biosecurity_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farm_settings(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('quarantine_entry', 'quarantine_release', 'shed_disinfection', 'visitor_log', 'pest_control', 'water_sanitation')),
    cattle_id UUID REFERENCES cattle(id) ON DELETE SET NULL,
    event_date DATE NOT NULL DEFAULT CURRENT_DATE,
    location_details TEXT NOT NULL,
    chemical_or_disinfectant_used TEXT,
    administered_by TEXT NOT NULL,
    observations TEXT,
    next_action_date DATE,
    status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'active')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. Financial Management (Income, Expenses, Sales, Purchases)
CREATE TABLE IF NOT EXISTS financial_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farm_settings(id) ON DELETE CASCADE,
    cattle_id UUID REFERENCES cattle(id) ON DELETE SET NULL,
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('income', 'expense')),
    category TEXT NOT NULL CHECK (category IN (
        'cattle_purchase', 'feed_purchase', 'veterinary_medicine', 'veterinary_fees',
        'labor_wages', 'electricity_utility', 'transportation', 'farm_maintenance',
        'infrastructure', 'cattle_sale', 'milk_sale', 'manure_vermicompost_sale', 'other_income', 'other_expense'
    )),
    amount_bdt NUMERIC(12, 2) NOT NULL,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    payment_method TEXT NOT NULL DEFAULT 'cash' CHECK (payment_method IN ('cash', 'bank_transfer', 'bkash', 'nagad', 'credit')),
    vendor_buyer_name TEXT,
    invoice_receipt_no TEXT,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. Daily Operations & Task Assignment
CREATE TABLE IF NOT EXISTS daily_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farm_settings(id) ON DELETE CASCADE,
    title_en TEXT NOT NULL,
    title_bn TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('feeding', 'milking', 'shed_cleaning', 'health_check', 'medication', 'weight_check', 'inventory', 'other')),
    assigned_worker TEXT,
    scheduled_date DATE NOT NULL DEFAULT CURRENT_DATE,
    scheduled_time TIME,
    is_completed BOOLEAN NOT NULL DEFAULT FALSE,
    completed_at TIMESTAMPTZ,
    completed_by TEXT,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. Farm Space & Capacity Layout
CREATE TABLE IF NOT EXISTS farm_layouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID REFERENCES farm_settings(id) ON DELETE CASCADE,
    layout_name TEXT NOT NULL DEFAULT 'Primary Farm Masterplan',
    land_length_ft NUMERIC(8, 2) NOT NULL,
    land_width_ft NUMERIC(8, 2) NOT NULL,
    shed_length_ft NUMERIC(8, 2) NOT NULL,
    shed_width_ft NUMERIC(8, 2) NOT NULL,
    housing_system TEXT NOT NULL CHECK (housing_system IN ('tie_stall', 'loose_housing', 'free_stall', 'semi_intensive')),
    feeding_lane_width_ft NUMERIC(5, 2) NOT NULL DEFAULT 8.0,
    drainage_slope_percent NUMERIC(4, 2) NOT NULL DEFAULT 2.0,
    recommended_capacity_head INT NOT NULL,
    zones_json JSONB NOT NULL DEFAULT '[]',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Knowledge Center & Official Publications
CREATE TABLE IF NOT EXISTS knowledge_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_en TEXT NOT NULL,
    title_bn TEXT NOT NULL,
    publisher_organization TEXT NOT NULL, -- DLS, BLRI, BAU, DAE, FAO
    publication_year INT,
    source_url TEXT,
    topic TEXT NOT NULL CHECK (topic IN ('nutrition', 'veterinary', 'breeding', 'housing', 'seasonal_care', 'business_feasibility')),
    geographic_relevance TEXT NOT NULL DEFAULT 'Bangladesh Nationwide',
    summary_bn TEXT NOT NULL,
    summary_en TEXT NOT NULL,
    key_recommendations TEXT[] NOT NULL DEFAULT '{}',
    is_verified BOOLEAN NOT NULL DEFAULT TRUE,
    last_verified_date DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. AI Advisor Conversations & Consultations
CREATE TABLE IF NOT EXISTS advisor_conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    query_text TEXT NOT NULL,
    detected_language TEXT NOT NULL DEFAULT 'bn',
    response_text TEXT NOT NULL,
    data_sources_cited TEXT[] NOT NULL DEFAULT '{}',
    assumptions_used TEXT[] NOT NULL DEFAULT '{}',
    disclaimers TEXT[] NOT NULL DEFAULT '{}',
    is_flagged_medical_emergency BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE breeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE cattle ENABLE ROW LEVEL SECURITY;
ALTER TABLE cattle_weights ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE diseases ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE vaccination_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE biosecurity_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE financial_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_layouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE advisor_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Breeds, Diseases & Knowledge Documents are readable by authenticated users
CREATE POLICY "Breeds viewable by all authenticated users" ON breeds FOR SELECT TO authenticated USING (true);
CREATE POLICY "Diseases viewable by all authenticated users" ON diseases FOR SELECT TO authenticated USING (true);
CREATE POLICY "Knowledge viewable by all authenticated users" ON knowledge_documents FOR SELECT TO authenticated USING (true);
CREATE POLICY "Feed types viewable by all authenticated users" ON feed_types FOR SELECT TO authenticated USING (true);

-- Cattle, Health, Tasks, Financials are restricted to own farm records
CREATE POLICY "Profiles own user access" ON profiles FOR ALL TO authenticated USING (auth.uid() = id);
CREATE POLICY "Farm settings own user access" ON farm_settings FOR ALL TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Cattle farm access" ON cattle FOR ALL TO authenticated USING (farm_id IN (SELECT id FROM farm_settings WHERE user_id = auth.uid()));
CREATE POLICY "Cattle weights access" ON cattle_weights FOR ALL TO authenticated USING (cattle_id IN (SELECT id FROM cattle WHERE farm_id IN (SELECT id FROM farm_settings WHERE user_id = auth.uid())));
CREATE POLICY "Health records access" ON health_records FOR ALL TO authenticated USING (cattle_id IN (SELECT id FROM cattle WHERE farm_id IN (SELECT id FROM farm_settings WHERE user_id = auth.uid())));
CREATE POLICY "Vaccination records access" ON vaccination_records FOR ALL TO authenticated USING (cattle_id IN (SELECT id FROM cattle WHERE farm_id IN (SELECT id FROM farm_settings WHERE user_id = auth.uid())));
CREATE POLICY "Financials farm access" ON financial_transactions FOR ALL TO authenticated USING (farm_id IN (SELECT id FROM farm_settings WHERE user_id = auth.uid()));
CREATE POLICY "Daily tasks farm access" ON daily_tasks FOR ALL TO authenticated USING (farm_id IN (SELECT id FROM farm_settings WHERE user_id = auth.uid()));
CREATE POLICY "Feed inventory farm access" ON feed_inventory FOR ALL TO authenticated USING (farm_id IN (SELECT id FROM farm_settings WHERE user_id = auth.uid()));
CREATE POLICY "Advisor conversations own user access" ON advisor_conversations FOR ALL TO authenticated USING (auth.uid() = user_id);
