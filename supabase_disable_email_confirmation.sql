-- ================================================
-- DISABLE EMAIL CONFIRMATION IN SUPABASE
-- ================================================
-- This script configures Supabase to allow users to sign up
-- and login immediately without email confirmation.
--
-- IMPORTANT: Run this in Supabase SQL Editor
-- Location: Supabase Dashboard > SQL Editor > New Query
-- ================================================

-- Note: Email confirmation settings are managed in the Supabase Dashboard
-- You cannot disable email confirmation via SQL alone.
-- 
-- MANUAL STEPS TO DISABLE EMAIL CONFIRMATION:
-- 
-- 1. Go to your Supabase Dashboard
-- 2. Select your project
-- 3. Navigate to: Authentication > Settings
-- 4. Scroll to "Email Auth" section
-- 5. UNCHECK "Enable email confirmations"
-- 6. Click "Save"
--
-- After this change, users can sign up and login immediately
-- without needing to verify their email address.
--
-- ================================================
-- VERIFICATION QUERY
-- ================================================
-- Run this to check if users are being created successfully:

SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  raw_user_meta_data->>'full_name' as full_name
FROM auth.users
ORDER BY created_at DESC
LIMIT 10;

-- If email_confirmed_at is NULL but users can still login,
-- then email confirmation is successfully disabled.
-- ================================================

