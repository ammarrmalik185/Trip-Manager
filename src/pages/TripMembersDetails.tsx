import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import expense from "../types/expense.ts";
import Pages from "../types/pages.ts";
import member from "../types/member.ts";

export default function TripMembersDetails({route, navigation} : any){
    return (
        <View>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {navigation.navigate(Pages.TripMembersEdit, {member: route.params.member, trip: route.params.trip})}}>
                <Text style={styles.acceptButtonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                let canDelete = route.params.trip.expenses.reduce((prev: boolean, item: expense) =>
                prev && item.calculate().find(calc => calc.member.id == route.params.member.id)?.amount == 0, true)

                if (canDelete){
                    //console.log("can delete")
                    route.params.trip.expenses.forEach((prev: boolean, item: expense) => prev && item.calculate().find(calc => calc.member.id == route.params.member.id)?.amount == 0, true)
                    route.params.trip.members = route.params.trip.members.filter((mem: member) => mem.id != route.params.member.id);
                    navigation.navigate(Pages.TripMembers, {trip: route.params.trip})
                } else {
                    console.log("cant delete")
                }



            }}>
                <Text style={styles.acceptButtonText}>Delete</Text>
            </TouchableOpacity>
        </View>
    )
}
