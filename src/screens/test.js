import * as React from 'react';
import {
  Animated,
  Dimensions,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {  Portal, Text, Button, Provider } from 'react-native-paper';
import Modal from 'react-native-modal';
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

export default class MyComponent extends React.Component {
  state = {
    visible: false,
  };

  _showModal = () => this.setState({ visible: true });
  _hideModal = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    return (
      <>
      <Modal visible={visible} onDismiss={this._hideModal}
            animationIn="slideInUp"
            useNativeDriver={true}
            animationInTiming={300}
            >
                  <TouchableHighlight onPress={this._hideModal} underlayColor="green" style={styles.button}>
                    <Text style={styles.buttonText}>Close Modal</Text>
                  </TouchableHighlight>
            </Modal>
      <Provider>
        <View style={styles.container}>
          <Button
             style={{ marginTop: 30 }}
             onPress={this._showModal}
           >
            Show
          </Button>
         </View>
      </Provider>
      
      </>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'green',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white'
  },
  modal: {
    height: deviceHeight,
    width: deviceWidth,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#ededed',
    justifyContent: 'center',
  }
});

