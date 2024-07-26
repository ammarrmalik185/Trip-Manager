import {FlatList, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import React, {useState} from "react";
import {singleExpense} from "../types/singleExpense.ts";
import {palette} from "../styles/colors.ts";
import {SelectList} from "react-native-dropdown-select-list";
import {expenseTypes} from "../types/expensetypes.ts";
import DatePicker from "../components/DatePicker.tsx";
import member from "../types/member.ts";
import Toast from "react-native-simple-toast";

export default function SingleExpensesEdit({route, navigation}:{route:any, navigation:any}){

    const [oldExpense, setOldExpense] = useState<singleExpense>(route.params.singleExpense);

    const [title, setTitle] = useState(oldExpense.title);
    const [category, setCategory] = useState(oldExpense.category);
    const [date, setDate] = useState<Date>(oldExpense.date);
    const [description, setDescription] = useState(oldExpense.description);
    const [members, setMembers] = useState(oldExpense.members)
    const [payers, setPayers] = useState(oldExpense.payers);
    const [spenders, setSpenders] = useState(oldExpense.spenders);

    const [refresh, setRefresh] = useState(false);

    return (
        <ScrollView style={styles.main}>

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
                <Text style={styles.inputDynamicListTitle}>Members</Text>
                <FlatList
                    data={members}
                    extraData={spenders}
                    renderItem={(data) => {
                        return <View>
                            <View style={styles.horizontalStack}>
                                <TextInput
                                    value={data.item.name}
                                    style={styles.inputFieldMax}
                                    placeholderTextColor={palette.placeholder}
                                    inputMode={"text"}
                                    placeholder={"Name"}
                                    onChangeText={txt => {
                                        data.item.name = txt;
                                        setMembers([...members])
                                    }}
                                />
                                <TouchableOpacity style={styles.subtractButton} onPress={() => {

                                    // oldExpense.members = members.filter(member => member.id != data.item.id);
                                    // oldExpense.payers = payers.filter(payer => payer.member.id != data.item.id);
                                    // oldExpense.spenders = spenders.filter(spender => spender.member.id != data.item.id);

                                    setMembers(members.filter(member => member.id != data.item.id));
                                    setPayers(payers.filter(payer => payer.member.id != data.item.id));
                                    setSpenders(spenders.filter(spender => spender.member.id != data.item.id));

                                }}><Text style={styles.acceptButtonText}>-</Text></TouchableOpacity>
                            </View>
                        </View>
                    }}
                />
                <TouchableOpacity style={styles.acceptButton} onPress={() => {
                    members.push(new member())
                    setRefresh(!refresh);
                }}><Text style={styles.acceptButtonText}>+</Text></TouchableOpacity>
            </View>
            <View style={styles.inputDynamicList}>
                <Text style={styles.inputDynamicListTitle}>Spenders</Text>
                <FlatList
                    data={members}
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
                    data={members}
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

                let newExpense = new singleExpense();

                newExpense.id = oldExpense.id;

                newExpense.title = title;
                newExpense.description = description;
                newExpense.category = category;
                newExpense.date = date;
                newExpense.spenders = spenders;
                newExpense.payers = payers;
                newExpense.members = members;

                if (newExpense.validate()){
                    newExpense.calculateTotal();
                    newExpense.saveSingleExpense().then(() => navigation.navigate(pages.SingleExpenseOverview, {singleExpense: newExpense}));
                } else {
                    Toast.show("Expense not valid", Toast.SHORT)
                }

            }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>


        </ScrollView>
    );
}
