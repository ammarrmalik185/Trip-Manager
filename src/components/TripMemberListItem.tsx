import {Text, TouchableOpacity} from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import member from "../types/member.ts";

export function TripMemberListItem({item, navigation, trip}: {item: member, navigation: any, trip: trip}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(Pages.TripMembersDetails, {trip: trip, member: item})
    }}>
        <Text style={styles.itemsHeader}>{item.name}</Text>
    </TouchableOpacity>;
}

