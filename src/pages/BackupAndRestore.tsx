import {Text, TouchableOpacity, View} from "react-native";
import {Logger} from "../helpers/Logger.ts";
import {trip} from "../types/trip.ts";
import {singleExpense} from "../types/singleExpense.ts";
import {DocumentDirectoryPath, readFile, writeFile} from "react-native-fs";
import styles from "../styles/styles.ts";
import Toast from "react-native-simple-toast";
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';

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


export default function BackupAndRestore(){
    return (
        <View style={styles.main}>

            {/*<TouchableOpacity onPress={() => settings.mode = 2} style={styles.acceptButton}><Text style={styles.acceptButtonText}>Dark Mode</Text></TouchableOpacity>*/}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {
                    Logger.log("Create Local Backup")
                    trip.loadTrips((trips:trip[]) => {
                        singleExpense.loadSingleExpenses((singleExpenses:singleExpense[]) => {
                            Logger.log("Loaded trips and single expenses")
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
                    pickFile().then((content) => {
                        try {
                            let json = JSON.parse(content || "{}")

                            for (const singleTrip of json.trips) {
                                try {
                                    let newTrip = trip.loadFromString(JSON.stringify(singleTrip));
                                    newTrip.saveTrip();
                                }catch (err) {
                                    Logger.error(err);
                                }
                            }

                            for (const singleExpenseEntry of json.singleExpenses) {
                                try {
                                    let newTrip = singleExpense.loadFromString(JSON.stringify(singleExpenseEntry));
                                    newTrip.saveSingleExpense();
                                }catch (err) {
                                    Logger.error(err);
                                }

                            }

                        } catch (err) {
                            Logger.error(err);
                            Toast.show("Invalid file format", Toast.SHORT);
                        }
                    });
                }}>
                    <Text style={styles.acceptButtonText}>Restore From Local Backup</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
