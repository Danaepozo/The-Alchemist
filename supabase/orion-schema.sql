-- ORION Medical Schema — The Alchemist Miami
-- Run this AFTER schema.sql in Supabase SQL Editor

CREATE TABLE orion_patients (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     TEXT NOT NULL,
  date_of_birth DATE,
  gender        TEXT,
  email         TEXT,
  phone         TEXT,
  blood_type    TEXT,
  allergies     TEXT[] DEFAULT '{}',
  conditions    TEXT[] DEFAULT '{}',
  medications   TEXT[] DEFAULT '{}',
  notes         TEXT,
  status        TEXT DEFAULT 'active',
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orion_protocols (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id        UUID REFERENCES orion_patients(id) ON DELETE CASCADE,
  protocol_name     TEXT NOT NULL,
  category          TEXT NOT NULL, -- peptide | hormone | iv | supplement
  dose              TEXT NOT NULL,
  dose_unit         TEXT,
  frequency         TEXT NOT NULL,
  route             TEXT,
  start_date        DATE NOT NULL,
  end_date          DATE,
  cycle_weeks       INT,
  status            TEXT DEFAULT 'active', -- active | paused | completed | discontinued
  reason_started    TEXT,
  prescribing_notes TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orion_doses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  protocol_id     UUID REFERENCES orion_protocols(id) ON DELETE CASCADE,
  patient_id      UUID REFERENCES orion_patients(id),
  scheduled_for   TIMESTAMPTZ NOT NULL,
  administered    BOOLEAN DEFAULT FALSE,
  administered_at TIMESTAMPTZ,
  dose_given      TEXT,
  reaction        TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orion_sessions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id       UUID REFERENCES orion_patients(id),
  session_date     DATE NOT NULL,
  session_type     TEXT NOT NULL,
  duration_mins    INT,
  chief_complaint  TEXT,
  observations     TEXT,
  treatments_given TEXT[] DEFAULT '{}',
  follow_up_date   DATE,
  ai_brief         TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orion_labs (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id     UUID REFERENCES orion_patients(id),
  test_date      DATE NOT NULL,
  test_type      TEXT NOT NULL,
  results        JSONB NOT NULL,
  interpretation TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orion_alerts (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id   UUID REFERENCES orion_patients(id),
  protocol_id  UUID REFERENCES orion_protocols(id),
  alert_type   TEXT NOT NULL, -- dose_due | dose_overdue | cycle_ending | lab_needed | contraindication | follow_up_due
  severity     TEXT DEFAULT 'medium', -- critical | high | medium | low
  title        TEXT NOT NULL,
  message      TEXT NOT NULL,
  due_date     DATE,
  acknowledged BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE orion_contraindication_checks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID REFERENCES orion_patients(id),
  checked_at      TIMESTAMPTZ DEFAULT NOW(),
  cleared         BOOLEAN,
  issues_found    JSONB,
  ai_analysis     TEXT,
  dr_override     BOOLEAN DEFAULT FALSE,
  override_reason TEXT
);

-- RLS policies (service role bypasses these)
ALTER TABLE orion_patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_doses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE orion_contraindication_checks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_orion_patients" ON orion_patients FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_orion_protocols" ON orion_protocols FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_orion_doses" ON orion_doses FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_orion_sessions" ON orion_sessions FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_orion_labs" ON orion_labs FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_orion_alerts" ON orion_alerts FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "service_role_orion_checks" ON orion_contraindication_checks FOR ALL USING (auth.role() = 'service_role');

-- Sample patient for testing
INSERT INTO orion_patients (full_name, date_of_birth, gender, email, phone, blood_type, allergies, conditions, medications, notes)
VALUES (
  'Maria Rodriguez',
  '1982-04-15',
  'female',
  'maria@example.com',
  '+1 305 555 0100',
  'A+',
  ARRAY['Penicilina'],
  ARRAY['Fatiga crónica', 'Déficit de vitamina D'],
  ARRAY['Levothyroxine 50mcg'],
  'Paciente de prueba. Primera consulta motivada por fatiga y optimización hormonal.'
);
