# 📥 TbibVision Installation Guide

Complete installation instructions for running TbibVision on your device.

---

## 📋 Prerequisites

Before starting, ensure you have:

### Required Software:
- [x] **Node.js** v16+ ([Download](https://nodejs.org/))
- [x] **npm** (comes with Node.js)
- [x] **Expo Go** app on your mobile device
  - [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)
  - [iOS](https://apps.apple.com/app/expo-go/id982107779)

### Network:
- [x] Mobile device and computer on **same WiFi network**
- [x] Port 3000 available on your computer

### Already Configured:
- ✅ Supabase database (tables created and seeded)
- ✅ OpenRouter API key (included in project)
- ✅ All configuration files ready

---

## 🚀 Installation Steps

### Step 1: Verify Node.js Installation

```bash
node --version
# Should show v16.x.x or higher

npm --version
# Should show 8.x.x or higher
```

If not installed, download from: https://nodejs.org/

---

### Step 2: Install Backend Dependencies

Open terminal in project root:

```bash
cd backend
npm install
```

**Expected output:**
```
added 150+ packages in 30s
```

**What gets installed:**
- express
- cors
- multer
- @supabase/supabase-js
- axios
- dotenv

---

### Step 3: Verify Backend Configuration

Check that `backend/.env` contains:

```bash
# View the file (Windows PowerShell)
cat backend\.env

# Or (Mac/Linux)
cat backend/.env
```

Should show:
```
OPENROUTER_API_KEY=sk-or-v1-...
SUPABASE_URL=https://orrkgdfcfxzmjgokadsk.supabase.co
SUPABASE_ANON_KEY=eyJhbGci...
PORT=3000
```

✅ If present, backend is configured!

---

### Step 4: Start Backend Server

In the `backend` directory:

```bash
npm start
```

**Expected output:**
```
🏥 TbibVision API Server running on port 3000
📍 http://localhost:3000
✅ Health check: http://localhost:3000/health
```

**Test it:**
```bash
# Open new terminal
curl http://localhost:3000/health
```

Should return:
```json
{
  "status": "healthy",
  "message": "TbibVision API is running",
  "timestamp": "2025-01-..."
}
```

✅ **Backend is running!** Keep this terminal open.

---

### Step 5: Install Frontend Dependencies

Open **NEW terminal**, navigate to frontend:

```bash
cd frontend
npm install
```

**Expected output:**
```
added 1000+ packages in 2-3 minutes
```

⏱️ This takes longer (~2-5 minutes). Be patient.

**What gets installed:**
- expo & react-native
- @react-navigation/native
- axios
- expo-image-picker
- Many other dependencies

---

### Step 6: Configure Frontend API URL

**Find your local IP address:**

**Windows (PowerShell):**
```bash
ipconfig
```
Look for "IPv4 Address" under your WiFi adapter.
Example: `192.168.1.100`

**Mac:**
```bash
ifconfig | grep "inet "
```
Look for IP starting with 192.168 or 10.0
Example: `192.168.1.100`

**Linux:**
```bash
ip addr show | grep inet
```

**Edit `frontend/.env`:**

Open the file and replace with YOUR IP:
```
EXPO_PUBLIC_API_URL=http://192.168.1.100:3000/api
```

⚠️ **Critical:**
- Use YOUR actual IP address
- NOT `localhost` or `127.0.0.1`
- Mobile devices need network IP
- Keep `/api` at the end

---

### Step 7: Start Expo Development Server

In the `frontend` directory:

```bash
npm start
```

**Expected output:**
```
Starting Metro Bundler
› Metro waiting on exp://192.168.1.100:8081
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press ? │ show all commands
```

You'll see a **QR code** in the terminal.

✅ **Frontend is ready!**

---

### Step 8: Open App on Mobile Device

#### Android:
1. Open **Expo Go** app
2. Tap "Scan QR code"
3. Point camera at QR code in terminal
4. App will load (30-60 seconds first time)

#### iOS:
1. Open **Camera** app (native camera)
2. Point at QR code in terminal
3. Tap notification "Open in Expo Go"
4. App will load (30-60 seconds first time)

**First load:**
- Shows "Building JavaScript bundle"
- Downloads dependencies
- May take 1-2 minutes
- Subsequent loads faster

---

## ✅ Verification

### Backend Check:
- Terminal shows "TbibVision API Server running"
- Health endpoint responds: http://localhost:3000/health

### Frontend Check:
- Expo shows QR code
- No error messages in terminal
- Metro bundler running

### Mobile Check:
- App opens on your device
- Shows splash screen with TbibVision logo
- Navigates to onboarding
- Bottom navigation visible

---

## 🎯 First Run

When app opens:

1. **Splash Screen** (2 seconds)
   - Medical logo on blue background

2. **Onboarding** (3 slides)
   - Swipe through features
   - Tap "Get Started"

3. **Main App**
   - Lab Analyzer tab (default)
   - Bottom navigation with 4 tabs

**Grant Permissions:**
- Camera: Tap "Allow" when prompted
- Photos: Tap "Allow" when prompted

---

## 🧪 Quick Test

### Test Lab Analyzer:
1. Tap 🧪 Lab tab
2. Tap "Upload Image"
3. Choose "Take Photo" or "Choose from Gallery"
4. Select any image (for testing)
5. Tap "🔬 Analyze Lab Test"
6. Wait 15-30 seconds
7. View results

### Test Doctors:
1. Tap 👨‍⚕️ Doctors tab
2. Should see list of 10 doctors
3. Tap filters to change view

### Test Dark Mode:
1. Tap 👤 Profile tab
2. Toggle dark mode switch
3. UI should change to dark theme

---

## 🐛 Troubleshooting

### Backend won't start:

**Error: "Port 3000 already in use"**
```bash
# Windows
netstat -ano | findstr :3000
# Note the PID, then:
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
# Note the PID, then:
kill -9 <PID>
```

**Error: "Cannot find module"**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

---

### Frontend won't start:

**Error: "Unable to resolve module"**
```bash
cd frontend
npx expo start -c
```

**Error: "Metro bundler failed"**
```bash
cd frontend
rm -rf node_modules .expo
npm install
npm start
```

---

### App won't load on device:

**Issue: "Network request failed"**
1. Check mobile and computer on same WiFi
2. Verify `.env` has correct IP (not localhost)
3. Ping your computer from mobile browser: `http://YOUR_IP:3000/health`
4. Disable VPN if active
5. Check firewall allows port 3000

**Issue: "Something went wrong"**
1. Check backend terminal for errors
2. Check frontend terminal for errors
3. Shake device → Reload
4. Close Expo Go → Reopen

**Issue: Stuck on splash screen**
1. Check backend is running
2. Wait 60 seconds (first load)
3. Shake device → Reload

---

### Permissions not working:

**Camera/Gallery won't open:**
1. Device Settings → Apps → Expo Go
2. Permissions → Enable Camera and Photos
3. Restart app

---

## 🔄 Restart Everything

If all else fails:

### Stop Services:
```bash
# Stop backend: Ctrl+C in backend terminal
# Stop frontend: Ctrl+C in frontend terminal
```

### Clear and Restart:
```bash
# Backend
cd backend
rm -rf node_modules
npm install
npm start

# In NEW terminal
cd frontend
rm -rf node_modules .expo
npm install
npx expo start -c
```

---

## 📱 Different Device Setup

### To run on different device:
1. Ensure new device on same WiFi
2. Scan same QR code
3. App will load

### To run on different network:
1. Get new IP address: `ipconfig` or `ifconfig`
2. Update `frontend/.env` with new IP
3. Restart Expo: `npm start`
4. Scan new QR code

---

## 💾 Data Persistence

### Local Storage (AsyncStorage):
- Onboarding completion
- Dark mode preference
- Analysis history (last 50)

### Database (Supabase):
- Doctors list
- Optional: Sync analysis history

Data persists between app restarts.

---

## 🔧 Development Mode

### Hot Reload:
- Edit any file
- Save
- App auto-reloads (most changes)
- Shake device for manual reload

### Debug Menu:
- Android: Shake device
- iOS: Shake device or Cmd+D (simulator)

**Options:**
- Reload
- Debug Remote JS
- Show Performance Monitor
- Toggle Element Inspector

---

## 📊 System Requirements

### Computer:
- **OS**: Windows 10+, macOS 10.14+, Linux
- **RAM**: 4GB minimum (8GB recommended)
- **Disk**: 2GB free space
- **Network**: WiFi with stable connection

### Mobile Device:
- **Android**: 5.0 (Lollipop) or higher
- **iOS**: 13.0 or higher
- **RAM**: 2GB minimum
- **Storage**: 100MB free space
- **Network**: WiFi connection

---

## 🎓 Learning Resources

### Expo Documentation:
- [Expo Docs](https://docs.expo.dev/)
- [Expo Go Guide](https://expo.dev/client)

### React Native:
- [React Native Docs](https://reactnavigation.org/)
- [Navigation Guide](https://reactnavigation.org/docs/getting-started)

### Troubleshooting:
- [Expo Forums](https://forums.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

---

## ✅ Installation Complete!

You should now have:
- ✅ Backend running on port 3000
- ✅ Frontend running in Expo
- ✅ App on your mobile device
- ✅ All features working

**Next Steps:**
1. Read `QUICK_START.md` for usage guide
2. Check `TESTING_CHECKLIST.md` for testing
3. Review `README.md` for full documentation

---

## 🎉 Ready to Use!

Your TbibVision medical AI assistant is fully installed and operational.

**Start analyzing medical images now!** 🏥📱

---

**Need help?** Check `SETUP_GUIDE.md` for detailed troubleshooting.

