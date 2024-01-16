import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TripList from "./TripList.tsx";
import TripOverview from "./TripOverview.tsx";
import TripCreate from "./TripCreate.tsx";
import pages from "../types/pages.ts";
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
import TripLogs from "./TripLogs.tsx";
import TripLogsCreate from "./TripLogsCreate.tsx";
import TripLogsEdit from "./TripLogsEdit.tsx";
import TripLogsDetails from "./TripLogsDetails.tsx";
import { CurrentTheme } from "../styles/drawerTheme.ts";

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
      <NavigationContainer theme={CurrentTheme}>
          <Stack.Navigator>
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
              <Stack.Screen name={pages.TripExpensesCreate} component={TripExpensesCreate} options={{title: 'Create an expense'}} />
              <Stack.Screen name={pages.TripExpensesEdit} component={TripExpensesEdit} options={{title: 'Edit expense details'}} />
              <Stack.Screen name={pages.TripExpensesDetails} component={TripExpensesDetails} options={{title: 'Expense Details'}} />
              <Stack.Screen name={pages.TripExpensesSettle} component={TripExpensesSettle} options={{title: 'Expense Settlements'}} />

              <Stack.Screen name={pages.TripLogs} component={TripLogs} options={{title: 'Trip Logs'}} />
              <Stack.Screen name={pages.TripLogsCreate} component={TripLogsCreate} options={{title: 'Create trip log'}} />
              <Stack.Screen name={pages.TripLogsEdit} component={TripLogsEdit} options={{title: 'Edit log'}} />
              <Stack.Screen name={pages.TripLogsDetails} component={TripLogsDetails} options={{title: 'Edit Log Details'}} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;
