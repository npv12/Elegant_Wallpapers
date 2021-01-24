import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';
import { adUnitId } from '../constants';

const interstitial = InterstitialAd.createForAdRequest(adUnitId);
var load = false
export function ShowAdvert() {
    if(load)
        interstitial.show().catch((res)=>{
          console.log(res)
        });
    else    console.log("Advert not loaded")
    LoadAdvert()
}

export function LoadAdvert(){
    const eventListener = interstitial.onAdEvent(type => {
        if (type === AdEventType.LOADED) {
          console.log("advert loaded")
          load = true
        }
        else{
          load = false
        }
      });
      interstitial.load();
      return () => {
        eventListener();
      };
}