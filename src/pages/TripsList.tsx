/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React from 'react';
import {Button, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, useColorScheme,} from 'react-native';
import {TripListItem} from "../components/TripListItem.tsx";
import {trip} from "../types/trip.ts";

type SectionProps = PropsWithChildren<{
    title: string;
}>;


function TripsList({navigation}:any): React.JSX.Element {
    const trips : trip[] = [
        { id: '1', title: "Honeymoon", destination: 'Paris', date: {from: '2023/01/01', to: '2023/01/14'}, members: [], expenses: [] },
        { id: '2', title: "Test", destination: 'New York', date: {from: '2023/01/01', to: '2023/01/14'}, members: [], expenses: [] },
        { id: '3', title: "Test 2", destination: 'Tokyo', date: {from: '2023/01/01', to: '2023/01/14'}, members: [], expenses: [] },
        // Add more trips here
    ];
    return (
        <SafeAreaView style={styles.main}>
            <FlatList
                style={styles.flatList}
                data={trips}
                renderItem={(data) => <TripListItem item={data.item} navigation={navigation}/>}
                keyExtractor={item => item.id}
                extraData={navigation}
            />
            <TouchableOpacity activeOpacity={0.5} style={styles.fab} onPress={() => {navigation.navigate("Create New Trip")}}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main:{
      flex: 1,
    },
    flatList: {
        marginTop: 20,
    },
    fab:{
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: '#5c69fa',
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 30,
        elevation: 8
    },
    fabText:{
        fontSize: 30,
        color: 'white',
    }
});

export default TripsList;
