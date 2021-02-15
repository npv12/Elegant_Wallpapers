/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Clipboard,
  ToastAndroid
} from 'react-native';

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
    marginVertical: 10,
  },
  circle:{
    height:35,
    width:35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginHorizontal: 10
  },
  header:{
    fontSize: 18,
    marginTop: 2,
    color:'white'
  }
});
