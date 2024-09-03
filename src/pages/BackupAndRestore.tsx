import {Image, Text, TouchableOpacity, View} from "react-native";
import {Logger} from "../helpers/Logger.ts";
import {trip, TripTheme} from "../types/trip.ts";
import {singleExpense} from "../types/singleExpense.ts";
import {DocumentDirectoryPath, readFile, writeFile} from "react-native-fs";
import styles from "../styles/styles.ts";
import Toast from "react-native-simple-toast";
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import FirebaseManager from "../helpers/FirebaseManager.ts";
import {useEffect, useState} from "react";
import {palette} from "../styles/colors.ts";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import memberAmount from "../types/memberAmount.ts";
import SettlementCalculator from "../helpers/SettlementCalculator.ts";
import {SettingsManager} from "../helpers/SettingsManager.ts";

const onlineEnabled = true;

const generateFile = async (content: string) => {
    const fileName = 'trip-manager-backup.json';
    const filePath = `${DocumentDirectoryPath}/${fileName}`;

    let generated = false;

    try {
        await writeFile(filePath, content, 'utf8');
        generated = true;
    } catch (error) {
        Logger.error(error);
        Toast.show('Failed to generate backup file', Toast.SHORT);
    }

    if (generated){
        try {
            const shareOptions = {
                title: 'Download your backup',
                url: `file://${filePath}`,
                type: 'application/json',
            };
            await Share.open(shareOptions);
        } catch (error){
            Logger.log("Saving Failed: " + error)
        }
    }

};

const generateTextFile = async (content: string) => {
    const fileName = 'trip-manager.md';
    const filePath = `${DocumentDirectoryPath}/${fileName}`;

    let generated = false;

    try {
        await writeFile(filePath, content, 'utf8');
        generated = true;
    } catch (error) {
        Logger.error(error);
        Toast.show('Failed to generate backup file', Toast.SHORT);
    }

    if (generated){
        try {
            const shareOptions = {
                title: 'Download your file',
                url: `file://${filePath}`,
                type: 'text/markdown',
            };
            await Share.open(shareOptions);
        } catch (error){
            Logger.log("Saving Failed: " + error)
        }
    }
}

const pickFile = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.json],
        });
        const filePath = res[0].uri;
        return await readFile(filePath, 'utf8');
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            Logger.log('User cancelled the picker');
        } else {
            Logger.error(err);
            Toast.show('Failed to pick file', Toast.SHORT);
        }
    }
}

const recoverBackupFromString = (content: string | undefined) => {
    try {
        let json = JSON.parse(content || "{}")
        for (const singleTrip of json.trips) {
            try {
                let newTrip = trip.loadFromString(JSON.stringify(singleTrip));
                newTrip.saveTrip();
                Logger.log("Loaded trip: " + JSON.stringify(singleTrip))
            }catch (err) {
                Logger.error(err);
            }
        }
        for (const singleExpenseEntry of json.singleExpenses) {
            try {
                let newTrip = singleExpense.loadFromString(JSON.stringify(singleExpenseEntry));
                newTrip.saveSingleExpense();
                Logger.log("Loaded expense: " + JSON.stringify(singleExpenseEntry))
            }catch (err) {
                Logger.error(err);
            }

        }

        Toast.show("Restored " + json.trips.length + " trips and " + json.singleExpenses.length + " single expenses", Toast.LONG);
        Logger.log("Restored " + json.trips.length + " trips and " + json.singleExpenses.length + " single expenses")

    } catch (err) {
        Logger.error(err);
        Toast.show("Invalid file format", Toast.SHORT);
    }
}

export default function BackupAndRestore(){

    const [refresh, setRefresh] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(()=>{
        FirebaseManager.onAuthStateChanged((user: any) => {
            setRefresh(!refresh);
            if (user) {
                Logger.log("User is logged in")
            } else {
                Logger.log("User is not logged in")
            }
          });

    }, [])

    return (
        <View style={styles.main}>
            <PopupModal state={modalVisible} modalData={new ModalData(ModalType.Information, "Note: This file cannot be used to restore data", () => {

                let textArr : string[] = [];
                trip.loadTrips((trips:trip[]) => {
                    for (const singleTrip of trips.sort((a, b) => b.date.from.getTime() - a.date.from.getTime())){
                        textArr.push(`## ${singleTrip.title}\n`);
                        textArr.push(`Destination: ${singleTrip.destination}\n`);
                        textArr.push(`Date: ${singleTrip.date.from.toLocaleDateString()}\n`);
                        textArr.push("### Members\n");
                        for (const member of singleTrip.members) {
                            textArr.push(`- ${member.name}\n`);
                        }
                        textArr.push("### Expenses\n");
                        for (const expense of singleTrip.expenses.sort((a, b) => a.date.getTime() - b.date.getTime())){
                            expense.calculateTotal();
                            let paid = expense.payers.filter(p => p.amount != 0).reduce((s: string, p:memberAmount) => { return s + (`${p.member.name},`) },  "").slice(0, -1);
                            let spent = expense.getCalculatedExpense().spenders.filter(p => p.amount != 0).reduce((s: string, p:memberAmount) => { return s + (`${p.member.name},`) },  "").slice(0, -1);
                            textArr.push(`${expense.date.toLocaleTimeString()} ${expense.date.toLocaleDateString()} - ${expense.title} paid by: ${paid}(${expense.amount}) -> spent by: ${spent}\n`)
                        }
                        textArr.push("### Logs\n");
                        for (const log of singleTrip.logs.sort((a, b) => a.date.getTime() - b.date.getTime())) {
                            textArr.push(`${log.date.toLocaleTimeString()} ${log.date.toLocaleDateString()} - ${log.title}\n`)
                        }
                        textArr.push("\n");
                        textArr.push('### Settlements\n')
                        for (const settlement of new SettlementCalculator(singleTrip.expenses.map(e => e.getCalculatedExpense())).settlements) {
                            textArr.push(`${settlement.spender.name} owes ${settlement.payer.name} ${SettingsManager.settings.currencySymbol} ${settlement.amount.toFixed(0)}\n`)
                        }
                    }
                    generateTextFile(textArr.join(""));
                })

                setModalVisible(false)

            }, [], "")}/>
            <View style={styles.container}>

                {onlineEnabled && <View style={styles.item}>
                    <Text style={styles.expenseTitle}>Online Backup</Text>
                    {FirebaseManager.auth.currentUser && <View>
                        <Text style={styles.dateDisplay}>Current Status: <Text style={{color: palette.primary}}>Logged In</Text></Text>
                        <TouchableOpacity style={styles.acceptButton} onPress={() => {
                            Logger.log("Create Firebase Backup")
                            trip.loadTrips((trips:trip[]) => {
                                singleExpense.loadSingleExpenses((singleExpenses:singleExpense[]) => {

                                    let backup = {
                                        trips: trips,
                                        singleExpenses: singleExpenses
                                    }

                                    FirebaseManager.saveJsonUserdata(JSON.stringify(backup)).then(() => {
                                        Logger.log("Backup created")
                                        Toast.show("Backup created", Toast.SHORT)
                                    }).catch(Logger.error)
                                })
                            })
                        }}>
                            <Text style={styles.acceptButtonText}>Create Online Backup</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.acceptButton} onPress={() => {
                            FirebaseManager.getJsonUserdata().then(v => {
                                recoverBackupFromString(v)
                            })}
                        }>
                            <Text style={styles.acceptButtonText}>Retrieve Online Backup</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.acceptButton} onPress={() => {
                            // FirebaseManager.signInWithGoogle()
                            FirebaseManager.signOut();
                        }}>
                            <Text style={styles.acceptButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>}
                    {!FirebaseManager.auth.currentUser && <View style={styles.center}>
                        <Text style={styles.dateDisplay}>Current Status: <Text style={{color:palette.secondary}}>Not Logged In</Text></Text>
                           <TouchableOpacity style={styles.neutralButtonNormal} onPress={() => {
                                FirebaseManager.signInWithGoogle()
                                // FirebaseManager.auth.signInWithEmailAndPassword("ammarrmalik185@hotmail.com", "123456").catch(console.error);
                            }}>
                                <Text style={styles.acceptButtonText}>Login</Text>
                            </TouchableOpacity>
                   </View>}
                </View>}

                <View style={styles.item}>
                    <Text style={styles.expenseTitle}>Local Backup</Text>
                    <View style={{height: 30}}></View>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.neutralButton} onPress={() => {
                            Logger.log("Create Local Backup")
                            trip.loadTrips((trips:trip[]) => {
                                singleExpense.loadSingleExpenses((singleExpenses:singleExpense[]) => {

                                    let backup = {
                                        trips: trips,
                                        singleExpenses: singleExpenses
                                    }

                                    generateFile(JSON.stringify(backup))

                                })
                            })
                        }}>
                            <Text style={styles.acceptButtonText}>Create Local Backup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.neutralButton} onPress={() => {
                            pickFile().then(recoverBackupFromString);
                        }}>
                            <Text style={styles.acceptButtonText}>Restore From File</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={{...styles.neutralButtonNormal, alignSelf: "center"}} onPress={() => {
                        setModalVisible(true);
                    }}>
                        <Text style={styles.acceptButtonText}>Get human readable file</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
