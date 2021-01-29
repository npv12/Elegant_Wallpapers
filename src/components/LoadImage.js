import React from 'react';
import {Image,ActivityIndicator,StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native'

const View = styled.View`
  background: ${props => props.theme.background};
`

const LoadImage = (props) => {
  return (
    <>
    <View>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={true} size="large" color="#00bd84" />
        </View>
        <Image source={{uri:props.source.thumbnail}} style={props.style}/>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    height: 250,
    position:'absolute',
    width: "100%",
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoadImage;
