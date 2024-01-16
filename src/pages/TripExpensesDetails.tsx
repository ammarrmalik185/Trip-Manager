import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import expense from "../types/expense.ts";

export default function TripExpensesDetails({route, navigation}: any){
    return <View style={styles.main}>
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {navigation.navigate(pages.TripExpensesEdit, {expense: route.params.expense, trip: route.params.trip})}}>
                <Text style={styles.acceptButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton} onPress={() => {
                route.params.trip.expenses = route.params.trip.expenses.filter((exp: expense) => exp.id != route.params.expense.id);
                navigation.navigate(pages.TripExpenses, {trip: route.params.trip})
            }}>
                <Text style={styles.acceptButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    </View>;
}
