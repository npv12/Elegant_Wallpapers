/* @flow */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function ColorBox (props) {
    return (
      <TouchableOpacity style={styles.container} activeOpacity={0.5}>
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
    marginTop: 2
  }
});
