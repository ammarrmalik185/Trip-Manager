import {Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";

export function TripListItem({item, navigation}: {item: trip, navigation: any}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(Pages.TripOverview, {trip: item})
    }}>
        <Text style={styles.itemsHeader}>{item.title}</Text>
        <Text style={styles.date}>{item.date.from.toLocaleDateString()} to {item.date.to.toLocaleDateString()}</Text>
    </TouchableOpacity>;
}

