import React, { Component,useEffect,useState } from 'react';
import {Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator,CardStyleInterpolators, } from '@react-navigation/stack';
import OneSignal from 'react-native-onesignal';
import {
  StatusBar,
  View
} from 'react-native';

import Explore from './src/screens/Explore';
import Collections from './src/screens/Collections';
import { NavigationContainer } from '@react-navigation/native';
import SetWallpaper from './src/screens/SetWallpaper';
import SpecificCollection from './src/screens/SpecificCollection';
import About from './src/screens/About';
import Settings from './src/screens/Settings'
import Fav from './src/screens/favorite';
import ThemeManager from './src/themes';
import { app_id } from './constants';
import BottomTab from './src/components/BottomTab';
import SearchScreen from './src/screens/SearchScreen'
import { useTheme } from './src/themes'
import { ONE_SIGNAL,STANDARD_HEIGHT,STANDARD_WIDTH } from './src/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { preloadAd } from './src/components/Advert';

const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT


const Tab = createMaterialTopTabNavigator();

function TopTabs({navigation}) {
  const theme = useTheme()
  const [text,setText] = useState(false)
  async function fetchTheme(){
    var temp = await AsyncStorage.getItem('theme')
    if(temp)
    {
      theme.setMode(temp)
    }
  }
  useEffect(()=>{
    fetchTheme()
  },[])
  if(theme.mode=='dark' && !text)
    setText(true)
  else if(theme.mode=='light' && text)
    setText(false)
  return (
    <>
    <View style={{backgroundColor:!text?'white':'black',height:35*scaleHeight}}>
    </View>
    <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 14*scaleHeight, color:text?'white':'black',fontFamily:'koliko' },
      style: { backgroundColor: text?'black':'white' },
      indicatorStyle: {backgroundColor:text?'white':'black' }
    }}
    >
      <Tab.Screen name="Explore" component={Explore}/>
      <Tab.Screen name="Collections" component={Collections}/>
    </Tab.Navigator>
    <BottomTab navigation={navigation}/>
    </>
  );
}

const Stack = createStackNavigator();

function HomeScreen(){
  const theme = useTheme()
  const [text,setText] = useState(false)
  async function fetchTheme(){
    var temp = await AsyncStorage.getItem('theme')
    if(temp)
    {
      theme.setMode(temp)
    }
  }
  useEffect(()=>{
    fetchTheme()
  },[])
  if(theme.mode=='dark' && !text)
    setText(true)
  else if(theme.mode=='light' && text)
    setText(false)
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}>
          <Stack.Screen name="Home" component={TopTabs} options={{headerShown: false}}/>
          <Stack.Screen name="Wall" component={SetWallpaper} options={{headerShown: false}}/>
          <Stack.Screen name="Collection" component={SpecificCollection} options={{headerShown:false}}/>
          <Stack.Screen name="Settings" component={Settings} options={{
            title: 'Settings',
            headerTitleAlign:'center',
            headerTintColor:text?'white':'black',
            headerTitleStyle:{
            fontFamily:'Linotte-Bold',
            fontWeight:'normal',
            fontSize:23*scaleHeight,
          },
          headerStyle:{
            backgroundColor:!text?'white':'black'
          }
          }} />
          <Stack.Screen name="About" component={About} options={{
            title: 'About Elegant',
            headerTitleAlign:'center',
            headerTintColor:text?'white':'black',
            headerTitleStyle:{
            fontFamily:'Linotte-Bold',
            fontWeight:'normal',
            fontSize:23*scaleHeight,
          },
          headerStyle:{
            backgroundColor:!text?'white':'black'
          }
          }}/>
          <Stack.Screen name="Fav" component={Fav} options={{
            title: 'Favorite',
            headerTitleAlign:'center',
            headerTintColor:text?'white':'black',
            headerTitleStyle:{
            fontFamily:'Linotte-Bold',
            fontWeight:'normal',
            fontSize:23*scaleHeight,
          },
          headerStyle:{
            backgroundColor:!text?'white':'black'
          }
          }} />
          <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  )
}

function Themes () {
  return (
    <>
    <ThemeManager>
      <HomeScreen/>
    </ThemeManager>
    </>
  );
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        name: props.name,
        isSubscribed: false,
        requiresPrivacyConsent: false,
        isLocationShared: false,
        inputValue: "",
        consoleValue: ""
    }
}

async componentDidMount() {
  preloadAd()
  OneSignal.setAppId(ONE_SIGNAL);
  OneSignal.setLogLevel(6, 0);
  OneSignal.setRequiresUserPrivacyConsent(this.state.requiresPrivacyConsent);
  OneSignal.promptForPushNotificationsWithUserResponse(response => {
      this.OSLog("Prompt response:", response);
  });

  OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      this.OSLog("OneSignal: notification will show in foreground:", notifReceivedEvent);
      let notif = notifReceivedEvent.getNotification();

      const button1 = {
          text: "Cancel",
          onPress: () => { notifReceivedEvent.complete(); },
          style: "cancel"
      };

      const button2 = { text: "Complete", onPress: () => { notifReceivedEvent.complete(notif); }};

        console.log("Complete notification?", "Test");
    });
    OneSignal.setNotificationOpenedHandler(notification => {
        this.OSLog("OneSignal: notification opened:", notification);
    });
    OneSignal.setInAppMessageClickHandler(event => {
        this.OSLog("OneSignal IAM clicked:", event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
        this.OSLog("OneSignal: email subscription changed: ", event);
    });
    OneSignal.addSubscriptionObserver(event => {
        this.OSLog("OneSignal: subscription changed:", event);
        this.setState({ isSubscribed: event.to.isSubscribed})
    });
    OneSignal.addPermissionObserver(event => {
        this.OSLog("OneSignal: permission changed:", event);
    });
    const state = await OneSignal.getDeviceState();

    this.setState({
        name : state.emailAddress,
        isSubscribed : state.isSubscribed
    });
}

componentWillUnmount() {
    OneSignal.clearHandlers();
}

  OSLog = (message, optionalArg) => {

    if (optionalArg) {
        message = message + JSON.stringify(optionalArg);
    }

    console.log(message);

    let consoleValue;

    if (this.state.consoleValue) {
        consoleValue = this.state.consoleValue+"\n"+message
    } else {
        consoleValue = message;
    }
    this.setState({ consoleValue });
  }

  render()
  {
    return <Themes/>


  }
}

export default App;
