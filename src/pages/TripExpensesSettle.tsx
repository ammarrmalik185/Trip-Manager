import { FlatList, View } from "react-native";
import expense from "../types/expense.ts";
import styles from "../styles/styles.ts";
import memberAmount from "../types/memberAmount.ts";
import offset from "../types/offset.ts";
import TripExpenseAmountListItem from "../components/TripExpenseAmountListItem.tsx";
import member from "../types/member.ts";
import SettlementManager from "../helpers/SettlementManager.ts";
import TripExpenseSettlementListItem from "../components/TripExpenseSettlementListItem.tsx";

export default function TripExpensesSettle({navigation, route}: any){

    let settlementManager = new SettlementManager(route.params.trip.expenses.map((exp: expense) => exp.getCalulatedExpense()));

    return (
        <View style={styles.main}>
            <FlatList
                style={styles.flatList}
                data={settlementManager.settlements}
                renderItem={TripExpenseSettlementListItem}
            />
        </View>
    )
}
