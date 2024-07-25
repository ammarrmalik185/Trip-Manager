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
import memberAmount from "../types/memberAmount.ts";

export default function SingleExpenseOverview({route, navigation}:{route:any, navigation:any}){
    return (
        <View style={styles.main}>
            <Text style={styles.title}>{route.params.singleExpense.title}</Text>
            <Text style={styles.subTitle}>{route.params.singleExpense.category}</Text>
            <Text style={styles.itemText}>{route.params.singleExpense.description}</Text>
            <Text style={styles.dateDisplay}>{route.params.singleExpense.date.toLocaleDateString()}</Text>
            <Text style={styles.dateDisplay}>Amount: {route.params.singleExpense.amount}</Text>
            <Text style={styles.dateDisplay}>Category: {route.params.singleExpense.category}</Text>
            <Text style={styles.dateDisplay}>Members: {route.params.singleExpense.members.length}</Text>
            <Text style={styles.dateDisplay}>Payers: {route.params.singleExpense.payers.filter((i: memberAmount) => i.amount != 0).map((p:memberAmount) => p.member.name).join(", ")}</Text>
            <Text style={styles.dateDisplay}>Spenders: {route.params.singleExpense.spenders.filter((i: memberAmount) => i.amount != 0).map((p:memberAmount) => p.member.name).join(", ")}</Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.SingleExpensesEdit, {singleExpense: route.params.singleExpense})}>
                    <Text style={styles.acceptButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.SingleExpensesSettle, {singleExpense: route.params.singleExpense})}>
                    <Text style={styles.acceptButtonText}>Settle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton} onPress={() => {
                    route.params.singleExpense.deleteSingleExpense().then(() => {
                        navigation.navigate(pages.SingleExpensesList);
                    }).catch(console.error);
                }}>
                    <Text style={styles.acceptButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
