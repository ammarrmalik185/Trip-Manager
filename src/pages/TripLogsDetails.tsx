import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import log from "../types/log.ts";
import React from "react";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import {palette} from "../styles/colors.ts";

export default function TripLogsDetails({route, navigation}:any) {

    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <View style={styles.main}>
            <PopupModal state={modalVisible} modalData={new ModalData(ModalType.SoftConfirmation, "Are you sure you want to delete this log?", (confirm: boolean) => {
                if (confirm) {
                    route.params.trip.logs = route.params.trip.logs.filter((lg: log) => lg.id != route.params.log.id);
                    navigation.navigate(pages.TripLogs, {trip: route.params.trip})
                }
                setModalVisible(false);
            })} />

            <Text style={styles.title}>{route.params.log.title}</Text>
            <Text style={styles.memberSubTitle}>{route.params.log.description}</Text>

            <View style={styles.bottom}>

                <View style={styles.horizontalStack}>
                    {/*<Text style={styles.itemText}>{"<"}</Text>*/}
                    <View style={{width: "80%", height: 250, backgroundColor: "white", borderRadius: 10, marginBottom: 40}}></View>
                    {/*<Text style={styles.itemText}>{">"}</Text>*/}
                </View>

                <View style={styles.horizontalStack}>
                    <View style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/location.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>{route.params.log.location}</Text>
                    </View>
                    <View style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/calender.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>{route.params.log.date.toLocaleTimeString()}</Text>
                        <Text style={styles.iconText}>{route.params.log.date.toLocaleDateString()}</Text>
                    </View>
                    <View style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/odo.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>{route.params.log.distance_traveled} kms</Text>
                    </View>
                </View>

                <View style={{width: "80%", backgroundColor: "rgba(255,255,255, 0.5)", height: 1, alignSelf: "center", marginVertical: 10}}></View>

                <View  style={{...styles.horizontalStack, marginHorizontal: 40}} >
                    <TouchableOpacity onPress={() => {navigation.navigate(pages.TripLogsEdit, {log: route.params.log, trip: route.params.trip})}} style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/settings.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/delete.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}
