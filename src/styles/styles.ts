import {StyleSheet} from "react-native";
import * as url from "node:url";
import { palette } from "./colors.ts";

export default StyleSheet.create({

    // input fields

    inputField: {
        borderWidth: 1,
        borderColor: palette.border,
        height: 40,
        margin: 12,
        padding: 10,
        marginTop: 5,
        backgroundColor: palette.card,
        color: palette.text,
        borderRadius: 10,
        marginBottom: 5,

    },
    inputFieldMax: {
        borderWidth: 1,
        borderColor: palette.border,
        height: 40,
        margin: 12,
        padding: 10,
        marginTop: 5,
        backgroundColor: palette.card,
        color: palette.text,
        borderRadius: 10,
        marginBottom: 5,
        flex: 1
    },
    inputFieldMultiLine: {
        borderWidth: 1,
        borderColor: palette.border,
        height: 80,
        margin: 12,
        padding: 10,
        marginTop: 5,
        backgroundColor: palette.card,
        color: palette.text,
        borderRadius: 10,
    },
    inputLabel: {
        marginLeft: 20,
        marginTop: 12,
        fontSize: 20,
        fontWeight: "bold",
        color: palette.text,
    },
    inputSection: {
        margin: 0
    },
    inputDynamicList:{
        borderRadius: 10,
        backgroundColor: palette.card,
        margin: 12,
        padding: 20
    },
    inputDynamicListTitle:{
        color: palette.text,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 30,
    },
    datePicker: {
        backgroundColor: palette.card,
        borderRadius: 20,
        height: 50,
        color: palette.text
    },
    datePickerSelectedText:{
        color: palette.text,
    },
    datePickerText:{
        color: palette.text
    },
    dropDownContainer:{
        borderWidth: 1,
        borderColor: palette.border,
        flex: 1,
        width: "auto",
        margin: 12,
        backgroundColor: palette.card
    },
    dropDownContainerData:{
        width: "auto",
        marginHorizontal: 20,
        borderColor: palette.border,
        backgroundColor: palette.card
    },
    dropDownInfoText: {
        fontSize: 12,
        color: palette.text
    },
    // containers

    main:{
        flex: 1,
        backgroundColor: palette.background
    },
    detailsDisplay:{
        backgroundColor: palette.background,
        marginVertical: 20,
        marginHorizontal: 30
    },
    buttonsContainer:{
        position: "absolute",
        left: 30,
        right: 30,
        bottom: 30
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: palette.card,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalStack:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    horizontalStackContained:{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: palette.border,
        marginVertical: 5,
        borderRadius: 15,
        padding: 10,
        alignItems: "center"
    },
    imageItem:{
        flexDirection: "row"
    },
    rightBox:{
        right: 5,
        width: 70,
        height: 90,
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
    },
    modal:{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: palette.background,
    },
    modalView: {
        margin: 35,
        display: "flex",
        marginTop: "auto",
        marginBottom: "auto",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: palette.card,
        color: palette.text,
        borderRadius: 20,
        padding: 20,
        shadowColor: palette.border,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    numericAssistedField:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },

    // buttons

    flatList: {
        marginTop: 15,
        marginBottom: 15
    },
    fab:{
        position: 'absolute',
        width: 50,
        height: 50,
        backgroundColor: palette.primary,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 30,
        elevation: 8
    },
    fabNegative:{
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: palette.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 30,
        elevation: 8
    },
    fabLeft:{
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: palette.primary,
        alignItems: 'center',
        justifyContent: 'center',
        right: 100,
        bottom: 30,
        borderRadius: 30,
        elevation: 8
    },
    fabTop:{
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: palette.primary,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 100,
        borderRadius: 30,
        elevation: 8
    },
    fabTopSmall:{
        position: 'absolute',
        width: 30,
        height: 30,
        backgroundColor: palette.primary,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 95,
        borderRadius: 30,
        elevation: 8
    },
    fabTopSmall2:{
        position: 'absolute',
        width: 30,
        height: 30,
        backgroundColor: palette.primary,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 130,
        borderRadius: 30,
        elevation: 8
    },
    fabText:{
        fontSize: 30,
        color: palette.text,
    },
    fabTextSmall:{
        fontSize: 15,
        color: palette.text,
    },
    acceptButton: {
        backgroundColor: palette.primary,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowRadius: 4,
        shadowColor: palette.secondary,
        shadowOpacity: 0.25,
    },
    acceptButtonMax: {
        backgroundColor: palette.primary,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowRadius: 4,
        shadowColor: palette.secondary,
        shadowOpacity: 0.25,
        flex: 1
    },
    declineButton:{
        backgroundColor: palette.secondary,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
    },
    acceptButtonText: {
        fontSize: 20,
        color: palette.text,
        textAlign: 'center',
    },

    addButtonInline:{
        width: 40,
        height: 40,
        marginHorizontal: 5,
        backgroundColor: palette.primary,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    addButton:{
        width: 40,
        height: 40,
        margin: 5,
        backgroundColor: palette.primary,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    addButtonSmall:{
        width: 30,
        height: 30,
        margin: 5,
        backgroundColor: palette.primary,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    subtractButton:{
        width: 40,
        height: 40,
        margin: 5,
        backgroundColor: palette.secondary,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },
    subtractButtonSmall:{
        width: 30,
        height: 30,
        margin: 5,
        backgroundColor: palette.secondary,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center"
    },

    // texts

    itemsHeader: {
        fontWeight: "bold",
        fontSize: 25,
        color: palette.text
    },
    itemsHeaderRight: {
       alignSelf: "center",
        fontSize: 20,
        color: palette.text
    },
    itemText:{
        fontSize: 20,
        color: palette.text
    },
    title: {
        fontSize: 35,
        margin: 10,
        marginBottom: 0,
        color: palette.text,
        textAlign: 'center'
    },
    subTitle:{
        fontSize: 20,
        color: palette.text,
        opacity: 0.7,
        textAlign: 'center'
    },
    description:{
        color: palette.text,
        maxHeight: 90
    },
    date: {
        fontSize: 15,
        color: palette.text,
    },
    dateDisplay:{
        fontSize: 15,
        opacity: 0.7,
        color: palette.text,
        textAlign: "center"
    },
    rightBoxMain:{
        textAlign:"center",
        color: palette.text,
        fontSize: 30
    },
    rightBoxSub:{
        textAlign:"center",
        color: palette.text,
        fontSize: 12
    }

})
