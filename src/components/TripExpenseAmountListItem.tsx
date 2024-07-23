import { Text, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import offset from "../types/offset.ts";
import memberAmount from "../types/memberAmount.ts";

export default function TripExpenseAmountListItem({item, onClick}: {item: memberAmount, onClick: any}){
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            onClick();
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
