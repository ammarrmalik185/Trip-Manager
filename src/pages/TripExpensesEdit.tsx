import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import { useState } from "react";
import log from "../types/log.ts";
import DatePicker from "react-native-date-picker";
import Pages from "../types/pages.ts";
import expense from "../types/expense.ts";
import member from "../types/member.ts";
import Toast from "react-native-simple-toast";

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
            <TextInput style={styles.inputField} placeholder={"Enter Expense Title"} value={title} onChangeText={setTitle}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Category</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Expense Catagory"} value={category} onChangeText={setCategory}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Description"} value={description} onChangeText={setDescription}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Date</Text>
            <View style={styles.center}>
                <DatePicker mode={"date"} date={date} style={styles.datePicker} onDateChange={setDate}/>
            </View>
        </View>

        <View style={styles.inputDynamicList}>
            <Text style={styles.inputDynamicListTitle}>Spenders</Text>
            <FlatList
                data={route.params.trip.members}
                extraData={spenders}
                renderItem={(data) => {
                    let currentSpen  = spenders.find(spend => spend.member.id == data.item.id);
                    let currentW = currentSpen == undefined ? 0 : currentSpen.amount;
                    return <View>
                        <Text style={styles.inputLabel}>{data.item.name}</Text>
                        <TextInput style={styles.inputField} inputMode={"numeric"} placeholder={"Weight"} value={currentW.toString()} onChangeText={txt => {
                            let spender = spenders.find(item => item.member.id == data.item.id);
                            if(spender){
                                spender.amount = parseFloat(txt) || 0;
                                setSpenders([...spenders])
                            }else{
                                setSpenders([...spenders, {member: data.item as member, amount: parseFloat(txt) || 0}])
                            }
                        }}/>
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
                    <TextInput style={styles.inputField} inputMode={"numeric"} placeholder={"Amount Paid"} value={currentW.toString()} onChangeText={txt => {
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

                navigation.navigate(Pages.TripExpensesDetails, {trip: route.params.trip, expense: newExpense})
            } else {
                Toast.show("Expense not valid", Toast.SHORT)
            }

        }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>

    </ScrollView>;
}
