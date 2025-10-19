# 👨‍⚕️ Smart Doctor Finder Feature

## Overview
After analyzing a lab test or skin image, users can now click a "Find Doctors" button that intelligently shows doctors specialized in treating the detected condition.

## How It Works

### 1. AI Analysis
- User uploads a lab test or skin image
- AI analyzes the image and provides results

### 2. Smart Specialty Detection
- The app automatically detects medical keywords in the AI results
- Maps keywords to relevant doctor specializations:
  - **Dermatologist**: skin, acne, rash, eczema, psoriasis, etc.
  - **Cardiologist**: heart, cholesterol, blood pressure, ECG, etc.
  - **Endocrinologist**: diabetes, thyroid, glucose, insulin, etc.
  - **Nephrologist**: kidney, renal, creatinine, urea, etc.
  - **Hematologist**: blood, anemia, hemoglobin, platelets, etc.
  - **Gastroenterologist**: liver, digestive, ALT, AST, etc.
  - **General Practitioner**: general health, vitamins, routine checkups

### 3. Filtered Doctor List
- Button text changes based on detected specialty
  - Example: "Find Cardiologists" for heart-related results
  - Example: "Find Dermatologists" for skin issues
- Clicking the button navigates to Doctors screen
- Doctors are automatically filtered by the relevant specialty

## User Flow

### Lab Analysis Example:
```
1. User uploads lab test showing high cholesterol
2. AI detects: "elevated cholesterol, LDL, triglycerides"
3. Button shows: "👨‍⚕️ Find Cardiologists"
4. User clicks button
5. Doctors screen opens with Cardiologists filter active
6. Shows only cardiologists in Morocco
```

### Skin Analysis Example:
```
1. User takes photo of skin rash
2. AI detects: "dermatitis, inflammation, skin condition"
3. Button shows: "👨‍⚕️ Find Dermatologists"
4. User clicks button
5. Doctors screen opens with Dermatologists filter active
6. Shows only dermatologists in Morocco
```

## Technical Implementation

### Files Modified:

1. **`frontend/utils/specialtyMatcher.js`** (NEW)
   - Contains keyword mapping for each specialty
   - `findRelevantSpecialty()` - Analyzes text to find best match
   - `extractTextFromResults()` - Extracts text from various result formats
   - `getSpecialtyDisplayName()` - Returns user-friendly specialty names

2. **`frontend/screens/LabAnalyzerScreen.js`**
   - Added "Find Doctors" button after results
   - Button text dynamically changes based on detected condition
   - Navigates to Doctors with specialty filter

3. **`frontend/screens/SkinCheckScreen.js`**
   - Updated existing "Find Dermatologists" button
   - Now intelligently detects condition from results
   - Button text adapts to detected specialty

4. **`frontend/screens/DoctorsScreen.js`**
   - Accepts navigation params for specialty filter
   - Auto-selects the correct filter when navigating from analysis

### Database Enhancement:

**`supabase_add_specialists.sql`** - Adds more specialist doctors:
- 2 Cardiologists
- 2 Endocrinologists
- 2 Nephrologists
- 2 Hematologists
- 2 Gastroenterologists

Run this SQL script in your Supabase dashboard to add these doctors.

## How to Test

### 1. Update Database (Optional but Recommended):
```sql
-- Go to Supabase Dashboard > SQL Editor
-- Run the contents of supabase_add_specialists.sql
```

### 2. Test Skin Analysis:
- Go to Skin Check tab
- Upload/take a skin photo
- Click "Analyze Skin"
- Wait for results
- Click the "Find [Specialty]" button
- Verify doctors screen shows filtered results

### 3. Test Lab Analysis:
- Go to Lab Analyzer tab
- Upload a lab test image
- Click "Analyze Lab Test"
- Wait for results
- Click the "Find [Specialty]" button
- Verify doctors screen shows filtered results

## Default Behaviors:

- **Skin Analysis**: Defaults to "Dermatologist" if no specific condition detected
- **Lab Analysis**: Defaults to "General Practitioner" if no specific condition detected
- **No Match**: Shows all doctors if navigation params are empty

## Benefits:

✅ **Intelligent** - Automatically detects relevant specialty  
✅ **User-Friendly** - One-click access to relevant doctors  
✅ **Contextual** - Button text matches detected condition  
✅ **Educational** - Helps users understand which specialist to see  
✅ **Seamless** - Smooth navigation between screens  

## Future Enhancements (Optional):

- Add location-based filtering (show nearest doctors)
- Add appointment booking integration
- Add doctor ratings and reviews
- Add "Save to favorites" for doctors
- Add chat/consult feature

