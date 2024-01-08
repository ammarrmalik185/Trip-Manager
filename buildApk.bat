react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
cd android
./gradlew assembleDebug

echo "APK is in react_app/android/app/build/outputs/apk/debug/app-debug.apk";