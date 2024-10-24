import {Image, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
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
import {Utils} from "../../../helpers/Utils.ts";

export default function TripLogsEditor({route, navigation}: any) {
    const [currentLog, setCurrentLog] = useState<log>(route.params.log || new log());
    const isNew = route.params.log === undefined;

    const [title, setTitle] = useState(currentLog.title);
    const [location, setLocation] = useState(currentLog.location);
    const [distance, setDistance] = useState(currentLog.distance_traveled.toString() || "");
    const [description, setDescription] = useState(currentLog.description);
    const [geoLocation, setGeoLocation] = useState(currentLog.geoLocation);
    const [date, setDate] = useState(currentLog.date);

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

    useEffect(() => {
        if (SettingsManager.settings.autoGetLocation && isNew) getLocation();
    }, []);

    return (
        <ScrollView style={styles.main}>

            <Text style={styles.forumTitle}>Log Details</Text>
            <View style={styles.inputSection}>
                {!title && <View style={styles.textInputError}/>}
                <Text style={styles.inputLabel}>Title *</Text>
                <TextInput style={styles.inputField}
                           value={title}
                           placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Log Title"}
                           onChangeText={setTitle}/>
            </View>

            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput multiline={true}
                           style={styles.inputFieldMultiLine}
                           placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Description"}
                           value={description}
                           onChangeText={setDescription}/>
            </View>

            <View style={styles.inputSection}>
                {!distance.match(Utils.validNumberRegex) && <View style={styles.textInputError}/>}
                <Text style={styles.inputLabel}>Distance Traveled</Text>
                <TextInput style={styles.inputField}
                           placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Total Distance Traveled"}
                           inputMode={"numeric"}
                           value={distance == "0" ? "" : distance}
                           onChangeText={txt => setDistance(txt)}/>
            </View>


            <DatePicker value={date} onValueChanged={setDate}/>

            <Text style={styles.forumTitle}>Location Details</Text>

            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Location name</Text>
                <TextInput style={styles.inputField}
                           value={location}
                           placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Current Location"}
                           onChangeText={setLocation}/>
            </View>

            <View style={{...styles.inputSection, padding: 20}}>
                {geoLocation &&
                    <View style={styles.mapSmall}>
                        <LeafletView
                            mapCenterPosition={geoLocation}
                            mapMarkers={[{position: geoLocation, icon: '📍', size: [32, 32], title: "Location"}]}
                            doDebug={false}
                        />
                    </View>}
                {!geoLocation && <View style={styles.mapSmall}>
                    <View style={{backgroundColor: "rgba(0,0,0,0.5)", ...StyleSheet.absoluteFillObject, borderRadius: 10}}/>
                    <View
                        style={{alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject}}>
                        <Image
                            source={require('../../../images/uiImages/no-location.png')}
                            style={{width: 100, height: 100, marginBottom: 30}}/>
                        <Text style={styles.subTitle}>No Geo location</Text>
                    </View>
                </View>}

                <View style={styles.horizontalStack}>
                    <View style={{margin: 10}}/>
                    <TouchableOpacity style={styles.logLocationButton} onPress={getLocation}><Text
                        style={styles.logLocationButtonText}>{geoLocation ? "Update" : "Get"} Location</Text></TouchableOpacity>
                    {geoLocation && <TouchableOpacity style={styles.logLocationButton} onPress={() => setGeoLocation(undefined)}>
                        <Text style={styles.logLocationButtonText}>Delete Location</Text></TouchableOpacity>}
                    <View style={{margin: 10}}/>
                </View>

            </View>

            <View style={{margin: 30}}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {

                    if (!distance.match(Utils.validNumberRegex)){
                        Toast.show("Invalid distance value", ToastAndroid.LONG)
                        return;
                    }

                    let newLog = new log();
                    newLog.id = currentLog.id;
                    newLog.title = title;
                    newLog.geoLocation = geoLocation;
                    newLog.description = description;
                    newLog.date = date;
                    newLog.distance_traveled = parseFloat(distance);
                    newLog.location = location;

                    if (newLog.validate()) {
                        route.params.trip.logs = route.params.trip.logs.filter((lg: log) => lg.id != currentLog.id);
                        route.params.trip.logs.push(newLog);
                        route.params.trip.saveTrip()
                        navigation.pop();
                        navigation.navigate(pages.TripLogs, {trip: route.params.trip})
                    } else {
                        Toast.show(newLog.getValidationError(), ToastAndroid.LONG)
                    }

                }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>
            </View>
        </ScrollView>
    );
}
