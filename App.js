import React, { Component,useState } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator,CardStyleInterpolators, } from '@react-navigation/stack';
import OneSignal from 'react-native-onesignal';

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
import { app_id } from './constants';
import BottomTab from './src/components/BottomTab';
import { useTheme } from './src/themes'
import { ONE_SIGNAL } from './src/constants';

const Tab = createMaterialTopTabNavigator();

function TopTabs({navigation}) {
  const theme = useTheme()
  const [text,setText] = useState(false)
  if(theme.mode=='dark' && !text)
    setText(true)
  else if(theme.mode=='light' && text)
    setText(false)
  return (
    <>
    <Tab.Navigator
    tabBarOptions={{
      labelStyle: { fontSize: 18, color:text?'white':'black' },
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

function HomeScreen () {
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

        Alert.alert("Complete notification?", "Test", [ button1, button2], { cancelable: true });
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

    inputChange = (text) => {
      this.setState({ inputValue: text })
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
    return <HomeScreen/>
  }
}

export default App;
