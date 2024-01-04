import { Text, View } from "react-native";
import styles from "../styles/styles.ts";
import settlement from "../types/settlement.ts";

export default function TripExpenseSettlementsListItem({item}: {item: settlement}){
    return (
        <View style={styles.item}>
            <Text style={styles.itemsHeader}>{item.member.name}</Text>
            <Text style={styles.itemText}>{item.amount}</Text>
        </View>  
    );
}