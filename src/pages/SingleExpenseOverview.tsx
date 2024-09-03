import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React from "react";
import memberAmount from "../types/memberAmount.ts";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import expense from "../types/expense.ts";
import {getExpenseImage} from "../types/expensetypes.ts";
import LinearGradient from "react-native-linear-gradient";
import {SettingsManager} from "../helpers/SettingsManager.ts";
import {Logger} from "../helpers/Logger.ts";

export default function SingleExpenseOverview({route, navigation}:{route:any, navigation:any}){

    const [modalVisible, setModalVisible] = React.useState(false);
    route.params.singleExpense.calculateTotal();

    return (<View style={styles.main}>
        <PopupModal state={modalVisible} modalData={new ModalData(ModalType.SoftConfirmation, "Are you sure you want to delete this expense?", (confirm:any) => {
            route.params.singleExpense.deleteSingleExpense().then(() => {
                navigation.navigate(pages.SingleExpensesList);
            }).catch(Logger.error);
            setModalVisible(false);
        }, [], "")}  />
        <View style={styles.backgroundImage}>
            <Image
                style={styles.backgroundImage}
                source={getExpenseImage(route.params.singleExpense.category)}
            />
            <LinearGradient
                colors={['transparent', '#1C3043', '#1C3043']}
                style={styles.gradient}
            />
            <View style={{...styles.gradient, backgroundColor:'rgba(0,0,0,0.4)'}}/>
        </View>

        <Text style={styles.expenseTitle}>{route.params.singleExpense.title}</Text>

        <Text style={styles.subTitle}>{route.params.singleExpense.category}</Text>
        <Text style={styles.dateDisplay}>{SettingsManager.settings.currencySymbol} {route.params.singleExpense.amount}</Text>

        <Text style={styles.expenseContainerDescription}>{route.params.singleExpense.description}</Text>

        <View style={styles.horizontalStack}>
            <TouchableOpacity style={styles.iconTextGroup} onPress={() => {navigation.navigate(pages.SingleExpensesEdit, {singleExpense: route.params.singleExpense})}}>
                <Image
                    source={require('../images/uiImages/settings.png')}
                    style={styles.icon}
                />
                <Text style={styles.iconText}>Edit Single Expense</Text>
            </TouchableOpacity>
            <View style={styles.iconTextGroup}>
                <Image
                    source={require('../images/uiImages/calender.png')}
                    style={styles.icon}
                />
                <Text style={styles.iconText}>{route.params.singleExpense.date.toLocaleTimeString()}</Text>
                <Text style={styles.iconText}>{route.params.singleExpense.date.toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity style={styles.iconTextGroup} onPress={() => setModalVisible(true)}>
                <Image
                    source={require('../images/uiImages/delete.png')}
                    style={styles.icon}
                />
                <Text style={styles.iconText}>Delete Single Expense</Text>
            </TouchableOpacity>
        </View>

        <View style={{...styles.bottom, height: "65%", bottom: 0}}>
            <View style={styles.singleExpenseContainer}>
                <View style={styles.expenseGreenBackground}/>
                <Text style={styles.expenseContainerTitle}>Payers</Text>
                <ScrollView>
                    {route.params.singleExpense.payers.map((p:any) => {
                        return (
                            <View key={p.member.id} style={styles.expenseGreenContainerItem}>
                                <Text style={styles.expenseContainerItemTitle}>{p.member.name}</Text>
                                <Text style={styles.expenseContainerItemPrice}>{p.amount}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={styles.singleExpenseContainer}>
                <View style={styles.expenseRedBackground}/>
                <Text style={styles.expenseContainerTitle}>Spenders</Text>
                <ScrollView>
                    {route.params.singleExpense.getCalculatedExpense().spenders.map((p:any) => {
                        return (
                            <View key={p.member.id} style={styles.expenseRedContainerItem}>
                                <Text style={styles.expenseContainerItemTitle}>{p.member.name}</Text>
                                <Text style={styles.expenseContainerItemPrice}>{p.amount.toFixed(0)}</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.neutralButtonSingleExpense} onPress={() => navigation.navigate(pages.SingleExpensesSettle, {singleExpense: route.params.singleExpense})}>
                <Text style={styles.acceptButtonText}>Settle Single Expense</Text>
            </TouchableOpacity>
        </View>
    </View>);
}
