@echo off
echo 📱 Inventory Management Android App - Quick Setup
echo ================================================
echo.

echo 🔍 Checking prerequisites...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found!
    echo.
    echo 📥 Please download and install Node.js first:
    echo    https://nodejs.org/
    echo.
    echo After installing Node.js, run this script again.
    pause
    exit /b 1
) else (
    echo ✅ Node.js is installed
)

REM Check if npm is available
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found!
    pause
    exit /b 1
) else (
    echo ✅ npm is available
)

echo.
echo 🚀 Starting setup process...
echo.

REM Install Cordova globally
echo 📦 Installing Cordova...
npm install -g cordova
if %errorlevel% neq 0 (
    echo ❌ Failed to install Cordova
    pause
    exit /b 1
)

echo ✅ Cordova installed successfully
echo.

REM Install project dependencies
echo 📦 Installing project dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed
echo.

REM Add Android platform
echo 📱 Adding Android platform...
cordova platform add android
if %errorlevel% neq 0 (
    echo ❌ Failed to add Android platform
    echo.
    echo 💡 Make sure Android Studio is installed and ANDROID_HOME is set
    echo    Download from: https://developer.android.com/studio
    pause
    exit /b 1
)

echo ✅ Android platform added
echo.

REM Add required plugins
echo 🔌 Adding plugins...
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-network-information

echo ✅ Plugins added
echo.

REM Build the app
echo 🔨 Building Android APK...
cordova build android
if %errorlevel% neq 0 (
    echo ❌ Build failed
    echo.
    echo 💡 Common solutions:
    echo    1. Make sure Android Studio is installed
    echo    2. Set ANDROID_HOME environment variable
    echo    3. Install Java JDK
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo 📱 Your APK is ready at:
echo    platforms\android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo 📋 Next steps:
echo    1. Copy the APK to your Android device
echo    2. Enable "Unknown Sources" in Android settings
echo    3. Install the APK
echo.
echo 🚀 Or run directly on connected device:
echo    cordova run android
echo.
pause
