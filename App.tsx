/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import type {PropsWithChildren} from 'react';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, useColorScheme,} from 'react-native';
import {TripListItem} from "./components/TripListItem.tsx";
import {trip} from "./types/Trip.tsx";

type SectionProps = PropsWithChildren<{
  title: string;
}>;


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
    const trips : trip[] = [
        { id: '1', title: "Honeymoon", destination: 'Paris', date: {from: '2023/01/01', to: '2023/01/14'} },
        { id: '2', title: "Test", destination: 'New York', date: {from: '2023/01/01', to: '2023/01/14'}  },
        { id: '3', title: "Test 2", destination: 'Tokyo', date: {from: '2023/01/01', to: '2023/01/14'}  },
        // Add more trips here
    ];
  return (
    <SafeAreaView>
      <FlatList
          data={trips}
          renderItem={TripListItem}
          keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;
