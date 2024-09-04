import React, {useEffect, useRef} from "react";
import {Text, TextInput, TouchableOpacity, View, Animated, ScrollView} from "react-native";
import styles from "../styles/styles.ts";
import Toast from "react-native-simple-toast";
import DatePicker from 'react-native-date-picker'

function getModal(modalData: ModalData){
    const [confirmationString, setConfirmationString] = React.useState("");
    const [multipleChoice, setMultipleChoice] = React.useState(modalData.buttons.map(() => false));

    switch (modalData.type){
        case ModalType.PickAButton:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <ScrollView style={styles.modalScrollView}>
                    {modalData.buttons.map((buttonText:string, index:number) => {
                        return (
                            <TouchableOpacity key={index} style={styles.acceptButton} onPress={() => modalData.callback(true, index)}>
                                <Text style={styles.acceptButtonText}>{buttonText}</Text>
                            </TouchableOpacity>
                        )
                    })}
                    </ScrollView>
                    <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, null)}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                </View>
            )
        case ModalType.MultipleChoices:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <Text style={styles.modalSubtext}>Select multiple options</Text>
                    <ScrollView style={styles.modalScrollView}>
                        {modalData.buttons.map((buttonText:string, index:number) => {
                            if (multipleChoice[index]) {
                                return (
                                    <TouchableOpacity key={index} style={styles.acceptButton} onPress={() => {
                                        let newChoices = multipleChoice;
                                        newChoices[index] = false;
                                        setMultipleChoice([...newChoices]);
                                    }}>
                                        <Text style={styles.acceptButtonText}>{buttonText}</Text>
                                    </TouchableOpacity>
                                )
                            }else{
                                return (
                                    <TouchableOpacity key={index} style={styles.declineButton} onPress={() => {
                                        let newChoices = multipleChoice;
                                        newChoices[index] = true;
                                        setMultipleChoice([...newChoices]);
                                    }}>
                                        <Text style={styles.acceptButtonText}>{buttonText}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })}
                    </ScrollView>

                    <Text style={styles.modalSubtext}>Selected: {modalData.buttons.filter((_, index) => multipleChoice[index]).join(", ")}</Text>

                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, [])}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true, multipleChoice)}><Text style={styles.acceptButtonText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            )
        case ModalType.Information:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => modalData.callback()}><Text style={styles.acceptButtonText}>OK</Text></TouchableOpacity>
                </View>
            )
        case ModalType.Error:
            return (
                <View>
                    <Text style={styles.modalText}>Error: {modalData.message}</Text>
                    <TouchableOpacity style={styles.declineButton} onPress={() => modalData.callback()}><Text style={styles.acceptButtonText}>OK</Text></TouchableOpacity>
                </View>
            )
        case ModalType.HardConfirmation:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <Text style={styles.modalSubtext}>Please enter "{modalData.confirmationString}" to confirm</Text>
                    <TextInput style={styles.inputField} value={confirmationString} onChangeText={setConfirmationString} />
                    <View style={styles.horizontalStack}>

                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false)}><Text style={styles.acceptButtonText}>No</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => {
                            if (confirmationString !== modalData.confirmationString) {
                                Toast.show("Confirmation string does not match", Toast.SHORT);
                                return;
                            }
                            modalData.callback(true)
                        }}><Text style={styles.acceptButtonText}>Yes</Text></TouchableOpacity>
                    </View>
                </View>
            )
        case ModalType.SoftConfirmation:
            return (
                <View style={{width: "100%"}}>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false)}><Text style={styles.acceptButtonText}>No</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true)}><Text style={styles.acceptButtonText}>Yes</Text></TouchableOpacity>
                    </View>
                </View>
            )
        case ModalType.Date:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <Text style={styles.modalSubtext}>Pick a date</Text>
                    <DatePicker theme={"dark"} style={{alignSelf: "center"}} mode="date" date={new Date(Date.now())}/>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, [])}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true, multipleChoice)}><Text style={styles.acceptButtonText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            )
        case ModalType.Time:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <Text style={styles.modalSubtext}>Pick a time</Text>
                    <DatePicker theme={"dark"} style={{alignSelf: "center"}} mode="time" date={new Date(Date.now())}/>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, [])}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true, multipleChoice)}><Text style={styles.acceptButtonText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            )
        case ModalType.DateTime:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <Text style={styles.modalSubtext}>Pick a date and time</Text>
                    <DatePicker theme={"dark"} style={{alignSelf: "center"}} mode="datetime" date={new Date(Date.now())}/>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, [])}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true, multipleChoice)}><Text style={styles.acceptButtonText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            )
    }
}

export default function PopupModal({state, modalData}:{state:boolean, modalData:ModalData}){

    const slideAnim = useRef(new Animated.Value(1000)).current;

    const [internalState, setInternalState] = React.useState(false);

    useEffect(() => {
        if (state) {
            setInternalState(true)
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: 1000,
                duration: 500,
                useNativeDriver: true,
            }).start(()=> {
                console.log("Setting internal state to false")
                setInternalState(false)
            })

        }
    }, [state]);




    return (
        <View style={{...styles.modal, display: internalState ? "flex" : "none"}}>
            <Animated.View style={{width: "100%", height: "100%", transform: [{ translateY: slideAnim }]}}>
                <ScrollView style={styles.modalView}>
                    {getModal(modalData)}
                </ScrollView>
            </Animated.View>
        </View>
    );
}

export class ModalData{

    type: ModalType;
    message:string;

    buttons:string[];
    confirmationString:string;

    callback:Function;

    constructor(type:ModalType, message:string, callback:Function, buttons:string[] = [], confirmationString:string = ""){
        this.type = type;
        this.message = message;
        this.buttons = buttons;
        this.confirmationString = confirmationString;
        this.callback = callback;
    }

}

export enum ModalType{
    PickAButton,
    MultipleChoices,
    Information,
    Error,
    HardConfirmation,
    SoftConfirmation,
    Date,
    Time,
    DateTime
}
