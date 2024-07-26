import {Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {singleExpense} from "../types/singleExpense.ts";

export function SingleExpensesListItem({item, navigation}: {item: singleExpense, navigation: any}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(pages.SingleExpenseOverview, {singleExpense: item})
    }}>
        <Text style={styles.itemsHeader}>{item.title}</Text>
        <Text style={styles.date}>{item.date.toLocaleString()}</Text>
        <View style={styles.rightBox}>
            <Text style={styles.rightBoxMain}>{item.members.length}</Text>
            <Text style={styles.rightBoxSub}>People</Text>
        </View>
    </TouchableOpacity>;
}

