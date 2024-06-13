import {FlatList, ScrollView, Text, View} from "react-native";
import expense from "../types/expense.ts";
import styles from "../styles/styles.ts";
import memberAmount from "../types/memberAmount.ts";
import offset from "../types/offset.ts";
import TripExpenseAmountListItem from "../components/TripExpenseAmountListItem.tsx";
import member from "../types/member.ts";
import SettlementManager from "../helpers/SettlementManager.ts";
import TripExpenseSettlementListItem from "../components/TripExpenseSettlementListItem.tsx";
import {expenseTypes} from "../types/expensetypes.ts";

export default function TripExpensesComputed({navigation, route}: any){

    let settlementManager = new SettlementManager(route.params.trip.expenses.map((exp: expense) => exp.getCalculatedExpense()));

    return (
        <ScrollView style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.subTitle}>Paid</Text>
                <FlatList
                    style={styles.flatList}
                    data={route.params.trip.members.map((member: member) => {
                        return {
                            member: member,
                            amount: route.params.trip.expenses
                                .filter((exp: expense) => exp.payers.find(p => p.member.id == member.id))
                                .reduce((acc: any, exp: expense) => acc + exp.payers.find(m => m.member.id == member.id)?.amount ?? 0, 0)
                        }
                    }).filter((item: memberAmount) => item.amount != 0)}
                    renderItem={TripExpenseAmountListItem}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.subTitle}>Spended</Text>
                <FlatList
                    style={styles.flatList}
                    data={route.params.trip.members.map((member: member) => {
                        return {
                            member: member,
                            amount: route.params.trip.expenses.filter((exp: expense) => exp.getCalculatedExpense().spenders.find(p => p.member.id == member.id)).reduce((acc: any, exp: expense) => acc + exp.getCalculatedExpense().spenders.find(p => p.member.id == member.id)?.amount, 0)
                        }
                    }).filter((item: memberAmount) => item.amount != 0)}
                    renderItem={TripExpenseAmountListItem}
                />
            </View>
            <View style={styles.container}>
                <Text style={styles.subTitle}>Offsets</Text>
                <FlatList
                    style={styles.flatList}
                    data={settlementManager.offsets}
                    renderItem={TripExpenseAmountListItem}
                />
            </View>

            <View style={styles.container}>
                <Text style={styles.subTitle}>Category Expenses</Text>
                <FlatList
                    style={styles.flatList}
                    data={expenseTypes.map((category: any) => {
                        let mem = new member();
                        mem.name = category.value;
                        return {
                            member: mem,
                            amount: route.params.trip.expenses.filter((exp: expense) => exp.category == category.value).reduce((acc: any, exp: expense) => acc + exp.amount, 0)
                        }
                    }).filter((item: memberAmount) => item.amount != 0)}
                    renderItem={TripExpenseAmountListItem}
                />
            </View>
        </ScrollView>
    )
}
