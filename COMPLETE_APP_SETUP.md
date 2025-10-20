# 🎯 COMPLETE APP SETUP - Frontend + Backend

## What You Want:
A **COMPLETE working app** where users download from Play Store and everything works.

## What We Need to Do:
1. ✅ Deploy backend to Vercel (free, online 24/7)
2. ✅ Update frontend to use Vercel backend
3. ✅ Rebuild AAB with complete setup
4. ✅ Upload to Google Play Store

---

## 🚀 STEP 1: Deploy Backend to Vercel

### Option A: Via Vercel Dashboard (EASIEST)

1. **Go to:** https://vercel.com/new

2. **Import Git Repository:**
   - Click "Import Project"
   - Select GitHub
   - Choose: `youssef0dev/tbibvision`

3. **Configure Project:**
   - **Project Name:** `tbibvision-backend`
   - **Framework Preset:** Other
   - **Root Directory:** `backend` ✅ IMPORTANT!
   - **Build Command:** (leave empty)
   - **Output Directory:** (leave empty)

4. **Environment Variables:**
   Click "Add" for each:
   
   ```
   OPENROUTER_API_KEY
   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
   
   SUPABASE_URL
   https://hwbibdjfwnpdqpdzfpoc.supabase.co
   
   SUPABASE_ANON_KEY
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YmliZGpmd25wZHFwZHpmcG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzMyMzUsImV4cCI6MjA1MjQ0OTIzNX0.7tjKKWiAcBr4yoI9vEKzk_kp-Ng8K7M-n6zZP51Q_Q8
   ```

5. **Click "Deploy"**

6. **Wait 2-3 minutes**

7. **Copy your Vercel URL:**
   ```
   https://tbibvision-backend.vercel.app
   ```
   (or whatever Vercel gives you)

---

## 📝 STEP 2: Update Frontend Configuration

After backend is deployed, update frontend:

### Edit `frontend/.env`:

```env
EXPO_PUBLIC_API_URL=https://tbibvision-backend.vercel.app
```

**Replace with YOUR actual Vercel URL!**

---

## 📦 STEP 3: Rebuild AAB with Complete Setup

Now rebuild the AAB so it connects to your online backend:

```bash
cd frontend
eas build --platform android --profile production
```

This will:
- Build a NEW AAB
- Include the Vercel backend URL
- Create a COMPLETE working app

**This will take 10-20 minutes.**

---

## 📥 STEP 4: Download the NEW AAB

After build completes:

```bash
cd frontend
eas build:download --latest
```

Or use: `DOWNLOAD_AAB.bat`

---

## 🎉 RESULT: COMPLETE WORKING APP

After these steps, your AAB will be **COMPLETE**:

```
┌─────────────────────────┐
│   Google Play Store     │
│                         │
│   Users download app    │ ← Complete AAB
└───────────┬─────────────┘
            │
            ↓
┌───────────────────────────┐
│   User's Phone            │
│   (TbibVision App)        │ ← Frontend from AAB
│                           │
│   • Login/Signup          │
│   • Lab Analyzer          │
│   • Skin Checker          │
│   • Symptom Checker       │
│   • Doctor Finder         │
│   • Profile               │
└───────────┬───────────────┘
            │
            │ Connects to ↓
            │
┌───────────────────────────────────┐
│   Vercel (Online 24/7)            │
│   https://tbibvision-backend...   │ ← Backend on Vercel
│                                   │
│   • Processes images              │
│   • Calls OpenRouter AI           │
│   • Connects to Supabase          │
│   • Returns results               │
└───────────┬───────────────────────┘
            │
            ↓
┌───────────────────────────┐
│   OpenRouter + Supabase   │
│   • AI Analysis           │
│   • Database              │
│   • Authentication        │
└───────────────────────────┘
```

**Everything works together!** ✅

---

## ✅ WHAT USERS GET:

When users download from Play Store:

1. ✅ **Complete mobile app** (from AAB)
2. ✅ **Working AI features** (connects to Vercel backend)
3. ✅ **Authentication** (Supabase)
4. ✅ **Doctor database** (Supabase)
5. ✅ **Everything works!** No setup needed

---

## 💰 COSTS:

- **Vercel:** FREE (up to 100GB/month)
- **Supabase:** FREE (up to 500MB database)
- **OpenRouter:** $9.00 (you already have)
- **Google Play:** $25 one-time

**Total: $0/month** (after initial setup) 🎉

---

## ⚠️ IMPORTANT:

**DO NOT upload the current AAB to Play Store!**

The current AAB points to:
```
http://192.168.110.187:3000
```

**This will NOT work for users!**

**You MUST:**
1. Deploy backend to Vercel
2. Update frontend .env
3. Rebuild AAB
4. THEN upload to Play Store

---

## 🚀 QUICK START:

1. **Deploy Backend:**
   https://vercel.com/new → Import GitHub → Select `backend` folder

2. **Get Vercel URL:**
   Copy the URL Vercel gives you

3. **Update Frontend:**
   Edit `frontend/.env` with Vercel URL

4. **Rebuild AAB:**
   ```bash
   cd frontend
   eas build --platform android --profile production
   ```

5. **Download & Upload:**
   Get new AAB → Upload to Play Store

---

**This creates a COMPLETE, WORKING APP!** 🎉

Made with ❤️ for Youssef Jarmouni

