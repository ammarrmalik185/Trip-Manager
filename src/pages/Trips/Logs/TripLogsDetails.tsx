import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import styles from "../../../styles/styles.ts";
import pages from "../../../types/pages.ts";
import log from "../../../types/log.ts";
import React from "react";
import PopupModal, {ModalData, ModalType} from "../../../components/PopupModal.tsx";
import {palette} from "../../../styles/colors.ts";
import {LeafletView, MapMarker, MapShape, MapShapeType} from "react-native-leaflet-view";

export default function TripLogsDetails({route, navigation}: any) {

    const [modalVisible, setModalVisible] = React.useState(false);

    function getMapMarkers(): MapMarker[] {
        return route.params.trip.logs.filter((lg: log) => lg.geoLocation).map((lg: log) => {
            if (lg.id == route.params.log.id) {
                return {
                    position: lg.geoLocation,
                    icon: '<div style="text-align: center">🔷<p style="font-size: 10px; margin-top: 0; padding-top: 0; text-align: center">' + lg.title + '</p></div>',
                    size: [15, 15]
                }
            }
            return {
                position: lg.geoLocation,
                icon: '<div style="text-align: center">🔶<p style="font-size: 10px; margin-top: 0; padding-top: 0; text-align: center">' + lg.title + '</p></div>',
                size: [15, 15]
            }
        });
    }

    function getMapLine(): MapShape {
        const points = mapMarkers.filter((m: MapMarker) => m.position).map((m: MapMarker) => {
            return {lat: m.position.lat - 0.0003, lng: m.position.lng}
        });
        return {shapeType: MapShapeType.POLYLINE, color: palette.primary, positions: points, id: '1'}
    }

    function getPrevAndNextLogs() {
        const logs = route.params.trip.logs;
        let prev = null;
        let next = null;
        for (let i = 0; i < logs.length; i++) {
            if (logs[i].id == route.params.log.id) {
                if (i > 0) {
                    prev = logs[i - 1];
                }
                if (i < logs.length - 1) {
                    next = logs[i + 1];
                }
                break;
            }
        }
        return {prev, next};
    }

    const mapMarkers: MapMarker[] = getMapMarkers();
    const {prev, next} = getPrevAndNextLogs();

    return (
        <View style={styles.main}>
            <PopupModal state={modalVisible}
                        modalData={new ModalData(ModalType.SoftConfirmation, "Are you sure you want to delete this log?", (confirm: boolean) => {
                            if (confirm) {
                                route.params.trip.logs = route.params.trip.logs.filter((lg: log) => lg.id != route.params.log.id);
                                route.params.trip.saveTrip()
                                navigation.navigate(pages.TripLogs, {trip: route.params.trip})
                            }
                            setModalVisible(false);
                        })}/>

            <View style={{height: "30%"}}>
                <Text style={{
                    ...styles.title,
                    marginBottom: 5,
                    paddingBottom: 0,
                    maxHeight: "30%"
                }}>{route.params.log.title}</Text>
                <Text style={{
                    ...styles.description,
                    marginTop: 0,
                    paddingTop: 0,
                    maxHeight: "30%"
                }}>{route.params.log.description}</Text>
                <View style={{...styles.bottom}}>
                    <View style={styles.horizontalStack}>
                        <View style={styles.iconTextGroup}>
                            <Image
                                source={require('../../../images/uiImages/location.png')}
                                style={styles.icon}
                            />
                            <Text
                                style={styles.iconText}>{route.params.log.location != "" ? route.params.log.location : "No Location"}</Text>
                        </View>
                        <View style={styles.iconTextGroup}>
                            <Image
                                source={require('../../../images/uiImages/calender.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.iconText}>{route.params.log.date.toLocaleTimeString()}</Text>
                            <Text style={styles.iconText}>{route.params.log.date.toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.iconTextGroup}>
                            <Image
                                source={require('../../../images/uiImages/odo.png')}
                                style={styles.icon}
                            />
                            <Text style={styles.iconText}>{route.params.log.distance_traveled} kms</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/*<View style={{height: 10}}/>*/}
            <View style={{height: "55%"}}>
                <View style={{...styles.horizontalStack, height: "100%"}}>
                    <TouchableOpacity style={{opacity: prev ? 1 : 0.2, padding: 10}} onPress={() => {
                        if (prev) navigation.navigate(pages.TripLogsDetails, {trip: route.params.trip, log: prev})
                    }}><Text style={styles.itemText}>{"⟪"}</Text></TouchableOpacity>
                    {route.params.log.geoLocation && <View style={styles.mapLarge}>
                        <LeafletView
                            mapCenterPosition={route.params.log.geoLocation}
                            mapMarkers={mapMarkers}
                            mapShapes={[getMapLine()]}
                            doDebug={false}
                        />
                        <View style={{...StyleSheet.absoluteFillObject}}>
                            <View style={styles.mapLegend}>
                                <Text style={styles.mapLegendHeader}>Legend</Text>
                                <Text style={styles.mapLegendText}>🔶 Log Location</Text>
                                <Text style={styles.mapLegendText}>🔷 Current Log Location</Text>
                            </View>
                        </View>
                    </View>}
                    {!route.params.log.geoLocation && <View style={styles.mapLarge}>
                        <View style={{backgroundColor: "rgba(0,0,0,0.5)", ...StyleSheet.absoluteFillObject}}/>
                        <View
                            style={{alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject}}>
                            <Image
                                source={require('../../../images/uiImages/no-location.png')}
                                style={{width: 100, height: 100, marginBottom: 30}}/>
                            <Text style={styles.subTitle}>No Geo location</Text>
                        </View>
                    </View>}
                    <TouchableOpacity style={{opacity: next ? 1 : 0.2, padding: 10}} onPress={() => {
                        if (next) navigation.navigate(pages.TripLogsDetails, {trip: route.params.trip, log: next})
                    }}><Text style={styles.itemText}>{"⟫"}</Text></TouchableOpacity>
                </View>
            </View>
            <View style={{height: "15%"}}>
                <View style={{height: 20}}/>

                <View style={{...styles.horizontalStack, marginHorizontal: 40}}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(pages.TripLogsEdit, {log: route.params.log, trip: route.params.trip})
                    }} style={styles.iconTextGroup}>
                        <Image
                            source={require('../../../images/uiImages/settings.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Edit Log</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconTextGroup}>
                        <Image
                            source={require('../../../images/uiImages/delete.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Delete Log</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
