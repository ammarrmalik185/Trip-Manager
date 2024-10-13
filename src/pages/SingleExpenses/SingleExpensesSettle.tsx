import {FlatList, View} from "react-native";
import styles from "../../styles/styles.ts";
import React from "react";
import SettlementCalculator from "../../helpers/SettlementCalculator.ts";
import TripExpenseSettlementListItem from "../../components/TripExpenseSettlementListItem.tsx";

export default function SingleExpensesSettle({route, navigation}: { route: any, navigation: any }) {
    let settlementCalculator = new SettlementCalculator([route.params.singleExpense.getCalculatedExpense()]);
    console.log(route.params.singleExpense)
    return (
        <View style={styles.main}>
            <View style={styles.main}>
                <FlatList
                    style={styles.flatList}
                    data={settlementCalculator.settlements}
                    renderItem={TripExpenseSettlementListItem}
                />
            </View>
        </View>
    );
}
