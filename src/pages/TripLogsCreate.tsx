import {Alert, Platform, ScrollView, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import {useEffect, useState} from "react";
import log from "../types/log.ts";
import pages from "../types/pages.ts";
import {palette} from "../styles/colors.ts";
import DatePicker from "../components/DatePicker.tsx";
import Geolocation from 'react-native-geolocation-service';
import Toast from "react-native-simple-toast";
import {Logger} from "../helpers/Logger.ts";
import {SettingsManager} from "../helpers/SettingsManager.ts";
import { LeafletView } from 'react-native-leaflet-view';
import {requestLocationPermission} from "../helpers/PermissionsHelper.ts";

export default function TripLogsCreate({navigation, route}:any) {
    const [newLog, setLog] = useState<log>(new log());
    const [refresh, setRefresh] = useState(false);

    async function getLocation(){
        requestLocationPermission().then((permissionGranted) => {
            if (permissionGranted) {
                Geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    newLog.geoLocation = { lat: latitude, lng: longitude };
                    // newLog.geoLocation = { lat: 0, lng: 0 };
                    setRefresh(!refresh);
                    Toast.show("Location added to log", ToastAndroid.SHORT);
                }, (error) => {
                    Logger.error(error.message);
                    Toast.show("Error getting geolocation", ToastAndroid.SHORT);
                }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000});
            }
        })
    }

    useEffect(() => {
        if (SettingsManager.settings.autoGetLocation) getLocation();
    }, []);

    return (
        <ScrollView style={styles.main}>
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

            <View style={{margin: 10}}/>
            {SettingsManager.settings.showMapInLogEdit && newLog.geoLocation && <View style={{width: "80%" , height: 200, alignSelf: "center"}}>
                <LeafletView
                    mapCenterPosition={newLog.geoLocation}
                    mapMarkers={[{position: newLog.geoLocation, icon: '📍', size : [32, 32], title: "Location"}]}
                />
            </View>}

            <View style={styles.center}>
                <View style={{margin: 10}}/>
                <TouchableOpacity style={styles.neutralButtonNormal} onPress={getLocation}><Text style={styles.acceptButtonText}>{newLog.geoLocation ? "Update" : "Get"} Location</Text></TouchableOpacity>
                {newLog.geoLocation && <TouchableOpacity style={styles.neutralButtonNormal} onPress={() => {
                    newLog.geoLocation=undefined;
                    setRefresh(!refresh);
                }}><Text style={styles.acceptButtonText}>Delete Location</Text></TouchableOpacity>}
                <View style={{margin: 10}}/>
            </View>

            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                if (newLog.validate()){
                    route.params.trip.logs.push(newLog)
                    route.params.trip.saveTrip()
                    navigation.navigate(pages.TripLogs, {trip: route.params.trip})
                }else{
                    Toast.show(newLog.getValidationError(), ToastAndroid.LONG)
                }

            }}><Text style={styles.acceptButtonText}>Add</Text></TouchableOpacity>

        </ScrollView>
    )
}
