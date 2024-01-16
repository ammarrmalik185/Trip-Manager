import { FlatList, View } from "react-native";
import expense from "../types/expense.ts";
import styles from "../styles/styles.ts";
import memberAmount from "../types/memberAmount.ts";
import settlement from "../types/settlement.ts";
import TripExpenseSettlementsListItem from "../components/TripExpenseSettlementsListItem.tsx";
import member from "../types/member.ts";

export default function TripExpensesSettle({navigation, route}: any){
    let calculations = route.params.trip.expenses.map((item:expense) => item.calculate())
    let settlements: settlement[] = [];

    calculations.forEach((calc: memberAmount[], calcIndex: number) => {
        let expenseRef = route.params.trip.expenses[calcIndex] as expense;
        calc.forEach((singleCalc: memberAmount) => {
            let foundSettlement = settlements.find(settlement => settlement.member.id == singleCalc.member.id);
            if (foundSettlement){
                foundSettlement.addExpense(expenseRef, singleCalc.amount);
            }else{
                let newSettlement = new settlement(route.params.trip.members.find((mem:member) => mem.id == singleCalc.member.id), 0)
                newSettlement.addExpense(expenseRef, singleCalc.amount);
                settlements.push(newSettlement)
            }
        })
    })

    return (
        <View style={styles.main}>
            <FlatList
                style={styles.flatList}
                data={settlements}
                renderItem={TripExpenseSettlementsListItem}
            />
        </View>
    )
}
