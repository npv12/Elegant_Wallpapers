import React, { Component } from 'react'
import ThemeManager, { useTheme } from '../themes'
import { Switch,Text,View } from 'react-native'
import OneSignal from 'react-native-onesignal';
import { app_id } from '../../constants';

function HomeScreen() {
    const theme = useTheme()
    console.log(theme)
    return (
      <View style={{flex:1, alignItems: 'center',justifyContent: 'flex-end'}}>
        <Text style={{fontSize:42,}}>Crowdbotics app</Text>
        <Switch
          value={theme.mode === 'dark'}
          onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
        />
      </View>
    )
  }

  class Test extends Component {
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
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId(app_id);
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(this.state.requiresPrivacyConsent);
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
        this.OSLog("Prompt response:", response);
    });

    /* O N E S I G N A L  H A N D L E R S */
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
  
  export default Test