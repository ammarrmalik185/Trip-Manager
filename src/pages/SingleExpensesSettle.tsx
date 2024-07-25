import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React from "react";
import {TripLogListItem} from "../components/TripLogListItem.tsx";
import log from "../types/log.ts";
import {trip} from "../types/trip.ts";
import {useFocusEffect} from "@react-navigation/native";
import {singleExpense} from "../types/singleExpense.ts";
import {TripListItem} from "../components/TripListItem.tsx";
import {SingleExpensesListItem} from "../components/SingleExpenseListItem.tsx";
import settlementCalculator from "../helpers/settlementCalculator.ts";
import expense from "../types/expense.ts";
import TripExpenseSettlementListItem from "../components/TripExpenseSettlementListItem.tsx";

export default function SingleExpensesSettle({route, navigation}:{route:any, navigation:any}){
    let settlementManager = new settlementManager([route.params.singleExpense.getCalculatedExpense()]);
    console.log(route.params.singleExpense)
    return (
        <View style={styles.main}>
            <View style={styles.main}>
                <FlatList
                    style={styles.flatList}
                    data={settlementManager.settlements}
                    renderItem={TripExpenseSettlementListItem}
                />
            </View>
        </View>
    );
}
