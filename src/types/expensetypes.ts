export const expenseTypes = [
    { key: '7', value: 'Other' },
    { key: '1', value: 'Fuel' },
    { key: '9', value: 'Stay'},
    { key: '8', value: 'Medical'},
    { key: '12', value: 'Maintenance'},
    { key: '13', value: 'Tolls'},
    { key: '2', value: 'Food' },
    { key: '3', value: 'Travel' },
    { key: '4', value: 'Shopping' },
    { key: '10', value: 'Utilities'},
    { key: '11', value: 'Entertainment'},

];

export function getExpenseImage(category: string) {

    switch (category) {
        case "Fuel":
            return require('../images/uiImages/expenseImages/fuel.jpg');
        case "Stay":
            return require('../images/uiImages/expenseImages/stay.png');
        case "Medical":
            return require('../images/uiImages/expenseImages/medical.jpg');
        case "Maintenance":
            return require('../images/uiImages/expenseImages/maintainance.jpg');
        case "Tolls":
            return require('../images/uiImages/expenseImages/tolls.jpg');
        case "Food":
            return require('../images/uiImages/expenseImages/food.jpg');
        case "Travel":
            return require('../images/uiImages/expenseImages/travel.jpg');
        case "Shopping":
            return require('../images/uiImages/expenseImages/shopping.jpg');
        case "Utilities":
            return require('../images/uiImages/expenseImages/utilities.jpg');
        case "Entertainment":
            return require('../images/uiImages/expenseImages/entertainment.jpg');
        default:
            return require('../images/uiImages/expenseImages/expenses.webp');
    }
}

export function getExpenseIconImage(category: string) {

    switch (category) {
        case "Fuel":
            return require('../images/uiImages/expenseImages/fuel_icon.png');
        case "Stay":
            return require('../images/uiImages/expenseImages/stay_icon.png');
        case "Medical":
            return require('../images/uiImages/expenseImages/medical_icon.png');
        case "Maintenance":
            return require('../images/uiImages/expenseImages/maintainance_icon.png');
        case "Tolls":
            return require('../images/uiImages/expenseImages/travel_icon.png');
        case "Food":
            return require('../images/uiImages/expenseImages/food_icon.png');
        case "Travel":
            return require('../images/uiImages/expenseImages/tolls_icon.png');
        case "Shopping":
            return require('../images/uiImages/expenseImages/shopping_icon.png');
        case "Utilities":
            return require('../images/uiImages/expenseImages/utilities_icon.png');
        case "Entertainment":
            return require('../images/uiImages/expenseImages/entertainment_icon.png');
        default:
            return require('../images/uiImages/expenseImages/expenses_icon.png');
    }
}
