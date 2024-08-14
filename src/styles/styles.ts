import {StyleSheet} from "react-native";
import {palette} from "./colors.ts";
import extractGradient from "react-native-svg/lib/typescript/lib/extract/extractGradient";

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
    verticalStack:{
        flexDirection: "column",
        justifyContent: "space-evenly"
    },
    horizontalStack:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    horizontalStackSpaced:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    horizontalStackCentered:{
        flexDirection: "row",
        justifyContent: "center",
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
    appIconMedium:{
        flexDirection: "row",
        width: 80,
        height: 80,
        marginBottom: 10,
        alignSelf: "center"
    },
    appIconSmall:{
        width: 30,
        height: 30,
        alignSelf: "center"
    },
    rightBox:{
        right: 5,
        width: 80,
        height: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
    },
    modal:{
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 100
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
        minHeight: 100,
        minWidth: 300
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
    declineButtonMax:{
        backgroundColor: palette.secondary,
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowRadius: 4,
        shadowColor: palette.secondary,
        shadowOpacity: 0.25,
        flex: 1
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
        margin: 40,
        marginBottom: 20,
        color: palette.text,
        textAlign: 'center',
        fontWeight: "bold"
    },
    subTitle:{
        fontSize: 20,
        color: palette.text,
        opacity: 0.7,
        textAlign: 'center'
    },
    description:{
        color: palette.text,
        maxHeight: 90,
        textAlign: "center",
        padding: 20,
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
    },


    // New Styles
    backgroundImage:{
        flex: 1,
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    gradient:{
        position: "absolute",
        height: "100%",
        left: 0,
        right: 0,
        bottom: 0,
    },
    icon:{
        width: 40,
        height: 40,
        resizeMode: "center"
    },
    iconTextGroup:{
        alignItems: "center",
        justifyContent: "center",
        margin: 10,
        width: 90
    },
    iconText:{
        color: palette.text,
        opacity: 0.7,
        fontSize: 12
    },
    neutralButton:{
        width: "40%",
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 25,
        borderRadius: 10,
        margin: 5,
    },
    bottom:{
        position: "absolute",
        bottom: 20,
        width: "100%",
    },
    modalText:{
        color: palette.text,
        fontSize: 20,
        padding: 20,
        paddingHorizontal: 40,
        textAlign: "center"
    },
    modalSubtext:{
        color: palette.text,
        fontSize: 15,
        textAlign: "center",
        opacity: 0.9
    },
    memberImage:{
        alignSelf: "center",
        width: 200,
        height: 200,
        borderRadius: 100,
        margin: 30,
        resizeMode: "cover",
    },
    memberImageSmall:{
        width: 50,
        height: 50,
        borderRadius: 100,
        resizeMode: "cover",
    },
    memberTitle:{
        color: palette.text,
        fontSize: 30,
        textAlign: "center",
    },
    memberSubTitle:{
        color: palette.text,
        fontSize: 12,
        opacity: 0.5,
        textAlign: "center",
    },
    memberGreenSide:{
        padding: 15,
        width: "40%",
        alignItems: "center"
    },
    memberGreenSideBackground:{
        backgroundColor: palette.primary,
        opacity: 0.5,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        ...StyleSheet.absoluteFillObject,
    },
    memberNeutralSideBackground:{
        backgroundColor: palette.card,
        opacity: 0.5,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        ...StyleSheet.absoluteFillObject,
    },
    memberNeutralSide:{
        alignSelf: "center",
        padding: 15,
        width: "50%",

        alignItems: "center"
    },
    memberRedSide:{
        padding: 15,
        width: "40%",
        alignItems: "center"
    },
    memberRedSideBackground:{
        backgroundColor: palette.secondary,
        opacity: 0.5,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        ...StyleSheet.absoluteFillObject,
    },
    memberNeutralSideTextGreen:{
        color: palette.primary,
        fontSize: 30
    },
    memberNeutralSideTextRed:{
        color: palette.secondary,
        fontSize: 30
    },
    memberGreenSideText:{
        color: palette.primary,
        fontSize: 25,
    },
    memberRedSideText:{
        color: palette.secondary,
        fontSize: 25
    },
    expenseTitle:{
        color: palette.text,
        fontSize: 30,
        textAlign: "center",
        margin: 20,

    },
    expenseGreenBackground:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: palette.primary,
        opacity: 0.5,
        borderRadius: 10,
    },
    expenseRedBackground:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: palette.secondary,
        opacity: 0.5,
        borderRadius: 10,
    },
    expenseContainer:{
        padding: 10,
        margin: 10,
        borderRadius: 10,
        width: "90%",
        alignSelf: "center",
        height: "45%"
    },
    expenseContainerTitle:{
        color: palette.text,
        fontSize: 20,
        textAlign: "center",
        margin: 5,
    },
    expenseContainerDescription:{
        color: palette.text,
        fontSize: 15,
        textAlign: "center",
        marginHorizontal: 15,
        marginVertical: 5

    },
    expenseGreenContainerItem:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 3,
        marginHorizontal: 10,
        backgroundColor: palette.primary,
        borderRadius: 5,
    },
    expenseRedContainerItem:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 3,
        marginHorizontal: 10,
        backgroundColor: palette.secondary,
        borderRadius: 5,
    },
    expenseContainerItemPrice:{
        width: "35%",
        textAlign: "center",
        backgroundColor: "rgba(32, 32, 32, 0.2)",
        color: palette.text,
        fontSize: 15,
        borderRadius: 5,
        height:"100%",
        paddingVertical: 5
    },
    expenseContainerItemTitle:{
        color: palette.text,
        fontSize: 15,
        margin: 5,
    },
    settlementItem:{
        paddingVertical: 10,
        backgroundColor: palette.card,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    settlementCenterContainer:{
        width: "40%"
    },
    settlementIconGroup:{
       alignItems: "center",
        justifyContent: "center",
        width: "30%",
    },
    settlementUserImage:{
        width: 60,
        height: 60,
        borderRadius: 100
    },
    settlementUserText:{
        marginTop: 5,
        fontSize: 12,
        color: palette.text,
        textAlign: "center"
    },
    settlementAmount:{
        fontSize: 30,
        fontWeight: "bold",
        color: palette.text,
        textAlign: "center"
    },
    settlementArrowImage:{
        width: 90,
        height: 30,
        margin: 10,
        resizeMode: "stretch",
        alignSelf: "center"
    },
    settlementSendNotification:{
        color: palette.text,
        opacity: 0.8,
        textDecorationStyle: "solid",
        textDecorationLine: "underline",
        textDecorationColor: palette.text,
        textAlign: "center",
        fontSize: 12
    },
    header:{
        flexDirection: "row",
        alignItems: "center",
        height: 40,
    },
    headerTitle:{
        fontSize: 18,
        fontWeight: 'bold',
        color: palette.text,
        textAlign: "center",
        margin: 5
    },
    headerTitleStack:{
        flexDirection: "row",
        position: "absolute",
        left: 20,
        right: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    headerMenu:{
        width: 20,
        height: 20,
        resizeMode: "center",
        margin: 5,
    },

    tripListItem:{
        backgroundColor: palette.card,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        paddingLeft: 20,
    },
    tripListHeader:{
        color: palette.text,
        fontSize: 45
    },
    tripListSubheader:{
        color: palette.text,
        fontSize: 15,
        opacity: 0.5
    },
    tripListIcon:{
        marginTop: 20,
        width: 50,
        height: 50,
        alignItems: "center",
        alignSelf: "center",
        resizeMode: "contain"
    },
    tripListIconText:{
        color: palette.text,
        fontSize: 20,
        textAlign: "center"
    },
    tripListBackground:{
        ...StyleSheet.absoluteFillObject,
        position: "absolute",
        resizeMode: "cover",
        overflow: "hidden",
        borderRadius: 10,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    tripListBackgroundImage:{
        ...StyleSheet.absoluteFillObject,
        resizeMode: "cover",
        width: "100%",
        height: "100%",
    },
    logListItem:{
        borderRadius: 10,
        padding: 10,
        margin: 10,
        marginVertical: 0,
        paddingVertical: 0,
        paddingLeft: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    logListText:{
        color: palette.text,
        fontSize: 20,
    },
    logListItemImage:{
        width: 50,
        height: 75,
        resizeMode: "stretch",
    },
    logListItemSubimage:{
        width: 20,
        height: 20,
        resizeMode: "stretch",
    },
    memberListHeader:{
        marginLeft: 10,
        color: palette.text,
        fontSize: 20
    },
     memberListSubHeader:{
        marginLeft: 10,
        color: palette.text,
        fontSize: 15,
        opacity: 0.5
    },

    expenseAmountListItemImage:{
        width: 50,
        height: 50,
        resizeMode: "cover",
    },
    expenseAmountListItemImageRound:{
        width: 50,
        height: 50,
        borderRadius: 100,
        resizeMode: "cover",
    },
    expenseAmountListItemView:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    expenseAmountListItemText: {
        right: 5,
        height: "100%",
        position: "absolute",
        alignItems: "flex-end",
        justifyContent: "center",
        textAlign: "right",
        fontSize: 15,
    },
    expenseAmountListItemHeader:{
        fontSize: 20,
        color: palette.text,
        marginLeft: 10
    }

})
