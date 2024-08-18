import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {trip} from "../types/trip.ts";
import member from "../types/member.ts";
import expense from "../types/expense.ts";

export function TripMemberListItem({item, navigation, trip}: {item: member, navigation: any, trip: trip}){
    let paid = trip.expenses.reduce((prev: number, expenseItem: expense) => prev + (expenseItem.payers.find(calc => calc.member.id == item.id)?.amount || 0), 0).toFixed(0);
    let spent = trip.expenses.reduce((prev: number, expenseItem: expense) => prev + (expenseItem.getCalculatedExpense().spenders.find(pay => pay.member.id == item.id)?.amount || 0), 0).toFixed(0);

    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(pages.TripMembersDetails, {trip: trip, member: item})
    }}>
        <View style={styles.horizontalStack}>
            <Image style={styles.memberImageSmall} source={require("../images/uiImages/defaultUserImage.jpg")}/>
            <View style={{width: "70%"}}>
                <Text style={styles.memberListHeader}>{item.name}</Text>
                <Text style={styles.memberListSubHeader}>{item.email}</Text>
                <Text style={styles.memberListSubHeader}>{item.phone}</Text>
            </View>
            <View>
                <Text style={styles.memberListGreenSideText}>+{paid}</Text>
                <Text style={styles.memberListRedSideText}>-{spent}</Text>
            </View>
        </View>
    </TouchableOpacity>;
}

