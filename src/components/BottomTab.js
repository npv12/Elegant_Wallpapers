import React, { useState,useEffect } from 'react';
import { 
    StyleSheet, 
    TouchableOpacity,
    Dimensions,
    Linking
} from 'react-native';
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal';
import styled from 'styled-components/native'
import { useTheme } from '../themes'

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

    if(theme.mode=='dark' && !iconColor)
        setIconColor(true)
    else if(theme.mode=='light' && iconColor)
        setIconColor(false)
  return (
      <>
    <View style={{height:60, borderTopEndRadius:55}}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:"3%"}}>
            <TouchableOpacity onPress={()=>{
                    setBottomMenuVisible(true)}}>
                <Icon name="align-justify" type='feather' size={25} style={styles.icon} color={iconColor?'white':'black'}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.navigation.navigate('Fav')}>
            <Icon name="hearto" type='antdesign' size={25} style={styles.icon} color={iconColor?'white':'black'}/>
            </TouchableOpacity>
        </View>
        
          <View style={{...styles.searchBox,backgroundColor:iconColor?'white':'black'}}>
            <TouchableOpacity onPress={()=>props.navigation.navigate("Search")}>
                <Icon name='search' type='feather'size={25} color={!iconColor?'white':'black'}/> 
                </TouchableOpacity>
          </View>
    </View>
    <Modal
          transparent={true}
          visible={bottomMenuVisible}
          onBackdropPress={() => setBottomMenuVisible(false)}
          useNativeDriver={true}
          animationIn="rotate"
          animationInTiming={1000}
          style={{justifyContent:'flex-end', margin:0,backgroundColor:'rgba(0,0,0,0.5)'}}
        >
          <View style={{...styles.bottomTab, height:165}}>
            <View style={styles.pill}></View>
            <TouchableOpacity onPress={()=>Linking.openURL('https://play.google.com/store/apps/details?id=com.madness.wallz.pro')}>
              <View style={styles.modalItem}>
                <Icon name="shopping-bag" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Upgrade to Pro</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              props.navigation.navigate('Settings')
              setBottomMenuVisible(false)
              }}>
              <View style={styles.modalItem}>
                <Icon name="settings" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              setBottomMenuVisible(false)
              props.navigation.navigate('About')
              }}>
              <View style={styles.modalItem}>
                <Icon name="info" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>About</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
    </>
  );
};

const styles = StyleSheet.create({
    icon:{
      paddingHorizontal:10,
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
      textAlign: "center"
    },
    modalItem:{
      paddingLeft:25,
      flexDirection:'row',
      justifyContent:'center',
      marginVertical:5,
      width:windowWidth,
      justifyContent:'flex-start'
    },
    pill:{
      backgroundColor:'#898989',
      height:5,
      width:40,
      borderRadius:10,
      marginBottom:15,
      alignSelf:'center'
    }
  });

export default BottomTab;