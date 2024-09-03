import AsyncStorage from "@react-native-async-storage/async-storage";
import {Logger} from "./Logger.ts";

export class SettingsManager {
    static settings : any = {
        hardConfirmationForDeleteTrip: true,
        openMostRecentTripOnAppOpen: false,

        autoGetLocation: true,
        showMapInLogEdit: true,

        currencySymbol: "Rs",
        defaultExpenseSpenderNumber: 0,
        incrementDecrementMultiplier: 1,
    };

    static settingHelpers:any = {
        appJustOpen: true,
        currencyTypes: [
            "Rs",
            "$" ,
            "¥" ,
            "₹" ,
            "€" ,
            "£"
        ]
    }

    static async saveSettings(){
        AsyncStorage.setItem('settings', JSON.stringify(SettingsManager.settings)).catch(Logger.error);
    }

    static getSettings(){
        AsyncStorage.getItem('settings').then(data => {
            if (data){
                for (let item in JSON.parse(data)){
                    if (SettingsManager.settings[item] != null){
                        SettingsManager.settings[item] = JSON.parse(data)[item];
                    }
                }
            }
        }).catch(Logger.error);
    }
}
