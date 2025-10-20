@echo off
cls
echo ========================================
echo   STARTING BACKEND SERVER
echo ========================================
echo.

cd backend
echo Current directory: %CD%
echo.

echo Starting Node.js server...
node server.js

pause
