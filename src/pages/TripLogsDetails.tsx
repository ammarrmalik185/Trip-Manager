import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import log from "../types/log.ts";

export default function TripLogsDetails({route, navigation}:any) {
    return (
        <View style={styles.main}>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {navigation.navigate(pages.TripLogsEdit, {log: route.params.log, trip: route.params.trip})}}>
                    <Text style={styles.acceptButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton} onPress={() => {
                    route.params.trip.logs = route.params.trip.logs.filter((lg: log) => lg.id != route.params.log.id);
                    navigation.navigate(pages.TripLogs, {trip: route.params.trip})
                }}>
                    <Text style={styles.acceptButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
