import {Text, TouchableOpacity, View} from "react-native";
import pages from "../types/pages.ts";
import styles from "../styles/styles.ts";
import { trip } from "../types/trip.ts";

function TripOverview({route, navigation}:any) {
    return (
        <View style={styles.main}>
            <View style={styles.detailsDisplay}>
                <Text style={styles.title}>{route.params.trip.title}</Text>
                <Text style={styles.subTitle}>{route.params.trip.destination}</Text>
                <Text style={styles.dateDisplay}>{route.params.trip.date.from.toLocaleDateString()} - {route.params.trip.date.to.toLocaleDateString()}</Text>
                <Text style={styles.description}>{route.params.trip.description}</Text>
                <Text style={styles.subTitle}>Member Count: {route.params.trip.members.length}</Text>
                <Text style={styles.subTitle}>Total Expenses: Rs. {route.params.trip.expenses.reduce((acc:any, expense:any) => acc + expense.amount, 0)}</Text>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.TripDetails, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.TripMembers, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Members</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.TripLogs, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Logs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.TripExpenses, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Expenses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.TripExpensesComputed, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Computed Expenses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.TripExpensesSettle, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Settle Expenses</Text>
                </TouchableOpacity>
                {/*<TouchableOpacity style={styles.acceptButton} onPress={() => {navigation.navigate(pages.TripEdit, {trip: route.params.trip})}}>*/}
                {/*    <Text style={styles.acceptButtonText}>Edit</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<TouchableOpacity style={styles.declineButton} onPress={() => {*/}
                {/*    route.params.trip.deleteTrip().then(() => {*/}
                {/*        trip.allTrips = trip.allTrips.filter(item => item.id != route.params.trip.id);*/}
                {/*        navigation.navigate(pages.TripList)*/}
                {/*    });*/}
                {/*}}>*/}
                {/*    <Text style={styles.acceptButtonText}>Delete</Text>*/}
                {/*</TouchableOpacity>*/}
            </View>

            {/*<TouchableOpacity style={styles.fabTop} onPress={() => {navigation.navigate(pages.TripEdit, {trip: route.params.trip})}}>*/}
            {/*    <Text style={styles.fabText}>✏️</Text>*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity style={styles.fabNegative} onPress={() => {*/}
            {/*    route.params.trip.deleteTrip().then(() => {*/}
            {/*        trip.allTrips = trip.allTrips.filter(item => item.id != route.params.trip.id);*/}
            {/*        navigation.navigate(pages.TripList)*/}
            {/*    });*/}
            {/*}}>*/}
            {/*    <Text style={styles.fabText}>🗑️</Text>*/}
            {/*</TouchableOpacity>*/}
        </View>
    )
}

export default TripOverview;
