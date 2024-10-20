import {ScrollView, Switch, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles.ts";
import pages from "../../types/pages.ts";
import React, {useState} from "react";
import {palette} from "../../styles/colors.ts";
import {SettingsManager} from "../../helpers/SettingsManager.ts";
import PopupModal, {ModalData, ModalType} from "../../components/PopupModal.tsx";
import {trip} from "../../types/trip.ts";
import {singleExpense} from "../../types/singleExpense.ts";
import InAppReview from 'react-native-in-app-review';
import {BackupManager} from "../../helpers/BackupManager.ts";
import {FileManager} from "../../helpers/FileManager.ts";
import DocumentPicker from "react-native-document-picker";

export default function Settings({navigation, route}: any) {
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalData, setModalData] = React.useState(new ModalData(ModalType.HardConfirmation, "", () => {
    }, [], ""));

    const deleteDataModel = new ModalData(ModalType.HardConfirmation, "Are you sure you want to delete all data? This process is not reversible. Remember to make a backup", (value: boolean) => {
        if (value) {
            trip.allTrips.forEach((t: trip) => {
                t.deleteTrip();
            });
            singleExpense.allSingleExpenses.forEach((s: singleExpense) => {
                s.deleteSingleExpense();
            })
        }
        setModalVisible(false);
    }, [], "Delete all my data");

    const exportDataModel = new ModalData(ModalType.MultipleChoices, "Choose the trips to export", (value: boolean, selectedTrips: any) => {
        console.log(selectedTrips);
        if (value) {
            let exportData : {trips: trip[], singleExpenses: singleExpense[]} = {
                trips: trip.allTrips.filter((t: trip, index: number) => selectedTrips[index]),
                singleExpenses: []
            }
            if (singleExpense.allSingleExpenses.length > 0){
                setModalData(new ModalData(ModalType.MultipleChoices, "Choose the single expenses to export", (value: boolean, selectedExpenses: any) => {
                    console.log(selectedExpenses);
                    exportData.singleExpenses = singleExpense.allSingleExpenses.filter((t: singleExpense, index: number) => selectedExpenses[index]);
                    BackupManager.generateBackupFile(JSON.stringify(exportData));
                    setModalVisible(false);
                }, singleExpense.allSingleExpenses.map((t: singleExpense) => t.title)))
            }else {
                if (exportData.trips.length != 0){
                    BackupManager.generateBackupFile(JSON.stringify(exportData));
                }
                setModalVisible(false);
            }
        } else {
            setModalVisible(false);
        }
    }, trip.allTrips.map((t: trip) => t.title));

    return (
        <ScrollView style={{...styles.main, paddingHorizontal: 20}}>

            <PopupModal state={modalVisible} modalData={modalData}/>

            <View style={{height: 20}}/>
            <Text style={styles.subTitle}>Trips</Text>

            <View style={styles.horizontalStackContained}>
                <Text style={styles.settingsText}>Hard Confirmation for delete trip</Text>
                <Switch
                    trackColor={{false: palette.text, true: palette.text}}
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

            <View style={styles.horizontalStackContained}>
                <Text style={styles.settingsText}>Open most recent trip on app open</Text>
                <Switch
                    trackColor={{false: palette.text, true: palette.text}}
                    thumbColor={SettingsManager.settings.openMostRecentTripOnAppOpen ? palette.primary : palette.secondary}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => {
                        SettingsManager.settings.openMostRecentTripOnAppOpen = value;
                        SettingsManager.saveSettings();
                        setRefresh(!refresh);
                    }}
                    value={SettingsManager.settings.openMostRecentTripOnAppOpen}
                />
            </View>

            <View style={{height: 20}}/>
            <Text style={styles.subTitle}>Logs</Text>

            <View style={styles.horizontalStackContained}>
                <Text style={styles.settingsText}>Auto get location for logs</Text>
                <Switch
                    trackColor={{false: palette.text, true: palette.text}}
                    thumbColor={SettingsManager.settings.autoGetLocation ? palette.primary : palette.secondary}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={value => {
                        SettingsManager.settings.autoGetLocation = value;
                        SettingsManager.saveSettings();
                        setRefresh(!refresh);
                    }}
                    value={SettingsManager.settings.autoGetLocation}
                />
            </View>

            {/*<View style={styles.horizontalStackContained}>*/}
            {/*    <Text style={styles.settingsText}>Show map in log edit</Text>*/}
            {/*    <Switch*/}
            {/*        trackColor={{false: palette.text, true: palette.text}}*/}
            {/*        thumbColor={SettingsManager.settings.showMapInLogEdit ? palette.primary : palette.secondary}*/}
            {/*        ios_backgroundColor="#3e3e3e"*/}
            {/*        onValueChange={value => {*/}
            {/*            SettingsManager.settings.showMapInLogEdit = value;*/}
            {/*            SettingsManager.saveSettings();*/}
            {/*            setRefresh(!refresh);*/}
            {/*        }}*/}
            {/*        value={SettingsManager.settings.showMapInLogEdit}*/}
            {/*    />*/}
            {/*</View>*/}

            <View style={{height: 20}}/>
            <Text style={styles.subTitle}>Expenses</Text>
            <View style={styles.horizontalStackContained}>
                <Text style={styles.settingsText}>Currency Symbol</Text>
                <TouchableOpacity style={styles.settingsInputPopupView} onPress={() => {
                    setModalData(new ModalData(ModalType.PickAButton, "Choose the currency symbol", (value: boolean, index: any) => {
                        if (value) {
                            SettingsManager.settings.currencySymbol = SettingsManager.settingHelpers.currencyTypes[index];
                            SettingsManager.saveSettings();
                            setRefresh(!refresh);
                        }
                        setModalVisible(false);
                    }, SettingsManager.settingHelpers.currencyTypes))
                    setModalVisible(true);
                }}>
                    <Text style={styles.settingsText}>{SettingsManager.settings.currencySymbol}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.horizontalStackContained}>
                <Text style={styles.settingsText}>Default Spender Amount</Text>
                <TextInput style={styles.settingsInputField}
                           value={SettingsManager.settings.defaultExpenseSpenderNumber.toString()}
                           onChangeText={(text) => {
                               SettingsManager.settings.defaultExpenseSpenderNumber = parseInt(text) || 0;
                               SettingsManager.saveSettings();
                               setRefresh(!refresh);
                           }}/>
            </View>

            <View style={styles.horizontalStackContained}>
                <Text style={styles.settingsText}>Increment/Decrement button multiplier</Text>
                <TextInput style={styles.settingsInputField}
                   value={SettingsManager.settings.incrementDecrementMultiplier.toString()}
                   onChangeText={(text) => {
                       SettingsManager.settings.incrementDecrementMultiplier = parseInt(text) || 0;
                       SettingsManager.saveSettings();
                       setRefresh(!refresh);
                   }}/>
            </View>

            {/*<View style={styles.horizontalLine}></View>*/}
            <View style={{height: 20}}/>
            <Text style={styles.subTitle}>Your data</Text>

            <TouchableOpacity onPress={() => navigation.navigate(pages.BackupAndRestore, {})}
                              style={styles.horizontalStackContained}>
                <Text style={styles.acceptButtonText}>Backup and restore</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                setModalData(new ModalData(ModalType.MultipleChoices, "Choose the trips to export", (value: boolean, selectedTrips: any) => {
                    if (value) {
                        let exportData : {trips: trip[], singleExpenses: singleExpense[]} = {
                            trips: trip.allTrips.filter((t: trip, index: number) => selectedTrips[index]),
                            singleExpenses: []
                        }
                        if (singleExpense.allSingleExpenses.length > 0){
                            setModalData(new ModalData(ModalType.MultipleChoices, "Choose the single expenses to export", (value: boolean, selectedExpenses: any) => {
                                exportData.singleExpenses = singleExpense.allSingleExpenses.filter((t: singleExpense, index: number) => selectedExpenses[index]);
                                BackupManager.generateBackupFile(JSON.stringify(exportData));
                                setModalVisible(false);
                            }, singleExpense.allSingleExpenses.map((t: singleExpense) => t.title)))
                        }else {
                            if (exportData.trips.length != 0){
                                BackupManager.generateBackupFile(JSON.stringify(exportData));
                            }
                            setModalVisible(false);
                        }
                    } else {
                        setModalVisible(false);
                    }
                }, trip.allTrips.map((t: trip) => t.title)));
                setModalVisible(true)
            }} style={styles.horizontalStackContained}><Text style={styles.acceptButtonText}>Export Trips and Expenses</Text></TouchableOpacity>

            <TouchableOpacity onPress={() => {
                FileManager.pickSingleFile({
                    type: [DocumentPicker.types.json],
                }).then(BackupManager.recoverBackupFromString);
            }} style={styles.horizontalStackContained}><Text style={styles.acceptButtonText}>Import Trips and Expenses</Text></TouchableOpacity>

            <TouchableOpacity style={styles.horizontalStackContained} onPress={() => {
                BackupManager.getReadableFile().then((v) => {
                    BackupManager.generateTextFile(v);
                })
            }}><Text style={styles.acceptButtonText}>Get Text file</Text></TouchableOpacity>

            <TouchableOpacity onPress={() => {
                setModalData(deleteDataModel);
                setModalVisible(true);
            }} style={styles.horizontalStackContained}><Text style={styles.acceptButtonText}>Delete all data</Text></TouchableOpacity>

            <View style={{height: 20}}/>

        </ScrollView>
    )
}
