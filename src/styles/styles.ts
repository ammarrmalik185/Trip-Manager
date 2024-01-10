import {StyleSheet} from "react-native";
import * as url from "node:url";

export default StyleSheet.create({

    // input fields

    inputField: {
        height: 40,
        margin: 12,
        padding: 10,
        marginTop: 5,
        backgroundColor: "#ffffff",
        color: "#000000",
        borderRadius: 10,
        marginBottom: 5
    },
    inputFieldMultiLine: {
        height: 80,
        margin: 12,
        padding: 10,
        marginTop: 5,
        backgroundColor: "#ffffff",
        color: "#000000",
        borderRadius: 10,
    },
    inputLabel: {
        marginLeft: 20,
        marginTop: 12,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
    },
    inputSection: {
        margin: 0
    },
    inputDynamicList:{
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        margin: 12,
        padding: 20
    },
    inputDynamicListTitle:{
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 30,
    },
    datePicker: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        height: 50
    },
    dropDownContainer:{
        borderColor: 'white',
        flex: 1,
        width: "auto",
        marginHorizontal: 12,
        backgroundColor: "white"
    },
    dropDownContainerData:{
        width: "auto",
        marginHorizontal: 20,
        borderColor: 'white',
        backgroundColor: "white"
    },
    dropDownInfoText: {
        fontSize: 18,
        color: "black"
    },
    
    // containers

    main:{
        flex: 1,
        backgroundColor: '#4169e1'
    },
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: '#9f69fa',
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
        justifyContent: "space-between"
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

    // buttons

    flatList: {
        marginTop: 15,
    },
    fab:{
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: '#9f69fa',
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
        borderRadius: 30,
        elevation: 8
    },
    fabText:{
        fontSize: 30,
        color: 'white',
    },
    acceptButton: {
        backgroundColor: '#9f69fa',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 50,
        borderRadius: 10,
    },
    acceptButtonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },

    // texts

    itemsHeader: {
        fontWeight: "bold",
        fontSize: 25,
        color: '#ffffff'
    },
    itemsHeaderRight: {
       alignSelf: "center",
        fontSize: 20,
        color: '#ffffff'
    },
    itemText:{
        fontSize: 20,
        color: 'rgba(255, 255, 255, 0.8)'
    },
    title: {
        fontSize: 35,
        color: '#ffffff',
        textAlign: 'center'
    },
    date: {
        fontSize: 15,
        color: 'white',
    },
    rightBoxMain:{
        textAlign:"center",
        color: "white",
        fontSize: 30
    },
    rightBoxSub:{
        textAlign:"center",
        color: "white",
        fontSize: 12
    }

})
