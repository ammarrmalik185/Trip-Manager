import {Switch, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React, {useState} from "react";
import {palette} from "../styles/colors.ts";
import {SettingsManager} from "../helpers/SettingsManager.ts";
import {SelectList} from "react-native-dropdown-select-list";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import {trip} from "../types/trip.ts";
import {singleExpense} from "../types/singleExpense.ts";

export default function Settings({navigation, route} : any){
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View style={styles.main}>

            <PopupModal state={modalVisible} modalData={new ModalData(ModalType.HardConfirmation, "Are you sure you want to delete all data? This process is not reversible. Remember to make a backup", (value: boolean) => {
                console.log("Deleting all data");
                if (value) {
                    trip.allTrips.forEach((t: trip) => {
                        t.deleteTrip();
                    });
                    singleExpense.allSingleExpenses.forEach((s: singleExpense) => {
                        s.deleteSingleExpense();
                    })
                }
                setModalVisible(false);
            }, [], "Delete all my data")}/>

            <Text style={styles.title}>Preferences</Text>

            <View style={styles.horizontalStack}>
                <Text style={styles.iconText}>Hard Confirmation for delete trip</Text>
                <Switch
                    trackColor={{ false: palette.text, true: palette.text }}
                    thumbColor={SettingsManager.settings.hardConfirmationForDeleteTrip ? palette.primary : palette.secondary}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => {
                        SettingsManager.settings.hardConfirmationForDeleteTrip = value;
                        SettingsManager.saveSettings();
                        setRefresh(!refresh);
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
                        console.log(value)
                        SettingsManager.settings.openMostRecentTripOnAppOpen = value;
                        SettingsManager.saveSettings();
                        setRefresh(!refresh);
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
                    boxStyles={{width: 100, height: 40, marginVertical: 10}}
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
                <TouchableOpacity onPress={() => navigation.navigate(pages.BackupAndRestore, {})} style={styles.neutralButtonStatic}><Text style={styles.acceptButtonText}>Backup and restore</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setModalVisible(true);
                }} style={styles.neutralButtonStatic}><Text style={styles.acceptButtonText}>Delete all data</Text></TouchableOpacity>
            </View>

        </View>
    )
}
