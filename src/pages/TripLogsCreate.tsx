import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import {useState} from "react";
import log from "../types/log.ts";
import pages from "../types/pages.ts";
import {palette} from "../styles/colors.ts";
import DatePicker from "../components/DatePicker.tsx";

export default function TripLogsCreate({navigation, route}:any) {
    const [newLog, setLog] = useState<log>(new log());
    const [refresh, setRefresh] = useState(false);

    return (
        <View style={styles.main}>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} placeholder={"Enter Log Title"} onChangeText={txt => newLog.title = txt}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} placeholder={"Enter Current Location"} onChangeText={txt => newLog.location = txt}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Distance Traveled</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} placeholder={"Enter Total Distance Traveled"} inputMode={"numeric"} onChangeText={txt => newLog.distance_traveled = parseFloat(txt)}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput multiline={true} style={styles.inputFieldMultiLine} placeholderTextColor={palette.placeholder} placeholder={"Enter Description"} onChangeText={txt => newLog.description = txt}/>
            </View>
            <DatePicker value={newLog.date} onValueChanged={date => {
                newLog.date = date;
                setRefresh(!refresh);
            }}/>

            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                route.params.trip.logs.push(newLog)
                route.params.trip.saveTrip()
                navigation.navigate(pages.TripLogs, {trip: route.params.trip})
            }}><Text style={styles.acceptButtonText}>Add</Text></TouchableOpacity>

        </View>
    )
}
