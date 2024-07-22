import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "../styles/styles.ts";
import { useState } from "react";
import member from "../types/member.ts";
import { trip } from "../types/trip.ts";
import { palette } from "../styles/colors.ts";

export default function TripMembersCreate({navigation, route}:any) {
    const [newMember, setMember] = useState<member>(new member());
    return (
        <View style={styles.main}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput placeholderTextColor={palette.placeholder} style={styles.inputField} onChangeText={txt => newMember.name = txt}/>

            <TouchableOpacity style={styles.acceptButton} onPress={() => {
                route.params.trip.members.push(newMember)
                route.params.trip.saveTrip()
                navigation.goBack()
            }}><Text style={styles.acceptButtonText}>Add</Text></TouchableOpacity>
        </View>
    )
}

