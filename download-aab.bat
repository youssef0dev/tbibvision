@echo off
echo ========================================
echo  DOWNLOADING AAB FILE
echo ========================================
echo.

echo Checking build status...
call eas build:list --limit 1

echo.
echo ========================================
echo.

echo Downloading latest AAB build...
call eas build:download --platform android --latest

echo.
echo ========================================
echo  DOWNLOAD COMPLETE!
echo ========================================
echo.

echo Your AAB file is now in this folder:
echo %CD%
echo.

echo You can now:
echo 1. Upload it to Google Play Console
echo 2. See GOOGLE_PLAY_STORE_GUIDE.md for next steps
echo.

pause

