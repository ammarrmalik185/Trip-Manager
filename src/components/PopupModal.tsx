import React, {useEffect, useRef} from "react";
import {Text, TextInput, TouchableOpacity, View, Animated, ScrollView, Image} from "react-native";
import Modal from 'react-native-modal';
import styles from "../styles/styles.ts";
import Toast from "react-native-simple-toast";
import DatePicker from 'react-native-date-picker'
import {palette} from "../styles/colors.ts";

function getModal(modalData: ModalData, reset: boolean){

    useEffect(() => {
        if (reset) {
            //reset all values
            setConfirmationString("");
            setMultipleChoice([]);
            setDate(new Date());
        }
    }, []);

    const [confirmationString, setConfirmationString] = React.useState("");
    const [multipleChoice, setMultipleChoice] = React.useState(modalData.buttons ? modalData.buttons.map(() => false) : []);
    const [date, setDate] = React.useState(modalData.defaultValue ? modalData.defaultValue : new Date());

    switch (modalData.type){
        case ModalType.PickAButton:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <ScrollView style={styles.modalScrollView}>
                    {modalData.buttons?.map((buttonText:string, index:number) => {
                        return (
                            <TouchableOpacity key={index} style={styles.popupOptionButtonSelected} onPress={() => modalData.callback(true, index)}>
                                <Text style={styles.acceptButtonText}>{buttonText}</Text>
                            </TouchableOpacity>
                        )
                    })}
                        <View style={{height: 10}}/>
                    </ScrollView>
                    <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, null)}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                </View>
            )
        case ModalType.MultipleChoices:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <Text style={styles.modalSubtext}>Select multiple options</Text>

                    <View style={styles.modalButtonView}>
                        <TouchableOpacity style={styles.popupOptionButtonSelected} onPress={() => {
                            if (modalData.buttons) {
                                let newChoices = modalData.buttons.map(() => true);
                                setMultipleChoice([...newChoices]);
                            }
                        }}><Text style={styles.acceptButtonText}>All</Text></TouchableOpacity>

                         <TouchableOpacity style={styles.popupOptionButtonDecline} onPress={() => {
                            if (modalData.buttons) {
                                let newChoices = modalData.buttons.map(() => false);
                                setMultipleChoice([...newChoices]);
                            }
                        }}><Text style={styles.acceptButtonText}>None</Text></TouchableOpacity>
                    </View>



                    <ScrollView style={styles.modalScrollView}>
                        {modalData.buttons && modalData.buttons.map((buttonText:string, index:number) => {
                            if (multipleChoice[index]) {
                                return (
                                    <TouchableOpacity key={index} style={styles.popupOptionButtonSelected} onPress={() => {
                                        let newChoices = multipleChoice;
                                        newChoices[index] = false;
                                        setMultipleChoice([...newChoices]);
                                    }}>
                                        <Text style={styles.acceptButtonText}>{buttonText}</Text>
                                    </TouchableOpacity>
                                )
                            }else{
                                return (
                                    <TouchableOpacity key={index} style={styles.popupOptionButton} onPress={() => {
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

                    <Text style={styles.modalSubtext}>{modalData.buttons?.reduce((curr: number, _, index: number) => multipleChoice[index] ? curr + 1 : curr,  0)} Selected</Text>

                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, [])}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true, multipleChoice)}><Text style={styles.acceptButtonText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            )
        case ModalType.Information:
            return (
                <View>
                    <View style={styles.center}>
                        <Image
                            source={require('../images/uiImages/info.png')}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <TouchableOpacity style={styles.acceptButton} onPress={() => modalData.callback()}><Text style={styles.acceptButtonText}>OK</Text></TouchableOpacity>
                </View>
            )
        case ModalType.Warning:
            return (
                <View>
                    <View style={styles.center}>
                        <Image
                            source={require('../images/uiImages/warning.png')}
                            style={styles.icon}
                        />
                    </View>
                    <Text style={styles.modalText}>Warning: {modalData.message}</Text>
                    <TouchableOpacity style={{...styles.acceptButton, backgroundColor: "rgb(189,158,58)"}} onPress={() => modalData.callback()}><Text style={styles.acceptButtonText}>OK</Text></TouchableOpacity>
                </View>
            );
        case ModalType.Error:
            return (
                <View>
                    <View style={styles.center}>
                        <Image
                            source={require('../images/uiImages/error.png')}
                            style={styles.icon}
                        />
                    </View>
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
                    <DatePicker theme={"dark"} style={{alignSelf: "center"}} mode="date" date={modalData.defaultValue ? modalData.defaultValue : new Date()} onDateChange={setDate}/>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, null)}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true, date)}><Text style={styles.acceptButtonText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            )
        case ModalType.Time:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <Text style={styles.modalSubtext}>Pick a time</Text>
                    <DatePicker theme={"dark"} style={{alignSelf: "center"}} mode="time" date={date} onDateChange={setDate}/>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, null)}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true, date)}><Text style={styles.acceptButtonText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            )
        case ModalType.DateTime:
            return (
                <View>
                    <Text style={styles.modalText}>{modalData.message}</Text>
                    <DatePicker theme={"dark"} style={{alignSelf: "center"}} mode="datetime" date={date} onDateChange={setDate}/>
                    <View style={styles.horizontalStack}>
                        <TouchableOpacity style={styles.declineButtonMax} onPress={() => modalData.callback(false, null)}><Text style={styles.acceptButtonText}>Cancel</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.acceptButtonMax} onPress={() => modalData.callback(true, date)}><Text style={styles.acceptButtonText}>Confirm</Text></TouchableOpacity>
                    </View>
                </View>
            )
    }
}

export default function PopupModal({state, modalData}:{state:boolean, modalData:ModalData}) {

    const [oldModalData, setOldModalData] = React.useState(modalData);

    let reset;
    if (modalData != oldModalData) {
        reset = true;
        setOldModalData(modalData);
    }else{
        reset = false;
    }

    return (
        <Modal isVisible={state} animationIn={"slideInUp"} animationOut={"slideOutDown"} backdropColor={"rgba(0,0,0, 1)"} onBackButtonPress={() => modalData.callback(false)}>
            <View style={styles.modalView}>
                {getModal(modalData, reset)}
            </View>
        </Modal>
    );
}

export class ModalData{

    type: ModalType;
    message:string;

    callback:Function;

    buttons:string[] | undefined;
    confirmationString:string | undefined;
    defaultValue: any | undefined;

    constructor(type:ModalType, message:string, callback:Function, buttons?:string[], confirmationString?:string, defaultValue?:any){
        this.type = type;
        this.message = message;
        this.buttons = buttons;
        this.confirmationString = confirmationString;
        this.callback = callback;
        this.defaultValue = defaultValue;
    }

}

export enum ModalType{
    PickAButton,
    MultipleChoices,
    Information,
    Warning,
    Error,
    HardConfirmation,
    SoftConfirmation,
    Date,
    Time,
    DateTime
}
