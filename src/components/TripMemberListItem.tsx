import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import member from "../types/member.ts";

export function TripMemberListItem({item, navigation, trip}: {item: member, navigation: any, trip: trip}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(pages.TripMembersDetails, {trip: trip, member: item})
    }}>
        <View style={styles.horizontalStack}>
            <Image style={styles.memberImageSmall} source={require("../images/uiImages/defaultUserImage.jpg")}/>
            <View style={{width: "70%"}}>
                <Text style={styles.memberListHeader}>{item.name}</Text>
                <Text style={styles.memberListSubHeader}>ammarrmalik185@hotmail.com</Text>
                <Text style={styles.memberListSubHeader}>+923349564896</Text>
            </View>
            <View>
                <Text style={styles.memberGreenSideText}>300</Text>
                <Text style={styles.memberRedSideText}>-500</Text>
            </View>
        </View>
    </TouchableOpacity>;
}

