import { FlatList, Text, View } from "react-native";
import expense from "../types/expense.ts";
import member from "../types/member.ts";
import styles from "../styles/styles.ts";

export default function TripExpensesSettle({navigation, route}: any){
    let calculations = route.params.trip.expenses.map((item:expense) => item.calculate())
    let settlements: {member: member, amount: number}[] = [];

    calculations.forEach((calc: {member: member, amount: number}[]) => {
        calc.forEach((singleCalc: {member: member, amount: number}) => {
            let foundSettlement = settlements.find(settlement => settlement.member.id == singleCalc.member.id);
            if (foundSettlement){
                foundSettlement.amount += singleCalc.amount;
            }else{
                settlements.push({member: singleCalc.member, amount: singleCalc.amount})
            }
        })
    })

    return (
        <View style={styles.main}>
            <FlatList style={styles.flatList} data={settlements} renderItem={data => {
                console.log(data.item)
                return (<Text>{data.item.member.name} owes {data.item.amount}</Text>);
            }}/>
        </View>
    )
}
