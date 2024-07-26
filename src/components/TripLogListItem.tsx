import {Text, TouchableOpacity} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import log from "../types/log.ts";

export function TripLogListItem({item, navigation, trip}: {item: log, navigation: any, trip: trip}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(pages.TripLogsDetails, {trip: trip, log: item})
    }}>
        <Text style={styles.itemsHeader}>{item.title}</Text>
        <Text style={styles.date}>{item.date.toLocaleString()}</Text>
    </TouchableOpacity>;
}

