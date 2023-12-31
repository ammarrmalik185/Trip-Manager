import {Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import member from "../types/member.ts";

export function TripMemberListItem({item, navigation}: {item: member, navigation: any}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(Pages.TripMembersDetails, {trip: item})
    }}>
        <Text style={styles.itemsHeader}>{item.name}</Text>
    </TouchableOpacity>;
}

