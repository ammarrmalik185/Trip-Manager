import {Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import expense from "../types/expense.ts";

let image = require("");

export function TripExpenseListItem({item, navigation, trip}: {item: expense, navigation: any, trip: trip}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(pages.TripExpensesDetails, {expense: item, trip: trip})
    }}>
        <View style={styles.horizontalStack}>
            <Text style={styles.itemsHeader}>{item.title}</Text>
            <Text style={styles.itemsHeaderRight}>Rs {item.amount.toLocaleString()}</Text>
        </View>
        <Text style={styles.date}>{item.date.toLocaleString()} | {item.category}</Text>
    </TouchableOpacity>;
}

