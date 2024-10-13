import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../../../styles/styles.ts";
import pages from "../../../types/pages.ts";
import React, {useEffect} from "react";
import {TripMemberListItem} from "../../../components/TripMemberListItem.tsx";
import {useIsFocused} from "@react-navigation/native";

export default function TripMembers({route, navigation}: { route: any, navigation: any }) {

    const [refresh, setRefresh] = React.useState(false);

    const isFocus = useIsFocused()
    useEffect(() => {
        setRefresh(!refresh);
    }, [isFocus]);

    return (
        <View style={styles.main}>
            {route.params.trip.members.length !== 0 && <FlatList
                style={styles.flatList}
                data={route.params.trip.members}
                renderItem={(data) => <TripMemberListItem trip={route.params.trip} item={data.item}
                                                          navigation={navigation}/>}
                keyExtractor={(item) => item.id.toString()}
            />}
            {route.params.trip.members.length === 0 &&
                <Text style={styles.noItemPrompt}>No members yet. Click the + button to add a new member</Text>
            }
            <TouchableOpacity style={styles.fab}
                              onPress={() => navigation.navigate(pages.TripMembersCreate, {trip: route.params.trip})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}
