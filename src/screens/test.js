import React from 'react';
import { View,Image,ActivityIndicator,StyleSheet } from 'react-native';

const Test = (props) => {
  return (
    <>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={true} size="large" color="#00bd84" />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Test;

/*      <Image source={{uri:props.source}} style={props.style}/>*/
