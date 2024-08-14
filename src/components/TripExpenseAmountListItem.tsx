import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import memberAmount from "../types/memberAmount.ts";
import {getExpenseIconImage, getExpenseImage} from "../types/expensetypes.ts";
import LinearGradient from "react-native-linear-gradient";

export default function TripExpenseAmountListItem({item, onClick}: {item: memberAmount, onClick: any}){
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            onClick();
        }}>
            <View style={styles.tripListBackground}>
                <Image source={getExpenseImage(item.member.name)} style={styles.tripListBackgroundImage}/>
                <LinearGradient style={styles.tripListBackgroundImage} colors={["rgba(0,0,0,1)", "rgba(0,0,0,0.5)", "rgba(0,0,0,1)"]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}/>
            </View>
            <View style={styles.expenseAmountListItemView}>
                <Image style={styles.expenseAmountListItemImage} source={getExpenseIconImage(item.member.name)}/>
                <Text style={styles.expenseAmountListItemHeader}>{item.member.name}</Text>
                {item.amount < 0 && <View style={styles.expenseAmountListItemText}><Text style={{...styles.itemsHeaderRight, color: "red"}}>Rs {Math.round(item.amount)}</Text></View>}
                {item.amount > 0 && <View style={styles.expenseAmountListItemText}><Text style={{...styles.itemsHeaderRight, color: "green"}}>Rs {Math.round(item.amount)}</Text></View>}
                {item.amount == 0 && <View style={styles.expenseAmountListItemText}><Text style={{...styles.itemsHeaderRight}}>Rs {Math.round(item.amount)}</Text></View>}
            </View>
        </TouchableOpacity>
    );
}
