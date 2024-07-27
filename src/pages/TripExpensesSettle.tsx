import {FlatList, View} from "react-native";
import expense from "../types/expense.ts";
import styles from "../styles/styles.ts";
import TripExpenseSettlementListItem from "../components/TripExpenseSettlementListItem.tsx";
import SettlementCalculator from "../helpers/SettlementCalculator.ts";

export default function TripExpensesSettle({navigation, route}: any){

    let settlementCalculator = new SettlementCalculator(route.params.trip.expenses.map((exp: expense) => exp.getCalculatedExpense()));

    return (
        <View style={styles.main}>
            <FlatList
                style={styles.flatList}
                data={settlementCalculator.settlements}
                renderItem={TripExpenseSettlementListItem}
            />
        </View>
    )
}
