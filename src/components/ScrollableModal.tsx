import React from 'react';
import {ScrollView, StyleSheet, Text, View,Dimensions} from 'react-native';
// @ts-ignore
import Modal from 'react-native-modal';
import { STANDARD_HEIGHT, STANDARD_WIDTH } from '../constants';
import ModalBaseScene from './ModalBaseScene';

type State = {
  scrollOffset: null | number;
};

const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT


class ScrollableModal extends ModalBaseScene<State> {
  public scrollViewRef: React.RefObject<ScrollView>;
  constructor(props) {
    super(props, {
      scrollOffset: null,
    });

    this.scrollViewRef = React.createRef();
  }
  handleOnScroll = event => {
    this.setState({
      scrollOffset: event.nativeEvent.contentOffset.y,
    });
  };
  handleScrollTo = p => {
    if (this.scrollViewRef.current) {
      this.scrollViewRef.current.scrollTo(p);
    }
  };

  renderModal(): React.ReactElement<any> {
    return (
      <Modal
        testID={'modal'}
        isVisible={this.props.visible}
        onSwipeComplete={this.close}
        swipeDirection={['down']}
        onBackdropPress={() => this.props.changeVisible(false)}
        onDismiss={()=>this.isVisible()}
        scrollTo={this.handleScrollTo}
        scrollOffset={this.state.scrollOffset}
        scrollOffsetMax={400 - 300} // content height - ScrollView height
        propagateSwipe={true}
        style={styles.modal}>
        <View style={styles.scrollableModal}>
          <View style={{height:25, width:"100%",borderTopLeftRadius:25, borderTopRightRadius:25,backgroundColor: '#AAFF00',}}/>
          <ScrollView
            ref={this.scrollViewRef}
            onScroll={this.handleOnScroll}
            scrollEventThrottle={16}>
            <View style={styles.scrollableModalContent1}>

              <Text style={styles.scrollableModalText1}>
                {this.props.changelog}
              </Text>
            </View>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: 300*scaleHeight,
    borderTopLeftRadius:25,
    borderTopRightRadius:25
  },
  scrollableModalContent1: {
    height: 400*scaleHeight,
    backgroundColor: '#AAFF00',
    justifyContent: 'flex-start',
    paddingHorizontal:25 * scaleHeight,

  },
  scrollableModalText1: {
    fontSize: 20*scaleHeight,
    color: 'black',
    textAlign:'justify',
    paddingTop:15,
    fontFamily:'Linotte-Bold'
  },
});

export default ScrollableModal;
