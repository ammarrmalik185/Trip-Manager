import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import settlement from "../types/settlements.ts";
import { palette } from "../styles/colors.ts";

export default function TripExpenseSettlementListItem({item}: {item: settlement}){
    return (
        <TouchableOpacity style={styles.item} onPress={() => {

        }}>
            <View style={styles.horizontalStack}>
                <Text style={{...styles.itemsHeader, color: palette.secondary}}>{item.spender.name} <Text style={styles.itemsHeader}>pays</Text> {item.payer.name}</Text>
            </View>
            <Text style={{...styles.itemsHeader, color:palette.primary}}>Rs {Math.round(item.amount)}</Text>
        </TouchableOpacity>
    );
}