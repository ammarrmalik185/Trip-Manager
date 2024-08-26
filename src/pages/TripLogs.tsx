import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React from "react";
import {TripLogListItem} from "../components/TripLogListItem.tsx";
import {BackgroundGeolocationManager} from "../helpers/BackgroundGeolocationManager.ts";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import log from "../types/log.ts";

export default function TripLogs({route, navigation}:{route:any, navigation:any}){
    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [modal2Visible, setModal2Visible] = React.useState<boolean>(false);
    return (
        <View style={styles.main}>
            <PopupModal state={modalVisible} modalData={new ModalData(ModalType.Information, "In order to let the app record in background, you need to enable location tracking in the settings to 'All the time'. For more accurate and uninterrupted working, also disable battery optimization", () => {
                setModalVisible(false);
                BackgroundGeolocationManager.startBackgroundTracking(route.params.trip);
            })}/>
            <PopupModal state={modal2Visible} modalData={new ModalData(ModalType.PickAButton, "Add a point or start logging in the background?", () => {
                setModal2Visible(false);
                BackgroundGeolocationManager.startBackgroundTracking(route.params.trip);
            })}/>
            <FlatList
                style={styles.flatList}
                data={route.params.trip.logs.sort((a:log,b:log) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                renderItem={(data) => <TripLogListItem item={data.item} navigation={navigation} trip={route.params.trip}/>}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate(pages.TripLogsCreate, {trip: route.params.trip})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabTop} onPress={() => navigation.navigate(pages.TripLogsFullscreenMap, {trip: route.params.trip})}>
                <Text style={styles.fabText}>🗺️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabLeft} onPress={() => setModalVisible(true)}>
                <Text style={{...styles.fabText, fontSize: 10}}>🟢</Text>
            </TouchableOpacity>
        </View>
    );
}
