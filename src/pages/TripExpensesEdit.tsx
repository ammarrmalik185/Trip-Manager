import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import React, {useEffect, useState} from "react";
import pages from "../types/pages.ts";
import expense from "../types/expense.ts";
import member from "../types/member.ts";
import Toast from "react-native-simple-toast";
import { palette } from "../styles/colors.ts";
import { expenseTypes } from "../types/expensetypes.ts";
import { SelectList } from "react-native-dropdown-select-list";
import { logger } from "../helpers/logger.ts";
import DatePicker from "../components/DatePicker.tsx";

export default function TripExpensesEdit({route, navigation} : any){
    const [oldExpense, setOldExpense] = useState<expense>(route.params.expense);

    const [title, setTitle] = useState(oldExpense.title);
    const [category, setCategory] = useState(oldExpense.category);
    const [date, setDate] = useState<Date>(oldExpense.date);
    const [description, setDescription] = useState(oldExpense.description);
    const [payers, setPayers] = useState(oldExpense.payers);
    const [spenders, setSpenders] = useState(oldExpense.spenders);

    return <ScrollView style={styles.main}>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} placeholder={"Enter Expense Title"} value={title} onChangeText={setTitle}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Category</Text>
            <SelectList
                data={expenseTypes}
                setSelected={(cat:any) => {
                    if (expenseTypes.find(item => item.value == cat)) setCategory(cat)
                }}
                save="value"

                boxStyles={styles.dropDownContainer}
                dropdownTextStyles={styles.dropDownInfoText}
                dropdownStyles={styles.dropDownContainerData}
                inputStyles={styles.dropDownInfoText}
                search={false}

                defaultOption={expenseTypes.find(item => item.value === category)}
            />
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput multiline={true} style={styles.inputFieldMultiLine} placeholderTextColor={palette.placeholder} placeholder={"Enter Description"} value={description} onChangeText={setDescription}/>
        </View>
        <DatePicker value={date} onValueChanged={setDate}/>
        <View style={styles.inputDynamicList}>
            <Text style={styles.inputDynamicListTitle}>Spenders</Text>
            <FlatList
                data={route.params.trip.members}
                extraData={spenders}
                renderItem={(data) => {
                    return <View>
                        <Text style={styles.inputLabel}>{data.item.name}</Text>
                        <View style={styles.numericAssistedField}>
                            <TextInput
                                placeholderTextColor={palette.placeholder}
                                style={styles.inputField} inputMode={"numeric"} placeholder={"Weight"}
                                value={(spenders.find(spend => spend.member.id == data.item.id)?.amount ?? 0).toFixed(1).toString()}
                                onChangeText={txt => {
                                    let spender = spenders.find(item => item.member.id == data.item.id);
                                    let value = txt.endsWith(".") ? parseFloat(txt.split(".")[0]) : parseFloat(txt);
                                    if(spender){
                                        spender.amount = value || 0;
                                        setSpenders([...spenders])
                                    }else{
                                        setSpenders([...spenders, {member: data.item as member, amount: parseFloat(txt) || 0}])
                                    }
                                }}
                            />
                            <TouchableOpacity style={styles.addButtonSmall} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if(spender){
                                    spender.amount += 0.1;
                                    setSpenders([...spenders])
                                }else{
                                    setSpenders([...spenders, {member: data.item as member, amount: 0.1}])
                                }
                            }}><Text style={styles.acceptButtonText}>+</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.addButton} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if(spender){
                                    spender.amount += 1;
                                    setSpenders([...spenders])
                                }else{
                                    setSpenders([...spenders, {member: data.item as member, amount: 1}])
                                }
                            }}><Text style={styles.acceptButtonText}>+</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.subtractButton} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if(spender){
                                    spender.amount -= 1;
                                    if (spender.amount < 0) spender.amount = 0;
                                    setSpenders([...spenders])
                                }else{
                                    setSpenders([...spenders, {member: data.item as member, amount: 0}])
                                }
                            }}><Text style={styles.acceptButtonText}>-</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.subtractButtonSmall} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if(spender){
                                    spender.amount -= 0.1;
                                    if (spender.amount < 0) spender.amount = 0;
                                    setSpenders([...spenders])
                                }else{
                                    setSpenders([...spenders, {member: data.item as member, amount: 0}])
                                }
                            }}><Text style={styles.acceptButtonText}>-</Text></TouchableOpacity>
                        </View>
                    </View>
            }}/>
        </View>

        <View style={styles.inputDynamicList}>
            <Text style={styles.inputDynamicListTitle}>Payers</Text>
            <FlatList
                data={route.params.trip.members}
                extraData={payers}
                renderItem={(data) => {
                let currentSpen  = payers.find(spend => spend.member.id == data.item.id);
                let currentW = currentSpen == undefined ? 0 : currentSpen.amount;
                return <View>
                    <Text style={styles.inputLabel}>{data.item.name}</Text>
                    <TextInput placeholderTextColor={palette.placeholder} style={styles.inputField} inputMode={"numeric"} placeholder={"Amount Paid"} value={currentW.toString()} onChangeText={txt => {
                        let payer = payers.find(item => item.member.id == data.item.id);
                        if(payer){
                            payer.amount = parseFloat(txt) || 0;
                            setPayers([...payers])
                        }else{
                            setPayers([...payers, {member: data.item as member, amount: parseFloat(txt) || 0}]);
                        }
                    }}/>
                </View>
            }}
            />
        </View>

        <TouchableOpacity style={styles.acceptButton} onPress={() => {

            let newExpense = new expense();

            newExpense.id = oldExpense.id;

            newExpense.title = title;
            newExpense.description = description;
            newExpense.category = category;
            newExpense.date = date;
            newExpense.spenders = spenders;
            newExpense.payers = payers;

            if (newExpense.validate()){
                newExpense.calculateTotal();
                route.params.trip.expenses = route.params.trip.expenses.filter((exp: expense) => exp.id != newExpense.id);
                route.params.trip.expenses.push(newExpense);
                route.params.trip.saveTrip();

                navigation.navigate(pages.TripExpensesDetails, {trip: route.params.trip, expense: newExpense})
            } else {
                Toast.show("Expense not valid", Toast.SHORT)
            }

        }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>



    </ScrollView>;
}
