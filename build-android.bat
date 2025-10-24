@echo off
REM Android App Build Script for Inventory Management System (Windows)
REM This script will help you build your web app into an Android APK

echo 🚀 Building Inventory Management Android App...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

REM Check if Cordova is installed globally
cordova --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 📦 Installing Cordova globally...
    npm install -g cordova
)

REM Check if Android SDK is installed
if "%ANDROID_HOME%"=="" (
    echo ❌ Android SDK not found. Please install Android Studio and set ANDROID_HOME.
    echo Download from: https://developer.android.com/studio
    pause
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Create Cordova project if it doesn't exist
if not exist "platforms" (
    echo 🔧 Setting up Cordova project...
    cordova platform add android
)

REM Add required plugins
echo 🔌 Adding Cordova plugins...
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-network-information

REM Build the app
echo 🔨 Building Android APK...
cordova build android

REM Check if build was successful
if %errorlevel% equ 0 (
    echo ✅ Build successful!
    echo 📱 APK location: platforms\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo 📋 Next steps:
    echo 1. Connect your Android device via USB
    echo 2. Enable Developer Options and USB Debugging
    echo 3. Run: cordova run android
    echo.
    echo 🔧 Or install the APK manually on your device
) else (
    echo ❌ Build failed. Check the error messages above.
)

pause
