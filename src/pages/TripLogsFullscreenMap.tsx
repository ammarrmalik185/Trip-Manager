import {LeafletView, MapMarker, MapShape, MapShapeType} from "react-native-leaflet-view";
import styles from "../styles/styles.ts";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import log from "../types/log.ts";
import {palette} from "../styles/colors.ts";

export default function TripLogsFullscreenMap({route, navigation} : any){

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

    const mapMarkers: MapMarker[] = getMapMarkers();

    return (
        <View style={{flex: 1}}>
            {mapMarkers.length > 0 && <LeafletView
                mapCenterPosition={mapMarkers[0].position}
                mapMarkers={mapMarkers}
                mapShapes={[getMapLine()]}
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