import TripLogsFullscreenMap from "../pages/TripLogsFullscreenMap.tsx";

enum pages {

    // Trip Stack

    TripStack = "TripStack",

    TripCreate = 'TripCreate',
    TripEdit = 'TripEdit',
    TripList = 'TripList',
    TripOverview = 'TripOverview',
    TripDetails = 'TripDetails',

    TripMembers = 'TripMembers',
    TripMembersDetails = 'TripMembersDetails',
    TripMembersCreate = 'TripMembersCreate',
    TripMembersEdit = 'TripMembersEdit',

    TripExpenses = 'TripExpenses',
    TripExpensesCustomList = 'TripExpensesCustomList',
    TripExpensesDetails = 'TripExpensesDetails',
    TripExpensesCreate = 'TripExpensesCreate',
    TripExpensesEdit = 'TripExpensesEdit',
    TripExpensesSettle = 'TripExpensesSettle',
    TripExpensesComputed = 'TripExpensesComputed',

    TripLogs = 'TripLogs',
    TripLogsFullscreenMap = 'TripLogsFullscreenMap',
    TripLogsDetails = 'TripLogsDetails',
    TripLogsCreate = 'TripLogsCreate',
    TripLogsEdit = 'TripLogsEdit',

    // Expense Stack

    SingleExpensesStack = "SingleExpensesStack",

    SingleExpensesList = 'SingleExpensesList',
    SingleExpensesCreate = 'SingleExpensesCreate',
    SingleExpenseOverview = 'SingleExpenseOverview',
    SingleExpensesEdit = 'SingleExpensesEdit',
    SingleExpensesSettle = 'SingleExpensesSettle',

    // Management
    ManagementStack = 'ManagementStack',
    BackupAndRestore = "BackupAndRestore",
    Settings = 'Settings',



}

export default pages;
