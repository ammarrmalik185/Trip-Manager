import {FlatList, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../../styles/styles.ts";
import React, {useEffect, useState} from "react";
import expense from "../../../types/expense.ts";
import member from "../../../types/member.ts";
import pages from "../../../types/pages.ts";
import Toast from 'react-native-simple-toast';
import {palette} from "../../../styles/colors.ts";
import {expenseTypes} from "../../../types/expensetypes.ts";
import DatePicker from "../../../components/DatePicker.tsx";
import {SettingsManager} from "../../../helpers/SettingsManager.ts";
import memberAmount from "../../../types/memberAmount.ts";
import PopupModal, {ModalData, ModalType} from "../../../components/PopupModal.tsx";

export default function TripExpensesCreate({navigation, route}: any) {
    const [newExpense, setNewExpense] = useState(new expense());
    const [refresh, setRefresh] = useState(false);

    // const [payers, setPayers] = useState(newExpense.payers);
    const [spenders, setSpenders] = useState(newExpense.spenders);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        let newSpenders: memberAmount[] = [];
        route.params.trip.members.forEach((member: member) => {
            if (!spenders.find(s => s.member.id == member.id)) {
                newSpenders.push({member: member, amount: SettingsManager.settings.defaultExpenseSpenderNumber})
            }
        });
        setSpenders(newSpenders);
    }, []);

    return <ScrollView style={styles.main}>
        <PopupModal state={modalVisible}
                    modalData={new ModalData(ModalType.PickAButton, "Select Expense Category", (exit: boolean, index: number) => {
                        setModalVisible(false);
                        if (exit) {
                            newExpense.category = expenseTypes[index].value;
                            setRefresh(!refresh)
                        }
                    }, expenseTypes.map(i => i.value), "")}/>
        <Text style={styles.forumTitle}>Expense Details</Text>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder}
                       placeholder={"Enter Expense Title"} onChangeText={txt => newExpense.title = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Category</Text>
            <TouchableOpacity style={styles.inputPopupView} onPress={() => setModalVisible(true)}>
                <Text style={styles.dateDisplay}>{newExpense.category}</Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput multiline={true} style={styles.inputFieldMultiLine} placeholder={"Enter Description"}
                       placeholderTextColor={palette.placeholder} onChangeText={txt => newExpense.description = txt}/>
        </View>
        <DatePicker value={newExpense.date} onValueChanged={(date: Date) => {
            newExpense.date = date
            setRefresh(!refresh);
        }}/>

        <Text style={styles.forumTitle}>Who Paid</Text>

        <FlatList
            data={route.params.trip.members}
            renderItem={(data) => {
                return <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>{data.item.name}</Text>
                    <View style={styles.horizontalStackCentered}>
                        <Text style={styles.expenseContainerItemTitle}>Amount Paid: {SettingsManager.settings.currencySymbol} </Text>
                        <TextInput style={{...styles.inputField, width: "40%", textAlign: "center"}} placeholderTextColor={palette.placeholder}
                               inputMode={"numeric"} placeholder={"Amount Paid"} onChangeText={txt => {
                                    let payer = newExpense.payers.find(item => item.member.id == data.item.id);
                                    if (payer) {
                                        payer.amount = parseFloat(txt);
                                    } else {
                                        newExpense.payers.push({member: data.item as member, amount: parseFloat(txt)})
                                    }
                                }}
                        />
                        <TouchableOpacity style={styles.removeButton} onPress={() => {
                            let payer = newExpense.payers.find(item => item.member.id == data.item.id);
                            if (payer) payer.amount = 0;
                            setRefresh(!refresh);
                        }}><Text style={styles.removeButtonText}>X</Text></TouchableOpacity>
                    </View>
                </View>
            }}
        />

        <Text style={styles.forumTitle}>How to divide</Text>
        <FlatList
            data={route.params.trip.members}
            extraData={spenders}
            renderItem={(data) => {
                return <View style={styles.inputSection}>
                    <Text style={styles.headerTitle}>{data.item.name}</Text>
                    <View style={styles.numericAssistedField}>

                        <TouchableOpacity style={styles.subtractButtonSmall} onPress={() => {
                            let spender = spenders.find(item => item.member.id == data.item.id);
                            if (spender) {
                                spender.amount -= 0.1 * SettingsManager.settings.incrementDecrementMultiplier;
                                if (spender.amount < 0) spender.amount = 0;
                                setSpenders([...spenders])
                            } else {
                                setSpenders([...spenders, {member: data.item as member, amount: 0}])
                            }
                            setRefresh(!refresh);
                        }}><Text style={styles.acceptButtonText}>-</Text></TouchableOpacity>

                        <TouchableOpacity style={styles.subtractButton} onPress={() => {
                            let spender = spenders.find(item => item.member.id == data.item.id);
                            if (spender) {
                                spender.amount -= 1 * SettingsManager.settings.incrementDecrementMultiplier;
                                if (spender.amount < 0) spender.amount = 0;
                                setSpenders([...spenders])
                            } else {
                                setSpenders([...spenders, {member: data.item as member, amount: 0}])
                            }
                            setRefresh(!refresh);
                        }}><Text style={styles.acceptButtonText}>-</Text></TouchableOpacity>

                        <TextInput
                            value={(spenders.find(spend => spend.member.id == data.item.id)?.amount ?? 0).toFixed(1).toString()}
                            style={{...styles.inputField, textAlign: "center"}}
                            placeholderTextColor={palette.placeholder}
                            inputMode={"numeric"}
                            placeholder={"Weight"}
                            onChangeText={txt => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if (spender) {
                                    spender.amount = parseFloat(txt);
                                    if (spender.amount < 0) spender.amount = 0;
                                    setSpenders([...spenders])
                                } else {
                                    // spenders.push({member: data.item as member, amount: parseFloat(txt)})
                                    setSpenders([...spenders, {
                                        member: data.item as member,
                                        amount: parseFloat(txt) || 0
                                    }])
                                }
                                setRefresh(!refresh);
                                console.log(spender?.amount)
                            }
                            }/>


                        <TouchableOpacity style={styles.addButton} onPress={() => {
                            let spender = spenders.find(item => item.member.id == data.item.id);
                            if (spender) {
                                spender.amount += 1 * SettingsManager.settings.incrementDecrementMultiplier;
                                setSpenders([...spenders])
                            } else {
                                setSpenders([...spenders, {member: data.item as member, amount: 1}])
                            }
                            setRefresh(!refresh);
                        }}><Text style={styles.acceptButtonText}>+</Text></TouchableOpacity>

                        <TouchableOpacity style={styles.addButtonSmall} onPress={() => {
                            let spender = spenders.find(item => item.member.id == data.item.id);
                            if (spender) {
                                spender.amount += 0.1 * SettingsManager.settings.incrementDecrementMultiplier;
                                setSpenders([...spenders])
                            } else {
                                setSpenders([...spenders, {member: data.item as member, amount: 0.1}])
                            }
                            setRefresh(!refresh);
                        }}><Text style={styles.acceptButtonText}>+</Text></TouchableOpacity>


                    </View>
                </View>
            }}
        />

        <TouchableOpacity style={styles.acceptButton} onPress={() => {
            newExpense.spenders = spenders;
            if (newExpense.validate()) {
                newExpense.calculateTotal();
                route.params.trip.expenses.push(newExpense);
                route.params.trip.saveTrip();
                navigation.pop();
                navigation.navigate(pages.TripExpenses, {trip: route.params.trip})
            } else {
                Toast.show(newExpense.getValidationError(), Toast.LONG);
            }

        }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>

    </ScrollView>;
}
