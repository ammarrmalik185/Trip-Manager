import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {trip} from "../types/trip.ts";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import { palette } from "../styles/colors.ts";
import DatePicker from "../components/DatePicker.tsx";

function TripCreate({route, navigation}:any) {
    const [newTrip, setTrip] = useState<trip>(new trip());
    const [refresh, setRefresh] = useState(false);

    return (
        <View style={styles.main}>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} onChangeText={text => newTrip.title = text} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Destination</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} onChangeText={text => newTrip.destination = text} />
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput multiline={true} style={styles.inputFieldMultiLine} placeholderTextColor={palette.placeholder} onChangeText={text => newTrip.description = text} />
            </View>
            <DatePicker value={newTrip.date.from} onValueChanged={(date: Date) => {
                newTrip.date.from = date,
                setRefresh(!refresh);
            }}/>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {

                newTrip.saveTrip().then(() => {
                    trip.allTrips.push(newTrip);
                    navigation.navigate(pages.TripOverview, {trip: newTrip});
                }).catch(console.error);

            }}><Text style={styles.acceptButtonText}>Create Trip</Text></TouchableOpacity>
        </View>
    )
}

export default TripCreate;
