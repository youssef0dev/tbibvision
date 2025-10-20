@echo off
echo.
echo ========================================
echo   FIX VERCEL BACKEND
echo ========================================
echo.
echo Step 1: Adding environment variables to Vercel...
echo.
echo Opening Vercel dashboard in your browser...
echo Please add these 3 environment variables:
echo.
echo 1. OPENROUTER_API_KEY = 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
echo 2. SUPABASE_URL = https://wxnfkimplrwizgehmfed.supabase.co
echo 3. SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmZraW1wbHJ3aXpnZWhtZmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDYyNTUsImV4cCI6MjA3NDk4MjI1NX0.GaARh3T6WZTnQJ53_R1yzY9q8My9yXT2oV4erqwxr6Q
echo.
start https://vercel.com/youssef-jarmounis-projects/backend/settings/environment-variables
echo.
echo ========================================
echo.
echo Press any key AFTER you've added all 3 environment variables...
pause >nul
echo.
echo Step 2: Pushing updated code to GitHub...
cd "%~dp0"
git add backend/server.js
git commit -m "Fix Vercel serverless deployment"
git push
echo.
echo Step 3: Redeploying to Vercel...
cd backend
vercel --prod
echo.
echo ========================================
echo   DONE!
echo ========================================
echo.
echo Testing backend...
timeout /t 10 /nobreak >nul
echo.
curl https://backend-kpsbdnynd-youssef-jarmounis-projects.vercel.app/health
echo.
echo.
echo If you see "status":"healthy", the backend is working!
echo.
pause

