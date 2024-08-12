import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import settlement from "../types/settlements.ts";
import {palette} from "../styles/colors.ts";
import LinearGradient from "react-native-linear-gradient";
import React from "react";

export default function TripExpenseSettlementListItem({item}: {item: settlement}){
    return (
        <LinearGradient colors={[palette.primary, palette.secondary]} style={styles.settlementItem} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
            <View style={styles.horizontalStackCentered}>
                <View style={styles.settlementIconGroup}>
                    <Image
                        source={require('../images/uiImages/defaultUserImage.jpg')}
                        style={styles.settlementUserImage}
                    />
                    <Text style={styles.settlementUserText}>{item.spender.name}</Text>
                </View>
                <View style={styles.settlementCenterContainer}>
                    <Text style={styles.settlementAmount}>Rs {Math.round(item.amount)}</Text>
                    <Image source={require('../images/uiImages/arrow.png')} style={styles.settlementArrowImage}/>
                    <Text style={styles.settlementSendNotification}>{"Send Notification"}</Text>
                </View>
                <View style={styles.settlementIconGroup}>
                    <Image
                        source={require('../images/uiImages/defaultUserImage.jpg')}
                        style={styles.settlementUserImage}
                    />
                    <Text style={styles.settlementUserText}>{item.payer.name}</Text>
                </View>
            </View>
        </LinearGradient>
    );
}
