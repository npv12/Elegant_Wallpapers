import { InterstitialAdManager,AdSettings } from 'react-native-fbads';
import { ADVERT_CAP_TIME, FB_PLACEMENT_AD } from '../constants';

var shouldShowAd = true

export default function loadAd(){
    console.log(shouldShowAd, "Should the ad be shown?")
    if(shouldShowAd){
        InterstitialAdManager.showPreloadedAd(FB_PLACEMENT_AD)
        .then((didClick) => {console.log(didClick,"Show")})
        .catch((error) => {console.log(error,"Show")});
        preloadAd()
        shouldShowAd=false;
        setTimeout(function(){
            shouldShowAd = true
            },ADVERT_CAP_TIME/2)
    }
}

export function preloadAd(){
    InterstitialAdManager.preloadAd(FB_PLACEMENT_AD)
    .then((didClick) => {console.log(didClick,"PreLoad")})
    .catch((error) => {console.log(error,"PreLoad")});
}
