import {BackHandler, FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React, {useEffect} from "react";
import {TripMemberListItem} from "../components/TripMemberListItem.tsx";
import {useIsFocused} from "@react-navigation/native";

export default function TripMembers({route, navigation}:{route:any, navigation:any}) {

    return (
        <View style={styles.main}>
            <FlatList
                style={styles.flatList}
                data={route.params.trip.members}
                renderItem={(data) => <TripMemberListItem trip={route.params.trip} item={data.item} navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
            />
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate(pages.TripMembersCreate, {trip: route.params.trip})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
