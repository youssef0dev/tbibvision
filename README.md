# 🏥 TbibVision - AI-Powered Medical Assistant

> **Educational medical analysis app powered by AI for lab tests, skin conditions, and symptom checking**

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

</div>

---

## 📱 Features

### 🧪 Lab Test Analyzer
- Upload lab test images
- AI extracts and analyzes test results
- Get educational insights about your results
- View normal vs abnormal indicators

### 🩺 Skin Check
- Upload skin condition photos
- AI suggests possible conditions
- Confidence ratings for each suggestion
- Advice on when to see a specialist

### 🤖 AI Symptom Checker
- Describe your symptoms in text
- AI analyzes and suggests possible conditions
- Urgency level indicators
- Recommended medical specialties

### 👨‍⚕️ Doctor Finder
- Browse doctors by specialty
- Smart filtering based on AI analysis
- Comprehensive doctor database
- Contact information included

### 🔐 User Authentication
- Secure login/signup with Supabase
- User-specific data
- Profile management
- Dark/Light mode toggle

---

## 🚀 Tech Stack

### Frontend
- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library
- **Supabase** - Authentication & Database
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **OpenRouter API** - AI analysis (GPT-4)
- **Supabase** - Database & Auth
- **Multer** - File uploads

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Expo Go** app on your phone ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) / [iOS](https://apps.apple.com/app/expo-go/id982107779))
- **OpenRouter API Key** (get from [openrouter.ai](https://openrouter.ai/keys))
- **Supabase Account** (get from [supabase.com](https://supabase.com))

---

## 🛠️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/tbibvision.git
cd tbibvision
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 4️⃣ Configure Environment Variables

#### Backend Configuration

Create `backend/.env`:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` with your credentials:

```env
OPENROUTER_API_KEY=your-openrouter-api-key
SUPABASE_URL=your-supabase-project-url
SUPABASE_ANON_KEY=your-supabase-anon-key
PORT=3000
```

#### Frontend Configuration

Create `frontend/.env`:

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env` with your computer's IP:

```env
# Replace YOUR_COMPUTER_IP with your actual local IP (e.g., 192.168.1.100)
EXPO_PUBLIC_API_URL=http://YOUR_COMPUTER_IP:3000/api
```

**How to find your IP:**
- **Windows**: Open CMD and run `ipconfig` (look for IPv4)
- **Mac/Linux**: Open Terminal and run `ifconfig` or `ip addr`

### 5️⃣ Set Up Supabase Database

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Open SQL Editor
3. Run the SQL scripts in this order:
   - `supabase_setup.sql` - Creates tables
   - `supabase_add_comprehensive_doctors.sql` - Adds doctors
   - `supabase_update_analysis_history.sql` - Updates history table

4. **Disable Email Confirmation:**
   - Go to Authentication → Providers → Email
   - Turn OFF "Confirm email"
   - Save changes

---

## ▶️ Running the App

### Start Backend Server

```bash
cd backend
node server.js
```

You should see:
```
🏥 TbibVision API Server running on port 3000
📍 Local: http://localhost:3000
📍 Network: http://YOUR_IP:3000
```

### Start Frontend (New Terminal)

```bash
cd frontend
npx expo start --lan
```

You should see a QR code in the terminal.

### Open on Your Phone

1. Open **Expo Go** app
2. Scan the QR code
3. App will load on your device!

---

## 📖 Usage Guide

### First Time Setup

1. **Onboarding**: Swipe through the welcome screens
2. **Sign Up**: Create an account with email and password
3. **Login**: Sign in with your credentials
4. **Explore**: Try all the features!

### Analyzing Lab Tests

1. Tap **Lab** tab
2. Choose "Take Photo" or "Choose from Library"
3. Upload your lab test image
4. Wait for AI analysis
5. View results with explanations
6. Tap "Find Doctors" for specialist recommendations

### Checking Skin Conditions

1. Tap **Skin** tab
2. Upload a photo of the skin condition
3. AI suggests possible conditions
4. View confidence levels and advice
5. Find relevant dermatologists

### Using Symptom Checker

1. Tap **AI** tab
2. Describe your symptoms in detail
3. Submit for analysis
4. Review suggested conditions and urgency
5. Get doctor recommendations

---

## ⚠️ Important Notes

### Disclaimer

**This app is for educational purposes only!**
- NOT a replacement for professional medical advice
- NOT for making medical diagnoses
- Always consult qualified healthcare professionals
- In emergencies, call your local emergency number

### Privacy & Security

- All user data is stored securely in Supabase
- API keys are kept private (never commit `.env` files!)
- User authentication required for data access
- Each user sees only their own data

### API Costs

- OpenRouter charges per API call
- Approximate cost: $0.01-$0.05 per analysis
- Monitor usage at [openrouter.ai](https://openrouter.ai)

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Developer

Created with ❤️ by [Your Name]

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

---

## 🙏 Acknowledgments

- **OpenRouter** for AI API access
- **Supabase** for backend infrastructure
- **Expo** for mobile development platform
- Medical community for educational resources

---

## 📞 Support

If you have questions or need help:

1. Check existing [Issues](https://github.com/YOUR_USERNAME/tbibvision/issues)
2. Open a new issue with details
3. Include error messages and screenshots

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made for educational purposes | Not for medical diagnosis

</div>
