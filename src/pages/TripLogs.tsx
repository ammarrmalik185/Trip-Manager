import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React from "react";
import {TripLogListItem} from "../components/TripLogListItem.tsx";
import log from "../types/log.ts";

export default function TripLogs({route, navigation}:{route:any, navigation:any}){
    return (
        <View style={styles.main}>
            <FlatList
                style={styles.flatList}
                data={route.params.trip.logs.sort((a:log,b:log) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                renderItem={(data) => <TripLogListItem item={data.item} navigation={navigation} trip={route.params.trip}/>}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate(pages.TripLogsCreate, {trip: route.params.trip})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
