import { ADVERT_CAP_TIME,ADMOB_UNIT_ID } from "../constants";
import mobileAds from 'react-native-google-mobile-ads';
import { InterstitialAd, TestIds, AdEventType } from 'react-native-google-mobile-ads';



var shouldShowAd = true;

export function initAdmob(){
  mobileAds()
  .initialize()
  .then((adapterStatuses) => {

    // Initialization complete!
    console.log("SDK INITIALIZED")
    setTimeout(function(){
      preloadAd()
      },3000)
	
  });
}



  const interstitial = InterstitialAd.createForAdRequest(ADMOB_UNIT_ID, {
	//requestNonPersonalizedAdsOnly: true,
	//keywords: ['fashion', 'clothing'],
  });

  const eventListener = interstitial.onAdEvent(type => {
	if (type === AdEventType.LOADED) {
		console.log("AD LOADED")
	}
    if (type === AdEventType.ERROR) {
      console.log("AD ERROR")
    }
    if (type === AdEventType.CLOSED) {
      console.log("AD CLOSED")
	 // shouldShowAd set to false after closing the ad
      shouldShowAd=false;
      console.log("SHOULD THE AD BE SHOWN - SET TO FALSE")
    }

  
  });

  export default function loadAd(){
    console.log(shouldShowAd, "SHOULD THE AD BE SHOWN?")

    if(shouldShowAd){
        try{
            interstitial.show();
        } catch(e) {
            console.log(e)
        }

        setTimeout(function(){
		// start preloadAd on a delay after trying to show the ad - better for fill ratio
          preloadAd()
          },ADVERT_CAP_TIME/3)

        setTimeout(function(){

		  // shouldShowAd set to true after the set cap time 
            shouldShowAd = true
            console.log("SHOULD THE AD BE SHOWN - SET TO TRUE")
            },ADVERT_CAP_TIME)


    }
}

export function preloadAd(){
    try{
      console.log("PRELOAD CALLED")
        interstitial.load();
    } catch(e) {
        console.log(e)
    }
    
   
}
