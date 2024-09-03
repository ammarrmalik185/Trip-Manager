import {Image, ImageBackground, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {getTripThemeImage, trip} from "../types/trip.ts";
import LinearGradient from "react-native-linear-gradient";

export function TripListItem({item, navigation}: {item: trip, navigation: any}){
    return  <TouchableOpacity style={styles.tripListItem} onPress={() => {
        navigation.navigate(pages.TripOverview, {trip: item})
    }}>
        <View style={styles.tripListBackground}>
            <Image source={getTripThemeImage(item.theme)} style={styles.tripListBackgroundImage}/>
            <LinearGradient style={styles.tripListBackgroundImage} colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}/>
        </View>
        <Text style={styles.tripListHeader}>{item.title}</Text>
        <Text style={styles.tripListSubheader}>{item.destination}</Text>
        <Text style={styles.tripListSubheader}>{item.date.from.toLocaleString()}</Text>
        <View style={styles.rightBox}>
            {/*<Text style={styles.rightBoxMain}>{item.members.length}</Text>*/}
            <Image style={styles.tripListIcon} source={require("../images/uiImages/personSimple.png")}/>
            <Text style={styles.tripListIconText}>{item.members.length}</Text>
        </View>
    </TouchableOpacity>;
}

