import { FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import { useState } from "react";
import expense from "../types/expense.ts";
import member from "../types/member.ts";
import pages from "../types/pages.ts";
import { SelectList } from "react-native-dropdown-select-list";
import Toast from 'react-native-simple-toast';
import { palette } from "../styles/colors.ts";
import { logger } from "../helpers/logger.ts";
import { expenseTypes } from "../types/expensetypes.ts";
import { SafeAreaView } from "react-native-safe-area-context";
import DatePicker from "../components/DatePicker.tsx";
import memberAmount from "../types/memberAmount.ts";

export default function TripExpensesCreate({navigation, route}: any){
    const [newExpense, setNewExpense] = useState(new expense());
    const [refresh, setRefresh] = useState(false);

    // const [payers, setPayers] = useState(newExpense.payers);
    const [spenders, setSpenders] = useState(newExpense.spenders);

    return <ScrollView style={styles.main}>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} placeholder={"Enter Expense Title"} onChangeText={txt => newExpense.title = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Category</Text>
            <SelectList
                data={expenseTypes}
                setSelected={(value: any) => {
                    newExpense.category = value;
                    setRefresh(!refresh)
                }}
                save="value"

                boxStyles={styles.dropDownContainer}
                dropdownTextStyles={styles.dropDownInfoText}
                dropdownStyles={styles.dropDownContainerData}
                inputStyles={styles.dropDownInfoText}

                defaultOption={expenseTypes[0]}
            />
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput multiline={true} style={styles.inputFieldMultiLine} placeholder={"Enter Description"} placeholderTextColor={palette.placeholder} onChangeText={txt => newExpense.description = txt}/>
        </View>
        <DatePicker value={newExpense.date} onValueChanged={(date: Date) => {
            newExpense.date = date
            setRefresh(!refresh);
        }}/>
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
                                value={(spenders.find(spend => spend.member.id == data.item.id)?.amount ?? 0).toFixed(1).toString()}
                                style={styles.inputField}
                               placeholderTextColor={palette.placeholder}
                               inputMode={"numeric"}
                               placeholder={"Weight"}
                               onChangeText={txt => {
                                   let spender = spenders.find(item => item.member.id == data.item.id);
                                   if(spender){
                                        spender.amount = parseFloat(txt);
                                        if (spender.amount < 0) spender.amount = 0;
                                       setSpenders([...spenders])
                                    }else{
                                        // spenders.push({member: data.item as member, amount: parseFloat(txt)})
                                       setSpenders([...spenders, {member: data.item as member, amount: parseFloat(txt) || 0}])
                                    }
                                   setRefresh(!refresh);
                                   console.log(spender?.amount)
                                }
                            }/>
                            <TouchableOpacity style={styles.addButtonSmall} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if(spender){
                                    spender.amount += 0.1;
                                    setSpenders([...spenders])
                                }else{
                                    setSpenders([...spenders, {member: data.item as member, amount: 0}])
                                }
                                setRefresh(!refresh);
                            }}><Text style={styles.acceptButtonText}>+</Text></TouchableOpacity>

                            <TouchableOpacity style={styles.addButton} onPress={() => {
                                let spender = spenders.find(item => item.member.id == data.item.id);
                                if(spender){
                                    spender.amount += 1;
                                    setSpenders([...spenders])
                                }else{
                                    setSpenders([...spenders, {member: data.item as member, amount: 1}])
                                }
                                setRefresh(!refresh);
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
                                setRefresh(!refresh);
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
                                setRefresh(!refresh);
                            }}><Text style={styles.acceptButtonText}>-</Text></TouchableOpacity>

                        </View>
                    </View>
                }}
            />
        </View>

        <View style={styles.inputDynamicList}>
            <Text style={styles.inputDynamicListTitle}>Payers</Text>
            <FlatList
                data={route.params.trip.members}
                renderItem={(data) => {
                return <View>
                    <Text style={styles.inputLabel}>{data.item.name}</Text>
                    <TextInput style={styles.inputField} placeholderTextColor={palette.placeholder} inputMode={"numeric"} placeholder={"Amount Paid"} onChangeText={txt => {
                        let payer = newExpense.payers.find(item => item.member.id == data.item.id);
                        if(payer){
                            payer.amount = parseFloat(txt);
                        }else{
                            newExpense.payers.push({member: data.item as member, amount: parseFloat(txt)})
                        }
                    }}/>
                </View>
            }}
            />
        </View>

        <TouchableOpacity style={styles.acceptButton} onPress={() => {
            newExpense.spenders = spenders;
            if (newExpense.validate()){
                newExpense.calculateTotal();
                route.params.trip.expenses.push(newExpense);
                route.params.trip.saveTrip();
                navigation.navigate(pages.TripExpenses, {trip: route.params.trip})
            } else {
                Toast.show("Expense is not valid", Toast.LONG);
                console.error("Not Valid")
            }

        }}><Text style={styles.acceptButtonText}>Add</Text></TouchableOpacity>

    </ScrollView>;
}
