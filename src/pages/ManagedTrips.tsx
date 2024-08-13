import styles from "../styles/styles.ts";
import {Text, TouchableOpacity, View} from "react-native";
import pages from "../types/pages.ts";

export default function ManagedTrips({navigation, route} : any){
    return (
        <View style={styles.main}>
            <Text style={styles.title}>Managed Trips Coming Soon</Text>
            <Text style={styles.subTitle}>You will be able to add another peron's trip here and be able to make changes to it. the original data will be with the user but you will be able to add/edit the trip details, add expenses, members or logs and much more.</Text>
        </View>
    )
}
