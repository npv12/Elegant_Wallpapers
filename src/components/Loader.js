import React from 'react';
import {StyleSheet, View, Modal, ActivityIndicator} from 'react-native';
import { useTheme } from '../themes'

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
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
