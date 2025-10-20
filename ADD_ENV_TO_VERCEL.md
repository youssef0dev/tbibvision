# 🔧 Fix Vercel Backend Error - Add Environment Variables

## The Problem
The Vercel backend is crashing because it doesn't have the required environment variables (API keys).

## Quick Fix - Add Environment Variables via Vercel Dashboard

### Step 1: Go to Your Vercel Project Settings
🔗 **Open this link**: https://vercel.com/youssef-jarmounis-projects/backend/settings/environment-variables

### Step 2: Add These 3 Environment Variables

Click "Add New" for each one:

#### 1️⃣ OPENROUTER_API_KEY
- **Key**: `OPENROUTER_API_KEY`
- **Value**: `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`
- **Environment**: Select `Production`
- Click **Save**

#### 2️⃣ SUPABASE_URL
- **Key**: `SUPABASE_URL`
- **Value**: `https://wxnfkimplrwizgehmfed.supabase.co`
- **Environment**: Select `Production`
- Click **Save**

#### 3️⃣ SUPABASE_ANON_KEY
- **Key**: `SUPABASE_ANON_KEY`
- **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmZraW1wbHJ3aXpnZWhtZmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDYyNTUsImV4cCI6MjA3NDk4MjI1NX0.GaARh3T6WZTnQJ53_R1yzY9q8My9yXT2oV4erqwxr6Q`
- **Environment**: Select `Production`
- Click **Save**

### Step 3: Redeploy
After adding all 3 variables, Vercel will automatically redeploy your backend.

Wait 1-2 minutes, then test: https://backend-kpsbdnynd-youssef-jarmounis-projects.vercel.app/health

You should see: `{"status":"healthy","timestamp":"...","service":"TbibVision API"}`

---

## ✅ Once Backend is Working

After the backend is fixed, we'll rebuild the AAB file with the working Vercel backend URL.

