import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import { useState } from "react";
import log from "../types/log.ts";
import DatePicker from "react-native-date-picker";
import Pages from "../types/pages.ts";

export default function TripLogsCreate({navigation, route}:any) {
    const [newLog, setLog] = useState<log>(new log());
    return (
        <View style={styles.main}>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput style={styles.inputField} placeholder={"Enter Log Title"} onChangeText={txt => newLog.title = txt}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput style={styles.inputField} placeholder={"Enter Current Location"} onChangeText={txt => newLog.location = txt}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Distance Traveled</Text>
                <TextInput style={styles.inputField} placeholder={"Enter Total Distance Traveled"} inputMode={"numeric"} onChangeText={txt => newLog.distance_traveled = parseFloat(txt)}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput style={styles.inputField} placeholder={"Enter Description"} onChangeText={txt => newLog.description = txt}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Date</Text>
                <View style={styles.center}>
                    <DatePicker mode={"date"} date={newLog.date} style={styles.datePicker} onDateChange={txt => newLog.date = txt}/>
                </View>
            </View>

            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                route.params.trip.logs.push(newLog)
                navigation.navigate(Pages.TripLogs, {trip: route.params.trip})
            }}><Text style={styles.acceptButtonText}>Add</Text></TouchableOpacity>

        </View>
    )
}
