# 🚀 Deploy Backend to Vercel

## ✅ What I Did:

1. ✅ Configured backend for Vercel
2. ✅ Created `vercel.json`
3. ✅ Modified `server.js` for serverless
4. ✅ Installed Vercel CLI

---

## 📝 Manual Deployment Steps:

### Step 1: Open Terminal in Backend Folder

```bash
cd C:\Users\EliteLaptop\Desktop\MedAI Morocco\backend
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy

```bash
vercel --prod
```

**When prompted:**
- Project name: `tbibvision-backend`
- Directory: `./` (current directory)
- Override settings: **NO**

---

## 🎯 OR Use Vercel Dashboard (Easier):

### Option A: Deploy via Web

1. **Go to:** https://vercel.com/new
2. **Import Git Repository**
3. **Select:** GitHub → youssef0dev/tbibvision
4. **Root Directory:** Change to `backend`
5. **Environment Variables:** Add:
   ```
   OPENROUTER_API_KEY=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
   SUPABASE_URL=https://hwbibdjfwnpdqpdzfpoc.supabase.co
   SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YmliZGpmd25wZHFwZHpmcG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzMyMzUsImV4cCI6MjA1MjQ0OTIzNX0.7tjKKWiAcBr4yoI9vEKzk_kp-Ng8K7M-n6zZP51Q_Q8
   ```
6. **Click Deploy**

---

## 📍 After Deployment:

You'll get a URL like:
```
https://tbibvision-backend.vercel.app
```

---

## 🔧 Update Frontend to Use Vercel URL:

### Edit `frontend/.env`:

```env
EXPO_PUBLIC_API_URL=https://tbibvision-backend.vercel.app
```

### Rebuild AAB with New URL:

```bash
cd frontend
eas build --platform android --profile production
```

---

## ⚠️ Important Notes:

1. **Vercel Free Tier:**
   - ✅ Unlimited deployments
   - ✅ 100GB bandwidth/month
   - ✅ Automatic HTTPS
   - ✅ Perfect for your app!

2. **File Uploads:**
   - Vercel serverless has 4.5MB limit
   - Your images should be < 4MB (fine for lab/skin images)

3. **Environment Variables:**
   - Set them in Vercel dashboard
   - Settings → Environment Variables

---

## 🎉 Final Steps:

1. Deploy backend to Vercel
2. Get your backend URL (e.g., `https://tbibvision-backend.vercel.app`)
3. Update `frontend/.env` with new URL
4. Rebuild AAB (or just update .env and rebuild)
5. Upload AAB to Google Play Console

---

## 🔗 Quick Links:

- **Vercel Dashboard:** https://vercel.com/dashboard
- **New Deployment:** https://vercel.com/new
- **Import GitHub:** https://vercel.com/new/clone?repository-url=https://github.com/youssef0dev/tbibvision

---

Made with ❤️ for Youssef Jarmouni

