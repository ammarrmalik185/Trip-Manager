import {Image, Text, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import expense from "../types/expense.ts";
import PopupModal, {ModalData, ModalType} from "../components/PopupModal.tsx";
import {trip} from "../types/trip.ts";
import LinearGradient from "react-native-linear-gradient";
import React from "react";

export default function TripExpensesDetails({route, navigation}: any){

    const [modalVisible, setModalVisible] = React.useState(false);

    return <View style={styles.main}>
        <PopupModal state={modalVisible} modalData={new ModalData(ModalType.SoftConfirmation, "Are you sure you want to delete this expense?", (confirm:any) => {
            if (confirm){
                route.params.trip.expenses = route.params.trip.expenses.filter((exp: expense) => exp.id != route.params.expense.id);
                navigation.navigate(pages.TripExpenses, {trip: route.params.trip})
            }
            setModalVisible(false);
        }, [],"Delete " + route.params.trip.title)}  />
        <View style={styles.backgroundImage}>
            <Image
                style={styles.backgroundImage}
                source={require('../images/uiImages/expenses.png')}
            />
            <LinearGradient
                colors={['transparent', '#1C3043', '#1C3043']}
                style={styles.gradient}
            />
            <View style={{...styles.gradient, backgroundColor:'rgba(0,0,0,0.4)'}}/>
        </View>

        <Text style={styles.expenseTitle}>{route.params.expense.title}</Text>

        <Text style={styles.subTitle}>{route.params.expense.category}</Text>
        <Text style={styles.dateDisplay}>Rs {route.params.expense.amount}</Text>

        <Text style={styles.expenseContainerDescription}>{route.params.expense.description}</Text>
        
        <View style={styles.horizontalStack}>
            <TouchableOpacity style={styles.iconTextGroup} onPress={() => {navigation.navigate(pages.TripExpensesEdit, {expense: route.params.expense, trip: route.params.trip})}}>
                <Image
                    source={require('../images/uiImages/settings.png')}
                    style={styles.icon}
                />
                <Text style={styles.iconText}>Edit Expense</Text>
            </TouchableOpacity>
            <View style={styles.iconTextGroup}>
                <Image
                    source={require('../images/uiImages/calender.png')}
                    style={styles.icon}
                />
                <Text style={styles.iconText}>{route.params.expense.date.toLocaleTimeString()}</Text>
                <Text style={styles.iconText}>{route.params.expense.date.toLocaleDateString()}</Text>
            </View>
            <TouchableOpacity style={styles.iconTextGroup} onPress={() => setModalVisible(true)}>
                <Image
                    source={require('../images/uiImages/delete.png')}
                    style={styles.icon}
                />
                <Text style={styles.iconText}>Delete Expense</Text>
            </TouchableOpacity>
        </View>

        <View style={{...styles.bottom, height: "65%", bottom: 0}}>
            <View style={styles.expenseContainer}>
                <View style={styles.expenseGreenBackground}/>
                <Text style={styles.expenseContainerTitle}>Payers</Text>
                {route.params.expense.payers.map((p:any) => {
                    return (
                        <View style={styles.expenseGreenContainerItem}>
                            <Text style={styles.expenseContainerItemTitle}>{p.member.name}</Text>
                            <Text style={styles.expenseContainerItemPrice}>{p.amount}</Text>
                        </View>
                    )
                })}
            </View>
            <View style={styles.expenseContainer}>
                <View style={styles.expenseRedBackground}/>
                <Text style={styles.expenseContainerTitle}>Spenders</Text>
                {route.params.expense.getCalculatedExpense().spenders.map((p:any) => {
                    return (
                        <View style={styles.expenseRedContainerItem}>
                            <Text style={styles.expenseContainerItemTitle}>{p.member.name}</Text>
                            <Text style={styles.expenseContainerItemPrice}>{p.amount.toFixed(0)}</Text>
                        </View>
                    )
                })}
            </View>
        </View>


        {/*<Text style={styles.dateDisplay}>Payers: {route.params.expense.payers.map((p:any) => p.member.name).join(", ")}</Text>*/}
        {/*<Text style={styles.dateDisplay}>Spenders: {route.params.expense.spenders.map((p:any) => p.member.name).join(", ")}</Text>*/}

    </View>;
}
