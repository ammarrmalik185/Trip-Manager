import {Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import log from "../types/log.ts";

export function TripLogListItem({item, navigation}: {item: log, navigation: any}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(Pages.TripLogsDetails, {trip: item})
    }}>
        <Text style={styles.itemsHeader}>{item.title}</Text>
        <Text style={styles.date}>{item.date.toLocaleDateString()}</Text>
    </TouchableOpacity>;
}

