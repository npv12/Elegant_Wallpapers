import React, {Component} from 'react';
import ReactNative from 'react-native';

const {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Animated
} = ReactNative;

import { InterstitialAdManager,AdSettings } from 'react-native-fbads';
import loadAd from '../components/Advert';
import { FB_PLACEMENT_AD } from '../constants';

class Test extends Component {
  constructor(props) {
    super(props);
   // AdSettings.addTestDevice('2a38a6b4-233a-460a-949e-b7fe60257dc6')
   AdSettings.clearTestDevices()
   loadAd()
    this.state = {
      bounceValue: new Animated.Value(300),  //This is the initial position of the subview
      buttonText: "Show Subview"
    };
  }


  _toggleSubview() {    
    loadAd()
  }

  render() {
    return (
      <View style={styles.container}>
          <TouchableHighlight style={styles.button} onPress={()=> {this._toggleSubview()}}>
            <Text style={styles.buttonText}>{this.state.buttonText}</Text>
          </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 66
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 300,
  }
});

export default Test