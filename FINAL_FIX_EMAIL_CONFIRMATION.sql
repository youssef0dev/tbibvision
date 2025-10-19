-- ============================================
-- FINAL FIX: Auto-confirm all users
-- ============================================
-- This fixes the "Email not confirmed" error
-- Run this in Supabase SQL Editor NOW!
-- ============================================

-- Step 1: Auto-confirm all existing unconfirmed users
UPDATE auth.users
SET 
  email_confirmed_at = NOW(),
  confirmed_at = NOW()
WHERE 
  email_confirmed_at IS NULL 
  OR confirmed_at IS NULL;

-- Step 2: Check the results
SELECT 
  email, 
  email_confirmed_at, 
  confirmed_at,
  created_at,
  CASE 
    WHEN email_confirmed_at IS NOT NULL THEN '✅ Confirmed'
    ELSE '❌ Not Confirmed'
  END as status
FROM auth.users
ORDER BY created_at DESC;

-- ============================================
-- RESULT: All users can now login immediately!
-- ============================================

