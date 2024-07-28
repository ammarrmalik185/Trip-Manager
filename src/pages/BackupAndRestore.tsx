import {Text, TouchableOpacity, View} from "react-native";
import {Logger} from "../helpers/Logger.ts";
import {trip} from "../types/trip.ts";
import {singleExpense} from "../types/singleExpense.ts";
import {DocumentDirectoryPath, readFile, writeFile} from "react-native-fs";
import styles from "../styles/styles.ts";
import Toast from "react-native-simple-toast";
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import FirebaseManager from "../helpers/FirebaseManager.ts";
import {useEffect, useState} from "react";
import {palette} from "../styles/colors.ts";

const generateFile = async (content: string) => {
    const fileName = 'trip-manager-backup.json';
    const filePath = `${DocumentDirectoryPath}/${fileName}`;

    let generated = false;

    try {
        await writeFile(filePath, content, 'utf8');
        generated = true;
    } catch (error) {
        console.error(error)
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
            Toast.show('Saving Failed', Toast.SHORT);
        }
    }

};

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
            <View style={styles.container}>

                <View style={styles.item}>
                    <Text style={styles.acceptButtonText}>Online Backup</Text>
                    {FirebaseManager.auth.currentUser && <View>
                        <Text style={styles.dateDisplay}>Current Status: <Text style={{color: palette.primary}}>Logged In</Text></Text>
                        <TouchableOpacity style={styles.acceptButton} onPress={() => {
                            Logger.log("Create Firebase Backup")
                            trip.loadTrips((trips:trip[]) => {
                                singleExpense.loadSingleExpenses((singleExpenses:singleExpense[]) => {

                                    Logger.log("Loaded trips and single expenses for firebase backup")
                                    Logger.log("Trips: " + JSON.stringify(trips))
                                    Logger.log("Single Expenses: " + JSON.stringify(singleExpenses))

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
                                console.log(v)
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
                    {!FirebaseManager.auth.currentUser && <View>
                        <Text style={styles.dateDisplay}>Current Status: <Text style={{color:palette.secondary}}>Not Logged In</Text></Text>
                           <TouchableOpacity style={styles.acceptButton} onPress={() => {
                                FirebaseManager.signInWithGoogle()
                                // FirebaseManager.auth.signInWithEmailAndPassword("ammarrmalik185@hotmail.com", "123456").catch(console.error);
                            }}>
                                <Text style={styles.acceptButtonText}>Login</Text>
                            </TouchableOpacity>
                   </View>}
                </View>

                <View style={styles.item}>
                    <Text style={styles.acceptButtonText}>Local Backup</Text>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => {
                        Logger.log("Create Local Backup")
                        trip.loadTrips((trips:trip[]) => {
                            singleExpense.loadSingleExpenses((singleExpenses:singleExpense[]) => {
                                Logger.log("Loaded trips and single expenses for local backup")
                                Logger.log("Trips: " + JSON.stringify(trips))
                                Logger.log("Single Expenses: " + JSON.stringify(singleExpenses))

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
                    <TouchableOpacity style={styles.acceptButton} onPress={() => {
                        pickFile().then(recoverBackupFromString);
                    }}>
                        <Text style={styles.acceptButtonText}>Restore From Local Backup</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
