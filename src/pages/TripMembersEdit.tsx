import {Text, TextInput, TouchableOpacity, View} from "react-native";
import member from "../types/member.ts";
import {useState} from "react";
import styles from "../styles/styles.ts";
import pages from "../types/pages.ts";
import {palette} from "../styles/colors.ts";

export default function TripMembersEdit({route, navigation}: any){
    const [oldMember, setOldMember] = useState<member>(route.params.member);
    const [name, setName] = useState(oldMember.name);

    return (
        <View style={styles.main}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput placeholderTextColor={palette.placeholder} style={styles.inputField} value={name} onChangeText={setName}/>

            <TouchableOpacity style={styles.acceptButton} onPress={() => {

                const newMember = new member();

                newMember.id = oldMember.id;
                newMember.name = name;

                route.params.trip.members = route.params.trip.members.filter((exp: member) => exp.id != oldMember.id);
                route.params.trip.members.push(newMember)
                route.params.trip.saveTrip()

                navigation.navigate(pages.TripMembers, {trip: route.params.trip})

            }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>
        </View>
        )
}
