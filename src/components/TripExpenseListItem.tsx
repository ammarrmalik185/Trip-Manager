import {Button, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import expense from "../types/expense.ts";

export function TripExpenseListItem({item, navigation}: {item: expense, navigation: any}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(Pages.TripExpensesDetails, {trip: item})
    }}>
        <Text style={styles.itemsHeader}>{item.title}</Text>
        <Text style={styles.date}>{item.amount}</Text>
    </TouchableOpacity>;
}

