import * as React from 'react';

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CurrentTheme} from "../styles/drawerTheme.ts";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {palette} from "../styles/colors.ts";

import pages from "../types/pages.ts";

import TripList from "./Trips/TripList.tsx";
import TripOverview from "./Trips/TripOverview.tsx";
import TripMembers from "./Trips/Members/TripMembers.tsx";
import TripMembersDetails from "./Trips/Members/TripMembersDetails.tsx";
import TripExpenses from "./Trips/Expenses/TripExpenses.tsx";
import TripExpensesDetails from "./Trips/Expenses/TripExpensesDetails.tsx";
import TripExpensesSettle from "./Trips/Expenses/TripExpensesSettle.tsx";
import TripExpensesComputed from "./Trips/Expenses/TripExpensesComputed.tsx";
import TripLogs from "./Trips/Logs/TripLogs.tsx";
import TripLogsDetails from "./Trips/Logs/TripLogsDetails.tsx";
import TripExpensesCustomList from "./Trips/Expenses/TripExpensesCustomList.tsx";

import SingleExpenseList from "./SingleExpenses/SingleExpenseList.tsx";
import SingleExpenseCreate from "./SingleExpenses/SingleExpenseCreate.tsx";
import SingleExpenseOverview from "./SingleExpenses/SingleExpenseOverview.tsx";
import SingleExpensesEdit from "./SingleExpenses/SingleExpensesEdit.tsx";
import SingleExpensesSettle from "./SingleExpenses/SingleExpensesSettle.tsx";
import CustomDrawer from "../components/CustomDrawer.tsx";
import Settings from "./Management/Settings.tsx";
import BackupAndRestore from "./Management/BackupAndRestore.tsx";
import CustomHeader from "../components/CustomHeader.tsx";
import {SettingsManager} from "../helpers/SettingsManager.ts";
import TripLogsFullscreenMap from "./Trips/Logs/TripLogsFullscreenMap.tsx";
import Help from "./Help/Help.tsx";
import TripExpensesEditor from "./Trips/Expenses/TripExpensesEditor.tsx";
import TripLogsEditor from "./Trips/Logs/TripLogsEditor.tsx";
import TripMembersEditor from "./Trips/Members/TripMembersEditor.tsx";
import TripEditor from "./Trips/TripEditor.tsx";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
SettingsManager.getSettings();

const TripStack = () => {
    return <Stack.Navigator screenOptions={{
        headerTintColor: palette.text, header: ({navigation, route, options}) => {
            return <CustomHeader title={options.title || route.name}/>;
        }
    }}>
        <Stack.Screen name={pages.TripList} component={TripList} options={{title: 'Your Trips'}}/>
        <Stack.Screen name={pages.TripCreate} component={TripEditor} options={{title: 'Create Trip'}}/>
        <Stack.Screen name={pages.TripEdit} component={TripEditor} options={{title: 'Edit Trip'}}/>
        <Stack.Screen name={pages.TripOverview} component={TripOverview} options={{title: 'Trip Overview'}}/>

        <Stack.Screen name={pages.TripMembers} component={TripMembers} options={{title: 'Trip Members'}}/>
        <Stack.Screen name={pages.TripMembersCreate} component={TripMembersEditor} options={{title: 'Add Trip Member'}}/>
        <Stack.Screen name={pages.TripMembersEdit} component={TripMembersEditor} options={{title: 'Edit Member Details'}}/>
        <Stack.Screen name={pages.TripMembersDetails} component={TripMembersDetails} options={{title: 'Member Details'}}/>

        <Stack.Screen name={pages.TripExpenses} component={TripExpenses} options={{title: 'Trip Expenses'}}/>
        <Stack.Screen name={pages.TripExpensesCustomList} component={TripExpensesCustomList} options={{title: 'Trip Expenses'}}/>
        <Stack.Screen name={pages.TripExpensesCreate} component={TripExpensesEditor} options={{title: 'Create an expense'}}/>
        <Stack.Screen name={pages.TripExpensesEdit} component={TripExpensesEditor} options={{title: 'Edit expense details'}}/>
        <Stack.Screen name={pages.TripExpensesDetails} component={TripExpensesDetails} options={{title: 'Expense Details'}}/>
        <Stack.Screen name={pages.TripExpensesSettle} component={TripExpensesSettle} options={{title: 'Expense Settlements'}}/>
        <Stack.Screen name={pages.TripExpensesComputed} component={TripExpensesComputed} options={{title: 'Computed Expenses'}}/>

        <Stack.Screen name={pages.TripLogs} component={TripLogs} options={{title: 'Trip Logs'}}/>
        <Stack.Screen name={pages.TripLogsFullscreenMap} component={TripLogsFullscreenMap} options={{title: 'Trip Logs Map'}}/>
        <Stack.Screen name={pages.TripLogsCreate} component={TripLogsEditor} options={{title: 'Create trip log'}}/>
        <Stack.Screen name={pages.TripLogsEdit} component={TripLogsEditor} options={{title: 'Edit log'}}/>
        <Stack.Screen name={pages.TripLogsDetails} component={TripLogsDetails} options={{title: 'Edit Log Details'}}/>
    </Stack.Navigator>
}

const SingleExpensesStack = () => {
    return <Stack.Navigator screenOptions={{
        headerTintColor: palette.text, header: ({navigation, route, options}) => {
            return <CustomHeader title={options.title || route.name}/>;
        }
    }}>
        <Stack.Screen name={pages.SingleExpensesList} component={SingleExpenseList} options={{title: 'Single Expenses'}}/>
        <Stack.Screen name={pages.SingleExpensesCreate} component={SingleExpenseCreate} options={{title: 'Single Expenses Create'}}/>
        <Stack.Screen name={pages.SingleExpenseOverview} component={SingleExpenseOverview} options={{title: 'Single Expenses Details'}}/>
        <Stack.Screen name={pages.SingleExpensesEdit} component={SingleExpensesEdit} options={{title: 'Single Expenses Edit'}}/>
        <Stack.Screen name={pages.SingleExpensesSettle} component={SingleExpensesSettle} options={{title: 'Single Expenses Settle'}}/>
    </Stack.Navigator>
}

const ManagementStack = () => {
    return <Stack.Navigator screenOptions={{
        headerTintColor: palette.text, header: ({navigation, route, options}) => {
            return <CustomHeader title={options.title || route.name}/>;
        }
    }}>
        <Stack.Screen name={pages.Settings} component={Settings} options={{title: 'Settings'}}/>
        <Stack.Screen name={pages.BackupAndRestore} component={BackupAndRestore} options={{title: 'Backup and Restore'}}/>
    </Stack.Navigator>
}

const HelpStack = () => {
    return <Stack.Navigator screenOptions={{
        headerTintColor: palette.text, header: ({navigation, route, options}) => {
            return <CustomHeader title={options.title || route.name}/>;
        }
    }}>
        <Stack.Screen name={pages.Help} component={Help} options={{title: 'Help'}}/>
    </Stack.Navigator>
}

function App(): React.JSX.Element {
    return (
        <GestureHandlerRootView>
            <NavigationContainer theme={CurrentTheme}>
                <Drawer.Navigator
                    screenOptions={{headerShown: false}}
                    drawerContent={props => <CustomDrawer {...props} />}>
                    <Drawer.Screen name={pages.TripStack} component={TripStack} options={{title: 'Trips'}}/>
                    <Drawer.Screen name={pages.SingleExpensesStack} component={SingleExpensesStack} options={{title: 'Single Expenses'}}/>
                    <Drawer.Screen name={pages.ManagementStack} component={ManagementStack} options={{title: 'Settings'}}/>
                    <Drawer.Screen name={pages.HelpStack} component={HelpStack} options={{title: 'Help'}}/>
                </Drawer.Navigator>
            </NavigationContainer>
        </GestureHandlerRootView>
    );
}


export default App;
