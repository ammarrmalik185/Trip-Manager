import { Button, Image, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";

export function TripListItem({item, navigation}: {item: trip, navigation: any}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(Pages.TripOverview, {trip: item})
    }}>
        <Text style={styles.itemsHeader}>{item.title}</Text>
        <Text style={styles.date}>{item.date.from.toLocaleDateString()}</Text>
        <View style={{right: 0, width: 70, height: 110, position: "absolute", alignItems: "center", justifyContent: "center"}}>
            <Text style={{textAlign:"center", color: "white", fontSize: 40}}>{item.members.length}</Text>
            <Text style={{textAlign:"center", color: "white"}}>People</Text>
        </View>
    </TouchableOpacity>;
}

