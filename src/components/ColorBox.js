/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Clipboard
} from 'react-native';
import {STANDARD_HEIGHT,STANDARD_WIDTH} from '../constants'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

export default function ColorBox (props) {
  //copies the color to clipboard when the color is selected
  function copyToClip(){
    Clipboard.setString(props.color);
    ToastAndroid.showWithGravityAndOffset(
      'Color has been copied',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  }
    return (
      <TouchableOpacity style={styles.container} activeOpacity={0.5} onPress={copyToClip}>
        <View style={{...styles.circle,backgroundColor: props.color}}/>
        <Text style={styles.header}>{props.color}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 10*scaleHeight,
  },
  circle:{
    height:35*scaleHeight,
    width:35*scaleWidth,
    borderTopLeftRadius: 20*scaleHeight,
    borderTopRightRadius: 20*scaleHeight,
    borderBottomLeftRadius: 20*scaleHeight,
    borderBottomRightRadius: 20*scaleHeight,
    marginHorizontal: 10*scaleWidth
  },
  header:{
    fontSize: 18*scaleHeight,
    marginTop: 2*scaleHeight,
    color:'white'
  }
});
