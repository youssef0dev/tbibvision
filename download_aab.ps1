# Download AAB File Script
# Run this script to download your built AAB file

Write-Host "`n════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📥 AAB FILE DOWNLOADER" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

Write-Host "Checking build status...`n" -ForegroundColor Yellow

Set-Location -Path "frontend"

# Check build status
Write-Host "🔍 Latest build status:" -ForegroundColor Cyan
eas build:list --limit 1

Write-Host "`n════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Ask user if build is finished
$response = Read-Host "Is the build FINISHED? (y/n)"

if ($response -eq "y" -or $response -eq "Y") {
    Write-Host "`n📥 Downloading AAB file...`n" -ForegroundColor Green
    eas build:download --latest
    
    Write-Host "`n════════════════════════════════════════════════════════" -ForegroundColor Green
    Write-Host "  ✅ DOWNLOAD COMPLETE!" -ForegroundColor Green
    Write-Host "════════════════════════════════════════════════════════`n" -ForegroundColor Green
    
    Write-Host "📂 AAB file location:" -ForegroundColor Cyan
    Write-Host "   $PWD`n" -ForegroundColor White
    
    Write-Host "📱 Next steps:" -ForegroundColor Yellow
    Write-Host "   1. Go to: https://play.google.com/console" -ForegroundColor White
    Write-Host "   2. Create new app" -ForegroundColor White
    Write-Host "   3. Upload this AAB file" -ForegroundColor White
    Write-Host "   4. Fill in store listing" -ForegroundColor White
    Write-Host "   5. Submit for review`n" -ForegroundColor White
    
    Write-Host "📖 Full guide: ..\GOOGLE_PLAY_STORE_GUIDE.md`n" -ForegroundColor Cyan
} else {
    Write-Host "`n⏱️  Build is still in progress..." -ForegroundColor Yellow
    Write-Host "Check status at: https://expo.dev/accounts/youssevitch/projects/tbibvision/builds`n" -ForegroundColor Cyan
    Write-Host "Run this script again once build is finished.`n" -ForegroundColor White
}

Set-Location -Path ".."

