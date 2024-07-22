import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import expense from "../types/expense.ts";
import pages from "../types/pages.ts";
import member from "../types/member.ts";
import Toast from "react-native-simple-toast";
import memberAmount from "../types/memberAmount.ts";

export default function TripMembersDetails({route, navigation} : any){
    return (
        <View style={styles.main}>
            <Text style={styles.title}>{route.params.member.name}</Text>
            <Text></Text>
            <Text style={styles.subTitle}>{route.params.trip.expenses.filter((exp: expense) => exp.payers.find((pay: memberAmount) => pay.member.id == route.params.member.id) || exp.spenders.find((spend: memberAmount) => spend.member.id == route.params.member.id)).length} Expense(s)</Text>
            <Text style={styles.subTitle}>{route.params.trip.expenses.filter((exp: expense) => exp.payers.find((pay: memberAmount) => pay.member.id == route.params.member.id)).length} Payment(s)</Text>
            <Text style={styles.subTitle}>{route.params.trip.expenses.filter((exp: expense) => exp.spenders.find((spend: memberAmount) => spend.member.id == route.params.member.id)).length} Spend(s)</Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text style={styles.subTitle}>Total Expense: {route.params.trip.expenses.reduce((prev: number, item: expense) => prev + (item.calculate().find(calc => calc.member.id == route.params.member.id)?.amount || 0), 0).toFixed(2)}</Text>
            <Text style={styles.subTitle}>Total Payment: {route.params.trip.expenses.reduce((prev: number, item: expense) => prev + (item.payers.find(pay => pay.member.id == route.params.member.id)?.amount || 0), 0).toFixed(2)}</Text>

            {/*<Text>{route.params.expenses}</Text>*/}

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {navigation.navigate(pages.TripMembersEdit, {member: route.params.member, trip: route.params.trip})}}>
                    <Text style={styles.acceptButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.declineButton} onPress={() => {
                    let canDelete = route.params.trip.expenses.reduce((prev: boolean, item: expense) =>
                    prev && item.calculate().find(calc => calc.member.id == route.params.member.id)?.amount == 0, true)

                    if (canDelete){
                        route.params.trip.expenses.forEach((prev: boolean, item: expense) => prev && item.calculate().find(calc => calc.member.id == route.params.member.id)?.amount == 0, true)
                        route.params.trip.members = route.params.trip.members.filter((mem: member) => mem.id != route.params.member.id);
                        navigation.navigate(pages.TripMembers, {trip: route.params.trip})
                    } else {
                        Toast.show("Member involved in expenses, Cannot Delete", Toast.LONG);
                    }
                }}>
                    <Text style={styles.acceptButtonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
