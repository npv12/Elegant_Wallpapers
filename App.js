import React, { Component } from "react";
import { Alert, PermissionsAndroid } from "react-native";
import OneSignal from "react-native-onesignal";
import { ONE_SIGNAL } from "./src/constants";
import { preloadAd } from "./src/components/Advert";

const getPermissionAndroid = async () => {
	try {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
			{
				title: "Image Download Permission",
				message: "Your permission is required to save images to your device",
				buttonNegative: "Cancel",
				buttonPositive: "OK",
			}
		);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			return true;
		}
		Alert.alert(
			"Save remote Image",
			"Grant Me Permission to save Image",
			[{ text: "OK", onPress: () => console.log("OK Pressed") }],
			{ cancelable: false }
		);
	} catch (err) {
		Alert.alert(
			"Save remote Image",
			"Failed to save Image: " + err.message,
			[{ text: "OK", onPress: () => console.log("OK Pressed") }],
			{ cancelable: false }
		);
	}
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
			consoleValue: "",
		};
	}

	async componentDidMount() {
		preloadAd();
		getPermissionAndroid();
		OneSignal.setAppId(ONE_SIGNAL);
		OneSignal.setLogLevel(6, 0);
		OneSignal.setRequiresUserPrivacyConsent(this.state.requiresPrivacyConsent);
		OneSignal.promptForPushNotificationsWithUserResponse((response) => {
			//  this.OSLog("Prompt response:", response);
		});

		OneSignal.setNotificationWillShowInForegroundHandler(
			(notifReceivedEvent) => {
				// this.OSLog("OneSignal: notification will show in foreground:", notifReceivedEvent);
				let notif = notifReceivedEvent.getNotification();

				const button1 = {
					text: "Cancel",
					onPress: () => {
						notifReceivedEvent.complete();
					},
					style: "cancel",
				};

				const button2 = {
					text: "Complete",
					onPress: () => {
						notifReceivedEvent.complete(notif);
					},
				};
			}
		);
		OneSignal.setNotificationOpenedHandler((notification) => {
			// this.OSLog("OneSignal: notification opened:", notification);
		});
		OneSignal.setInAppMessageClickHandler((event) => {
			// this.OSLog("OneSignal IAM clicked:", event);
		});
		OneSignal.addEmailSubscriptionObserver((event) => {
			// this.OSLog("OneSignal: email subscription changed: ", event);
		});
		OneSignal.addSubscriptionObserver((event) => {
			//  this.OSLog("OneSignal: subscription changed:", event);
			//  this.setState({ isSubscribed: event.to.isSubscribed})
		});
		OneSignal.addPermissionObserver((event) => {
			//  this.OSLog("OneSignal: permission changed:", event);
		});
		const state = await OneSignal.getDeviceState();

		this.setState({
			name: state.emailAddress,
			isSubscribed: state.isSubscribed,
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
			consoleValue = this.state.consoleValue + "\n" + message;
		} else {
			consoleValue = message;
		}
		this.setState({ consoleValue });
	};

	render() {
		return <Themes />;
	}
}

export default App;
