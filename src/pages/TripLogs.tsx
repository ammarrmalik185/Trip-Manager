import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React, {useEffect} from "react";
import {TripLogListItem} from "../components/TripLogListItem.tsx";
import {BackgroundGeolocationManager} from "../helpers/BackgroundGeolocationManager.ts";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import log from "../types/log.ts";
import Geolocation from "react-native-geolocation-service";
import {geoLog} from "../types/geoLog.ts";
import { RequestDisableOptimization, BatteryOptEnabled } from "@saserinn/react-native-battery-optimization-check";
import Toast from "react-native-simple-toast";

export default function TripLogs({route, navigation}:{route:any, navigation:any}){

    const [modalVisible, setModalVisible] = React.useState<boolean>(false);
    const [modal2Visible, setModal2Visible] = React.useState<boolean>(false);

    return (
        <View style={styles.main}>
            <PopupModal state={modalVisible} modalData={new ModalData(ModalType.Information, "For uninterrupted location tracking, disable battery optimization", () => {
                setModalVisible(false);
                RequestDisableOptimization();
            })}/>
            <PopupModal state={modal2Visible} modalData={new ModalData(ModalType.PickAButton, "Add a point or start logging in the background?", (confirm: boolean, option: number) => {
                setModal2Visible(false);
                if (confirm){
                    if (option === 0 || option === 2){
                         Geolocation.getCurrentPosition((position) => {
                            const {latitude, longitude} = position.coords;
                            route.params.trip.geoLogs.push(new geoLog(new Date(Date.now()), latitude, longitude));
                            route.params.trip.saveTrip();
                        })
                        Toast.show("Added point", Toast.SHORT);
                    }
                    if (option === 1 || option === 2){
                        BatteryOptEnabled().then(setModalVisible);
                        BackgroundGeolocationManager.startBackgroundTracking(route.params.trip);
                        Toast.show("Started Tracking", Toast.SHORT);
                    }
                }
            }, ["Add point", "Start tracking in the background", "Both"])}/>
            <FlatList
                style={styles.flatList}
                data={route.params.trip.logs.sort((a:log,b:log) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                renderItem={(data) => <TripLogListItem item={data.item} navigation={navigation} trip={route.params.trip}/>}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate(pages.TripLogsCreate, {trip: route.params.trip})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabLeft} onPress={() => navigation.navigate(pages.TripLogsFullscreenMap, {trip: route.params.trip})}>
                <Text style={styles.fabText}>🗺️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabTopSmall} onPress={() => setModal2Visible(true)}>
                <Text style={{...styles.fabText, fontSize: 10}}>🟢</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabTopSmall2} onPress={() => BackgroundGeolocationManager.stopBackgroundTracking()}>
                <Text style={{...styles.fabText, fontSize: 10}}>🔴</Text>
            </TouchableOpacity>
        </View>
    );
}
