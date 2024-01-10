import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import settlement from "../types/settlement.ts";

export default function TripExpenseSettlementsListItem({item}: {item: settlement}){
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            
        }}>
            <View style={styles.horizontalStack}>
                <Text style={styles.itemsHeader}>{item.member.name}</Text>
                {item.amount < 0 && <Text style={{...styles.itemsHeaderRight, color: "red"}}>Rs {Math.round(item.amount)}</Text>}
                {item.amount > 0 && <Text style={{...styles.itemsHeaderRight, color: "green"}}>Rs {Math.round(item.amount)}</Text>}
                {item.amount == 0 && <Text style={{...styles.itemsHeaderRight}}>Rs {Math.round(item.amount)}</Text>}
            </View>
        </TouchableOpacity>
    );
}