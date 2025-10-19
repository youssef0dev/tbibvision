-- ============================================
-- Add More Specialized Doctors to Match AI Analysis
-- Run this script in Supabase SQL Editor after running supabase_setup.sql
-- ============================================

-- Add Cardiologists
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Ahmed Bensouda', 'Cardiologist', 'Casablanca', '+212 522-111-222'),
  ('Dr. Salma Idrissi', 'Cardiologist', 'Rabat', '+212 537-222-333')
ON CONFLICT DO NOTHING;

-- Add Endocrinologists
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Rachid Hariri', 'Endocrinologist', 'Casablanca', '+212 522-333-444'),
  ('Dr. Zineb Lahlou', 'Endocrinologist', 'Marrakech', '+212 524-444-555')
ON CONFLICT DO NOTHING;

-- Add Nephrologists
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Mohamed Sekkouri', 'Nephrologist', 'Rabat', '+212 537-555-666'),
  ('Dr. Aicha Filali', 'Nephrologist', 'Fes', '+212 535-666-777')
ON CONFLICT DO NOTHING;

-- Add Hematologists
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Abdelaziz Moussaoui', 'Hematologist', 'Casablanca', '+212 522-777-888'),
  ('Dr. Meriem Kadiri', 'Hematologist', 'Tangier', '+212 539-888-999')
ON CONFLICT DO NOTHING;

-- Add Gastroenterologists
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Jamal Benkirane', 'Gastroenterologist', 'Rabat', '+212 537-999-000'),
  ('Dr. Leila Amrani', 'Gastroenterologist', 'Casablanca', '+212 522-000-111')
ON CONFLICT DO NOTHING;

-- Verify the additions
SELECT 
  specialization, 
  COUNT(*) as doctor_count 
FROM doctors 
GROUP BY specialization 
ORDER BY specialization;

-- Show all doctors
SELECT id, name, specialization, city, phone FROM doctors ORDER BY specialization, name;

