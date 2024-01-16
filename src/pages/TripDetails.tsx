import { Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import { trip } from "../types/trip.ts";
import { useState } from "react";

export default function TripDetails({route, navigation}: {route: any, navigation: any}) {
    const [currentTrip, setCurrentTrip] = useState<trip>(route.params.trip);
    return (
        <View style={styles.main}>
            <View>
                <Text style={styles.title}>{currentTrip.title}</Text>
                <Text style={styles.subTitle}>{currentTrip.destination}</Text>
                <Text style={{...styles.itemText, minHeight: 100, maxHeight: 50}}>{currentTrip.description}</Text>
                <Text style={styles.dateDisplay}>{currentTrip.date.from.toLocaleDateString()} - {currentTrip.date.to.toLocaleDateString()}</Text>
            </View>

            <TouchableOpacity style={styles.fabTop} onPress={() => {navigation.navigate(pages.TripEdit, {trip: route.params.trip})}}>
                <Text style={styles.fabText}>✏️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fab} onPress={() => {
                route.params.trip.deleteTrip().then(() => {
                    trip.allTrips = trip.allTrips.filter(item => item.id != currentTrip.id);
                    navigation.navigate(pages.TripList)
                });
            }}>
                <Text style={styles.fabText}>🗑️</Text>
            </TouchableOpacity>
        </View>
    )
}