import {LeafletView, MapMarker, MapShape, MapShapeType} from "react-native-leaflet-view";
import styles from "../styles/styles.ts";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import log from "../types/log.ts";
import {palette} from "../styles/colors.ts";
import {geoLog} from "../types/geoLog.ts";
import {AnimationType, LatLng, MapMarkerAnimation, Point} from "react-native-leaflet-view/src/LeafletView/types.ts";
import Geolocation from "react-native-geolocation-service";

export default function TripLogsFullscreenMap({route, navigation} : any){

    function getMapMarkers(): MapMarker[]{
        return route.params.trip.logs.sort((a: log, b: log) => new Date(a.date).getTime() - new Date(b.date).getTime()).filter((lg: log) => lg.geoLocation).map((lg: log, index: number) => {
            return {
                position: lg.geoLocation,
                icon: '<div style="text-align: center">🔶<p style="font-size: 10px; margin-top: 0; padding-top: 0; text-align: center">' + lg.title + '</p><span style="position: absolute; left: 0; right: 0; top: 2px; bottom: 0; font-size: 12px">' + (index + 1) + '</span></div>',
                size: [15, 15]
            }
        });
    }

    function getMapLine() : MapShape {
        const markerPoints = route.params.trip.geoLogs.concat(route.params.trip.logs).sort((a: geoLog, b: geoLog) => new Date(a.date).getTime() - new Date(b.date).getTime());
        const points = markerPoints.filter((m: geoLog) => m.geoLocation).map((m: geoLog) => {return {lat: m.geoLocation.lat, lng: m.geoLocation.lng}});
        return  {shapeType: MapShapeType.POLYLINE, color: palette.primary, positions: points, id: '1'}
    }

    function getMapPoints(): MapShape[]{
        return route.params.trip.geoLogs.filter((lg: geoLog) => lg.geoLocation).map((lg: geoLog) => {
            return {
                shapeType: MapShapeType.CIRCLE,
                center: lg.geoLocation,
                radius: 5,
                color: palette.secondary,
                id: lg.id,
            }
        });
    }

    const mapMarkers: MapMarker[] = getMapMarkers();

    return (
        <View style={{flex: 1}}>
            {(mapMarkers.length > 0) && <LeafletView
                mapCenterPosition={mapMarkers[0].position || route.params.trip.geoLogs[0].location}
                mapMarkers={mapMarkers}
                mapShapes={[getMapLine(), ...getMapPoints()]}
                doDebug={false}
            />}
            <View style={{...StyleSheet.absoluteFillObject}}>
                <View style={styles.mapLegend}>
                    <Text style={styles.mapLegendHeader}>Legend</Text>
                    <Text style={styles.mapLegendText}>🔶 Log Location</Text>
                    <Text style={styles.mapLegendText}>🔷 Current Log Location</Text>
                </View>
            </View>
        </View>
    );
}
