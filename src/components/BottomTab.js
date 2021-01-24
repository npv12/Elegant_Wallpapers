import React, { useState } from 'react';
import { 
    StyleSheet, 
    TouchableOpacity,
    Dimensions,
    Linking,
    Animated
} from 'react-native';
import { Icon } from 'react-native-elements'
import styled from 'styled-components/native'
import { useTheme } from '../themes'
import Modal from 'react-native-modal';

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`


const windowWidth = Dimensions.get('window').width;

const BottomTab = (props) => {
    const [iconColor, setIconColor] = useState(false)
    const [bottomMenuVisible, setBottomMenuVisible] = useState(false)
    const theme = useTheme()
    const [bounceValue, setBounceValue] = useState(new Animated.Value(165))

    if(theme.mode=='dark' && !iconColor)
        setIconColor(true)
    else if(theme.mode=='light' && iconColor)
        setIconColor(false)

  function  toggleSubview() {    
      var toValue = 0;   
      if(bottomMenuVisible) {
        toValue = 200;
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
      visible={bottomMenuVisible} onDismiss={()=>setBottomMenuVisible(false)}  onBackdropPress={() => toggleSubview()} style={{justifyContent: 'flex-end',
      margin: 0,}}>
      <Animated.View
            style={[styles.subView,
              {transform: [{translateY: bounceValue}]}]}
          >
      <View style={{...styles.bottomTab, height:185}}>
        <View style={styles.pill}></View>
        <TouchableOpacity onPress={()=>Linking.openURL('https://play.google.com/store/apps/details?id=com.madness.wallz.pro')}>
          <View style={styles.modalItem}>
            <Icon name="shopping-bag" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
            <Text style={styles.modalText}>Upgrade to Pro</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          props.navigation.navigate('Settings')
          toggleSubview()
          }}>
          <View style={styles.modalItem}>
            <Icon name="settings" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
            <Text style={styles.modalText}>Settings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
          toggleSubview()
          props.navigation.navigate('About')
          }}>
          <View style={styles.modalItem}>
            <Icon name="info" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
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
      <View style={{height:60, borderTopEndRadius:55}}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:"3%"}}>
          <TouchableOpacity onPress={()=>{
                  toggleSubview()}
                  }>
              <Icon name="align-justify" type='feather' size={25} style={styles.icon} color={iconColor?'white':'black'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>props.navigation.navigate('Fav')}>
            <Icon name="hearto" type='antdesign' size={25} style={styles.icon} color={iconColor?'white':'black'}/>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate("Search")}>
          <View style={{...styles.searchBox,backgroundColor:iconColor?'white':'black'}}>
            <Icon name='search' type='feather'size={25} color={!iconColor?'white':'black'}/> 
          </View>
        </TouchableOpacity>
      </View>
      {renderModal()}
    </>
  );
};

const styles = StyleSheet.create({
    icon:{
      paddingHorizontal:10,
      paddingBottom:5,
    },    
    searchBox:{
      justifyContent:'center',
      height:60,
      width:60,
      borderRadius:70,
      elevation:10,
      shadowColor:'#fff',
      position:'absolute',
      opacity:1,
      bottom:25,
      right:40,
    },
    headerContainer: {},
    bottomTab:{
        justifyContent:'center',
        alignItems:'flex-start',
        height:70,
        borderTopEndRadius:30,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        elevation: 5,
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontFamily:'Linotte-Bold',
      alignSelf:'center',
      marginTop:5
    },
    modalItem:{
      paddingLeft:25,
      flexDirection:'row',
      justifyContent:'center',
      marginVertical:5,
      width:windowWidth,
      justifyContent:'flex-start',
    },
    pill:{
      backgroundColor:'#898989',
      height:5,
      width:40,
      borderRadius:10,
      marginBottom:15,
      alignSelf:'center'
    },
    subView: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#FFFFFF",
      height: 165,
      borderTopEndRadius:30
    }
  });

export default BottomTab;