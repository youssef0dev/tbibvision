# TbibVision - Medical AI Assistant

AI-powered mobile app for medical image and text analysis built with React Native and Expo.

## Features

- 🧪 **Lab Analyzer**: Upload lab test results and get AI-powered analysis
- 🩺 **Skin Check**: Analyze skin images for educational insights
- 👨‍⚕️ **Find Doctors**: Connect with medical professionals in Morocco
- 👤 **Profile**: View analysis history and customize settings
- 🌙 **Dark Mode**: Toggle between light and dark themes

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo Go app installed on your mobile device

## Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Configure environment variables:
Edit `.env` file and set your backend API URL:
```
EXPO_PUBLIC_API_URL=http://YOUR_LOCAL_IP:3000/api
```
Replace `YOUR_LOCAL_IP` with your computer's local IP address (not localhost, as mobile devices need to access it over the network).

## Running the App

1. Start the Expo development server:
```bash
npm start
```

2. Scan the QR code with:
   - **Android**: Expo Go app
   - **iOS**: Camera app (will open in Expo Go)

## Project Structure

```
frontend/
├── screens/          # Main app screens
├── components/       # Reusable components
├── services/         # API and storage services
├── contexts/         # React contexts (Theme)
├── constants/        # App constants (Colors)
├── assets/           # Images and animations
└── App.js            # Main app entry
```

## Key Technologies

- **React Native 0.76** - Mobile framework
- **Expo SDK 52** - Development platform
- **React Navigation** - Screen navigation
- **NativeWind** - Tailwind CSS for React Native
- **Axios** - HTTP client
- **AsyncStorage** - Local data persistence
- **Expo Image Picker** - Camera and gallery access

## Backend Connection

Make sure the backend server is running before using the app:
```bash
cd backend
npm start
```

The app will connect to the API URL specified in your `.env` file.

## Educational Disclaimer

⚠️ **Important**: This app provides educational information only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare professionals for medical concerns.

## Development

- **Development Mode**: `npm start`
- **Android**: `npm run android`
- **iOS**: `npm run ios`
- **Web**: `npm run web`

## Troubleshooting

### Can't connect to backend

1. Make sure you're using your computer's local IP address, not `localhost`
2. Ensure your mobile device is on the same WiFi network as your computer
3. Check if backend server is running on port 3000
4. Verify firewall isn't blocking the connection

### Image picker not working

1. Check camera and gallery permissions in device settings
2. Grant permissions when prompted
3. On iOS simulator, photos may be limited

### App crashes or errors

1. Clear Expo cache: `expo start -c`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check console logs for specific error messages

## License

MIT License - Educational purposes only

