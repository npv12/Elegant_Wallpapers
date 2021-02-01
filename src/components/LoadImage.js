import React from 'react';
import {Image,ActivityIndicator,StyleSheet,Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { STANDARD_WIDTH ,STANDARD_HEIGHT} from '../constants';
import styled from 'styled-components/native'

const View = styled.View`
  background: ${props => props.theme.background};
`

const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

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
    height: 250*scaleHeight,
    position:'absolute',
    width: "100%",
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default LoadImage;
