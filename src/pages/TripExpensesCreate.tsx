import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import { useState } from "react";
import expense from "../types/expense.ts";
import DatePicker from "react-native-date-picker";
import member from "../types/member.ts";
import Pages from "../types/pages.ts";

export default function TripExpensesCreate({navigation, route}: any){
    const [newExpense, setNewExpense] = useState(new expense());

    return <ScrollView style={styles.main}>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Expense Title"} onChangeText={txt => newExpense.title = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Category</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Expense Catagory"} onChangeText={txt => newExpense.category = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Description"} onChangeText={txt => newExpense.description = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Date</Text>
            <View style={styles.center}>
                <DatePicker mode={"date"} date={newExpense.date} style={styles.datePicker} onDateChange={txt => newExpense.date = txt}/>
            </View>
        </View>

        <View style={styles.inputDynamicList}>
            <Text style={styles.inputDynamicListTitle}>Spenders</Text>
            <FlatList
                data={route.params.trip.members}
                renderItem={(data) => {
                    return <View>
                        <Text style={styles.inputLabel}>{data.item.name}</Text>
                        <TextInput style={styles.inputField} inputMode={"numeric"} placeholder={"Weight"} onChangeText={txt => {
                            let spender = newExpense.spenders.find(item => item.member.id == data.item.id);
                            if(spender){
                                spender.amount = parseFloat(txt);
                            }else{
                                newExpense.spenders.push({member: data.item as member, amount: parseFloat(txt)})
                            }
                        }}/>
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
                    <TextInput style={styles.inputField} inputMode={"numeric"} placeholder={"Amount Paid"} onChangeText={txt => {
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
            if (newExpense.validate()){
                route.params.trip.calculateTotal();
                route.params.trip.expenses.push(newExpense);
                route.params.trip.saveTrip();
                navigation.navigate(Pages.TripExpenses, {trip: route.params.trip})
            } else {
                console.error("Not Valid")
            }

        }}><Text style={styles.acceptButtonText}>Add</Text></TouchableOpacity>

    </ScrollView>;
}
