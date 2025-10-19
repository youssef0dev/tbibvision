# ⚡ Quick Start - TbibVision

Get the app running in 5 minutes!

## 🚀 Start Backend

```bash
cd backend
npm install
npm start
```

✅ Backend running at `http://localhost:3000`

---

## 📱 Start Frontend

**New terminal:**

```bash
cd frontend
npm install
```

**Important**: Edit `frontend/.env` with your local IP:

```bash
# Windows: Run ipconfig
# Mac/Linux: Run ifconfig

# Then edit .env:
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000/api
```

**Start Expo:**

```bash
npm start
```

**Scan QR code** with Expo Go app on your device.

---

## ✅ Quick Test

1. **Lab Tab** → Upload image → Analyze
2. **Skin Tab** → Upload image → Analyze
3. **Doctors Tab** → Browse list
4. **Profile Tab** → View history, toggle dark mode

---

## 🐛 Issues?

**Can't connect to backend:**
- Check `.env` has your IP (not localhost)
- Both devices on same WiFi
- Backend is running

**Expo won't start:**
```bash
npx expo start -c
```

**Permissions denied:**
- Grant camera/gallery access when prompted

---

## 📋 What's Pre-Configured

✅ OpenRouter API Key (included)
✅ Supabase Database (configured)
✅ 10 Mock Doctors (seeded)
✅ All screens and components
✅ Full API integration

---

## 📚 Full Documentation

- `README.md` - Complete project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `frontend/README.md` - Frontend documentation
- `backend/README.md` - Backend documentation

---

**Ready to code!** 🎉

