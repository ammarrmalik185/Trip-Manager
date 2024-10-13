import {ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import {useState} from "react";
import styles from "../../../styles/styles.ts";
import pages from "../../../types/pages.ts";
import log from "../../../types/log.ts";
import {palette} from "../../../styles/colors.ts";
import DatePicker from "../../../components/DatePicker.tsx";
import {LeafletView} from "react-native-leaflet-view";
import Geolocation from "react-native-geolocation-service";
import Toast from "react-native-simple-toast";
import {Logger} from "../../../helpers/Logger.ts";
import {requestLocationPermission} from "../../../helpers/PermissionsHelper.ts";
import {SettingsManager} from "../../../helpers/SettingsManager.ts";

export default function TripLogsEdit({route, navigation}: any) {
    const [oldLog, setOldLog] = useState<log>(route.params.log);

    const [title, setTitle] = useState(oldLog.title);
    const [location, setLocation] = useState(oldLog.location);
    const [distance, setDistance] = useState(oldLog.distance_traveled);
    const [description, setDescription] = useState(oldLog.description);
    const [geoLocation, setGeoLocation] = useState(oldLog.geoLocation);
    const [date, setDate] = useState(oldLog.date);

    async function getLocation() {
        requestLocationPermission().then((permissionGranted) => {
            if (permissionGranted) {
                Geolocation.getCurrentPosition((position) => {
                    const {latitude, longitude} = position.coords;
                    setGeoLocation({lat: latitude, lng: longitude});
                    Toast.show("Location added to log", ToastAndroid.SHORT);
                }, (error) => {
                    Logger.error(error.message);
                    Toast.show("Error getting geolocation", ToastAndroid.SHORT);
                }, {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
            }
        })
    }

    function deleteLocation() {
        setGeoLocation(undefined);
    }

    return (
        <ScrollView style={styles.main}>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Title</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Log Title"} value={title} onChangeText={setTitle}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Current Location"} value={location} onChangeText={setLocation}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Distance Traveled</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Total Distance Traveled"} inputMode={"numeric"}
                           value={distance.toString()} onChangeText={txt => setDistance(parseInt(txt))}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput multiline={true} style={styles.inputFieldMultiLine}
                           placeholderTextColor={palette.placeholder} placeholder={"Enter Description"}
                           value={description} onChangeText={setDescription}/>
            </View>
            <DatePicker value={date} onValueChanged={setDate}/>

            <View style={{margin: 10}}/>

            {SettingsManager.settings.showMapInLogEdit && geoLocation &&
                <View style={{width: "80%", height: 200, alignSelf: "center"}}>
                    <LeafletView
                        mapCenterPosition={geoLocation}
                        mapMarkers={[{
                            position: geoLocation,
                            icon: '<div style="text-align: center">📍<p style="font-size: 20px; margin-top: 0; padding-top: 0; text-align: center">Location</p></div>',
                            size: [32, 32],
                            title: "Location"
                        }]}
                    />
                </View>}

            <View style={styles.center}>
                <View style={{margin: 10}}/>
                <TouchableOpacity style={styles.neutralButtonNormal} onPress={getLocation}><Text
                    style={styles.acceptButtonText}>{geoLocation ? "Update" : "Get"} Location</Text></TouchableOpacity>
                {geoLocation &&
                    <TouchableOpacity style={styles.neutralButtonNormal} onPress={() => setGeoLocation(undefined)}><Text
                        style={styles.acceptButtonText}>Delete Location</Text></TouchableOpacity>}
                <View style={{margin: 10}}/>
            </View>

            <TouchableOpacity style={styles.acceptButton} onPress={() => {

                let newLog = new log();
                newLog.id = oldLog.id;
                newLog.title = title;
                newLog.geoLocation = geoLocation;
                newLog.description = description;
                newLog.date = date;
                newLog.distance_traveled = distance;
                newLog.location = location;

                if (newLog.validate()) {
                    route.params.trip.logs = route.params.trip.logs.filter((lg: log) => lg.id != oldLog.id);
                    route.params.trip.logs.push(newLog);
                    route.params.trip.saveTrip()
                    navigation.pop();
                    navigation.navigate(pages.TripLogs, {trip: route.params.trip})
                } else {
                    Toast.show(newLog.getValidationError(), ToastAndroid.LONG)
                }


            }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>

        </ScrollView>
    );
}
