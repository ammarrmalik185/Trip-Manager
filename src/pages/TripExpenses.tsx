import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {TripExpenseListItem} from "../components/TripExpenseListItem.tsx";
import React from "react";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import Toast from 'react-native-simple-toast';
import expense from "../types/expense.ts";

export default function TripExpenses({route, navigation,}:{route:any, navigation:any}){

    return (
        <View style={styles.main}>

            <FlatList
                style={styles.flatList}
                data={route.params.trip.expenses.sort((a:expense,b:expense) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                renderItem={(data) => <TripExpenseListItem item={data.item} trip={route.params.trip} navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
            />

            <TouchableOpacity style={styles.fab} onPress={() =>{
                if (route.params.trip.members.length > 0){
                    navigation.navigate(pages.TripExpensesCreate, {trip: route.params.trip})
                }else{
                    Toast.show("Add members before adding expenses", Toast.LONG);
                }
            }}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
