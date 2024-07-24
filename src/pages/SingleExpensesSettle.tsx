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

export default function SingleExpensesSettle({route, navigation}:{route:any, navigation:any}){
    return (
        <View style={styles.main}>
            <Text style={styles.title}>{route.params.singleExpense.title}</Text>
            <Text style={styles.subTitle}>{route.params.singleExpense.category}</Text>
            <Text style={styles.itemText}>{route.params.singleExpense.description}</Text>
            <Text style={styles.dateDisplay}>{route.params.singleExpense.date.toLocaleDateString()}</Text>
            <Text style={styles.dateDisplay}>Amount: {route.params.singleExpense.amount}</Text>
            <Text style={styles.dateDisplay}>Category: {route.params.singleExpense.category}</Text>
            <Text style={styles.dateDisplay}>Members: {route.params.singleExpense.members.length}</Text>
            <Text style={styles.dateDisplay}>Payers: {route.params.singleExpense.payers.map((p:any) => p.member.name).join(", ")}</Text>
            <Text style={styles.dateDisplay}>Spenders: {route.params.singleExpense.spenders.map((p:any) => p.member.name).join(", ")}</Text>
        </View>
    );
}
