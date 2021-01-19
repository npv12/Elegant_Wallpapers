import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator,CardStyleInterpolators, } from '@react-navigation/stack';
import Explore from './src/screens/Explore';
import Collections from './src/screens/Collections';
import { NavigationContainer } from '@react-navigation/native';
import SetWallpaper from './src/screens/SetWallpaper';
import SpecificCollection from './src/screens/SpecificCollection';
import About from './src/screens/About';
import Settings from './src/screens/Settings'
import Fav from './src/screens/favorite';
import Test from './src/screens/test';
import ThemeManager from './src/themes';

const Tab = createMaterialTopTabNavigator();
function TopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Explore" component={Explore}/>
      <Tab.Screen name="Collections" component={Collections}/>
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

function App () {
  return (
    <>
    <ThemeManager>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none" screenOptions={{
      cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid
    }}>
          <Stack.Screen name="Home" component={TopTabs} options={{headerShown: false}}/>
          <Stack.Screen name="Wall" component={SetWallpaper} options={{headerShown: false}}/>
          <Stack.Screen name="Collection" component={SpecificCollection} options={{headerShown:false}}/>
          <Stack.Screen name="Settings" component={Settings} options={{headerShown:false}}/>
          <Stack.Screen name="About" component={About} options={{headerShown:false}}/>
          <Stack.Screen name="Fav" component={Fav} options={{headerShown:false}}/>
          <Stack.Screen name="test" component={Test}/>
        </Stack.Navigator>  
      </NavigationContainer>
    </ThemeManager>
    </>
  );
};

export default App;
