import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import log from "../types/log.ts";

export default function TripLogsEdit({route, navigation}: any) {
    const [oldLog, setOldLog] = useState<log>(route.params.log);

    const [title, setTitle] = useState(oldLog.title);
    const [location, setLocation] = useState(oldLog.location);
    const [distance, setDistancee] = useState(oldLog.distance_traveled);
    const [description, setDescription] = useState(oldLog.description);
    const [date, setDate] = useState(oldLog.date);

    return (
        <View style={styles.main}>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput style={styles.inputField} placeholder={"Enter Log Title"} value={title} onChangeText={setTitle}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput style={styles.inputField} placeholder={"Enter Current Location"} value={location} onChangeText={setLocation}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Distance Traveled</Text>
                <TextInput style={styles.inputField} placeholder={"Enter Total Distance Traveled"} inputMode={"numeric"}
                           value={distance.toString()} onChangeText={txt => setDistancee(parseInt(txt))}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput style={styles.inputField} placeholder={"Enter Description"} value={description} onChangeText={setDescription}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Date</Text>
                <View style={styles.center}>
                    <DatePicker mode={"date"} date={date} style={styles.datePicker} onDateChange={setDate}/>
                </View>
            </View>

            <TouchableOpacity style={styles.acceptButton} onPress={() => {

                let newLog = new log();
                newLog.id = oldLog.id;
                newLog.title = title;
                newLog.description = description;
                newLog.date = date;
                newLog.distance_traveled = distance;
                newLog.location = location;

                route.params.trip.logs = route.params.trip.logs.filter((lg: log) => lg.id != oldLog.id);
                route.params.trip.logs.push(newLog);
                route.params.trip.saveTrip()

                navigation.navigate(Pages.TripLogs, {trip: route.params.trip})

            }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>

        </View>
    );
}
