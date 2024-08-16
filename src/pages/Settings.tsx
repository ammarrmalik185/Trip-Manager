import {Switch, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import {useNavigation} from "@react-navigation/native";
import pages from "../types/pages.ts";
import React, {useState} from "react";
import {palette} from "../styles/colors.ts";
import {SettingsManager} from "../helpers/SettingsManager.ts";
import {expenseTypes} from "../types/expensetypes.ts";
import {SelectList} from "react-native-dropdown-select-list";

export default function Settings({navigation, route} : any){
    const [refresh, setRefresh] = useState(false);

    return (
        <View style={styles.main}>

            <Text style={styles.title}>Preferences</Text>

            <View style={styles.horizontalStack}>
                <Text style={styles.iconText}>Hard Confirmation for delete trip</Text>
                <Switch
                    trackColor={{ false: palette.text, true: palette.text }}
                    thumbColor={SettingsManager.settings.hardConfirmationForDeleteTrip ? palette.primary : palette.secondary}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => {
                        SettingsManager.settings.hardConfirmationForDeleteTrip = value;
                        setRefresh(!refresh);
                        SettingsManager.saveSettings();
                    }}
                    value={SettingsManager.settings.hardConfirmationForDeleteTrip}
                />
            </View>

            <View style={styles.horizontalStack}>
                <Text style={styles.iconText}>Open most recent trip on app open</Text>
                <Switch
                    trackColor={{ false: palette.text, true: palette.text }}
                    thumbColor={SettingsManager.settings.openMostRecentTripOnAppOpen ? palette.primary : palette.secondary}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => {
                        SettingsManager.settings.openMostRecentTripOnAppOpen = value;
                        setRefresh(!refresh);
                        SettingsManager.saveSettings();
                    }}
                    value={SettingsManager.settings.openMostRecentTripOnAppOpen}
                />
            </View>

            <View style={styles.horizontalStack}>
                <Text style={styles.iconText}>Currency Symbol: </Text>
                <SelectList
                    data={SettingsManager.settingHelpers.currencyTypes}
                    setSelected={(cat:any) => {
                        SettingsManager.settings.currencySymbol = cat
                        SettingsManager.saveSettings();
                    }}
                    save="value"
                    boxStyles={{width: 100, height: 40}}
                    dropdownTextStyles={styles.dropDownInfoText}
                    dropdownStyles={styles.dropDownContainerData}
                    inputStyles={styles.dropDownInfoText}
                    search={false}

                    defaultOption={SettingsManager.settings.currencySymbol}
                />
            </View>


            <View style={styles.horizontalLine}></View>

            <Text style={styles.title}>Your data</Text>
            <View style={styles.horizontalStackCentered}>
                <TouchableOpacity onPress={() => navigation.navigate(pages.BackupAndRestore, {})} style={styles.neutralButton}><Text style={styles.acceptButtonText}>Backup and restore</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate(pages.BackupAndRestore, {})} style={styles.neutralButton}><Text style={styles.acceptButtonText}>Delete all data</Text></TouchableOpacity>
            </View>

        </View>
    )
}
