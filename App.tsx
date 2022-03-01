import React, { useEffect } from "react";
import OneSignal from "react-native-onesignal";
import { ONE_SIGNAL } from "./src/constants";
import { preloadAd } from "./src/components/Advert";
import { getStoragePermissionAndroid } from "./src/utils";
import HomeScreen from "./src/screens/HomeScreen";
import Themes from "./src/Themes"
import { AppContextProvider } from "./src/context/AppContext";

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
  return (
    <AppContextProvider>
      <Themes>
        <HomeScreen />
      </Themes>
    </AppContextProvider>
  );
}

export default App;
