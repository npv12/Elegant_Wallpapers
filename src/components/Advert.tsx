import { ADMOB_UNIT_ID } from "../Secrets";
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

const interstitial = InterstitialAd.createForAdRequest(ADMOB_UNIT_ID);

interstitial.onAdEvent((type) => {
	if (type === AdEventType.LOADED) {
		console.log("AD LOADED");
	}
	if (type === AdEventType.ERROR) {
		console.log("AD ERROR");
	}
	if (type === AdEventType.CLOSED) {
		console.log("AD CLOSED");
		loadAdv(); // Load adv on close is the best way to go.
	}
});

export default function showAdv() {
	if (!interstitial.loaded) {
		loadAdv(); // incase adv load fails.
		return;
	}
	try {
		interstitial
			.show()
			.then(() => loadAdv() /** In case loadadb onclose fails */);
	} catch (e) {
		console.log(e);
	}
}

export function loadAdv() {
	if (interstitial.loaded) return; // Don't load if it is already loaded.
	try {
		interstitial.load();
	} catch (e) {
		console.log(e);
	}
}
