import {FlatList, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React, {useEffect} from "react";
import {TripLogListItem} from "../components/TripLogListItem.tsx";
import log from "../types/log.ts";
import {trip} from "../types/trip.ts";
import {useFocusEffect} from "@react-navigation/native";
import {singleExpense} from "../types/singleExpense.ts";
import {TripListItem} from "../components/TripListItem.tsx";
import {SingleExpensesListItem} from "../components/SingleExpenseListItem.tsx";
import {sin} from "react-native-ui-datepicker/lib/typescript/src/components/TimePicker/AnimatedMath";

export default function SingleExpenseList({route, navigation}:{route:any, navigation:any}){
    const [singleExpenses, setSingleExpenses] = React.useState<singleExpense[]>([]);

    useFocusEffect(
      React.useCallback(() => {
        singleExpense.loadSingleExpenses((data: singleExpense[]) => {
            const sortedExpenses = data.sort((a: singleExpense, b: singleExpense) => {
                return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
            setSingleExpenses(sortedExpenses);
        });
      }, [setSingleExpenses])
    );

    return (
        <SafeAreaView style={styles.main}>
            <FlatList
                style={styles.flatList}
                data = {singleExpenses}
                renderItem={(data) => <SingleExpensesListItem item={data.item} navigation={navigation}/>}
                keyExtractor={item => item.id}
                extraData={navigation}/>
            <TouchableOpacity activeOpacity={0.5} style={styles.fab} onPress={() => {navigation.navigate(pages.SingleExpensesCreate)}}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
