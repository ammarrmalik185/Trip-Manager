import {FlatList, View} from "react-native";
import {TripExpenseListItem} from "../../../components/TripExpenseListItem.tsx";
import React from "react";
import styles from "../../../styles/styles.ts";
import expense from "../../../types/expense.ts";

export default function TripExpensesCustomList({route, navigation}: { route: any, navigation: any }) {

    return (
        <View style={styles.main}>
            <FlatList
                style={styles.flatList}
                data={route.params.customList.sort((a: expense, b: expense) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                renderItem={(data) => <TripExpenseListItem item={data.item} trip={route.params.trip}
                                                           navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}
