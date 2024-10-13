import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles.ts";
import {getTripThemeImage, trip, tripThemes} from "../../types/trip.ts";
import pages from "../../types/pages.ts";
import React, {useState} from "react";
import {palette} from "../../styles/colors.ts";
import DatePicker from "../../components/DatePicker.tsx";
import LinearGradient from "react-native-linear-gradient";
import PopupModal, {ModalData, ModalType} from "../../components/PopupModal.tsx";

export default function TripEdit({route, navigation}: any) {
    const [oldTrip, setOldTrip] = useState<trip>(route.params.trip);

    const [title, setTitle] = useState(oldTrip.title);
    const [destination, setDestination] = useState(oldTrip.destination);
    const [theme, setTheme] = useState(oldTrip.theme);
    const [description, setDescription] = useState(oldTrip.description);
    const [dateFrom, setDateFrom] = useState(oldTrip.date.from);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.main}>
            <PopupModal state={modalVisible}
                        modalData={new ModalData(ModalType.PickAButton, "Pick a trip theme", (exit: boolean, value: number) => {
                            setModalVisible(false)
                            if (exit) {
                                setTheme(tripThemes[value].key);
                            }
                        }, tripThemes.map(t => t.value), "")}/>

            <View style={styles.backgroundImage}>
                <Image
                    style={styles.backgroundImage}
                    source={getTripThemeImage(theme)}
                />
                <LinearGradient
                    colors={['transparent', '#1C3043']}
                    locations={[0, 0.8]}
                    style={styles.gradient}
                />
                <View style={{...styles.gradient, backgroundColor: 'rgba(0,0,0,0.4)'}}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Name</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} value={title}
                           onChangeText={setTitle}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Destination</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} value={destination}
                           onChangeText={setDestination}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Trip Description</Text>
                <TextInput multiline={true} style={styles.inputFieldMultiLine}
                           placeholderTextColor={palette.placeholder} value={description}
                           onChangeText={setDescription}/>
            </View>

            <DatePicker title={"Start Date"} value={dateFrom} onValueChanged={setDateFrom}/>

            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Theme</Text>
                <TouchableOpacity style={styles.inputField} onPress={() => setModalVisible(true)}>
                    <Text style={styles.dateDisplay}>{tripThemes.find(i => i.key == theme)?.value}</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.acceptButton} onPress={() => {

                oldTrip.title = title;
                oldTrip.destination = destination;
                oldTrip.theme = theme;
                oldTrip.description = description;
                oldTrip.date.from = dateFrom;

                oldTrip.saveTrip().then(() => {
                    navigation.pop();
                    navigation.navigate(pages.TripOverview, {trip: oldTrip});
                }).catch(console.error);

            }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>
        </View>
    )
}
