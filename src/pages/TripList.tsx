import React from 'react';
import {FlatList, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {TripListItem} from "../components/TripListItem.tsx";
import {trip} from "../types/trip.ts";
import styles from "../styles/styles.ts";
import Pages from "../types/pages.ts";
import expense from "../types/expense.ts";
import member from "../types/member.ts";
import log from "../types/log.ts";

function TripList({navigation}:any): React.JSX.Element {
    trip.loadTrips();
    return (
        <SafeAreaView style={styles.main}>
            <FlatList
                style={styles.flatList}
                data={trip.allTrips}
                renderItem={(data) => <TripListItem item={data.item} navigation={navigation}/>}
                keyExtractor={item => item.id}
                extraData={navigation}
            />
            <TouchableOpacity activeOpacity={0.5} style={styles.fab} onPress={() => {navigation.navigate(Pages.TripCreate)}}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


export default TripList;
