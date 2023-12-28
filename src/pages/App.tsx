import TripsList from "./TripsList.tsx";
import TripHome from "./TripHome.tsx";
import * as React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateTrip from "./CreateTrip.tsx";
// import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
function App(): React.JSX.Element {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name="Your Trips" component={TripsList} options={{title: 'Your Trips'}}/>
              <Stack.Screen name="Trip Home" component={TripHome} />
              <Stack.Screen name="Create New Trip" component={CreateTrip} />
          </Stack.Navigator>
      </NavigationContainer>
  );
}


export default App;
