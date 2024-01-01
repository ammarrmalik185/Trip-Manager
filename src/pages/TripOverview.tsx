import {Text, TouchableOpacity, View} from "react-native";
import Pages from "../types/pages.ts";
import styles from "../styles/styles.ts";

function TripOverview({route, navigation}:any) {
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>{route.params.trip.title}</Text>
            </View>
            <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(Pages.TripMembers, {trip: route.params.trip})}>
                <Text style={styles.acceptButtonText}>Members</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(Pages.TripExpenses, {trip: route.params.trip})}>
                <Text style={styles.acceptButtonText}>Expenses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(Pages.TripLogs, {trip: route.params.trip})}>
                <Text style={styles.acceptButtonText}>Logs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(Pages.TripExpensesSettle, {trip: route.params.trip})}>
                <Text style={styles.acceptButtonText}>Settle Expenses</Text>
            </TouchableOpacity>
        </View>
    )
}

export default TripOverview;
