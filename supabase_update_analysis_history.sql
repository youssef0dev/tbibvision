-- ============================================
-- Update analysis_history table to support text-based consultations
-- Run this in Supabase SQL Editor
-- ============================================

-- Add new column for user's symptom description
ALTER TABLE analysis_history 
ADD COLUMN IF NOT EXISTS symptom_description TEXT;

-- Make image_url optional (since text consultations won't have images)
ALTER TABLE analysis_history 
ALTER COLUMN image_url DROP NOT NULL;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_analysis_history_user_id ON analysis_history(user_id);
CREATE INDEX IF NOT EXISTS idx_analysis_history_type ON analysis_history(type);
CREATE INDEX IF NOT EXISTS idx_analysis_history_created_at ON analysis_history(created_at DESC);

-- Update type column to support 'symptom' type
-- Existing types: 'lab', 'skin'
-- New type: 'symptom' for text-based consultations

-- Add comment to document the types
COMMENT ON COLUMN analysis_history.type IS 'Type of analysis: lab, skin, or symptom';
COMMENT ON COLUMN analysis_history.symptom_description IS 'User-provided text description of symptoms (for symptom type)';
COMMENT ON COLUMN analysis_history.image_url IS 'URL to uploaded image (for lab and skin types, optional for symptom)';

-- Verify the changes
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_name = 'analysis_history'
ORDER BY ordinal_position;

