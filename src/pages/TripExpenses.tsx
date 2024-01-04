import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {TripExpenseListItem} from "../components/TripExpenseListItem.tsx";
import React from "react";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";

export default function TripExpenses({route, navigation}:{route:any, navigation:any}){
    return (
        <View style={styles.main}>
            <FlatList
                data={route.params.trip.expenses}
                renderItem={(data) => <TripExpenseListItem item={data.item} trip={route.params.trip} navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
            />


            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate(Pages.TripExpensesCreate, {trip: route.params.trip})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
