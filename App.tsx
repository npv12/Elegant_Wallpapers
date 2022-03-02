import React, { useEffect } from "react";
import OneSignal from "react-native-onesignal";
import { ONE_SIGNAL } from "./src/constants";
import { getStoragePermissionAndroid } from "./src/utils";
import HomeScreen from "./src/screens/HomeScreen";
import Themes from "./src/Themes";
import { AppContextProvider } from "./src/context/AppContext";
import { initAdmob } from "./src/components/Advert";

function App() {
	async function setOneSignal() {
		OneSignal.setAppId(ONE_SIGNAL);
		OneSignal.setRequiresUserPrivacyConsent(false);
		await OneSignal.getDeviceState();
	}

	useEffect(() => {
		initAdmob();
		getStoragePermissionAndroid();
		setOneSignal();
	}, []);

	useEffect(
		() => () => {
			OneSignal.clearHandlers();
		},
		[]
	);
	return (
		<AppContextProvider>
			<Themes>
				<HomeScreen />
			</Themes>
		</AppContextProvider>
	);
}

export default App;
