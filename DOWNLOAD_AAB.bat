@echo off
cls
echo ========================================
echo   DOWNLOADING YOUR AAB FILE
echo ========================================
echo.

cd frontend

echo Checking build status...
echo.
call eas build:list --limit 1
echo.

echo ========================================
echo.

set /p ready="Is the build FINISHED? (Y/N): "

if /i "%ready%"=="Y" (
    echo.
    echo Downloading AAB file...
    echo.
    call eas build:download --latest
    
    echo.
    echo ========================================
    echo   DOWNLOAD COMPLETE!
    echo ========================================
    echo.
    
    echo Your AAB file is here:
    echo %CD%
    echo.
    
    dir /b build-*.aab
    
    echo.
    echo Copy this path for Google Play Console:
    for %%f in (build-*.aab) do echo %CD%\%%f
    echo.
    
) else (
    echo.
    echo Build is not ready yet. Please wait and run this script again.
    echo Check status at: https://expo.dev/accounts/youssevitch/projects/tbibvision/builds
    echo.
)

pause

