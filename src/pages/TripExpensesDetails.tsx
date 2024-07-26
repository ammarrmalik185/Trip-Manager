import {Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import expense from "../types/expense.ts";

export default function TripExpensesDetails({route, navigation}: any){
    return <View style={styles.main}>
        <Text style={styles.title}>{route.params.expense.title}</Text>
        <Text style={styles.subTitle}>{route.params.expense.category}</Text>
        <Text style={styles.itemText}>{route.params.expense.description}</Text>
        <Text style={styles.dateDisplay}>{route.params.expense.date.toLocaleDateString()}</Text>
        <Text style={styles.dateDisplay}>Amount: {route.params.expense.amount}</Text>
        <Text style={styles.dateDisplay}>Category: {route.params.expense.category}</Text>
        <Text style={styles.dateDisplay}>Payers: {route.params.expense.payers.map((p:any) => p.member.name).join(", ")}</Text>
        <Text style={styles.dateDisplay}>Spenders: {route.params.expense.spenders.map((p:any) => p.member.name).join(", ")}</Text>

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
