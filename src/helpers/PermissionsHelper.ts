import {Platform, ToastAndroid} from "react-native";
import {check, Permission, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import Toast from "react-native-simple-toast";

export async function requestLocationPermission() {
  let permission;

  if (Platform.OS === 'android') {
    permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  } else {
    permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  }
  return await requestPermission(permission);
}

export async function requestBGLocationPermission() {
  let permission;

  if (Platform.OS === 'android') {
    permission = PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
  } else {
    permission = PERMISSIONS.IOS.LOCATION_ALWAYS;
  }

  return await requestPermission(permission);
}

export async function requestPermission(permission: Permission) {
   const result = await check(permission);
    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult !== RESULTS.GRANTED) {
         Toast.show('Location permission is required to save location data.', ToastAndroid.SHORT);
         return false;
      }
    } else if (result !== RESULTS.GRANTED) {
      Toast.show('Location permission is required to save location data.', ToastAndroid.SHORT);
      return false;
    }
    return true;
}
