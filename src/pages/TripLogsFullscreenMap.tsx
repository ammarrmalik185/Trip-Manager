import {
    LeafletView,
    MapMarker,
    MapShape,
    MapShapeType,
    MapMarkerAnimation,
    AnimationType, OwnPositionMarker, INFINITE_ANIMATION_ITERATIONS
} from "react-native-leaflet-view";
import styles from "../styles/styles.ts";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import log from "../types/log.ts";
import {palette} from "../styles/colors.ts";
import Geolocation from "react-native-geolocation-service";
import {Logger} from "../helpers/Logger.ts";

export default function TripLogsFullscreenMap({route, navigation} : any){

    const [ownLocation, setOwnLocation] = React.useState<{lat: number, lng: number} | null>(null);
    const [centerLocation, setCenterLocation] = React.useState<{lat: number, lng: number} | null>(null);
    const [mapMarkers, setMapMarkers] = React.useState<MapMarker[]>(getMapMarkers() || []);

    // useEffect(() => {
    //     const watchId = Geolocation.watchPosition(position => {
    //         setOwnLocation({lat: position.coords.latitude, lng: position.coords.longitude});
    //         if (centerLocation === null) setCenterLocation(ownLocation);
    //     }, Logger.error, { enableHighAccuracy: true, distanceFilter: 0, interval: 1000, fastestInterval: 1000 });
    //     return () => {
    //         Geolocation.clearWatch(watchId);
    //     }
    // }, []);

    useEffect(() => {
        Geolocation.getCurrentPosition(position => {
            setOwnLocation({lat: position.coords.latitude, lng: position.coords.longitude});

            setCenterLocation(mapMarkers.length > 0 ? mapMarkers[mapMarkers.length-1].position : ownLocation || {lat: 0, lng: 0});
        }, Logger.error, { enableHighAccuracy: true });
    }, []);

    function getMapMarkers(): MapMarker[]{
        return route.params.trip.logs.filter((lg: log) => lg.geoLocation).map((lg: log) => {
            return {
                position: lg.geoLocation,
                icon: '<div style="text-align: center">🔶<p style="font-size: 10px; margin-top: 0; padding-top: 0; text-align: center">' + lg.title + '</p></div>',
                size: [15, 15]
            }
        });
    }

    function getMapLine() : MapShape {
        const points = mapMarkers.filter((m: MapMarker) => m.position).map((m: MapMarker) => {return {lat: m.position.lat - 0.0003, lng: m.position.lng}});
        return  {shapeType: MapShapeType.POLYLINE, color: palette.primary, positions: points, id: '1'}
    }

    return (
        <View style={{flex: 1}}>
            <LeafletView
                mapCenterPosition={centerLocation}
                mapMarkers={mapMarkers}
                ownPositionMarker={{id: "1", position: ownLocation, icon: '🔵', size: [15, 15], animation: {type: AnimationType.FADE, iterationCount: 1} as MapMarkerAnimation}}
                mapShapes={[getMapLine()]}
                doDebug={false}
            />

            <View style={{...StyleSheet.absoluteFillObject}}>
                <View style={styles.mapLegend}>
                    <Text style={styles.mapLegendHeader}>Legend</Text>
                    <Text style={styles.mapLegendText}>🔵 Own Location</Text>
                    <Text style={styles.mapLegendText}>🔶 Log Location</Text>
                    <Text style={styles.mapLegendText}>🔷 Current Log Location</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.fab} onPress={() => setCenterLocation(ownLocation)}>
                <Text style={styles.fabText}>🔵</Text>
            </TouchableOpacity>

        </View>
    );
}
