import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import expense from "../types/expense.ts";
import pages from "../types/pages.ts";
import member from "../types/member.ts";
import Toast from "react-native-simple-toast";
import memberAmount from "../types/memberAmount.ts";
import React from "react";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import {SettingsManager} from "../helpers/SettingsManager.ts";

export default function TripMembersDetails({route, navigation} : any){
    const [modalVisible, setModalVisible] = React.useState(false);

    let paid = route.params.trip.expenses.reduce((prev: number, item: expense) => prev + (item.calculate().find(calc => calc.member.id == route.params.member.id)?.amount || 0), 0).toFixed(0);
    let spent = route.params.trip.expenses.reduce((prev: number, item: expense) => prev + (item.payers.find(pay => pay.member.id == route.params.member.id)?.amount || 0), 0).toFixed(0);
    let total = paid - spent;

    return (
        <View style={styles.main}>

            <PopupModal state={modalVisible} modalData={new ModalData(ModalType.SoftConfirmation, "Are you sure you want to delete this member?", (confirm: boolean) => {
                if (confirm) {
                    let canDelete = route.params.trip.expenses.reduce((prev: boolean, item: expense) =>
                        prev && item.calculate().find(calc => calc.member.id == route.params.member.id)?.amount == 0, true)

                    if (canDelete) {
                        route.params.trip.expenses.forEach((prev: boolean, item: expense) => prev && item.calculate().find(calc => calc.member.id == route.params.member.id)?.amount == 0, true)
                        route.params.trip.members = route.params.trip.members.filter((mem: member) => mem.id != route.params.member.id);
                        route.params.trip.saveTrip()
                        navigation.navigate(pages.TripMembers, {trip: route.params.trip})
                    } else {
                        Toast.show("Member involved in expenses, Cannot Delete", Toast.LONG);
                    }

                }
                setModalVisible(false);
            })}/>

            <Image source={require('../images/uiImages/defaultUserImage.jpg')} style={styles.memberImage}/>
            <Text style={styles.memberTitle}>{route.params.member.name}</Text>
            <Text style={styles.memberSubTitle}>ammarrmalik185@hotmail.com</Text>
            <Text style={styles.memberSubTitle}>+923349464896</Text>

            <View style={styles.bottom}>

                <View style={{marginBottom: 30}}>
                    <View style={styles.memberNeutralSide}>
                        <View style={styles.memberNeutralSideBackground}/>
                        <Text style={styles.itemText}>Total</Text>
                        <Text style={total > 0 ? styles.memberNeutralSideTextGreen : styles.memberNeutralSideTextRed}>{SettingsManager.settings.currencySymbol} {total}</Text>
                    </View>

                    <View style={styles.horizontalStackCentered}>
                        <View style={styles.memberGreenSide}>
                            <View style={styles.memberGreenSideBackground}/>
                            <Text style={styles.itemText}>Paid</Text>
                            <Text style={styles.memberGreenSideText}>{paid}</Text>
                        </View>

                        <View style={styles.memberRedSide}>
                            <View style={styles.memberRedSideBackground}/>
                            <Text style={styles.itemText}>Spent</Text>
                            <Text style={styles.memberRedSideText}>{spent}</Text>
                        </View>
                    </View>
                </View>

                <View  style={{...styles.horizontalStack, marginHorizontal: 40}} >
                    <TouchableOpacity onPress={() => {navigation.navigate(pages.TripMembersEdit, {member: route.params.member, trip: route.params.trip})}} style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/settings.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Edit Member</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconTextGroup}>
                        <Image
                            source={require('../images/uiImages/delete.png')}
                            style={styles.icon}
                        />
                        <Text style={styles.iconText}>Delete Member</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
