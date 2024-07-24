import SingleExpenseOverview from "../pages/SingleExpenseOverview.tsx";

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
    TripLogsDetails = 'TripLogsDetails',
    TripLogsCreate = 'TripLogsCreate',
    TripLogsEdit = 'TripLogsEdit',

    // Expense Stack

    SingleExpensesStack = "SingleExpensesStack",

    SingleExpensesList = 'SingleExpensesList',
    SingleExpensesCreate = 'SingleExpensesCreate',
    SingleExpenseOverview = 'SingleExpenseOverview',
    SingleExpensesEdit = 'SingleExpensesEdit',
    SingleExpensesSettle = 'SingleExpensesSettle'

}

export default pages;
