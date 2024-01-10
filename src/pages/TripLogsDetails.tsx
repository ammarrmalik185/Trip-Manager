import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import log from "../types/log.ts";

export default function TripLogsDetails({route, navigation}:any) {
    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {navigation.navigate(Pages.TripLogsEdit, {log: route.params.log, trip: route.params.trip})}}>
                <Text style={styles.acceptButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                route.params.trip.logs = route.params.trip.logs.filter((lg: log) => lg.id != route.params.log.id);
                navigation.navigate(Pages.TripLogs, {trip: route.params.trip})
            }}>
                <Text style={styles.acceptButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    );
}
