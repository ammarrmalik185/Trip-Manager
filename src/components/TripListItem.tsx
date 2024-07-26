import {Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";

export function TripListItem({item, navigation}: {item: trip, navigation: any}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(pages.TripOverview, {trip: item})
    }}>
        <Text style={styles.itemsHeader}>{item.title}</Text>
        <Text style={styles.date}>{item.date.from.toLocaleString()}</Text>
        <View style={styles.rightBox}>
            <Text style={styles.rightBoxMain}>{item.members.length}</Text>
            <Text style={styles.rightBoxSub}>People</Text>
        </View>
    </TouchableOpacity>;
}

