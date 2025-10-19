# Assets Directory

This directory contains image assets for the TbibVision app.

## Required Assets

For a production build, you would need:

- `icon.png` - App icon (1024x1024px)
- `splash.png` - Splash screen image (1284x2778px for iOS)
- `adaptive-icon.png` - Android adaptive icon (1024x1024px)
- `favicon.png` - Web favicon (48x48px)

## Current Setup

The app is configured to run with Expo Go without custom assets. The default Expo assets will be used for development.

## Lottie Animations

If you want to add Lottie animations:
1. Download free medical Lottie animations from https://lottiefiles.com
2. Place JSON files in `assets/animations/`
3. Import them in screens using:
   ```javascript
   import LottieView from 'lottie-react-native';
   <LottieView source={require('./assets/animations/medical.json')} autoPlay loop />
   ```

## Creating Custom Assets

### App Icon
- Size: 1024x1024px
- Format: PNG
- No transparency for iOS
- Use medical theme: blue cross, heart, or stethoscope

### Splash Screen
- Size: 1284x2778px (iPhone 14 Pro Max)
- Background: Medical blue (#2196F3)
- Center logo/icon with app name
- Keep important content in safe area

### Adaptive Icon (Android)
- Size: 1024x1024px
- Foreground: App icon on transparent background
- Safe area: 432x432px circle in center
- Background color: #2196F3

## Note

For development with Expo Go, custom assets are optional. The app will function perfectly with default Expo placeholders.

