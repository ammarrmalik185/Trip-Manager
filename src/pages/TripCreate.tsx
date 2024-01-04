import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {trip} from "../types/trip.ts";
import styles from "../styles/styles.ts";
import DatePicker from "react-native-date-picker";
import Pages from "../types/pages.ts";

function TripCreate({route, navigation}:any) {
    const [newTrip, setTrip] = useState<trip>(new trip());
    return (
        <View style={styles.main}>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Name</Text>
                <TextInput style={styles.inputField} onChangeText={text => newTrip.title = text} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Destination</Text>
                <TextInput style={styles.inputField} onChangeText={text => newTrip.destination = text} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Start Date</Text>
                <View style={styles.center}>
                    <DatePicker mode="date" style={styles.datePicker} date={newTrip.date.from} onDateChange={date => newTrip.date.from = date}/>
                </View>
            </View>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {

                newTrip.saveTrip().then(() => {
                    trip.allTrips.push(newTrip);
                    navigation.navigate(Pages.TripList, {trip: newTrip});
                }).catch(console.error);

            }}><Text style={styles.acceptButtonText}>Create Trip</Text></TouchableOpacity>
        </View>
    )
}

export default TripCreate;
