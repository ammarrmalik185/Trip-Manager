import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {singleExpense} from "../types/singleExpense.ts";
import {getExpenseIconImage, getExpenseImage} from "../types/expensetypes.ts";
import LinearGradient from "react-native-linear-gradient";

export function SingleExpensesListItem({item, navigation}: {item: singleExpense, navigation: any}){
    return  <TouchableOpacity style={styles.item} onPress={() => {
        navigation.navigate(pages.SingleExpenseOverview, {singleExpense: item})
    }}>
        <View style={styles.tripListBackground}>
            <Image source={getExpenseImage(item.category)} style={styles.tripListBackgroundImage}/>
            <LinearGradient style={styles.tripListBackgroundImage} colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}/>
        </View>
        <Text style={styles.tripListHeader}>{item.title}</Text>
        <Text style={styles.tripListSubheader}>Rs {item.amount}</Text>
        <Text style={styles.tripListSubheader}>{item.date.toLocaleString()}</Text>
        <View style={styles.rightBox}>
            <Image style={styles.tripListIcon} source={getExpenseIconImage(item.category)}/>
            <Text style={styles.rightBoxSub}>{item.category}</Text>
        </View>
    </TouchableOpacity>;
}

