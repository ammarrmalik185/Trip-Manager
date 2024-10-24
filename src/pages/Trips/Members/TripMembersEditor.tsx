import {Text, TextInput, TouchableOpacity, View} from "react-native";
import member from "../../../types/member.ts";
import React, {useState} from "react";
import styles from "../../../styles/styles.ts";
import pages from "../../../types/pages.ts";
import {palette} from "../../../styles/colors.ts";
import Toast from "react-native-simple-toast";

export default function TripMembersEditor({route, navigation}: any) {
    const [currentMember, setCurrentMember] = useState<member>(route.params.member || new member());

    const [name, setName] = useState(currentMember.name);
    const [description, setDescription] = useState(currentMember.description);
    const [email, setEmail] = useState(currentMember.email);
    const [phone, setPhone] = useState(currentMember.phone);

    return (
        <View style={styles.main}>
            <View style={styles.forumView}>
                <Text style={styles.forumTitle}>Member Details</Text>
                <View style={styles.inputSection}>
                    {!name && <View style={styles.textInputError}/>}
                    <Text style={styles.inputLabel}>Name *</Text>
                    <TextInput placeholderTextColor={palette.placeholder}
                               placeholder={"Enter Member Name"}
                               style={styles.inputField}
                               value={name}
                               onChangeText={setName}/>
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput placeholderTextColor={palette.placeholder}
                               placeholder={"Enter Member Description"}
                               style={styles.inputFieldMultiLine}
                               value={description}
                               onChangeText={setDescription}
                               multiline={true}/>
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput placeholderTextColor={palette.placeholder}
                               placeholder={"Enter Member Email"}
                               style={styles.inputField}
                               value={email}
                               onChangeText={setEmail}/>
                </View>

                <View style={styles.inputSection}>
                    <Text style={styles.inputLabel}>Phone</Text>
                    <TextInput placeholderTextColor={palette.placeholder}
                               placeholder={"Enter Member Phone"}
                               style={styles.inputField}
                               value={phone}
                               onChangeText={setPhone}/>
                </View>

                <View style={{margin: 30}}>
                <TouchableOpacity style={styles.acceptButton} onPress={() => {

                    const newMember = new member();

                    newMember.id = currentMember.id;
                    newMember.name = name;
                    newMember.description = description;
                    newMember.email = email;
                    newMember.phone = phone

                    if (newMember.validate()) {
                        route.params.trip.members = route.params.trip.members.filter((exp: member) => exp.id != currentMember.id);
                        route.params.trip.members.push(newMember)
                        route.params.trip.saveTrip()
                        navigation.pop()
                        navigation.navigate(pages.TripMembersDetails, {trip: route.params.trip, member: newMember})
                    } else {
                        Toast.show(newMember.getValidationError(), Toast.LONG)
                    }

                }}><Text style={styles.acceptButtonText}>Save</Text></TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
