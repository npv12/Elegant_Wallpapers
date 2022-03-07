import { ADMOB_UNIT_ID } from "../constants";
import mobileAds, {
	InterstitialAd,
	AdEventType,
} from "react-native-google-mobile-ads";

export function initAdmob() {
	mobileAds()
		.initialize()
		.then((adapterStatuses) => {
			// Initialization complete!
			console.log("SDK INITIALIZED");
			loadAdv();
		});
}

const interstitial = InterstitialAd.createForAdRequest(ADMOB_UNIT_ID, {});

interstitial.onAdEvent((type) => {
	if (type === AdEventType.LOADED) {
		console.log("AD LOADED");
	}
	if (type === AdEventType.ERROR) {
		console.log("AD ERROR");
	}
	if (type === AdEventType.CLOSED) {
		console.log("AD CLOSED");
	}
});

export default function showAdv() {
	try {
		interstitial.show();
	} catch (e) {
		console.log(e);
	}
	loadAdv();
}

export function loadAdv() {
	try {
		console.log("PRELOAD CALLED");
		interstitial.load();
	} catch (e) {
		console.log(e);
	}
}
