import {FlatList, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../../../styles/styles.ts";
import React, {useState} from "react";
import pages from "../../../types/pages.ts";
import expense from "../../../types/expense.ts";
import member from "../../../types/member.ts";
import Toast from "react-native-simple-toast";
import {palette} from "../../../styles/colors.ts";
import {expenseTypes} from "../../../types/expensetypes.ts";
import DatePicker from "../../../components/DatePicker.tsx";
import PopupModal, {ModalData, ModalType} from "../../../components/PopupModal.tsx";
import {SettingsManager} from "../../../helpers/SettingsManager.ts";
import {Utils} from "../../../helpers/Utils.ts";

export default function TripExpensesEditor({route, navigation}: any) {
    const [currentExpense, setCurrentExpense] = useState<expense>(route.params.expense || new expense());
    const isNew = !route.params.expense;

    const [title, setTitle] = useState(currentExpense.title);
    const [category, setCategory] = useState(currentExpense.category);
    const [date, setDate] = useState<Date>(currentExpense.date);
    const [description, setDescription] = useState(currentExpense.description);
    const [payers, setPayers] = useState<{member: member, amount: string}[]>(currentExpense.payers.map(payer => { return {member: payer.member, amount: payer.amount.toString() || isNew ? SettingsManager.settings.defaultExpenseSpenderNumber.toString() : ""}}));
    const [spenders, setSpenders] = useState<{member: member, amount: string}[]>(currentExpense.spenders.map(spender => { return {member: spender.member, amount: spender.amount.toString() || ""}}));

    const [modalVisible, setModalVisible] = useState(false);

    return <ScrollView style={styles.main}>
        <SafeAreaView>

            <PopupModal state={modalVisible} modalData={new ModalData(ModalType.PickAButton, "Select Expense Category", (exit: boolean, index: number) => {
                setModalVisible(false);
                if (exit) {
                    setCategory(expenseTypes[index].value);
                }
            }, expenseTypes.map(i => i.value), "")}/>

            <Text style={styles.forumTitle}>Expense Details</Text>

            <View style={styles.inputSection}>
                {!title && <View style={styles.textInputError}/>}
                <Text style={styles.inputLabel}>Title *</Text>
                <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Expense Title"} value={title} onChangeText={setTitle}/>
            </View>
            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Description</Text>
                <TextInput multiline={true} style={styles.inputFieldMultiLine} placeholderTextColor={palette.placeholder}
                           placeholder={"Enter Description"} value={description} onChangeText={setDescription}/>
            </View>

            <View style={styles.inputSection}>
                <Text style={styles.inputLabel}>Category</Text>
                <TouchableOpacity style={styles.inputPopupView} onPress={() => setModalVisible(true)}>
                    <Text style={styles.dateDisplay}>{category}</Text>
                </TouchableOpacity>
            </View>
            <DatePicker value={date} onValueChanged={setDate}/>

            <Text style={styles.forumTitle}>Who Paid</Text>
            <FlatList
                data={route.params.trip.members}
                extraData={payers}
                renderItem={(data) => {
                    let currentSpend = payers.find(spend => spend.member.id == data.item.id);
                    let currentW = currentSpend ? currentSpend.amount : "";
                    return <View style={styles.inputSection}>
                        {!(payers.find(item => item.member.id == data.item.id)?.amount || "").match(Utils.validNumberRegex) && <View style={styles.textInputError}/>}
                        <Text style={styles.inputLabel}>{data.item.name}</Text>
                        <View style={styles.horizontalStackCentered}>
                            <Text style={styles.expenseContainerItemTitle}>Amount Paid: {SettingsManager.settings.currencySymbol} </Text>
                            <TextInput style={{...styles.inputField, width: "40%", textAlign: "center"}} placeholderTextColor={palette.placeholder}
                                       inputMode={"numeric"} placeholder={"Amount Paid"}  value={currentW.toString()} onChangeText={txt => {
                                let payer = payers.find(item => item.member.id == data.item.id);
                                if (payer) {
                                    payer.amount = txt;
                                    setPayers([...payers])
                                } else {
                                    setPayers([...payers, {
                                        member: data.item as member,
                                        amount: txt
                                    }]);
                                }
                            }}
                            />
                            <TouchableOpacity style={styles.removeButton} onPress={() => {
                                let payer = payers.find(item => item.member.id == data.item.id);
                                if (payer) {
                                    payer.amount = "";
                                    setPayers([...payers])
                                }
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

                    let currSpend = spenders.find(spend => spend.member.id == data.item.id);
                    let currValue = "";
                    if (currSpend){
                        currValue = currSpend.amount;
                    }


                    return <View style={styles.inputSection}>
                        {!(spenders.find(item => item.member.id == data.item.id)?.amount || "").match(Utils.validNumberRegex) && <View style={styles.textInputError}/>}
                        <Text style={styles.headerTitle}>{data.item.name}</Text>
                        <View style={styles.numericAssistedField}>

                            <TouchableOpacity style={styles.subtractButtonSmall} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if (spender) {
                                    spender.amount = ((parseFloat(spender.amount) || 0) - SettingsManager.settings.incrementDecrementMultiplier * 0.1).toFixed(2);
                                    if (parseFloat(spender.amount) < 0.001) spender.amount = "";
                                    setSpenders([...spenders])
                                } else {
                                    setSpenders([...spenders, {member: data.item as member, amount: ""}])
                                }
                            }}><Text style={styles.acceptButtonText}>-</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.subtractButton} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if (spender) {
                                    spender.amount = ((parseFloat(spender.amount) || 0) - SettingsManager.settings.incrementDecrementMultiplier * 1).toFixed(2);
                                    if (parseFloat(spender.amount) < 0.00001) spender.amount = "";
                                    setSpenders([...spenders])
                                } else {
                                    setSpenders([...spenders, {member: data.item as member, amount: ""}])
                                }
                            }}><Text style={styles.acceptButtonText}>-</Text></TouchableOpacity>

                            <TextInput
                                placeholderTextColor={palette.placeholder}
                                style={{...styles.inputField, textAlign: "center", }}
                                inputMode={"numeric"}
                                placeholder={"Weight"}
                                value={currValue}
                                onChangeText={txt => {
                                    let spender = spenders.find(item => item.member.id == data.item.id);
                                    if (spender) {
                                        spender.amount = txt;
                                        setSpenders([...spenders])
                                    } else {
                                        setSpenders([...spenders, {
                                            member: data.item as member,
                                            amount: txt
                                        }])
                                    }
                                }}
                            />

                            <TouchableOpacity style={styles.addButton} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if (spender) {
                                    spender.amount = ((parseFloat(spender.amount) || 0) + SettingsManager.settings.incrementDecrementMultiplier * 1).toFixed(2);
                                    setSpenders([...spenders])
                                } else {
                                    setSpenders([...spenders, {member: data.item as member, amount: "1"}])
                                }
                            }}><Text style={styles.acceptButtonText}>+</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.addButtonSmall} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if (spender) {
                                    spender.amount = ((parseFloat(spender.amount) || 0) + SettingsManager.settings.incrementDecrementMultiplier * 0.1).toFixed(2);
                                    setSpenders([...spenders])
                                } else {
                                    setSpenders([...spenders, {member: data.item as member, amount: "0.1"}])
                                }
                            }}><Text style={styles.acceptButtonText}>+</Text></TouchableOpacity>

                        </View>
                    </View>
                }}/>


            <View style={{margin: 30}}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {
                    let payersValid = payers.reduce((valid, item) => valid && !!(item.amount || "").match(Utils.validNumberRegex), true);
                    let spendersValid = spenders.reduce((valid, item) => valid && !!(item.amount || "").match(Utils.validNumberRegex), true);

                    let valid = payersValid && spendersValid;

                    if (!valid){
                        Toast.show("Check all the highlighted fields", Toast.LONG);
                        return;
                    }

                    let newExpense = new expense();

                    newExpense.id = currentExpense.id;

                    newExpense.title = title;
                    newExpense.description = description;
                    newExpense.category = category;
                    newExpense.date = date;
                    newExpense.spenders = spenders.map(spender => { return {member: spender.member, amount: spender.amount == "" ? 0 : parseFloat(spender.amount)}});
                    newExpense.payers = payers.map(payer => { return {member: payer.member, amount: payer.amount == "" ? 0 : parseFloat(payer.amount)}});

                    if (newExpense.validate()) {
                        newExpense.calculateTotal();
                        route.params.trip.expenses = route.params.trip.expenses.filter((exp: expense) => exp.id != newExpense.id);
                        route.params.trip.expenses.push(newExpense);
                        route.params.trip.saveTrip();
                        navigation.pop();
                        navigation.navigate(pages.TripExpensesDetails, {trip: route.params.trip, expense: newExpense})
                    } else {
                        Toast.show(newExpense.getValidationError(), Toast.LONG);
                    }

                    console.log(JSON.stringify(newExpense));

                }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>
            </View>

        </SafeAreaView>
    </ScrollView>;
}
