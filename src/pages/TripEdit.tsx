import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import DatePicker from "react-native-date-picker";
import { trip } from "../types/trip.ts";
import Pages from "../types/pages.ts";
import { useState } from "react";

export default function TripEdit({route, navigation} : any) {
    const [oldTrip, setOldTrip] = useState<trip>(new trip());

    const [] = useState(oldTrip.title);


    return (
        <View style={styles.main}>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Name</Text>
                <TextInput style={styles.inputField} onChangeText={text => oldTrip.title = text} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Destination</Text>
                <TextInput style={styles.inputField} onChangeText={text => oldTrip.destination = text} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Start Date</Text>
                <View style={styles.center}>
                    <DatePicker mode="date" style={styles.datePicker} date={oldTrip.date.from} onDateChange={date => oldTrip.date.from = date}/>
                </View>
            </View>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {

                oldTrip.saveTrip().then(() => {
                    trip.allTrips.push(oldTrip);
                    navigation.navigate(Pages.TripList, {trip: oldTrip});
                }).catch(console.error);

            }}><Text style={styles.acceptButtonText}>Create Trip</Text></TouchableOpacity>
        </View>
        )
}
