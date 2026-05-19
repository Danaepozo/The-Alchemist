-- The Alchemist Miami — Complete Supabase Schema
-- Run this in the Supabase SQL Editor
-- Includes: Public site tables + ORION medical intelligence tables

-- ══════════════════════════════════════════════════════
-- EXTENSIONS
-- ══════════════════════════════════════════════════════
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ══════════════════════════════════════════════════════
-- PUBLIC SITE TABLES
-- ══════════════════════════════════════════════════════

-- Clients (public bookings / assessments)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Soul Assessments
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  answers JSONB NOT NULL,
  soul_reading TEXT,
  recommended_services TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  service TEXT NOT NULL,
  practitioner TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Memberships
CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  tier TEXT NOT NULL,
  price_monthly INTEGER NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled')),
  started_at TIMESTAMPTZ DEFAULT NOW(),
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT
);

-- Leads from Lumina chat
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  phone TEXT,
  source TEXT DEFAULT 'lumina_chat',
  conversation JSONB,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ══════════════════════════════════════════════════════
-- ORION MEDICAL INTELLIGENCE TABLES
-- ══════════════════════════════════════════════════════

-- ORION Patients (Dr. Meighen's clinical patients)
CREATE TABLE IF NOT EXISTS orion_patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  gender TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  emergency_contact TEXT,
  insurance TEXT,
  primary_complaint TEXT,
  medical_history JSONB DEFAULT '[]',
  current_medications JSONB DEFAULT '[]',
  allergies JSONB DEFAULT '[]',
  lifestyle JSONB DEFAULT '{}',
  goals TEXT[],
  membership_tier TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'archived')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORION Lab Results
CREATE TABLE IF NOT EXISTS orion_labs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES orion_patients(id) ON DELETE CASCADE,
  panel_name TEXT NOT NULL,
  test_date DATE NOT NULL,
  lab_values JSONB NOT NULL DEFAULT '{}',
  image_url TEXT,
  ai_analysis JSONB,
  ordered_by TEXT DEFAULT 'Dr. Michael J. Meighen',
  lab_facility TEXT,
  fasting BOOLEAN DEFAULT false,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzed', 'reviewed', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORION Protocols (treatment plans)
CREATE TABLE IF NOT EXISTS orion_protocols (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES orion_patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'paused', 'archived')),
  goals TEXT[],
  protocol_data JSONB NOT NULL DEFAULT '{}',
  ai_generated BOOLEAN DEFAULT false,
  doctor_approved BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORION Alerts (automated flags from AI analysis)
CREATE TABLE IF NOT EXISTS orion_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES orion_patients(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('critical', 'warning', 'info', 'followup')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  lab_id UUID REFERENCES orion_labs(id) ON DELETE SET NULL,
  protocol_id UUID REFERENCES orion_protocols(id) ON DELETE SET NULL,
  acknowledged BOOLEAN DEFAULT false,
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORION Sessions (clinical consultation notes)
CREATE TABLE IF NOT EXISTS orion_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES orion_patients(id) ON DELETE CASCADE,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  session_type TEXT DEFAULT 'consultation' CHECK (session_type IN ('consultation', 'followup', 'lab_review', 'protocol_review', 'emergency')),
  chief_complaint TEXT,
  subjective TEXT,
  objective TEXT,
  assessment TEXT,
  plan TEXT,
  ai_summary JSONB,
  duration_minutes INTEGER,
  follow_up_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORION Contraindication Checks (drug/supplement interaction logs)
CREATE TABLE IF NOT EXISTS orion_contraindication_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES orion_patients(id) ON DELETE CASCADE,
  checked_items JSONB NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ══════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════════

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_contraindication_checks ENABLE ROW LEVEL SECURITY;

-- Service role has full access to everything (used by server-side API routes)
CREATE POLICY "Service role full access" ON clients FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON assessments FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON bookings FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON memberships FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON leads FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON orion_patients FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON orion_labs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON orion_protocols FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON orion_alerts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON orion_sessions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full access" ON orion_contraindication_checks FOR ALL USING (auth.role() = 'service_role');

-- Authenticated users (logged-in ORION users) can read/write ORION tables
CREATE POLICY "Authenticated users access orion_patients" ON orion_patients FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users access orion_labs" ON orion_labs FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users access orion_protocols" ON orion_protocols FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users access orion_alerts" ON orion_alerts FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users access orion_sessions" ON orion_sessions FOR ALL TO authenticated USING (true);
CREATE POLICY "Authenticated users access orion_contraindication_checks" ON orion_contraindication_checks FOR ALL TO authenticated USING (true);


-- ══════════════════════════════════════════════════════
-- INDEXES FOR PERFORMANCE
-- ══════════════════════════════════════════════════════

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_assessments_client ON assessments(client_id);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);

CREATE INDEX IF NOT EXISTS idx_orion_labs_patient ON orion_labs(patient_id);
CREATE INDEX IF NOT EXISTS idx_orion_labs_date ON orion_labs(test_date);
CREATE INDEX IF NOT EXISTS idx_orion_protocols_patient ON orion_protocols(patient_id);
CREATE INDEX IF NOT EXISTS idx_orion_alerts_patient ON orion_alerts(patient_id);
CREATE INDEX IF NOT EXISTS idx_orion_alerts_acknowledged ON orion_alerts(acknowledged);
CREATE INDEX IF NOT EXISTS idx_orion_sessions_patient ON orion_sessions(patient_id);
CREATE INDEX IF NOT EXISTS idx_orion_sessions_date ON orion_sessions(session_date);


-- ══════════════════════════════════════════════════════
-- AUTO-UPDATE updated_at TRIGGER
-- ══════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orion_patients_updated_at
  BEFORE UPDATE ON orion_patients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER orion_protocols_updated_at
  BEFORE UPDATE ON orion_protocols
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ══════════════════════════════════════════════════════
-- ORION AUTH USER (create in Supabase Auth dashboard)
-- ══════════════════════════════════════════════════════
-- Go to: Supabase > Authentication > Users > Add User
-- Email: orion@thealchemist.miami
-- Password: [choose a strong password]
-- This is the login for Dr. Meighen to access ORION
