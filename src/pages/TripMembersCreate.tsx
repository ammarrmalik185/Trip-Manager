import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "../styles/styles.ts";
import {useState} from "react";
import member from "../types/member.ts";
import {palette} from "../styles/colors.ts";
import Toast from "react-native-simple-toast";
import pages from "../types/pages.ts";

export default function TripMembersCreate({navigation, route}:any) {
    const [newMember, setMember] = useState<member>(new member());

    return (
        <View style={styles.main}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput placeholderTextColor={palette.placeholder} style={styles.inputField} onChangeText={txt => newMember.name = txt}/>

            <Text style={styles.inputLabel}>Description</Text>
            <TextInput placeholderTextColor={palette.placeholder} style={styles.inputFieldMultiLine} onChangeText={txt => newMember.description = txt}/>

            <Text style={styles.inputLabel}>Email</Text>
            <TextInput placeholderTextColor={palette.placeholder} style={styles.inputField} onChangeText={txt => newMember.email = txt}/>

            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput placeholderTextColor={palette.placeholder} style={styles.inputField} onChangeText={txt => newMember.phone = txt}/>


            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                if (newMember.validate()){
                    route.params.trip.members.push(newMember)
                    route.params.trip.saveTrip()
                    navigation.navigate(pages.TripMembers, {trip: route.params.trip})
                }else{
                    Toast.show(newMember.getValidationError(), Toast.LONG)
                }

            }}><Text style={styles.acceptButtonText}>Add</Text></TouchableOpacity>
        </View>
    )
}

