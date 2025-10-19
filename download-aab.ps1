# Download AAB File Script
# Run this after the build completes

Write-Host "`n════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  📦 DOWNLOAD AAB FILE" -ForegroundColor Cyan
Write-Host "════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

# Navigate to frontend directory
Set-Location -Path "C:\Users\EliteLaptop\Desktop\MedAI Morocco\frontend"

Write-Host "📊 Checking build status...`n" -ForegroundColor Yellow

# Check latest build status
eas build:list --limit 1

Write-Host "`n" -ForegroundColor White

# Ask user if build is complete
$buildComplete = Read-Host "Is the build status 'FINISHED'? (Y/N)"

if ($buildComplete -eq "Y" -or $buildComplete -eq "y") {
    Write-Host "`n📥 Downloading AAB file...`n" -ForegroundColor Green
    
    # Download to project root
    eas build:download --latest --output="../tbibvision-1.0.0.aab"
    
    Write-Host "`n✅ AAB file downloaded to:`n" -ForegroundColor Green
    Write-Host "   C:\Users\EliteLaptop\Desktop\MedAI Morocco\tbibvision-1.0.0.aab`n" -ForegroundColor White
    
    Write-Host "🎉 Ready to upload to Google Play Console!`n" -ForegroundColor Cyan
    Write-Host "📖 See GOOGLE_PLAY_STORE_GUIDE.md for upload instructions`n" -ForegroundColor Yellow
} else {
    Write-Host "`n⏳ Build still in progress. Please wait and run this script again.`n" -ForegroundColor Yellow
    Write-Host "💡 Check build status at: https://expo.dev/accounts/youssevitch/projects/tbibvision/builds`n" -ForegroundColor Cyan
    Write-Host "📧 You'll receive an email when the build completes!`n" -ForegroundColor Gray
}

Write-Host "════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

