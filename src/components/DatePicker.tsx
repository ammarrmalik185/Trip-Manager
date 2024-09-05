import styles from "../styles/styles.ts";
import {Modal, Text, TouchableOpacity, View} from "react-native";
import {DateType} from "react-native-ui-datepicker";
import {useState} from "react";
import PopupModal, {ModalData, ModalType} from "./PopupModal.tsx";

export default function DatePicker({value, onValueChanged, title="Date and Time"} : {value: Date, onValueChanged: (date: Date) => void, title?: string}){
    const [datePickerVisible, setDatePickerVisible] = useState(false);

    return (
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>{title}</Text>
            <TouchableOpacity style={styles.inputField} onPress={() => {
                setDatePickerVisible(true);
            }}>
                <Text style={styles.dateDisplay}>{value.toLocaleString()}</Text>
            </TouchableOpacity>

            <PopupModal state={datePickerVisible} modalData={new ModalData(ModalType.DateTime, "Select Date and Time", (success: boolean, data: Date) => {
                if (success){
                    onValueChanged(data);
                }
                setDatePickerVisible(false);
            })}/>
        </View>
    );
}
