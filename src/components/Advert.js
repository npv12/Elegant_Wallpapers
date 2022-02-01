import { InterstitialAd, AdEventType, TestIds } from '@react-native-firebase/admob';

const adUnitId = TestIds.INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId);

export function ShowAdvert() {
    if(interstitial.loaded)
        interstitial.show().catch((res)=>console.log(res));
    else    console.log("Advert not loaded")
    LoadAdvert()
}

export function LoadAdvert(){
    const eventListener = interstitial.onAdEvent(type => {
        if (type === AdEventType.LOADED) {
          console.log("advert loaded")
        }
      });
      interstitial.load();
      return () => {
        eventListener();
      };
}