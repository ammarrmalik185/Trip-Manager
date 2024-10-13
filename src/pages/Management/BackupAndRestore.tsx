import {Text, TouchableOpacity, View} from "react-native";
import {Logger} from "../../helpers/Logger.ts";
import {trip} from "../../types/trip.ts";
import {singleExpense} from "../../types/singleExpense.ts";
import styles from "../../styles/styles.ts";
import Toast from "react-native-simple-toast";
import DocumentPicker from 'react-native-document-picker';
import FirebaseManager from "../../helpers/FirebaseManager.ts";
import {useEffect, useState} from "react";
import {palette} from "../../styles/colors.ts";
import PopupModal, {ModalData, ModalType} from "../../components/PopupModal.tsx";
import {BackupManager} from "../../helpers/BackupManager.ts";
import {FileManager} from "../../helpers/FileManager.ts";

const onlineEnabled = false;

export default function BackupAndRestore() {

    const [refresh, setRefresh] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
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
            <PopupModal state={modalVisible}
                        modalData={new ModalData(ModalType.Information, "Note: This file cannot be used to restore data", () => {
                            BackupManager.getReadableFile().then((v) => {
                                BackupManager.generateTextFile(v);
                            })
                            setModalVisible(false)
                        }, [], "")}/>
            <View style={styles.container}>

                {onlineEnabled && <View style={styles.item}>
                    <Text style={styles.expenseTitle}>Online Backup</Text>
                    {FirebaseManager.auth.currentUser && <View>
                        <Text style={styles.dateDisplay}>Current Status: <Text style={{color: palette.primary}}>Logged
                            In</Text></Text>
                        <TouchableOpacity style={styles.acceptButton} onPress={() => {
                            Logger.log("Create Firebase Backup")
                            trip.loadTrips((trips: trip[]) => {
                                singleExpense.loadSingleExpenses((singleExpenses: singleExpense[]) => {

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
                                BackupManager.recoverBackupFromString(v)
                            })
                        }
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
                        <Text style={styles.dateDisplay}>Current Status: <Text style={{color: palette.secondary}}>Not
                            Logged In</Text></Text>
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
                    {/*<View style={styles.horizontalStack}>*/}
                    <TouchableOpacity style={{...styles.neutralButtonNormal, alignSelf: "center"}} onPress={() => {
                        Logger.log("Create Local Backup")
                        trip.loadTrips((trips: trip[]) => {
                            singleExpense.loadSingleExpenses((singleExpenses: singleExpense[]) => {

                                let backup = {
                                    trips: trips,
                                    singleExpenses: singleExpenses
                                }

                                BackupManager.generateBackupFile(JSON.stringify(backup))
                            })
                        })
                    }}>
                        <Text style={styles.acceptButtonText}>Create Local Backup</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{...styles.neutralButtonNormal, alignSelf: "center"}} onPress={() => {
                        FileManager.pickSingleFile({
                            type: [DocumentPicker.types.json],
                        }).then(BackupManager.recoverBackupFromString);
                    }}>
                        <Text style={styles.acceptButtonText}>Restore From File</Text>
                    </TouchableOpacity>

                    {/*</View>*/}

                </View>
            </View>
        </View>
    )
}
