import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import React from "react";
import {TripLogListItem} from "../components/TripLogListItem.tsx";

export default function TripLogs({route, navigation}:{route:any, navigation:any}){
    return (
        <View style={styles.main}>
            <FlatList
                data={route.params.trip.logs}
                renderItem={(data) => <TripLogListItem item={data.item} navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate(Pages.TripLogsCreate, {trip: route.params.trip})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
