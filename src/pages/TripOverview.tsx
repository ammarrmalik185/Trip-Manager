import {Text, TouchableOpacity, View} from "react-native";
import pages from "../types/pages.ts";
import styles from "../styles/styles.ts";
import Toast from "react-native-simple-toast";

function TripOverview({route, navigation}:any) {
    return (
        <View style={styles.main}>
            <View style={styles.item}>
            <View style={styles.detailsDisplay}>
                <Text style={styles.title}>{route.params.trip.title}</Text>
                <Text style={styles.subTitle}>{route.params.trip.destination}</Text>
                <Text style={styles.dateDisplay}>{route.params.trip.date.from.toLocaleDateString()} - {route.params.trip.date.to.toLocaleDateString()}</Text>
                <Text style={styles.description}>{route.params.trip.description}</Text>
                <Text style={styles.subTitle}>Member Count: {route.params.trip.members.length}</Text>
                <Text style={styles.subTitle}>Total Expenses: Rs. {route.params.trip.expenses.reduce((acc:any, expense:any) => acc + expense.amount, 0)}</Text>
            </View>
            </View>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => navigation.navigate(pages.TripDetails, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Details</Text>
                </TouchableOpacity>
                <View style={styles.item}>
                    {/*<Text style={styles.acceptButtonText}>Members</Text>*/}
                    <View style={styles.horizontalStack}>
                        <Text style={styles.acceptButtonText}>Members</Text>
                        <TouchableOpacity style={styles.addButtonInline} onPress={() => navigation.navigate(pages.TripMembers, {trip: route.params.trip})}>
                            <Text style={styles.acceptButtonText}>📃</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButtonInline} onPress={() => navigation.navigate(pages.TripMembersCreate, {trip: route.params.trip})}>
                            <Text style={styles.fabText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.horizontalStack}>
                        <Text style={styles.acceptButtonText}>Logs         </Text>
                        <TouchableOpacity style={styles.addButtonInline} onPress={() => navigation.navigate(pages.TripLogs, {trip: route.params.trip})}>
                            <Text style={styles.acceptButtonText}>📃</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButtonInline} onPress={() => navigation.navigate(pages.TripLogsCreate, {trip: route.params.trip})}>
                            <Text style={styles.fabText}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.item}>
                    <View style={styles.horizontalStack}>
                        <Text style={styles.acceptButtonText}>Expenses </Text>
                        <TouchableOpacity style={styles.addButtonInline} onPress={() => navigation.navigate(pages.TripExpenses, {trip: route.params.trip})}>
                            <Text style={styles.acceptButtonText}>📃</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addButtonInline} onPress={() => {
                            if (route.params.trip.members.length > 0){
                                navigation.navigate(pages.TripExpensesCreate, {trip: route.params.trip})
                            }else{
                                Toast.show("Add members before adding expenses", Toast.LONG);
                            }
                        }}>
                            <Text style={styles.fabText}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => navigation.navigate(pages.TripExpensesComputed, {trip: route.params.trip})}>
                            <Text style={styles.acceptButtonText}>Computed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => navigation.navigate(pages.TripExpensesSettle, {trip: route.params.trip})}>
                            <Text style={styles.acceptButtonText}>Settle</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default TripOverview;
