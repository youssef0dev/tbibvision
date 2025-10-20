@echo off
cls
echo ========================================
echo   DEPLOY BACKEND TO VERCEL
echo ========================================
echo.

cd backend

echo Step 1: Login to Vercel
echo.
call vercel login
echo.

echo ========================================
echo.

echo Step 2: Deploy to Production
echo.
echo When prompted:
echo - Project name: tbibvision-backend
echo - Directory: ./ (press Enter)
echo.

call vercel --prod

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.

echo Your backend URL will be shown above
echo Copy it and update frontend/.env with:
echo EXPO_PUBLIC_API_URL=your-vercel-url
echo.

pause

