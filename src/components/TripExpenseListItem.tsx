import {Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import expense from "../types/expense.ts";

export function TripExpenseListItem({item, navigation, trip}: {item: expense, navigation: any, trip: trip}){
    console.log(item);
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(Pages.TripExpensesDetails, {expense: item, trip: trip})
    }}>
        <Text style={styles.itemsHeader}>{item.title}</Text>
        <Text style={styles.date}>{item.amount}</Text>
        <Text>{trip.title}</Text>
    </TouchableOpacity>;
}

