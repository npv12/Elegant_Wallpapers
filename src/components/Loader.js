import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator,Dimensions} from 'react-native';
import { STANDARD_WIDTH ,STANDARD_HEIGHT} from '../constants';
import { useTheme } from '../themes'

const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

const Loader = (props) => {
  const theme = useTheme()

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.loading}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={{...styles.activityIndicatorWrapper, backgroundColor:theme.mode=='dark'?'black':'white'}}>
          <ActivityIndicator animating={true} size="large" color={theme.mode!='dark'?'black':'white'} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    height: 100*scaleHeight,
    width: 100*scaleWidth,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
