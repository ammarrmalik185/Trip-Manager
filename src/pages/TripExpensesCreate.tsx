import { FlatList, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import { useState } from "react";
import expense from "../types/expense.ts";
import DatePicker from "react-native-date-picker";
import member from "../types/member.ts";
import Pages from "../types/pages.ts";
import SelectList from "react_native_simple_dropdown_select_list/src/index.tsx";
import Toast from 'react-native-simple-toast';

export default function TripExpensesCreate({navigation, route}: any){
    const [newExpense, setNewExpense] = useState(new expense());
    const [selected, setSelected] = useState<any>();
    const [data, setData] = useState<any[]>([
        { key: '1', value: 'Fuel' },
        { key: '2', value: 'Food' },
        { key: '3', value: 'Travel' },
        { key: '4', value: 'Shopping' },
        { key: '5', value: 'Eletronic' },
        { key: '6', value: 'Games' },
    ]);


    return <ScrollView style={styles.main}>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput style={styles.inputField} placeholder={"Enter Expense Title"} onChangeText={txt => newExpense.title = txt}/>
        </View>
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Category</Text>
            <SelectList  data={data}
                whatWithSelected={(value: any) => setSelected(value)}
                maxHeightList={150}
                placeholder="Select a category"
                notFoundText="Not found"
                valueToBeSaved="key"
                //optionals

                initialListValue={data[0]}
                afterSelecting={() => console.log('return function')}

                containerStyle={styles.dropDownContainer}
                containerDataStyle={styles.dropDownContainerData}
                infoFontStyle={styles.dropDownInfoText}
            />
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
                newExpense.calculateTotal();
                route.params.trip.expenses.push(newExpense);
                route.params.trip.saveTrip();
                navigation.navigate(Pages.TripExpenses, {trip: route.params.trip})
            } else {
                Toast.show("Expense is not valid", Toast.LONG);
                console.error("Not Valid")
            }

        }}><Text style={styles.acceptButtonText}>Add</Text></TouchableOpacity>

    </ScrollView>;
}
