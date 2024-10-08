import styles from "../styles/styles.ts";
import {Modal, Text, TouchableOpacity, View} from "react-native";
import DateTimePicker, {DateType} from "react-native-ui-datepicker";
import {palette} from "../styles/colors.ts";
import {useState} from "react";

export default function DatePicker({value, onValueChanged, title="Date and Time"} : {value: Date, onValueChanged: (date: Date) => void, title?: string}){
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [date, setDate] = useState(value as DateType);

    return (
        <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>{title}</Text>
            <TouchableOpacity style={styles.inputField} onPress={() => {
                setDatePickerVisible(true);
            }}>
                <Text style={styles.dateDisplay}>{value.toLocaleString()}</Text>
            </TouchableOpacity>
            <Modal
                // style={styles.modal}
                visible={datePickerVisible}
                onRequestClose={() => setDatePickerVisible(false)}>
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                        <DateTimePicker

                            value={date}

                            selectedTextStyle={styles.datePickerSelectedText}
                            calendarTextStyle={styles.datePickerText}
                            timePickerTextStyle={styles.datePickerText}
                            todayTextStyle={styles.datePickerText}
                            headerTextStyle={styles.datePickerText}
                            weekDaysTextStyle={styles.datePickerText}
                            headerButtonColor={palette.text}
                            selectedItemColor={palette.primary}
                            yearContainerStyle={styles.datePickerYearContainer}
                            monthContainerStyle={styles.datePickerYearContainer}
                            dayContainerStyle={styles.datePickerYearContainer}
                            timePickerContainerStyle={styles.datePickerYearContainer}

                            onValueChange={setDate}

                        />
                        <TouchableOpacity style={styles.acceptButton} onPress={() => {
                            onValueChanged(new Date(date as Date));
                            setDatePickerVisible(false)}
                        }>
                            <Text style={styles.acceptButtonText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
