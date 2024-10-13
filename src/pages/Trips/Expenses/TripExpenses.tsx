import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {TripExpenseListItem} from "../../../components/TripExpenseListItem.tsx";
import React, {useEffect} from "react";
import styles from "../../../styles/styles.ts";
import pages from "../../../types/pages.ts";
import Toast from 'react-native-simple-toast';
import expense from "../../../types/expense.ts";
import {useIsFocused} from "@react-navigation/native";

export default function TripExpenses({route, navigation,}: { route: any, navigation: any }) {

    const [refresh, setRefresh] = React.useState(false);

    const isFocus = useIsFocused()
    useEffect(() => {
        setRefresh(!refresh);
    }, [isFocus]);

    return (
        <View style={styles.main}>

            {route.params.trip.expenses.length !== 0 && <FlatList
                style={styles.flatList}
                data={route.params.trip.expenses.sort((a: expense, b: expense) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                renderItem={(data) => <TripExpenseListItem item={data.item} trip={route.params.trip}
                                                           navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
            />}

            {route.params.trip.expenses.length === 0 &&
                <Text style={styles.noItemPrompt}>No expenses yet. Click the + button to add a new expense</Text>
            }

            <TouchableOpacity style={styles.fab} onPress={() => {
                if (route.params.trip.members.length > 0) {
                    navigation.navigate(pages.TripExpensesCreate, {trip: route.params.trip})
                } else {
                    Toast.show("Add members before adding expenses", Toast.LONG);
                }
            }}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
