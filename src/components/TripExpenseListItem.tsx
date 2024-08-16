import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import expense from "../types/expense.ts";
import LinearGradient from "react-native-linear-gradient";
import {getExpenseIconImage, getExpenseImage} from "../types/expensetypes.ts";
import {SettingsManager} from "../helpers/SettingsManager.ts";

let image = require("");

export function TripExpenseListItem({item, navigation, trip}: {item: expense, navigation: any, trip: trip}){
    return  <TouchableOpacity style={styles.tripListItem} onPress={() => {
        navigation.navigate(pages.TripExpensesDetails, {expense: item, trip: trip})
    }}>
        <View style={styles.tripListBackground}>
            <Image source={getExpenseImage(item.category)} style={styles.tripListBackgroundImage}/>
            <LinearGradient style={styles.tripListBackgroundImage} colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}/>
        </View>
        <Text style={styles.tripListHeader}>{item.title}</Text>
        <Text style={styles.tripListSubheader}>{SettingsManager.settings.currencySymbol} {item.amount}</Text>
        <Text style={styles.tripListSubheader}>{item.date.toLocaleString()}</Text>
        <View style={styles.rightBox}>
            <Image style={styles.tripListIcon} source={getExpenseIconImage(item.category)}/>
            <Text style={styles.rightBoxSub}>{item.category}</Text>
        </View>
    </TouchableOpacity>;
}

