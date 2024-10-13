import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {getTripThemeImage, trip, tripThemes} from "../../types/trip.ts";
import styles from "../../styles/styles.ts";
import pages from "../../types/pages.ts";
import {palette} from "../../styles/colors.ts";
import DatePicker from "../../components/DatePicker.tsx";
import LinearGradient from "react-native-linear-gradient";
import PopupModal, {ModalData, ModalType} from "../../components/PopupModal.tsx";

function TripCreate({navigation}: any) {
    const [newTrip] = useState<trip>(new trip());
    const [refresh, setRefresh] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.main}>
            <PopupModal state={modalVisible}
                        modalData={new ModalData(ModalType.PickAButton, "Pick a trip theme", (exit: boolean, value: number) => {
                            setModalVisible(false)
                            if (exit) {
                                newTrip.theme = tripThemes[value].key;
                                setRefresh(!refresh);
                            }
                        }, tripThemes.map(t => t.value), "")}/>

            <View style={styles.backgroundImage}>
                <Image
                    style={styles.backgroundImage}
                    source={getTripThemeImage(newTrip.theme)}
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
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder}
                               onChangeText={text => newTrip.title = text}/>
                </View>
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Destination</Text>
                    <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder}
                               onChangeText={text => newTrip.destination = text}/>
                </View>
                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput multiline={true} style={styles.inputFieldMultiLine}
                               placeholderTextColor={palette.placeholder}
                               onChangeText={text => newTrip.description = text}/>
                </View>
                <DatePicker value={newTrip.date.from} onValueChanged={(date: Date) => {
                    newTrip.date.from = date,
                        setRefresh(!refresh);
                }}/>

                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Theme</Text>
                    <TouchableOpacity style={styles.inputPopupView} onPress={() => setModalVisible(true)}>
                        <Text style={styles.dateDisplay}>{tripThemes.find(i => i.key == newTrip.theme)?.value}</Text>
                    </TouchableOpacity>
                    {/*<SelectList*/}
                    {/*    data={tripThemes}*/}
                    {/*    setSelected={(value: any) => {*/}
                    {/*        newTrip.theme = value;*/}
                    {/*        setRefresh(!refresh)*/}
                    {/*    }}*/}
                    {/*    save="key"*/}

                    {/*    boxStyles={styles.inputField}*/}
                    {/*    dropdownTextStyles={styles.dropDownInfoText}*/}
                    {/*    dropdownStyles={styles.dropDownContainerData}*/}
                    {/*    inputStyles={styles.dropDownInfoText}*/}

                    {/*    defaultOption={tripThemes[0]}*/}
                    {/*/>*/}
                </View>

                <TouchableOpacity style={styles.acceptButton} onPress={() => {

                    newTrip.saveTrip().then(() => {
                        trip.allTrips.push(newTrip);
                        navigation.pop();
                        navigation.navigate(pages.TripOverview, {trip: newTrip});
                    }).catch(console.error);

                }}><Text style={styles.acceptButtonText}>Create Trip</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default TripCreate;
