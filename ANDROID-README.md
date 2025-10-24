# 📱 Inventory Management Android App

Convert your web-based Inventory Management System into a native Android app using Apache Cordova.

## 🚀 Features

- **Native Android App**: Full-featured mobile app with touch-optimized interface
- **Offline Support**: Works without internet connection using local storage
- **Mobile Calculator**: Enhanced shipping calculator with haptic feedback
- **Touch Gestures**: Optimized for mobile interactions
- **Status Bar Integration**: Proper Android status bar handling
- **Splash Screen**: Professional app loading experience
- **Network Monitoring**: Real-time connection status
- **Back Button Support**: Native Android back button handling

## 📋 Prerequisites

### Required Software

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API level 22+)
   - Set `ANDROID_HOME` environment variable

3. **Java Development Kit (JDK)**
   - JDK 8 or higher
   - Usually comes with Android Studio

### Environment Setup

#### Windows
```bash
# Set ANDROID_HOME (replace with your Android SDK path)
set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk

# Add to PATH
set PATH=%PATH%;%ANDROID_HOME%\tools;%ANDROID_HOME%\platform-tools
```

#### macOS/Linux
```bash
# Add to ~/.bashrc or ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# export ANDROID_HOME=$HOME/Android/Sdk        # Linux

export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

## 🔧 Installation & Setup

### 1. Install Cordova Globally
```bash
npm install -g cordova
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Add Android Platform
```bash
cordova platform add android
```

### 4. Add Required Plugins
```bash
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-network-information
```

## 🏗️ Building the App

### Quick Build (Windows)
```bash
build-android.bat
```

### Quick Build (macOS/Linux)
```bash
chmod +x build-android.sh
./build-android.sh
```

### Manual Build
```bash
# Build debug APK
cordova build android

# Build release APK
cordova build android --release
```

## 📱 Running the App

### On Connected Device
```bash
# Connect Android device via USB
# Enable Developer Options and USB Debugging
cordova run android
```

### On Emulator
```bash
# Start Android emulator first
cordova emulate android
```

## 📁 Project Structure

```
inventory-management-app/
├── index.html              # Main app file
├── style.css              # Original styles
├── mobile.css             # Mobile-optimized styles
├── script.js              # Original functionality
├── mobile.js              # Mobile-specific features
├── config.xml             # Cordova configuration
├── package.json           # Node.js dependencies
├── platforms/            # Generated platform files
├── plugins/              # Cordova plugins
├── res/                  # App icons and splash screens
└── www/                  # Web assets
```

## 🎨 Mobile Features

### Touch Optimizations
- **Haptic Feedback**: Vibration on button presses
- **Touch Scaling**: Visual feedback on touch
- **Swipe Gestures**: Mobile navigation support
- **Pinch Zoom**: Disabled for app-like experience

### Mobile Calculator
- **Enhanced UI**: Touch-friendly form controls
- **Real-time Calculation**: Instant shipping cost estimates
- **Company Comparison**: Multiple shipping providers
- **Offline Support**: Works without internet

### Android Integration
- **Status Bar**: Proper color and style handling
- **Back Button**: Native Android back button support
- **Menu Button**: Android menu button integration
- **Orientation**: Portrait/landscape support
- **Splash Screen**: Professional app loading

## 🔧 Configuration

### App Settings (config.xml)
- **App ID**: `com.inventory.management`
- **Version**: `1.0.0`
- **Min SDK**: Android API 22
- **Target SDK**: Android API 33
- **Orientation**: Portrait preferred

### Permissions
- **Internet**: For web content loading
- **Network State**: For connection monitoring
- **Vibration**: For haptic feedback

## 🐛 Troubleshooting

### Common Issues

1. **"cordova: command not found"**
   ```bash
   npm install -g cordova
   ```

2. **"ANDROID_HOME not set"**
   - Install Android Studio
   - Set ANDROID_HOME environment variable
   - Add Android SDK tools to PATH

3. **"Build failed"**
   - Check Android SDK installation
   - Verify Java JDK installation
   - Clean and rebuild: `cordova clean android`

4. **"Device not found"**
   - Enable USB Debugging on device
   - Install device drivers
   - Check USB connection

### Debug Mode
```bash
# Enable verbose logging
cordova build android --verbose

# Check device connection
adb devices

# View device logs
adb logcat
```

## 📦 App Distribution

### Debug APK
- Location: `platforms/android/app/build/outputs/apk/debug/app-debug.apk`
- Use for testing and development

### Release APK
```bash
# Generate release APK
cordova build android --release

# Sign the APK (requires keystore)
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name
```

## 🚀 Advanced Features

### Custom Plugins
Add custom Cordova plugins for enhanced functionality:
```bash
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-file
```

### Performance Optimization
- **Lazy Loading**: Images load on demand
- **Caching**: Local storage for offline use
- **Compression**: Minified CSS and JavaScript
- **Memory Management**: Efficient resource handling

## 📞 Support

### Developer Information
- **Name**: Rahaman & Team
- **Email**: rahmansk592@gmail.com
- **Institution**: KG Reddy College of Engineering
- **Course**: Data Structures & Algorithms

### Resources
- [Cordova Documentation](https://cordova.apache.org/docs/)
- [Android Developer Guide](https://developer.android.com/guide)
- [Cordova Plugin Registry](https://cordova.apache.org/plugins/)

## 📄 License

MIT License - See LICENSE file for details.

---

**Happy Coding! 🎉**

Your Inventory Management System is now ready as a professional Android app!
