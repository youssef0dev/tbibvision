# 🧪 Testing Checklist - TbibVision

Complete testing guide to verify all features work correctly.

## 🔧 Pre-Testing Setup

### Backend Verification
- [ ] Backend server running on port 3000
- [ ] Health endpoint responds: `curl http://localhost:3000/health`
- [ ] Supabase connection working (check terminal for errors)
- [ ] OpenRouter API key configured in `.env`

### Frontend Verification
- [ ] Frontend running in Expo Go
- [ ] `.env` configured with correct local IP
- [ ] No error overlays on app startup
- [ ] Bottom navigation visible with 4 tabs

---

## 📱 Feature Testing

### 1. Splash Screen & Onboarding

**Splash Screen Test:**
- [ ] App shows medical logo on blue gradient background
- [ ] "TbibVision" title displays
- [ ] Auto-navigates after ~2.5 seconds
- [ ] First time: Goes to Onboarding
- [ ] Subsequent launches: Goes to Main app

**Onboarding Test:**
- [ ] Shows 3 slides with emojis and descriptions
- [ ] Swipe left/right to navigate slides
- [ ] Pagination dots update correctly
- [ ] "Skip" button works from any slide
- [ ] "Next" button advances to next slide
- [ ] "Get Started" button on final slide
- [ ] After completion, never shows again

---

### 2. Lab Analyzer Screen 🧪

**Image Upload Test:**
- [ ] Tap "Upload Image" shows options
- [ ] "Take Photo" opens camera
- [ ] "Choose from Gallery" opens photo library
- [ ] Selected image displays in card
- [ ] "Change Image" button works
- [ ] Image preview shows correct photo

**Analysis Test:**
- [ ] "Analyze Lab Test" button appears after image selection
- [ ] Button shows loading animation when tapped
- [ ] Loading screen appears with message
- [ ] Analysis completes in 10-30 seconds
- [ ] Results display in scrollable list

**Results Validation:**
- [ ] Each test shows: name, value, status, explanation
- [ ] Normal tests have green 🟢 indicator
- [ ] Abnormal tests have red 🔴 indicator
- [ ] Values show units (e.g., "14.5 g/dL")
- [ ] Explanations are readable and informative
- [ ] Can scroll through all results

**State Management:**
- [ ] "Analyze Another Test" button appears after results
- [ ] Tapping reset clears image and results
- [ ] Can upload and analyze multiple images
- [ ] Results save to history (check Profile)

**Error Handling:**
- [ ] Error message if no image selected
- [ ] Error alert if API fails
- [ ] Graceful handling of invalid images
- [ ] Can retry after error

---

### 3. Skin Check Screen 🩺

**Image Upload Test:**
- [ ] Image upload works (same as Lab Analyzer)
- [ ] Selected image displays correctly
- [ ] "Change Image" button works

**Analysis Test:**
- [ ] "Analyze Skin" button appears
- [ ] Loading animation displays
- [ ] Analysis completes in 10-30 seconds
- [ ] Results display 3 conditions

**Results Validation:**
- [ ] Each condition shows: name, confidence %, description, advice
- [ ] Confidence percentages displayed prominently
- [ ] Conditions ordered by confidence (highest first)
- [ ] Educational disclaimer visible at top
- [ ] "💡 Advice" section for each condition
- [ ] Advice is helpful and appropriate

**Navigation Test:**
- [ ] "Find Dermatologists" button appears after results
- [ ] Tapping button navigates to Doctors tab
- [ ] Doctors list automatically filtered to Dermatologists

**State Management:**
- [ ] "Analyze Another Image" button works
- [ ] Can perform multiple analyses
- [ ] Results save to history

---

### 4. Doctors Screen 👨‍⚕️

**Initial Load:**
- [ ] Screen shows "Find Doctors" title
- [ ] Loading indicator appears briefly
- [ ] List of 10 doctors loads
- [ ] Each doctor card displays correctly

**Doctor Card Information:**
- [ ] Doctor name visible
- [ ] Specialization shown in blue
- [ ] City with 📍 icon
- [ ] Profile emoji (👨‍⚕️) displays
- [ ] "📞 Call" button present

**Filtering:**
- [ ] "All" filter shows all 10 doctors
- [ ] "Dermatologists" filter shows only dermatologists (5)
- [ ] "GP" filter shows General Practitioners (3)
- [ ] Active filter highlighted in blue
- [ ] Inactive filters have gray background
- [ ] Filter switches update list correctly

**Contact Functionality:**
- [ ] Tapping "Call" button opens phone dialer
- [ ] Correct phone number pre-filled
- [ ] Can cancel without calling
- [ ] Can initiate call

**Data Validation:**
Expected doctors include:
- [ ] Dr. Amina El Mansouri (Dermatologist, Casablanca)
- [ ] Dr. Hassan Benani (GP, Rabat)
- [ ] Dr. Fatima Zahra Alami (Dermatologist, Marrakech)
- [ ] And 7 more...

---

### 5. Profile Screen 👤

**Profile Display:**
- [ ] Avatar emoji displays
- [ ] "TbibVision User" name shows
- [ ] "Medical AI Assistant" subtitle visible
- [ ] Profile card styled correctly

**Settings Section:**
- [ ] "Settings" header visible
- [ ] Dark mode toggle switch present
- [ ] Switch starts in light mode (default)

**Dark Mode Test:**
- [ ] Toggle switch to dark mode
- [ ] Background changes to dark (#121212)
- [ ] Text changes to light colors
- [ ] Cards update to dark theme
- [ ] All screens respect dark mode
- [ ] Toggle back to light mode works
- [ ] Preference persists after app restart

**Analysis History:**
- [ ] "Analysis History" header visible
- [ ] Initially empty with placeholder message
- [ ] After performing analyses:
  - [ ] History cards appear
  - [ ] Shows type (🧪 Lab or 🩺 Skin)
  - [ ] Displays timestamp
  - [ ] Shows thumbnail image
  - [ ] Shows result summary
- [ ] Latest analyses appear first (newest on top)
- [ ] Can scroll through history

**History Management:**
- [ ] "Clear All" button visible when history exists
- [ ] Tapping "Clear All" shows confirmation
- [ ] Confirming clears all history
- [ ] Canceling keeps history intact
- [ ] Delete button (🗑️) on each card
- [ ] Tapping delete shows confirmation
- [ ] Individual delete removes specific item

**About Section:**
- [ ] "About" header visible
- [ ] App version displayed (v1.0.0)
- [ ] App description shown
- [ ] Educational disclaimer with ⚠️ icon

---

## 🎨 UI/UX Testing

### Visual Design:
- [ ] Medical blue (#2196F3) primary color throughout
- [ ] Teal (#00BCD4) accent color for buttons
- [ ] Cards have rounded corners (12px)
- [ ] Shadows/elevation visible on cards
- [ ] Consistent padding and spacing
- [ ] Icons display correctly (emojis render)

### Responsiveness:
- [ ] App fits screen on your device
- [ ] No content cut off at edges
- [ ] ScrollViews work smoothly
- [ ] Bottom navigation doesn't overlap content
- [ ] Safe area respected (notch/camera cutout)

### Navigation:
- [ ] Bottom tab bar always visible
- [ ] Tab icons display correctly
- [ ] Active tab highlighted in blue
- [ ] Inactive tabs are gray
- [ ] Tapping tabs switches screens
- [ ] Screen transitions smooth

### Animations:
- [ ] Splash screen animates
- [ ] Onboarding slides transition smoothly
- [ ] Loading animations display during analysis
- [ ] Button press feedback visible
- [ ] Smooth scrolling throughout

---

## 🔌 Backend API Testing

### Health Check:
```bash
curl http://localhost:3000/health
```
Expected response:
```json
{
  "status": "healthy",
  "message": "TbibVision API is running",
  "timestamp": "..."
}
```

### Get Doctors:
```bash
curl http://localhost:3000/api/doctors
```
Expected: JSON with 10 doctors

### Filter Doctors:
```bash
curl "http://localhost:3000/api/doctors?specialization=Dermatologist"
```
Expected: JSON with dermatologists only

### Analyze Lab (requires image):
```bash
curl -X POST http://localhost:3000/api/analyze-lab \
  -F "image=@path/to/lab-image.jpg"
```
Expected: JSON with analysis results

---

## ⚡ Performance Testing

### Load Times:
- [ ] Splash screen → Onboarding: < 3 seconds
- [ ] Screen switches: < 500ms
- [ ] Image selection: Instant
- [ ] Doctors list load: < 2 seconds
- [ ] History load: < 1 second

### API Response Times:
- [ ] Lab analysis: 10-30 seconds (first time may be slower)
- [ ] Skin analysis: 10-30 seconds
- [ ] Get doctors: < 2 seconds
- [ ] Save analysis: < 1 second

### Memory Usage:
- [ ] App doesn't crash with multiple analyses
- [ ] Can store 50+ history items
- [ ] Image uploads don't cause memory errors
- [ ] App remains responsive after extended use

---

## 🐛 Error Scenarios

### Network Errors:
- [ ] Turn off WiFi → Get "Network error" message
- [ ] Turn WiFi back on → App recovers
- [ ] Backend offline → Error shown gracefully
- [ ] Timeout handled properly (60 second limit)

### Invalid Inputs:
- [ ] Analyze without image → Shows alert
- [ ] Upload very large image → Handles or shows size error
- [ ] Upload non-image file → Shows format error
- [ ] Invalid API response → Shows error message

### Permission Errors:
- [ ] Deny camera permission → Shows explanation
- [ ] Deny gallery permission → Shows explanation
- [ ] Can still use other features if permissions denied

---

## 📊 Data Persistence

### AsyncStorage:
- [ ] Onboarding completion persists
- [ ] Dark mode preference persists
- [ ] Analysis history persists
- [ ] History survives app restart
- [ ] Clearing history works
- [ ] Max 50 analyses stored

### Supabase:
- [ ] Analyses optionally saved to database
- [ ] Doctors data retrieved correctly
- [ ] Database errors handled gracefully

---

## 🔒 Security Testing

### API Keys:
- [ ] OpenRouter key not exposed in frontend
- [ ] Supabase anon key used (not service key)
- [ ] `.env` files not committed to git

### Data Privacy:
- [ ] Images deleted after analysis (check `backend/uploads/`)
- [ ] No images stored in database
- [ ] History only stored locally
- [ ] No personal data collected

---

## ✅ Final Verification

### Complete User Flow:
1. [ ] Fresh install → See onboarding
2. [ ] Complete onboarding → Land on Lab tab
3. [ ] Upload lab image → Get analysis
4. [ ] Switch to Skin tab → Upload skin image → Get results
5. [ ] Tap "Find Doctors" → See filtered list
6. [ ] Switch to Doctors tab → Browse all doctors
7. [ ] Call a doctor → Phone dialer opens
8. [ ] Switch to Profile → See 2 history items
9. [ ] Toggle dark mode → UI updates
10. [ ] Restart app → Skip onboarding, dark mode persists

### Cross-Platform:
- [ ] Tested on Android (primary)
- [ ] Tested on iOS (if available)
- [ ] Both orientations work (portrait primary)

---

## 📝 Testing Report Template

**Date**: ___________
**Device**: ___________
**OS**: ___________
**Tester**: ___________

**Tests Passed**: ___ / 150+

**Issues Found**:
1. 
2. 
3. 

**Notes**:


---

## 🎯 Test Result Summary

After completing all tests:

**✅ PASS**: All features work as expected
**⚠️ PARTIAL**: Most features work with minor issues
**❌ FAIL**: Critical issues prevent app usage

---

**Testing complete!** Document any issues and refer to troubleshooting in `SETUP_GUIDE.md`.

