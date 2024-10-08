import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import memberAmount from "../types/memberAmount.ts";
import {SettingsManager} from "../helpers/SettingsManager.ts";

export default function TripMemberAmountListItem({item, onClick}: {item: memberAmount, onClick: any}){
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            onClick();
        }}>
            <View style={styles.expenseAmountListItemView}>
                <Image style={styles.expenseAmountListItemImageRound} source={require("../images/uiImages/defaultUserImage.jpg")}/>
                <Text style={styles.expenseAmountListItemHeader}>{item.member.name}</Text>
                {item.amount < 0 && <View style={styles.expenseAmountListItemText}><Text style={{...styles.itemsHeaderRight, color: "red"}}>{SettingsManager.settings.currencySymbol} {Math.round(item.amount)}</Text></View>}
                {item.amount > 0 && <View style={styles.expenseAmountListItemText}><Text style={{...styles.itemsHeaderRight, color: "green"}}>{SettingsManager.settings.currencySymbol} {Math.round(item.amount)}</Text></View>}
                {item.amount == 0 && <View style={styles.expenseAmountListItemText}><Text style={{...styles.itemsHeaderRight}}>{SettingsManager.settings.currencySymbol} {Math.round(item.amount)}</Text></View>}
            </View>
        </TouchableOpacity>
    );
}
