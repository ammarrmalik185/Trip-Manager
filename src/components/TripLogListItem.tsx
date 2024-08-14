import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import log from "../types/log.ts";
import LinearGradient from "react-native-linear-gradient";
import {palette} from "../styles/colors.ts";

const formatter = new Intl.DateTimeFormat('en-PK', { timeStyle: 'short', dateStyle: 'short' });

let isEven: boolean = false;

export function TripLogListItem({item, navigation, trip}: {item: log, navigation: any, trip: trip}){
    isEven = !isEven;
    return  <TouchableOpacity style={styles.logListItem} onPress={() => {
        navigation.navigate(pages.TripLogsDetails, {trip: trip, log: item})
    }}>
        {isEven && <LinearGradient colors={[palette.card, palette.card]} style={{...StyleSheet.absoluteFillObject}} start={{x:1,y:0}} end={{x:1,y:0}}/>}
        <Image style={styles.logListItemImage} source={require("../images/uiImages/logListIcon.png")}/>
        {/*<Text style={styles.logListText}>{item.date.toLocaleTimeString()}</Text>*/}
        <View style={styles.verticalStack}>
            <View style={styles.horizontalStack}>
                <Text style={styles.logListText}>{item.title}</Text>
                <Text style={styles.iconText}>  |  </Text>
                <View style={styles.logHorizontalStack}>
                    <Image style={styles.logListItemSubimage} source={require("../images/uiImages/location.png")}/>
                    <Text style={styles.iconText}>{item.location}</Text>
                </View>
            </View>
            <View style={styles.horizontalStack}>
                <Text style={styles.logListText}>{formatter.format(item.date)}</Text>
                <Text style={styles.iconText}>  |  </Text>
                <View style={styles.logHorizontalStack}>
                    <Image style={styles.logListItemSubimage} source={require("../images/uiImages/odo.png")}/>
                    <Text style={styles.iconText}>{item.distance_traveled} kms</Text>
                </View>
            </View>
        </View>

    </TouchableOpacity>;
}
