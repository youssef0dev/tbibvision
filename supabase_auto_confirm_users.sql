-- Auto-confirm all existing users who are waiting for email confirmation
-- This fixes the "Email not confirmed" error for existing accounts

UPDATE auth.users
SET 
  email_confirmed_at = NOW(),
  confirmed_at = NOW()
WHERE 
  email_confirmed_at IS NULL 
  OR confirmed_at IS NULL;

-- Check the results
SELECT 
  email, 
  email_confirmed_at, 
  confirmed_at,
  created_at
FROM auth.users
ORDER BY created_at DESC;

