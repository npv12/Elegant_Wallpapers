import React, { useEffect } from "react";
import OneSignal from "react-native-onesignal";
import { ONE_SIGNAL } from "./src/constants";
import { preloadAd } from "./src/components/Advert";
import ThemeManager from "./src/screens/ThemeManager";
import { getStoragePermissionAndroid } from "./src/utils";

function App() {
	const [emailAddress, setEmailAddress] = React.useState<string>("");
	const [isSubscribed, setIsSubscribed] = React.useState<boolean>(false);
	const [requiresPrivacyConsent, setRequiresPrivacyConsent] =
		React.useState<boolean>(false);

	async function setOneSignal() {
		OneSignal.setAppId(ONE_SIGNAL);
		OneSignal.setRequiresUserPrivacyConsent(requiresPrivacyConsent);
		const state = await OneSignal.getDeviceState();
		setEmailAddress(state.emailAddress);
		setIsSubscribed(state.isSubscribed);
	}

	useEffect(() => {
		preloadAd();
		getStoragePermissionAndroid();
		setOneSignal();
	}, []);

	useEffect(
		() => () => {
			OneSignal.clearHandlers();
		},
		[]
	);
	return <ThemeManager />;
}

export default App;
