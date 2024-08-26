import {Linking, Platform} from "react-native";
import {check, Permission, PERMISSIONS, request, RESULTS} from "react-native-permissions";
import IntentLauncher from '@yz1311/react-native-intent-launcher'

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

  var granted = await requestPermission(permission);
  if (!granted){
      openAppSettings();
  }
  return granted;
}


const openAppSettings = () => {
    if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:')
    } else {
        IntentLauncher.startActivity({
            action: 'android.settings.APPLICATION_DETAILS_SETTINGS',
            data: 'package:com.react_app',
            category: "android.intent.category.DEFAULT",
        })
    }
}

export async function requestPermission(permission: Permission): Promise<boolean> {
   const result = await check(permission);
    if (result === RESULTS.DENIED) {
      const requestResult = await request(permission);
      if (requestResult !== RESULTS.GRANTED) {
         return false;
      }
    } else if (result !== RESULTS.GRANTED) {
      return false;
    }
    return true;
}
