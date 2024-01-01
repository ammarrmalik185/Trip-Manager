import {StyleSheet} from "react-native";

export default StyleSheet.create({
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
    main:{
        flex: 1,
        backgroundColor: '#310f69',
    },
    flatList: {
        marginTop: 20,
    },
    fab:{
        position: 'absolute',
        width: 60,
        height: 60,
        backgroundColor: '#5c69fa',
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
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: '#5c69fa',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    itemsHeader: {
        fontSize: 32,
        color: '#ffffff'
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center'
    },
    date: {
        fontSize: 18,
        color: 'white',
    },
    acceptButton: {
        backgroundColor: '#5e71fa',
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
    datePicker: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 20,
        height: 50
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
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
    }
})
