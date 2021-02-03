import React, { useState } from 'react';
import { 
    StyleSheet, 
    TouchableOpacity,
    Dimensions,
    Linking,
    Animated,
} from 'react-native';
import { Icon } from 'react-native-elements'
import styled from 'styled-components/native'
import { useTheme } from '../themes'
import Modal from 'react-native-modal';
import { PRO_APP,STANDARD_HEIGHT,STANDARD_WIDTH } from '../constants';

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT


const windowWidth = Dimensions.get('window').width;

const BottomTab = (props) => {
    const [iconColor, setIconColor] = useState(false)
    const [bottomMenuVisible, setBottomMenuVisible] = useState(false)
    const theme = useTheme()
    const [bounceValue, setBounceValue] = useState(new Animated.Value(165*scaleHeight))

    if(theme.mode=='dark' && !iconColor)
        setIconColor(true)
    else if(theme.mode=='light' && iconColor)
        setIconColor(false)

  function  toggleSubview() {    
      var toValue = 0;   
      if(bottomMenuVisible) {
        toValue = 200*scaleHeight;
      }
      Animated.spring(
        bounceValue,
        {
          toValue: toValue,
          velocity: 25,
          tension: 2,
          friction: 4,
          useNativeDriver:true,
        }, 
      ).start();
  
      if(bottomMenuVisible)
      {
        setTimeout(function(){
          setBottomMenuVisible(false)
        },200)
      }
      else
        setBottomMenuVisible(!bottomMenuVisible) ;
  }

  function renderModal(){
    return(
      <Modal 
      visible={bottomMenuVisible} 
      onDismiss={()=>setBottomMenuVisible(false)}  
      onBackdropPress={() => toggleSubview()} 
      onSwipeComplete={()=>toggleSubview()}
      swipeDirection={['down']}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
        backgroundColor: 'rgba(0,0,0,0.6)'
      }}>
      <Animated.View
            style={[styles.subView,
              {transform: [{translateY: bounceValue}]}]}
          >
      <View style={{...styles.bottomTab, height:185*scaleHeight}}>
        <View style={styles.pill}></View>
        <TouchableOpacity onPress={()=>Linking.openURL(PRO_APP)}>
          <View style={styles.modalItem}>
            <Icon name="shopping-bag" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
            <Text style={styles.modalText}>Upgrade to Pro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          props.navigation.navigate('Settings')
          toggleSubview()
          }}>
          <View style={styles.modalItem}>
            <Icon name="settings" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
            <Text style={styles.modalText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          toggleSubview()
          props.navigation.navigate('About')
          }}>
          <View style={styles.modalItem}>
            <Icon name="info" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
            <Text style={styles.modalText}>About</Text>
          </View>
        </TouchableOpacity>
      </View>
      </Animated.View>
      </Modal>
  )
  }
  return (
    <>
      <View style={{height:60*scaleHeight, borderTopEndRadius:55}}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:"3%"}}>
          <TouchableOpacity onPress={()=>{
                  toggleSubview()}
                  }>
              <Icon name="align-justify" type='feather' size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Fav')}>
            <Icon name="hearto" type='antdesign' size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
          </TouchableOpacity>
        </View>
        
          <TouchableOpacity onPress={()=>props.navigation.navigate("Search")} style={{...styles.searchBox,backgroundColor:iconColor?'white':'black'}}>
            <Icon name='search' type='feather'size={25*scaleHeight} color={!iconColor?'white':'black'}/>
            </TouchableOpacity> 
        
      </View>
      {renderModal()}
    </>
  );
};

const styles = StyleSheet.create({
    icon:{
      paddingHorizontal:10*scaleWidth,
      paddingBottom:5*scaleHeight,
    },    
    searchBox:{
      justifyContent:'center',
      height:65*scaleWidth,
      width:65*scaleWidth,
      borderRadius:65*scaleWidth,
      elevation:10,
      shadowColor:'#fff',
      position:'absolute',
      opacity:1,
      bottom:25*scaleHeight,
      right:40*scaleHeight,
    },
    headerContainer: {},
    bottomTab:{
        justifyContent:'center',
        alignItems:'flex-start',
        height:70*scaleHeight,
        borderTopEndRadius:30*scaleHeight,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        elevation: 5,
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20*scaleHeight,
      padding: 10*scaleHeight,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15*scaleHeight,
      textAlign: "center",
      fontFamily:'Linotte-Bold',
      alignSelf:'center',
      marginTop:5*scaleHeight,
      fontSize:16*scaleHeight
    },
    modalItem:{
      paddingLeft:25*scaleWidth,
      flexDirection:'row',
      justifyContent:'center',
      marginVertical:5*scaleHeight,
      width:windowWidth,
      justifyContent:'flex-start',
    },
    pill:{
      backgroundColor:'#898989',
      height:5*scaleHeight,
      width:40*scaleWidth,
      borderRadius:10*scaleHeight,
      marginBottom:15*scaleHeight,
      alignSelf:'center'
    },
    subView: {
      position: "absolute",
      bottom: 10,
      left: 0,
      right: 0,
      backgroundColor: "#FFFFFF",
      height: 165*scaleHeight,
      borderTopEndRadius:30*scaleHeight
    }
  });

export default BottomTab;