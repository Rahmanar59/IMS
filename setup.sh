# Quick Setup Script for Inventory Management Android App

echo "🚀 Setting up Inventory Management Android App..."
echo ""

# Check if we're in the right directory
if [ ! -f "index.html" ]; then
    echo "❌ Please run this script from the project root directory"
    exit 1
fi

echo "📋 Prerequisites Check:"
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js not found. Please install from https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm not found. Please install Node.js"
    exit 1
fi

# Check Cordova
if command -v cordova &> /dev/null; then
    echo "✅ Cordova: $(cordova --version)"
else
    echo "📦 Installing Cordova..."
    npm install -g cordova
fi

# Check Android SDK
if [ -n "$ANDROID_HOME" ]; then
    echo "✅ Android SDK: $ANDROID_HOME"
else
    echo "❌ ANDROID_HOME not set. Please install Android Studio and set ANDROID_HOME"
    echo "   Download from: https://developer.android.com/studio"
    exit 1
fi

echo ""
echo "🔧 Setting up project..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Add Android platform
echo "📱 Adding Android platform..."
cordova platform add android

# Add plugins
echo "🔌 Adding plugins..."
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-network-information

echo ""
echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Connect your Android device via USB"
echo "2. Enable Developer Options and USB Debugging"
echo "3. Run: cordova run android"
echo ""
echo "🔧 Or build APK: cordova build android"
echo "📱 APK will be at: platforms/android/app/build/outputs/apk/debug/app-debug.apk"
