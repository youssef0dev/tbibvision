@echo off
echo.
echo ===============================================
echo   Adding Environment Variables to Vercel
echo ===============================================
echo.
cd /d "%~dp0"
echo Adding OPENROUTER_API_KEY...
echo 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 | vercel env add OPENROUTER_API_KEY production
echo.
echo Adding SUPABASE_URL...
echo https://wxnfkimplrwizgehmfed.supabase.co | vercel env add SUPABASE_URL production
echo.
echo Adding SUPABASE_ANON_KEY...
echo eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmZraW1wbHJ3aXpnZWhtZmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDYyNTUsImV4cCI6MjA3NDk4MjI1NX0.GaARh3T6WZTnQJ53_R1yzY9q8My9yXT2oV4erqwxr6Q | vercel env add SUPABASE_ANON_KEY production
echo.
echo ===============================================
echo   Environment Variables Added!
echo   Now redeploying to Vercel...
echo ===============================================
echo.
vercel --prod
echo.
echo Done! Backend should now be working.
pause

