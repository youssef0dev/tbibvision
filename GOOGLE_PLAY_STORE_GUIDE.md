# 📱 Google Play Store Publishing Guide

## 🎯 Overview
This guide will help you build an **AAB (Android App Bundle)** file and publish **TbibVision** to Google Play Store.

---

## 📋 Prerequisites

### 1. Google Play Console Account
- Go to: https://play.google.com/console
- Cost: **$25 one-time registration fee**
- Create your developer account if you haven't

### 2. Expo Account (Free)
- Go to: https://expo.dev/signup
- Sign up with your email
- Verify your email address

---

## 🛠️ Step 1: Install EAS CLI

```bash
cd frontend
npm install -g eas-cli
```

---

## 🔐 Step 2: Login to Expo

```bash
eas login
```

Enter your Expo credentials when prompted.

---

## 🏗️ Step 3: Configure the Project

```bash
eas build:configure
```

This will:
- Link your project to Expo
- Create necessary configuration
- Set up your project ID

---

## 📦 Step 4: Build the AAB File

### Option A: Build in the Cloud (Recommended)

```bash
eas build --platform android --profile production
```

This will:
1. Upload your code to Expo servers
2. Build the AAB file in the cloud
3. Take about 10-20 minutes
4. Generate a **download link** for your AAB file

**Note:** You'll be asked to generate a new Android Keystore. Say **YES** and let EAS manage it for you.

### Option B: Local Build (Advanced)

```bash
eas build --platform android --profile production --local
```

Requires Android Studio and SDK installed locally.

---

## 📥 Step 5: Download Your AAB

After the build completes:
1. You'll see a download link in the terminal
2. Or go to: https://expo.dev/accounts/[your-account]/projects/tbibvision/builds
3. Download the `.aab` file

The file will be named something like:
```
tbibvision-1.0.0.aab
```

---

## 📝 Step 6: Prepare Store Listing

Before uploading to Play Store, prepare:

### App Information
- **App name:** TbibVision - Medical AI Assistant
- **Short description:** AI-powered lab test analyzer, skin checker, and symptom checker
- **Full description:**

```
TbibVision is your AI-powered medical assistant that helps you understand your health better.

🧪 LAB TEST ANALYZER
Upload your lab test results and get instant AI analysis with:
• Detailed explanation of each test
• Normal vs abnormal indicators
• Educational insights

🩺 SKIN CONDITION CHECKER
Take a photo of skin concerns and receive:
• AI-powered condition suggestions
• Confidence levels
• When to see a specialist
• General care advice

🤖 AI SYMPTOM CHECKER
Describe your symptoms in text and get:
• Possible condition analysis
• Urgency level assessment
• Recommended medical specialties
• Doctor finder with smart filtering

👨‍⚕️ SMART DOCTOR FINDER
Find the right specialists based on your needs

🔐 SECURE & PRIVATE
• User authentication
• Your data stays private
• Each user has their own secure space

⚠️ IMPORTANT DISCLAIMER
This app is for educational purposes only and is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult with qualified healthcare professionals for medical concerns.

Features:
✅ AI-powered analysis
✅ Lab test interpretation
✅ Skin condition assessment
✅ Symptom checker
✅ Doctor recommendations
✅ Dark/Light mode
✅ Secure authentication
```

### Screenshots
You'll need 2-8 screenshots (1080x1920 or 1920x1080):
1. Home/Onboarding screen
2. Lab analyzer screen
3. Lab results screen
4. Skin checker screen
5. Symptom checker screen
6. Doctor list screen
7. Profile screen

### App Icon
- 512 x 512 px PNG
- High-resolution icon

### Feature Graphic
- 1024 x 500 px
- Will be displayed at the top of your store listing

### Privacy Policy URL
Required! You need to create a privacy policy.
- Use: https://app-privacy-policy-generator.firebaseapp.com/
- Or create your own webpage

---

## 🚀 Step 7: Upload to Play Store

### A. Create a New App

1. Go to: https://play.google.com/console
2. Click **"Create app"**
3. Fill in:
   - **App name:** TbibVision
   - **Default language:** English (US)
   - **App or game:** App
   - **Free or paid:** Free
4. Accept declarations and click **Create app**

### B. Set Up Store Listing

1. Go to **Store presence** → **Main store listing**
2. Fill in all the information from Step 6
3. Upload screenshots and graphics
4. Add your **privacy policy URL**
5. Save changes

### C. Select Content Rating

1. Go to **Policy** → **App content**
2. Click **Content rating** → **Start questionnaire**
3. Answer all questions honestly
4. Submit for rating
5. You'll get: **PEGI 3** or **Everyone** rating

### D. Select App Category

1. Go to **Store presence** → **Main store listing**
2. Category: **Medical** or **Health & Fitness**
3. Tags: `health`, `medical`, `AI`, `doctor`

### E. Set Up Pricing & Distribution

1. Go to **Grow** → **Pricing & distribution**
2. Select **Free**
3. Select countries (or select all)
4. Check **Available on Google Play**
5. Answer content declarations

### F. Create a Release

1. Go to **Release** → **Production**
2. Click **Create new release**
3. Upload your **AAB file**
4. Enter **Release name:** `1.0.0 - Initial Release`
5. **Release notes:**

```
🎉 Welcome to TbibVision v1.0!

This is the initial release of TbibVision, your AI-powered medical assistant.

Features in this release:
• 🧪 Lab Test Analyzer - Upload and analyze lab results
• 🩺 Skin Condition Checker - AI-powered skin analysis
• 🤖 Symptom Checker - Describe symptoms, get insights
• 👨‍⚕️ Smart Doctor Finder - Find specialists based on your needs
• 🔐 Secure Authentication - Your data stays private
• 🌓 Dark/Light Mode - Comfortable viewing

⚠️ For educational purposes only. Always consult healthcare professionals.

Questions? Contact: youssef.dev.codes@gmail.com
```

6. Click **Save** → **Review release** → **Start rollout to Production**

---

## ⏱️ Timeline

- **Build time:** 10-20 minutes
- **Play Store review:** 1-7 days (usually 1-3 days)
- **First approval:** May take longer (thorough review)

---

## 📊 Build Summary

### What Gets Built:
- ✅ Optimized Android App Bundle (.aab)
- ✅ Code obfuscation for security
- ✅ Asset optimization
- ✅ Signing with production keystore
- ✅ Ready for Google Play Store

### File Size:
- Expected AAB size: **20-40 MB**
- Download size for users: **15-30 MB**

---

## ⚠️ Important Notes

### Before Building:
1. ✅ Test your app thoroughly
2. ✅ Make sure backend is running
3. ✅ Verify all features work
4. ✅ Check OpenRouter API key is set
5. ✅ Test on multiple devices

### Keystore Management:
- **Let EAS manage your keystore** (recommended)
- EAS will securely store your signing key
- You can download it later if needed
- **Never lose your keystore!** (You can't update your app without it)

### Medical App Compliance:
Google requires medical apps to:
1. ✅ Have clear disclaimers (you have this)
2. ✅ State it's for educational purposes (you have this)
3. ✅ Not claim to diagnose or treat (you don't)
4. ✅ Have a privacy policy (create one)
5. ✅ Be transparent about data collection

---

## 🆘 Troubleshooting

### Build Failed?

```bash
# Clear cache and try again
cd frontend
rm -rf node_modules
npm install
eas build --platform android --profile production --clear-cache
```

### "No Expo Account"?

```bash
eas logout
eas login
# Enter your credentials
```

### "Build took too long"?

This is normal. Cloud builds can take 15-30 minutes.

---

## 📞 Support

- **Expo Build Issues:** https://expo.dev/build-status
- **Play Store Help:** https://support.google.com/googleplay/android-developer
- **Your Email:** youssef.dev.codes@gmail.com

---

## 🎉 After Publishing

Once your app is live:

1. ⭐ **Monitor Reviews** - Respond to user feedback
2. 📊 **Check Statistics** - See download numbers
3. 🐛 **Fix Bugs** - Release updates as needed
4. 📢 **Share the Link** - Tell everyone!

Your app URL will be:
```
https://play.google.com/store/apps/details?id=com.tbibvision.app
```

---

## 🔄 Future Updates

To release updates:

1. Update `version` in `app.json` (e.g., `1.0.1`)
2. Increase `versionCode` (e.g., `2`)
3. Build again: `eas build --platform android --profile production`
4. Upload new AAB to Play Store
5. Users get automatic updates!

---

**Good luck with your launch! 🚀**

Made with ❤️ by Youssef Jarmouni

