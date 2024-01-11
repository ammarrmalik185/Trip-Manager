import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import DatePicker from "react-native-date-picker";
import { trip } from "../types/trip.ts";
import Pages from "../types/pages.ts";
import { useState } from "react";

export default function TripEdit({route, navigation} : any) {
    const [oldTrip, setOldTrip] = useState<trip>(new trip());

    const [title, setTitle] = useState(oldTrip.title);
    const [destination, setDestination] = useState(oldTrip.destination);
    const [description, setDescription] = useState(oldTrip.description);
    const [dateFrom, setDateFrom] = useState(oldTrip.date.from);

    return (
        <View style={styles.main}>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Name</Text>
                <TextInput style={styles.inputField} value={title} onChangeText={setTitle} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Destination</Text>
                <TextInput style={styles.inputField} value={destination} onChangeText={setDestination} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Description</Text>
                <TextInput style={styles.inputField} value={description} onChangeText={setDescription} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Start Date</Text>
                <View style={styles.center}>
                    <DatePicker mode="date" style={styles.datePicker} date={dateFrom} onDateChange={setDateFrom}/>
                </View>
            </View>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {

                oldTrip.title = title;
                oldTrip.destination = destination;
                oldTrip.description = description;
                oldTrip.date.from = dateFrom;

                oldTrip.saveTrip().then(() => {
                    navigation.navigate(Pages.TripList);
                }).catch(console.error);

            }}><Text style={styles.acceptButtonText}>Create Trip</Text></TouchableOpacity>
        </View>
        )
}
