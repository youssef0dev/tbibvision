-- ============================================
-- TbibVision Database Setup
-- Run this in your Supabase SQL Editor
-- Project: wxnfkimplrwizgehmfed
-- ============================================

-- 1. Create analysis_history table
CREATE TABLE IF NOT EXISTS analysis_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT,
  type TEXT NOT NULL CHECK (type IN ('lab', 'skin')),
  image_url TEXT,
  results JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_analysis_history_user_id ON analysis_history(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_history_created_at ON analysis_history(created_at DESC);

-- Enable RLS
ALTER TABLE analysis_history ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (for demo purposes)
DROP POLICY IF EXISTS "Allow all operations on analysis_history" ON analysis_history;
CREATE POLICY "Allow all operations on analysis_history" ON analysis_history
  FOR ALL USING (true) WITH CHECK (true);

-- ============================================

-- 2. Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  specialization TEXT NOT NULL,
  city TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access to all
DROP POLICY IF EXISTS "Allow read access to doctors" ON doctors;
CREATE POLICY "Allow read access to doctors" ON doctors
  FOR SELECT USING (true);

-- ============================================

-- 3. Seed doctors table with Moroccan medical professionals
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Amina El Mansouri', 'Dermatologist', 'Casablanca', '+212 522-123-456'),
  ('Dr. Hassan Benani', 'General Practitioner', 'Rabat', '+212 537-234-567'),
  ('Dr. Fatima Zahra Alami', 'Dermatologist', 'Marrakech', '+212 524-345-678'),
  ('Dr. Youssef Tazi', 'Internal Medicine', 'Casablanca', '+212 522-456-789'),
  ('Dr. Samira Ouazzani', 'Dermatologist', 'Tangier', '+212 539-567-890'),
  ('Dr. Karim El Fassi', 'General Practitioner', 'Fes', '+212 535-678-901'),
  ('Dr. Nadia Berrada', 'Pathologist', 'Rabat', '+212 537-789-012'),
  ('Dr. Omar Benjelloun', 'Dermatologist', 'Casablanca', '+212 522-890-123'),
  ('Dr. Laila Kettani', 'General Practitioner', 'Agadir', '+212 528-901-234'),
  ('Dr. Mehdi Chraibi', 'Internal Medicine', 'Rabat', '+212 537-012-345')
ON CONFLICT DO NOTHING;

-- ============================================
-- Verify the setup
-- ============================================

-- Check tables exist
SELECT 'analysis_history table created' AS status 
WHERE EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'analysis_history');

SELECT 'doctors table created' AS status 
WHERE EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'doctors');

-- Check doctors data
SELECT COUNT(*) as doctor_count FROM doctors;

-- Show sample doctors
SELECT name, specialization, city FROM doctors LIMIT 5;

