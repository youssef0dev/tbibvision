# 🚀 DEPLOY BACKEND TO VERCEL - ONE CLICK

## ⚡ Quick Deploy

**Click this button to deploy your backend:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/youssef0dev/tbibvision&project-name=tbibvision-backend&repository-name=tbibvision-backend&root-directory=backend&env=OPENROUTER_API_KEY,SUPABASE_URL,SUPABASE_ANON_KEY)

---

## 📝 Or Deploy Manually:

### Step 1: Go to Vercel
https://vercel.com/new

### Step 2: Import GitHub Repository
- Select: **youssef0dev/tbibvision**

### Step 3: Configure
- **Root Directory:** `backend`
- **Project Name:** `tbibvision-backend`

### Step 4: Add Environment Variables

```
OPENROUTER_API_KEY=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

SUPABASE_URL=https://hwbibdjfwnpdqpdzfpoc.supabase.co

SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh3YmliZGpmd25wZHFwZHpmcG9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4NzMyMzUsImV4cCI6MjA1MjQ0OTIzNX0.7tjKKWiAcBr4yoI9vEKzk_kp-Ng8K7M-n6zZP51Q_Q8
```

### Step 5: Deploy
Click **"Deploy"** button

---

## ⏱️ After Deployment (2-3 minutes):

1. **You'll get a URL like:**
   ```
   https://tbibvision-backend-xxx.vercel.app
   ```

2. **Test it works:**
   Go to: `https://your-url.vercel.app/health`
   
   Should see:
   ```json
   {
     "status": "healthy",
     "message": "TbibVision API is running"
   }
   ```

3. **Copy your URL!**

---

## 📱 Next: Update Frontend

After you have your Vercel URL:

1. **Edit:** `frontend/.env`

2. **Change to:**
   ```
   EXPO_PUBLIC_API_URL=https://your-vercel-url.vercel.app
   ```

3. **Rebuild AAB:**
   ```bash
   cd frontend
   eas build --platform android --profile production
   ```

---

**Then your app will be COMPLETE!** 🎉

