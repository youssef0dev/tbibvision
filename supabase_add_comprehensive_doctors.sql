-- ============================================
-- Comprehensive Doctor Database for TbibVision
-- Add specialized doctors including TB, respiratory, infectious disease, etc.
-- Run this in Supabase SQL Editor
-- ============================================

-- Add Pulmonologists (Lung/Respiratory specialists - including TB)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Youssef Elmoudden', 'Pulmonologist', 'Casablanca', '+212 522-444-555'),
  ('Dr. Samira Benchekroun', 'Pulmonologist', 'Rabat', '+212 537-555-666'),
  ('Dr. Khalid Berrada', 'Pulmonologist', 'Marrakech', '+212 524-666-777'),
  ('Dr. Fatima Zahra Senhaji', 'Pulmonologist', 'Fes', '+212 535-777-888')
ON CONFLICT DO NOTHING;

-- Add Infectious Disease Specialists (TB, infections, etc.)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Ahmed Ouazzani', 'Infectious Disease Specialist', 'Casablanca', '+212 522-888-999'),
  ('Dr. Nadia Essalhi', 'Infectious Disease Specialist', 'Rabat', '+212 537-999-000'),
  ('Dr. Omar Fassi Fehri', 'Infectious Disease Specialist', 'Tangier', '+212 539-000-111')
ON CONFLICT DO NOTHING;

-- Add Cardiologists (existing + new)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Ahmed Bensouda', 'Cardiologist', 'Casablanca', '+212 522-111-222'),
  ('Dr. Salma Idrissi', 'Cardiologist', 'Rabat', '+212 537-222-333'),
  ('Dr. Rachid Alaoui', 'Cardiologist', 'Marrakech', '+212 524-333-444')
ON CONFLICT DO NOTHING;

-- Add Endocrinologists (Diabetes, Thyroid, Hormones)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Rachid Hariri', 'Endocrinologist', 'Casablanca', '+212 522-334-445'),
  ('Dr. Zineb Lahlou', 'Endocrinologist', 'Marrakech', '+212 524-445-556'),
  ('Dr. Hicham Belmahi', 'Endocrinologist', 'Rabat', '+212 537-556-667')
ON CONFLICT DO NOTHING;

-- Add Nephrologists (Kidney specialists)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Mohamed Sekkouri', 'Nephrologist', 'Rabat', '+212 537-667-778'),
  ('Dr. Aicha Filali', 'Nephrologist', 'Fes', '+212 535-778-889'),
  ('Dr. Karim Benjelloun', 'Nephrologist', 'Casablanca', '+212 522-889-990')
ON CONFLICT DO NOTHING;

-- Add Hematologists (Blood disorders)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Abdelaziz Moussaoui', 'Hematologist', 'Casablanca', '+212 522-990-001'),
  ('Dr. Meriem Kadiri', 'Hematologist', 'Tangier', '+212 539-001-112')
ON CONFLICT DO NOTHING;

-- Add Gastroenterologists (Digestive system, Liver)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Jamal Benkirane', 'Gastroenterologist', 'Rabat', '+212 537-112-223'),
  ('Dr. Leila Amrani', 'Gastroenterologist', 'Casablanca', '+212 522-223-334'),
  ('Dr. Said Chraibi', 'Gastroenterologist', 'Fes', '+212 535-334-445')
ON CONFLICT DO NOTHING;

-- Add Neurologists (Brain, Nervous system)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Hassan El Otmani', 'Neurologist', 'Casablanca', '+212 522-445-556'),
  ('Dr. Salma Benkirane', 'Neurologist', 'Rabat', '+212 537-556-667'),
  ('Dr. Youssef Lazrak', 'Neurologist', 'Marrakech', '+212 524-667-778')
ON CONFLICT DO NOTHING;

-- Add Orthopedists (Bones, Joints, Muscles)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Abderrahim Sbai', 'Orthopedist', 'Casablanca', '+212 522-778-889'),
  ('Dr. Zineb Tazi', 'Orthopedist', 'Rabat', '+212 537-889-990'),
  ('Dr. Mehdi Filali', 'Orthopedist', 'Tangier', '+212 539-990-001')
ON CONFLICT DO NOTHING;

-- Add Psychiatrists (Mental health)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Amina Kettani', 'Psychiatrist', 'Casablanca', '+212 522-001-112'),
  ('Dr. Omar Bennani', 'Psychiatrist', 'Rabat', '+212 537-112-223'),
  ('Dr. Fatima Zahra Alami', 'Psychiatrist', 'Marrakech', '+212 524-223-334')
ON CONFLICT DO NOTHING;

-- Add Ophthalmologists (Eye specialists)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Karim El Yazidi', 'Ophthalmologist', 'Casablanca', '+212 522-334-445'),
  ('Dr. Nadia Berrada', 'Ophthalmologist', 'Rabat', '+212 537-445-556')
ON CONFLICT DO NOTHING;

-- Add ENT Specialists (Ear, Nose, Throat)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Ahmed Lahlou', 'ENT Specialist', 'Casablanca', '+212 522-556-667'),
  ('Dr. Samira Fassi', 'ENT Specialist', 'Rabat', '+212 537-667-778'),
  ('Dr. Hassan Alami', 'ENT Specialist', 'Fes', '+212 535-778-889')
ON CONFLICT DO NOTHING;

-- Add Rheumatologists (Arthritis, Joint pain)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Latifa Benjelloun', 'Rheumatologist', 'Casablanca', '+212 522-889-990'),
  ('Dr. Youssef El Fassi', 'Rheumatologist', 'Rabat', '+212 537-990-001')
ON CONFLICT DO NOTHING;

-- Add Urologists (Urinary system)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Mohamed Tazi', 'Urologist', 'Casablanca', '+212 522-001-223'),
  ('Dr. Rachid Bennani', 'Urologist', 'Marrakech', '+212 524-112-334')
ON CONFLICT DO NOTHING;

-- Add Oncologists (Cancer specialists)
INSERT INTO doctors (name, specialization, city, phone) VALUES
  ('Dr. Amal Chraibi', 'Oncologist', 'Casablanca', '+212 522-223-445'),
  ('Dr. Hassan Sekkouri', 'Oncologist', 'Rabat', '+212 537-334-556'),
  ('Dr. Zineb Kettani', 'Oncologist', 'Fes', '+212 535-445-667')
ON CONFLICT DO NOTHING;

-- Summary: Check total doctors by specialization
SELECT 
  specialization, 
  COUNT(*) as doctor_count,
  STRING_AGG(city, ', ') as cities
FROM doctors 
GROUP BY specialization 
ORDER BY doctor_count DESC, specialization;

-- Total count
SELECT COUNT(*) as total_doctors FROM doctors;

