import {Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import {useNavigation} from "@react-navigation/native";
import pages from "../types/pages.ts";

export default function Settings({navigation, route} : any){
    return (
        <View style={styles.main}>
            {/*<Text style={styles.title}>Settings</Text>*/}
            {/*<TouchableOpacity onPress={() => settings.mode = 2} style={styles.acceptButton}><Text style={styles.acceptButtonText}>Dark Mode</Text></TouchableOpacity>*/}
            <TouchableOpacity onPress={() => navigation.navigate(pages.BackupAndRestore, {})} style={styles.acceptButton}><Text style={styles.acceptButtonText}>Backup and Restore</Text></TouchableOpacity>
        </View>
    )
}
