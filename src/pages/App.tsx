import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {CurrentTheme} from "../styles/drawerTheme.ts";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {palette} from "../styles/colors.ts";

import pages from "../types/pages.ts";

import TripList from "./TripList.tsx";
import TripOverview from "./TripOverview.tsx";
import TripCreate from "./TripCreate.tsx";
import TripEdit from "./TripEdit.tsx";
import TripDetails from "./TripDetails.tsx";
import TripMembers from "./TripMembers.tsx";
import TripMembersCreate from "./TripMembersCreate.tsx";
import TripMembersEdit from "./TripMembersEdit.tsx";
import TripMembersDetails from "./TripMembersDetails.tsx";
import TripExpenses from "./TripExpenses.tsx";
import TripExpensesCreate from "./TripExpensesCreate.tsx";
import TripExpensesEdit from "./TripExpensesEdit.tsx";
import TripExpensesDetails from "./TripExpensesDetails.tsx";
import TripExpensesSettle from "./TripExpensesSettle.tsx";
import TripExpensesComputed from "./TripExpensesComputed.tsx";
import TripLogs from "./TripLogs.tsx";
import TripLogsCreate from "./TripLogsCreate.tsx";
import TripLogsEdit from "./TripLogsEdit.tsx";
import TripLogsDetails from "./TripLogsDetails.tsx";
import TripExpensesCustomList from "./TripExpensesCustomList.tsx";

import SingleExpenseList from "./SingleExpenseList.tsx";
import SingleExpenseCreate from "./SingleExpenseCreate.tsx";
import SingleExpenseOverview from "./SingleExpenseOverview.tsx";
import SingleExpensesEdit from "./SingleExpensesEdit.tsx";
import SingleExpensesSettle from "./SingleExpensesSettle.tsx";
import CustomDrawer from "../components/CustomDrawer.tsx";
import Settings from "./Settings.tsx";
import BackupAndRestore from "./BackupAndRestore.tsx";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const TripStack = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={pages.TripList} component={TripList} options={{title: 'Your Trips'}}/>
        <Stack.Screen name={pages.TripCreate} component={TripCreate} options={{title: 'Create Trip'}} />
        <Stack.Screen name={pages.TripEdit} component={TripEdit} options={{title: 'Edit Trip'}} />
        <Stack.Screen name={pages.TripDetails} component={TripDetails} options={{title: 'Trip Details'}} />

        <Stack.Screen name={pages.TripOverview} component={TripOverview} options={{title: 'Trip Overview'}} />

        <Stack.Screen name={pages.TripMembers} component={TripMembers} options={{title: 'Trip Members'}} />
        <Stack.Screen name={pages.TripMembersCreate} component={TripMembersCreate} options={{title: 'Add Trip Member'}} />
        <Stack.Screen name={pages.TripMembersEdit} component={TripMembersEdit} options={{title: 'Edit Member Details'}} />
        <Stack.Screen name={pages.TripMembersDetails} component={TripMembersDetails} options={{title: 'Member Details'}} />

        <Stack.Screen name={pages.TripExpenses} component={TripExpenses} options={{title: 'Trip Expenses'}} />
        <Stack.Screen name={pages.TripExpensesCustomList} component={TripExpensesCustomList} options={{title: 'Trip Expenses'}}/>
        <Stack.Screen name={pages.TripExpensesCreate} component={TripExpensesCreate} options={{title: 'Create an expense'}} />
        <Stack.Screen name={pages.TripExpensesEdit} component={TripExpensesEdit} options={{title: 'Edit expense details'}} />
        <Stack.Screen name={pages.TripExpensesDetails} component={TripExpensesDetails} options={{title: 'Expense Details'}} />
        <Stack.Screen name={pages.TripExpensesSettle} component={TripExpensesSettle} options={{title: 'Expense Settlements'}} />
        <Stack.Screen name={pages.TripExpensesComputed} component={TripExpensesComputed} options={{title: 'Computed Expenses'}} />

        <Stack.Screen name={pages.TripLogs} component={TripLogs} options={{title: 'Trip Logs'}} />
        <Stack.Screen name={pages.TripLogsCreate} component={TripLogsCreate} options={{title: 'Create trip log'}} />
        <Stack.Screen name={pages.TripLogsEdit} component={TripLogsEdit} options={{title: 'Edit log'}} />
        <Stack.Screen name={pages.TripLogsDetails} component={TripLogsDetails} options={{title: 'Edit Log Details'}} />
    </Stack.Navigator>
}

const SingleExpensesStack = () => {
    return <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={pages.SingleExpensesList} component={SingleExpenseList} options={{title: 'Single Expenses'}}/>
        <Stack.Screen name={pages.SingleExpensesCreate} component={SingleExpenseCreate} options={{title: 'Single Expenses Create'}}/>
        <Stack.Screen name={pages.SingleExpenseOverview} component={SingleExpenseOverview} options={{title: 'Single Expenses Details'}}/>
        <Stack.Screen name={pages.SingleExpensesEdit} component={SingleExpensesEdit} options={{title: 'Single Expenses Edit'}}/>
        <Stack.Screen name={pages.SingleExpensesSettle} component={SingleExpensesSettle} options={{title: 'Single Expenses Settle'}}/>
    </Stack.Navigator>
}

function App(): React.JSX.Element {
  return (
      <GestureHandlerRootView>
          <NavigationContainer theme={CurrentTheme}>
              <Drawer.Navigator screenOptions={{headerTintColor: palette.text}} drawerContent={props => <CustomDrawer {...props} />}>
                  <Drawer.Screen name={pages.TripStack} component={TripStack} options={{title: 'Trips'}}/>
                  <Drawer.Screen name={pages.SingleExpensesStack} component={SingleExpensesStack} options={{title: 'Single Expenses'}}/>
                  <Drawer.Screen name={pages.BackupAndRestore} component={BackupAndRestore} options={{title: 'Backup and Restore'}}/>
                  <Drawer.Screen name={pages.Settings} component={Settings} options={{title: 'Settings'}}/>
              </Drawer.Navigator>
          </NavigationContainer>
      </GestureHandlerRootView>
  );
}


export default App;
