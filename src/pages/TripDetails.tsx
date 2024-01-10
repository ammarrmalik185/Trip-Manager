import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import { trip } from "../types/trip.ts";

export default function TripDetails({route, navigation}: {route: any, navigation: any}) {
    return (
        <View style={styles.main}>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {navigation.navigate(Pages.TripEdit, {trip: route.params.trip})}}>
                <Text style={styles.acceptButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                route.params.trip.deleteTrip().then(() => {
                    navigation.navigate(Pages.TripList)
                });

            }}>
                <Text style={styles.acceptButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}
