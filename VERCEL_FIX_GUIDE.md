# 🚨 Fix Vercel Backend Error

## ❌ The Problem
Your Vercel backend shows: **"This Serverless Function has crashed"**

**Why?** The backend code needs 3 API keys to work:
- `OPENROUTER_API_KEY` - for AI analysis
- `SUPABASE_URL` - for database
- `SUPABASE_ANON_KEY` - for authentication

These keys are missing from Vercel!

---

## ✅ The Solution (2 Minutes)

### Option 1: Use the Batch Script (Easiest!)

Just double-click: **`fix-vercel.bat`**

It will:
1. Open Vercel dashboard
2. Wait for you to add the 3 variables
3. Redeploy automatically

---

### Option 2: Manual Steps

#### Step 1: Open Vercel Environment Variables Page

🔗 Click here: https://vercel.com/youssef-jarmounis-projects/backend/settings/environment-variables

#### Step 2: Add Each Variable

Click **"Add New"** button 3 times and enter:

**Variable 1:**
```
Key: OPENROUTER_API_KEY
Value: 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
Environment: Production (check the box)
```

**Variable 2:**
```
Key: SUPABASE_URL
Value: https://wxnfkimplrwizgehmfed.supabase.co
Environment: Production (check the box)
```

**Variable 3:**
```
Key: SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmZraW1wbHJ3aXpnZWhtZmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDYyNTUsImV4cCI6MjA3NDk4MjI1NX0.GaARh3T6WZTnQJ53_R1yzY9q8My9yXT2oV4erqwxr6Q
Environment: Production (check the box)
```

#### Step 3: Save and Wait

Click **"Save"** for each variable. Vercel will automatically redeploy (takes 1-2 minutes).

#### Step 4: Test the Backend

Open this link: https://backend-kpsbdnynd-youssef-jarmounis-projects.vercel.app/health

✅ **Success!** If you see:
```json
{
  "status": "healthy",
  "message": "TbibVision API is running",
  "timestamp": "..."
}
```

❌ **Still broken?** If you still see an error, come back and let me know.

---

## 🎯 What Happens Next?

Once the backend works, we'll:
1. ✅ Push the updated code to GitHub
2. ✅ Rebuild the AAB file with the working Vercel backend
3. ✅ You can then upload to Google Play Store!

---

## 📝 What I Fixed

I updated `backend/server.js` to work better with Vercel's serverless environment. The code now properly detects when it's running on Vercel and exports the Express app correctly.

