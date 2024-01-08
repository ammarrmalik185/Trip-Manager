import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import expense from "../types/expense.ts";

export default function TripExpensesDetails({route, navigation}: any){
    return <View>
        <Text>TripExpensesDetails</Text>
        <Text>Index: {route.params.index}</Text>
        <Text>Expense: {route.params.expense.title}</Text>
        <TouchableOpacity style={styles.acceptButton} onPress={() => {navigation.navigate(Pages.TripExpensesEdit, {expense: route.params.expense, trip: route.params.trip})}}>
            <Text style={styles.acceptButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.acceptButton} onPress={() => {
            route.params.trip.expenses = route.params.trip.expenses.filter((exp: expense) => exp.id != route.params.expense.id);
            navigation.navigate(Pages.TripExpenses, {trip: route.params.trip})
        }}>
            <Text style={styles.acceptButtonText}>Delete</Text>
        </TouchableOpacity>
    </View>;
}
