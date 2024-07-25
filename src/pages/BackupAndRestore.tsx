import {Alert, Linking, ShareContent, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import {logger} from "../helpers/logger.ts";
import {trip} from "../types/trip.ts";
import {singleExpense} from "../types/singleExpense.ts";
import Toast from "react-native-simple-toast";
import {DocumentDirectoryPath, readFile, writeFile} from "react-native-fs";
import Share from 'react-native-share';
import DocumentPicker from 'react-native-document-picker';
import {sin} from "react-native-ui-datepicker/lib/typescript/src/components/TimePicker/AnimatedMath";

const GenerateDownloadFileScreen = (content: string) => {
    const generateFile = async () => {
        const fileName = 'trip-manager-backup.json';
        const filePath = `${DocumentDirectoryPath}/${fileName}`;

        let generated = false;

        try {
            await writeFile(filePath, content, 'utf8');
            generated = true;
        } catch (error) {
            console.error(error)
            logger.error(error);
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
    generateFile();
}


const pickFile = async () => {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.json],
        });
        const filePath = res[0].uri;
        const fileName = res[0].name;

        // Read the file content
        const content = await readFile(filePath, 'utf8');
        console.log(content)
        return content;



    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            console.log('User cancelled the picker');
        } else {
            console.error(err);
            Alert.alert('Error', 'Failed to pick file');
        }
    }
}


export default function BackupAndRestore(){
    return (
        <View style={styles.main}>

            {/*<TouchableOpacity onPress={() => settings.mode = 2} style={styles.acceptButton}><Text style={styles.acceptButtonText}>Dark Mode</Text></TouchableOpacity>*/}
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {
                    logger.log("Create Local Backup")
                    trip.loadTrips((trips:trip[]) => {
                        singleExpense.loadSingleExpenses((singleExpenses:singleExpense[]) => {
                            logger.log("Loaded trips and single expenses")
                            logger.log("Trips: " + JSON.stringify(trips))
                            logger.log("Single Expenses: " + JSON.stringify(singleExpenses))

                            let backup = {
                                trips: trips,
                                singleExpenses: singleExpenses
                            }

                            GenerateDownloadFileScreen(JSON.stringify(backup))

                        })
                    })
                }}>
                    <Text style={styles.acceptButtonText}>Create Local Backup</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {
                    pickFile().then((content) => {
                        try {
                            let json = JSON.parse(content || "{}")
                            trip.allTrips = json.trips;
                            singleExpense.allSingleExpenses = json.singleExpenses;

                            for (const singleTrip of json.trips) {
                                let newTrip = trip.loadFromString(singleTrip);
                                newTrip.saveTrip();
                            }

                        } catch (err) {
                            logger.error(err);
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
