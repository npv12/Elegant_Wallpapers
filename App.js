import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Explore from './src/screens/Explore';
import Collections from './src/screens/Collections';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
function TopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={Explore} tabBarOptions={{
                                                      labelStyle: { fontSize: 18},
                                                      tabStyle: { width: 100 },
                                                      style: { backgroundColor: 'powderblue' },
                                                    }}/>
      <Tab.Screen name="Collections" component={Collections} tabBarOptions={{
                                                      labelStyle: { fontSize: 12 },
                                                      tabStyle: { width: 100 },
                                                      style: { backgroundColor: 'black' },
                                                    }}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App () {
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={TopTabs} options={{headerShown: false}}/>
    </Stack.Navigator>  
    </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
