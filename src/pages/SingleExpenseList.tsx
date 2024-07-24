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

export default function SingleExpenseList({route, navigation}:{route:any, navigation:any}){
    const [singleExpenses, setSingleExpenses] = React.useState<singleExpense[]>([]);

    useFocusEffect(() => {
        singleExpense.loadSingleExpenses((data: singleExpense[]) => {
            const sortedExpenses = data.sort((a: singleExpense, b: singleExpense) => {
                return new Date(b.date.from).getTime() - new Date(a.date.from).getTime();
            });
            setSingleExpenses(sortedExpenses);
        });
    });

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
