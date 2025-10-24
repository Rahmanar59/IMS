#!/bin/bash

# Android App Build Script for Inventory Management System
# This script will help you build your web app into an Android APK

echo "🚀 Building Inventory Management Android App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "Download from: https://nodejs.org/"
    exit 1
fi

# Check if Cordova is installed globally
if ! command -v cordova &> /dev/null; then
    echo "📦 Installing Cordova globally..."
    npm install -g cordova
fi

# Check if Android SDK is installed
if [ -z "$ANDROID_HOME" ]; then
    echo "❌ Android SDK not found. Please install Android Studio and set ANDROID_HOME."
    echo "Download from: https://developer.android.com/studio"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create Cordova project if it doesn't exist
if [ ! -d "platforms" ]; then
    echo "🔧 Setting up Cordova project..."
    cordova platform add android
fi

# Add required plugins
echo "🔌 Adding Cordova plugins..."
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-network-information

# Build the app
echo "🔨 Building Android APK..."
cordova build android

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📱 APK location: platforms/android/app/build/outputs/apk/debug/app-debug.apk"
    echo ""
    echo "📋 Next steps:"
    echo "1. Connect your Android device via USB"
    echo "2. Enable Developer Options and USB Debugging"
    echo "3. Run: cordova run android"
    echo ""
    echo "🔧 Or install the APK manually on your device"
else
    echo "❌ Build failed. Check the error messages above."
    exit 1
fi
