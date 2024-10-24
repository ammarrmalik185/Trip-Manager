import {Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../styles/styles.ts";
import {getTripThemeImage, trip, tripThemes} from "../../types/trip.ts";
import pages from "../../types/pages.ts";
import React, {useState} from "react";
import {palette} from "../../styles/colors.ts";
import DatePicker from "../../components/DatePicker.tsx";
import LinearGradient from "react-native-linear-gradient";
import PopupModal, {ModalData, ModalType} from "../../components/PopupModal.tsx";

export default function TripEditor({route, navigation}: any) {
    const [currentTrip, setCurrentTrip] = useState<trip>(route?.params?.trip || new trip());

    const [title, setTitle] = useState(currentTrip.title);
    const [destination, setDestination] = useState(currentTrip.destination);
    const [theme, setTheme] = useState(currentTrip.theme);
    const [description, setDescription] = useState(currentTrip.description);
    const [dateFrom, setDateFrom] = useState(currentTrip.date.from);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <ScrollView style={styles.main}>
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
            <View style={styles.forumView}>
                <Text style={styles.forumTitle}>Trip Details</Text>
                <View style={styles.inputSection}>
                    {!title && <View style={styles.textInputError}/>}
                    <Text style={styles.inputLabel}>Name *</Text>
                    <TextInput style={styles.inputField}
                               placeholderTextColor={palette.placeholder}
                               value={title}
                               onChangeText={setTitle}/>
                </View>
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Destination</Text>
                    <TextInput style={styles.inputField}
                               placeholderTextColor={palette.placeholder}
                               value={destination}
                               onChangeText={setDestination}/>
                </View>
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput multiline={true}
                               style={styles.inputFieldMultiLine}
                               placeholderTextColor={palette.placeholder}
                               value={description}
                               onChangeText={setDescription}/>
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Theme</Text>
                    <TouchableOpacity style={styles.inputPopupView} onPress={() => setModalVisible(true)}>
                        <Text style={styles.dateDisplay}>{tripThemes.find(i => i.key == theme)?.value}</Text>
                    </TouchableOpacity>
                </View>

                <DatePicker value={dateFrom} onValueChanged={setDateFrom}/>

                <View style={{margin: 30}}>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => {

                        currentTrip.title = title;
                        currentTrip.destination = destination;
                        currentTrip.theme = theme;
                        currentTrip.description = description;
                        currentTrip.date.from = dateFrom;

                        currentTrip.saveTrip().then(() => {
                            navigation.pop();
                            navigation.navigate(pages.TripOverview, {trip: currentTrip});
                        }).catch(console.error);

                    }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
