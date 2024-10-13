import {FlatList, Text, TouchableOpacity, View} from "react-native";
import styles from "../../../styles/styles.ts";
import pages from "../../../types/pages.ts";
import React, {useEffect} from "react";
import {TripLogListItem} from "../../../components/TripLogListItem.tsx";
import log from "../../../types/log.ts";
import {useIsFocused} from "@react-navigation/native";

export default function TripLogs({route, navigation}: { route: any, navigation: any }) {

    const [refresh, setRefresh] = React.useState(false);

    const isFocus = useIsFocused()
    useEffect(() => {
        setRefresh(!refresh);
    }, [isFocus]);

    return (
        <View style={styles.main}>
            {route.params.trip.logs.length !== 0 && <FlatList
                style={styles.flatList}
                data={route.params.trip.logs.sort((a: log, b: log) => new Date(b.date).getTime() - new Date(a.date).getTime())}
                renderItem={(data) => <TripLogListItem item={data.item} navigation={navigation}
                                                       trip={route.params.trip}/>}
                keyExtractor={(item) => item.id.toString()}
            />}
            {route.params.trip.logs.length === 0 &&
                <Text style={styles.noItemPrompt}>No logs yet. Click the + button to add a new log</Text>
            }
            <TouchableOpacity style={styles.fab}
                              onPress={() => navigation.navigate(pages.TripLogsCreate, {trip: route.params.trip})}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabTop}
                              onPress={() => navigation.navigate(pages.TripLogsFullscreenMap, {trip: route.params.trip})}>
                <Text style={styles.fabText}>🗺️</Text>
            </TouchableOpacity>
        </View>
    );
}
