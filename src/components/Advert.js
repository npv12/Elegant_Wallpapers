import { InterstitialAdManager,AdSettings } from 'react-native-fbads';
import { FB_PLACEMENT_AD } from '../constants';

export default function loadAd(){
    InterstitialAdManager.showAd(FB_PLACEMENT_AD)
    .then((didClick) => {console.log(didClick)})
    .catch((error) => {console.log(error)});
}