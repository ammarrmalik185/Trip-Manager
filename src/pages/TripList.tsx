import React from 'react';
import {FlatList, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {TripListItem} from "../components/TripListItem.tsx";
import {trip} from "../types/trip.ts";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {useFocusEffect} from "@react-navigation/native";
import {SettingsManager} from "../helpers/SettingsManager.ts";

function TripList({navigation}:any): React.JSX.Element {
    const [trips, setTrips] = React.useState<trip[]>([]);

    useFocusEffect(
      React.useCallback(() => {
        trip.loadTrips((data: trip[]) => {
            const sortedTrips = data.sort((a: trip, b: trip) => {
                return new Date(b.date.from).getTime() - new Date(a.date.from).getTime();
            });
            setTrips(sortedTrips);
            if (SettingsManager.settings.openMostRecentTripOnAppOpen && SettingsManager.settingHelpers.appJustOpen){
                if (sortedTrips.length > 0) navigation.navigate(pages.TripOverview, {trip: sortedTrips[0]});
            }
            SettingsManager.settingHelpers.appJustOpen = false;
        });
      }, [setTrips])
    );

    return (
        <SafeAreaView style={styles.main}>
            <FlatList
                style={styles.flatList}
                data = {trips}
                renderItem={(data) => <TripListItem item={data.item} navigation={navigation}/>}
                    keyExtractor={item => item.id}
                    extraData={navigation}/>
            <TouchableOpacity activeOpacity={0.5} style={styles.fab} onPress={() => {navigation.navigate(pages.TripCreate)}}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


export default TripList;
