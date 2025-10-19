# 🚀 TbibVision Setup Guide

Step-by-step instructions to get the TbibVision app running on your device.

## ✅ Prerequisites Checklist

Before starting, make sure you have:

- [ ] Node.js installed (v16 or higher) - Check with `node --version`
- [ ] npm installed - Check with `npm --version`
- [ ] Expo Go app installed on your mobile device
  - Android: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
- [ ] Mobile device and computer on the same WiFi network
- [ ] Supabase database (already configured ✅)
- [ ] OpenRouter API key (already configured ✅)

---

## 📋 Step-by-Step Setup

### Step 1: Verify Database Setup ✅

The database has already been configured with:
- ✅ `analysis_history` table created
- ✅ `doctors` table created and seeded with 10 Moroccan doctors
- ✅ Row Level Security policies enabled

You can verify by checking the Supabase dashboard.

---

### Step 2: Setup Backend

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This will install:
   - express (Web server)
   - cors (Cross-origin requests)
   - multer (File uploads)
   - @supabase/supabase-js (Database)
   - axios (HTTP client)
   - dotenv (Environment variables)

3. **Verify environment variables:**
   
   The `.env` file should already contain:
   ```
   OPENROUTER_API_KEY=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
   SUPABASE_URL=https://orrkgdfcfxzmjgokadsk.supabase.co
   SUPABASE_ANON_KEY=eyJhbGci...
   PORT=3000
   ```

4. **Start the backend server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   🏥 TbibVision API Server running on port 3000
   📍 http://localhost:3000
   ✅ Health check: http://localhost:3000/health
   ```

5. **Test the backend:**
   
   Open a new terminal and run:
   ```bash
   curl http://localhost:3000/health
   ```
   
   You should see:
   ```json
   {
     "status": "healthy",
     "message": "TbibVision API is running",
     "timestamp": "2025-01-..."
   }
   ```

✅ **Backend is ready!** Keep this terminal open.

---

### Step 3: Setup Frontend

1. **Open a NEW terminal** and navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This will install:
   - expo & react-native
   - @react-navigation/native
   - axios (API client)
   - expo-image-picker (Camera/Gallery)
   - @react-native-async-storage/async-storage
   - nativewind (Styling)
   - And more...

   ⏱️ This may take 3-5 minutes.

3. **Find your local IP address:**

   **Windows:**
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" under your WiFi adapter (e.g., `192.168.1.100`)

   **Mac/Linux:**
   ```bash
   ifconfig | grep "inet "
   # or
   ip addr show | grep inet
   ```
   Look for your local network IP (usually starts with 192.168 or 10.0)

4. **Update the .env file:**
   
   Edit `frontend/.env` and replace with your local IP:
   ```
   EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api
   ```
   
   ⚠️ **Important**: 
   - Use your actual IP address, not `localhost`
   - Keep the `/api` at the end
   - Mobile devices cannot access `localhost` or `127.0.0.1`

5. **Start the Expo development server:**
   ```bash
   npm start
   ```

   You should see:
   ```
   › Metro waiting on exp://192.168.1.100:8081
   › Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
   ```

---

### Step 4: Run on Mobile Device

1. **Make sure your mobile device is on the same WiFi network as your computer**

2. **Open Expo Go app on your device**

3. **Scan the QR code:**
   - **Android**: Use the Expo Go app QR scanner
   - **iOS**: Use the Camera app (it will prompt to open in Expo Go)

4. **Wait for the app to load:**
   - First time may take 30-60 seconds
   - You'll see a loading screen
   - The app will open automatically when ready

---

## 🎉 Testing the App

### First Launch

1. **Splash Screen** appears with TbibVision logo (2 seconds)
2. **Onboarding** shows 3 slides explaining features
3. Tap "Get Started" or "Skip"
4. **Main App** opens with bottom navigation

### Test Lab Analyzer

1. Tap the 🧪 **Lab** tab
2. Tap "Upload Image"
3. Choose "Take Photo" or "Choose from Gallery"
4. Grant camera/gallery permissions if prompted
5. Select or take a photo of a lab test
6. Tap "🔬 Analyze Lab Test"
7. Wait 10-20 seconds for AI analysis
8. View results with color-coded status and explanations

### Test Skin Check

1. Tap the 🩺 **Skin** tab
2. Upload a skin image (same process as lab)
3. Tap "🔍 Analyze Skin"
4. Wait for AI analysis
5. View 3 possible conditions with confidence scores
6. Tap "👨‍⚕️ Find Dermatologists"

### Test Doctors

1. Tap the 👨‍⚕️ **Doctors** tab
2. View list of 10 Moroccan doctors
3. Filter by "Dermatologists" or "GP"
4. Tap "📞 Call" to open phone dialer

### Test Profile

1. Tap the 👤 **Profile** tab
2. View your analysis history
3. Toggle dark mode on/off
4. Tap 🗑️ to delete individual analyses
5. Tap "Clear All" to remove all history

---

## 🐛 Common Issues & Solutions

### Issue: "Network request failed"

**Cause**: Frontend can't reach backend

**Solutions**:
1. Verify backend is running: `curl http://localhost:3000/health`
2. Check `.env` has correct IP address (not localhost)
3. Ensure mobile and computer on same WiFi
4. Check firewall isn't blocking port 3000
5. Try disabling VPN if active

**Test connection from mobile:**
Open mobile browser and navigate to: `http://YOUR_IP:3000/health`

---

### Issue: "Unable to resolve module"

**Cause**: Missing dependencies

**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

### Issue: Image picker not working

**Cause**: Permissions not granted

**Solutions**:
1. When prompted, tap "Allow" for camera and photos
2. Check device Settings → TbibVision → Permissions
3. Enable Camera and Photos/Media
4. Restart the app

---

### Issue: AI analysis taking too long

**Causes**: 
- First API call (cold start): 15-30 seconds
- Large image file: Optimize or reduce size
- OpenRouter API overload: Rare, try again

**Normal timing**:
- Lab analysis: 10-20 seconds
- Skin analysis: 10-20 seconds

---

### Issue: Expo won't start

**Solution 1 - Clear cache:**
```bash
cd frontend
npx expo start -c
```

**Solution 2 - Reset Expo:**
```bash
rm -rf node_modules .expo .expo-shared
npm install
npm start
```

---

### Issue: Backend crashes on image upload

**Cause**: Missing uploads directory

**Solution**:
```bash
cd backend
mkdir uploads
npm start
```

---

## 📱 Device Requirements

### Android
- Android 5.0 (Lollipop) or higher
- Expo Go app installed
- Camera and storage permissions

### iOS
- iOS 13.0 or higher
- Expo Go app installed
- Camera and photos permissions

---

## 🔒 Security Notes

### API Keys
- OpenRouter API key is included in `.env`
- **DO NOT** commit `.env` to public repositories
- For production, use environment variable injection

### Image Privacy
- Images are temporarily stored in `backend/uploads/`
- Deleted immediately after analysis
- Not saved to database
- Local device storage only (via AsyncStorage)

---

## 🎓 Next Steps

Now that your app is running:

1. **Test all features** with real medical images
2. **Customize the UI** - Edit colors in `frontend/constants/Colors.js`
3. **Add more doctors** - Insert into Supabase `doctors` table
4. **Improve AI prompts** - Edit `backend/utils/openrouter.js`
5. **Add authentication** - Integrate Supabase Auth
6. **Deploy backend** - Use Railway, Heroku, or DigitalOcean
7. **Build standalone app** - Use `eas build` for app stores

---

## 📚 Documentation Links

- [Expo Documentation](https://docs.expo.dev/)
- [React Native](https://reactnavigation.org/)
- [Supabase Docs](https://supabase.com/docs)
- [OpenRouter API](https://openrouter.ai/docs)

---

## 💬 Support

If you encounter issues:

1. Check this guide's troubleshooting section
2. Review backend logs (terminal where `npm start` runs)
3. Check Expo logs (terminal and app)
4. Verify all environment variables are correct
5. Ensure all dependencies are installed

---

## ✅ Setup Complete!

You should now have:
- ✅ Backend API running on port 3000
- ✅ Frontend app running in Expo Go
- ✅ Database connected and seeded
- ✅ AI analysis working
- ✅ All features functional

Enjoy using TbibVision! 🎉🏥

