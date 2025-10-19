# 🗄️ Supabase Setup Instructions

## Step 1: Run SQL Script

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard
   - Select your project: `wxnfkimplrwizgehmfed`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Copy and Run the SQL**
   - Open the file: `supabase_setup.sql`
   - Copy all the content
   - Paste it into the SQL Editor
   - Click "Run" button (or press Ctrl+Enter)

4. **Verify Success**
   You should see output showing:
   ```
   analysis_history table created
   doctors table created
   doctor_count: 10
   ```

---

## Step 2: Get Your Supabase Anon Key

1. **Go to Project Settings**
   - In Supabase Dashboard
   - Click on "Settings" (gear icon) in the left sidebar
   - Click on "API"

2. **Copy Your Anon Key**
   - Find the section "Project API keys"
   - Copy the `anon` `public` key (not the `service_role` key!)
   - It starts with: `eyJhbGci...`

---

## Step 3: Update Backend Configuration

1. **Open backend/.env file**
   - It's already been updated with your new Supabase URL ✅
   
2. **Replace the placeholder**
   - Find the line: `SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE`
   - Replace `YOUR_ANON_KEY_HERE` with your actual anon key from Step 2

3. **Final .env should look like:**
   ```
   OPENROUTER_API_KEY=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
   SUPABASE_URL=https://wxnfkimplrwizgehmfed.supabase.co
   SUPABASE_ANON_KEY=eyJhbGci... (your actual key)
   PORT=3000
   ```

---

## Step 4: Verify Everything Works

1. **Start Backend Server**
   ```bash
   cd backend
   node server.js
   ```
   
   You should see:
   ```
   🏥 TbibVision API Server running on port 3000
   ```

2. **Test Doctors Endpoint**
   ```bash
   curl http://localhost:3000/api/doctors
   ```
   
   Should return JSON with 10 Moroccan doctors!

---

## ✅ Checklist

- [ ] Ran `supabase_setup.sql` in Supabase SQL Editor
- [ ] Verified 2 tables created (analysis_history, doctors)
- [ ] Verified 10 doctors inserted
- [ ] Got anon key from Supabase Project Settings → API
- [ ] Updated `backend/.env` with the anon key
- [ ] Tested backend server starts successfully
- [ ] Tested `/api/doctors` endpoint returns data

---

## 🎉 Once Complete

Your TbibVision app will now use your new Supabase database!

All analysis data and doctor information will be stored in:
- Project: `wxnfkimplrwizgehmfed`
- URL: `https://wxnfkimplrwizgehmfed.supabase.co`

---

## 🐛 Troubleshooting

**If SQL fails:**
- Make sure you're in the correct project
- Check if tables already exist (they'll be skipped if they do)
- Try running each section separately

**If backend can't connect:**
- Verify the anon key is correct
- Make sure there are no extra spaces in .env file
- Check RLS policies are enabled

**If no doctors show:**
- Run: `SELECT * FROM doctors;` in SQL Editor
- Re-run the INSERT statement from supabase_setup.sql

---

**Need help?** Check the backend logs for specific error messages!

