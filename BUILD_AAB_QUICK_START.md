# 🚀 Build AAB File - Quick Start

## ✅ What's Already Done

- ✅ EAS CLI installed
- ✅ `app.json` configured for production
- ✅ `eas.json` created with build profiles
- ✅ Package name: `com.tbibvision.app`
- ✅ Version: `1.0.0` (versionCode: 1)
- ✅ All changes pushed to GitHub

---

## 🎯 Next Steps (3 Commands)

### Step 1: Login to Expo

```bash
cd frontend
eas login
```

**Don't have an Expo account?**
- Go to: https://expo.dev/signup
- Sign up (it's free!)
- Then run `eas login`

---

### Step 2: Configure Project

```bash
eas build:configure
```

This links your project to Expo. Just press **Enter** for all prompts.

---

### Step 3: Build AAB File

```bash
eas build --platform android --profile production
```

**What happens:**
1. Uploads your code to Expo servers
2. Builds the AAB in the cloud (takes 10-20 minutes)
3. Gives you a download link

**When asked about Android Keystore:**
- Choose: **"Generate new keystore"**
- Let EAS manage it for you (recommended)

---

## 📥 Getting Your AAB File

After the build completes, you'll see:

```
✔ Build successful!
Download: https://expo.dev/artifacts/eas/...
```

**Or find it at:**
https://expo.dev/accounts/[your-username]/projects/tbibvision/builds

---

## 📱 File Details

- **File name:** `tbibvision-1.0.0.aab`
- **Size:** ~20-40 MB
- **Package:** `com.tbibvision.app`
- **Version Code:** 1

---

## 🆘 Troubleshooting

### "Command not found: eas"

```bash
npm install -g eas-cli
```

### "No Expo account"

Sign up at: https://expo.dev/signup

### Build failed?

```bash
eas build --platform android --profile production --clear-cache
```

---

## 📝 After Getting Your AAB

1. **Download the .aab file**
2. **Go to Google Play Console:** https://play.google.com/console
3. **Create a new app**
4. **Upload your AAB file**
5. **Fill in store listing** (see GOOGLE_PLAY_STORE_GUIDE.md)

---

## ⏱️ Timeline

- **Build:** 10-20 minutes
- **Play Store Review:** 1-7 days
- **Total to Launch:** ~1-8 days

---

## 💡 Pro Tips

1. **Test thoroughly** before building
2. **Let EAS manage your keystore** (don't lose it!)
3. **Prepare screenshots** while build is running
4. **Create privacy policy** (required by Play Store)
5. **Keep your Expo account secure**

---

## 📞 Need Help?

- **Full Guide:** GOOGLE_PLAY_STORE_GUIDE.md
- **Expo Docs:** https://docs.expo.dev/build/introduction/
- **Play Console:** https://support.google.com/googleplay/android-developer

---

**Ready? Start with:** `eas login` 🚀

---

Made with ❤️ by Youssef Jarmouni

