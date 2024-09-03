import {Image, Text, TouchableOpacity, View} from "react-native";
import pages from "../types/pages.ts";
import styles from "../styles/styles.ts";
import Toast from "react-native-simple-toast";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import {getTripThemeImage, trip} from "../types/trip.ts";
import {SettingsManager} from "../helpers/SettingsManager.ts";

function TripOverview({route, navigation}:any) {
    const [modalVisible, setModalVisible] = React.useState(false);
    return (
        <View style={styles.main}>
            <PopupModal state={modalVisible} modalData={new ModalData(SettingsManager.settings.hardConfirmationForDeleteTrip ? ModalType.HardConfirmation : ModalType.SoftConfirmation, "Are you sure you want to delete this trip?", (confirm:any) => {
                if (confirm){
                    route.params.trip.deleteTrip().then(() => {
                        trip.allTrips = trip.allTrips.filter(item => item.id != route.params.trip.id);
                        navigation.navigate(pages.TripList)
                    });
                }
                setModalVisible(false);
            }, [],"Delete " + route.params.trip.title)}  />
            <View style={styles.backgroundImage}>
                <Image
                    style={styles.backgroundImage}
                    source={getTripThemeImage(route.params.trip.theme)}
                />
                <LinearGradient
                    colors={['transparent', '#1C3043']}
                    locations={[0, 0.8]}
                    style={styles.gradient}
                />
                <View style={{...styles.gradient, backgroundColor:'rgba(0,0,0,0.4)'}}/>
            </View>

            <Text style={styles.title}>{route.params.trip.title}</Text>

            <View style={{...styles.horizontalStack, marginHorizontal: 40}}>

                <View style={styles.iconTextGroup}>
                    <Image
                        source={require('../images/uiImages/location.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.iconText}>{route.params.trip.destination || "No location"}</Text>
                </View>

                <View style={styles.iconTextGroup}>
                    <Image
                        source={require('../images/uiImages/calender.png')}
                        style={styles.icon}
                    />
                    <Text style={styles.iconText}>{route.params.trip.date.from.toLocaleTimeString() || "No date"}</Text>
                    <Text style={styles.iconText}>{route.params.trip.date.from.toLocaleDateString() || ""}</Text>
                </View>
            </View>

            <Text style={styles.description}>{route.params.trip.description}</Text>

            <View style={styles.bottom}>
                <View  style={{...styles.horizontalStack, marginHorizontal: 40}} >
                    <TouchableOpacity onPress={() => {navigation.navigate(pages.TripEdit, {trip: route.params.trip})}} style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/settings.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Edit Trip</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/delete.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Delete Trip</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.horizontalStack}>
                    <TouchableOpacity style={styles.iconTextGroup} onPress={() => navigation.navigate(pages.TripMembers, {trip: route.params.trip})}>
                        <Image
                            source={require('../images/uiImages/Person.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>{route.params.trip.members.length} People</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(pages.TripMembersCreate, {trip: route.params.trip})}>
                            <Text style={styles.fabText}>+</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconTextGroup} onPress={() => navigation.navigate(pages.TripLogs, {trip: route.params.trip})}>
                        <Image
                            source={require('../images/uiImages/Clock.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Logs</Text>
                        <TouchableOpacity onPress={() => navigation.navigate(pages.TripLogsCreate, {trip: route.params.trip})}>
                            <Text style={styles.fabText}>+</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconTextGroup} onPress={() => navigation.navigate(pages.TripExpenses, {trip: route.params.trip})}>
                        <Image
                            source={require('../images/uiImages/Money.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>{SettingsManager.settings.currencySymbol} {route.params.trip.expenses.reduce((acc:any, expense:any) => acc + expense.amount, 0)}</Text>
                        <TouchableOpacity onPress={() => {
                            if (route.params.trip.members.length > 0){
                                navigation.navigate(pages.TripExpensesCreate, {trip: route.params.trip})
                            }else{
                                Toast.show("Add members before adding expenses", Toast.LONG);
                            }
                        }}>
                            <Text style={styles.fabText}>+</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>


            <View style={styles.horizontalStack}>
                <TouchableOpacity style={styles.neutralButton} onPress={() => navigation.navigate(pages.TripExpensesComputed, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Computed</Text>
                    <Text style={styles.acceptButtonText}>Expenses</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.neutralButton} onPress={() => navigation.navigate(pages.TripExpensesSettle, {trip: route.params.trip})}>
                    <Text style={styles.acceptButtonText}>Settle</Text>
                    <Text style={styles.acceptButtonText}>Expenses</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

export default TripOverview;
