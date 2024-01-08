import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import { useState } from "react";
import log from "../types/log.ts";
import DatePicker from "react-native-date-picker";
import Pages from "../types/pages.ts";
import expense from "../types/expense.ts";
import member from "../types/member.ts";

export default function TripExpensesEdit({route, navigation} : any){
    const [oldExpense, setOldExpense] = useState<expense>(route.params.expense);
    const [newExpense, setNewExpense] = useState(new expense());

    newExpense.id = oldExpense.id;
    newExpense.title = oldExpense.title;
    newExpense.category = oldExpense.category;
    newExpense.date = oldExpense.date;
    newExpense.description = oldExpense.description;
    newExpense.amount = oldExpense.amount;
    newExpense.payers = oldExpense.payers;
    newExpense.spenders = oldExpense.spenders;

    return <ScrollView style={styles.main}>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Expense Title"} value={oldExpense.title} onChangeText={txt => newExpense.title = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Category</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Expense Catagory"} value={oldExpense.category} onChangeText={txt => newExpense.category = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Description"} value={oldExpense.description} onChangeText={txt => newExpense.description = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Date</Text>
            <View style={styles.center}>
                <DatePicker mode={"date"} date={oldExpense.date} style={styles.datePicker} onDateChange={txt => newExpense.date = txt}/>
            </View>
        </View>

        <View style={styles.inputDynamicList}>
            <Text style={styles.inputDynamicListTitle}>Spenders</Text>
            <FlatList
                data={route.params.trip.members}
                renderItem={(data) => {
                let currentSpen  = oldExpense.spenders.find(spend => spend.member.id == data.item.id);
                let currentW = currentSpen == undefined ? 0 : currentSpen.amount;
                return <View>
                    <Text style={styles.inputLabel}>{data.item.name}</Text>
                    <TextInput style={styles.inputField} inputMode={"numeric"} placeholder={"Weight"} value={currentW.toString()} onChangeText={txt => {
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
                let currentSpen  = oldExpense.payers.find(spend => spend.member.id == data.item.id);
                let currentW = currentSpen == undefined ? 0 : currentSpen.amount;
                return <View>
                    <Text style={styles.inputLabel}>{data.item.name}</Text>
                    <TextInput style={styles.inputField} inputMode={"numeric"} placeholder={"Amount Paid"} value={currentW.toString()} onChangeText={txt => {
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
                route.params.trip.expenses = route.params.trip.expenses.filter((exp: expense) => exp.id != oldExpense.id);
                route.params.trip.expenses.push(newExpense);

                route.params.trip.saveTrip();
                navigation.navigate(Pages.TripExpensesDetails, {trip: route.params.trip, expense: oldExpense})
            } else {
                console.error("Not Valid")
            }

        }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>

    </ScrollView>;
}
