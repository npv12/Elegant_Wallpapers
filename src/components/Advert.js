import { AdEventType, InterstitialAd } from '@react-native-firebase/admob';
import { InterstitialAdManager,AdSettings } from 'react-native-fbads';
import { ADVERT_CAP_TIME, FB_PLACEMENT_AD, ADMOB_UNIT_ID } from '../constants';

var shouldShowAd = true
const interstitialAd = InterstitialAd.createForAdRequest(ADMOB_UNIT_ID);

export default function loadAd(){
    console.log(shouldShowAd, "Should the ad be shown?")
    if(shouldShowAd){
        try{
            interstitialAd.show();
        } catch(e) {
            console.log(e)
        }
        preloadAd()
        shouldShowAd=false;
        setTimeout(function(){
            shouldShowAd = true
            },ADVERT_CAP_TIME/2)
    }
}

export function preloadAd(){
    try{
        interstitialAd.load();
    } catch(e) {
        console.log(e)
    }
    
    /*
    InterstitialAdManager.preloadAd(FB_PLACEMENT_AD)
    .then((didClick) => {console.log(didClick,"PreLoad")})
    .catch((error) => {console.log(error,"PreLoad")});*/
}
