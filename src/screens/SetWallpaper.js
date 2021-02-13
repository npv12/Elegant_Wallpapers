import React, { useState,useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Platform,
    PermissionsAndroid,
    Alert,
    StatusBar,
    Animated,
    Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../themes'
import _ from 'lodash';
import Loader from '../components/Loader'
import styled from 'styled-components/native'
import LoadImage from '../components/LoadImage';
import loadAd from '../components/Advert';
import ImageZoom from 'react-native-image-pan-zoom';
import { STANDARD_HEIGHT,STANDARD_WIDTH } from '../constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const SetWallpaper = ({route}) => {
    const theme = useTheme()
    const {item} = route.params
    const [showApplyModal, setShowApplyModal] = useState(false)
    const [isFav, setIsFav] = useState(false)
    const [iconColor, setIconColor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [translateBottom, setTranslateBottom] = useState(new Animated.Value(200*scaleHeight))
    const [advertCap, setAdvertCap] = useState(false)
    const [bottomMenuVisible, setBottomMenuVisible] = useState(false)

    if(theme.mode=='dark' && !iconColor)
    setIconColor(true)
  else if(theme.mode=='light' && iconColor)
    setIconColor(false)

    useEffect(() => {
      retrieveData()
      return function(){
      }
    },[]);

    async function retrieveData()
    {
      Image.getSize(item.thumbnail, (w,h)=>{
      }).catch()

      await AsyncStorage.getItem('favs').then((r)=>{
        var res = JSON.parse(r)
        if(!res)
          return
        for(var i=0;i<res.length;i++)
        {
          if(_.isEqual(res[i],item))
          {
            setIsFav(true)
            break;
          }
        }
      })
    }

    function callback(response)
    {
      if(response.status=='success')
      {
        setIsLoading(false)
        setSnackbarText("Wallpaper set successfully")
      }
      else{
        setIsLoading(false)
        setSnackbarText("Something went wrong. Please try again")
      }
    }

    function showAd(){
      if(!advertCap)  {
        loadAd()
        setAdvertCap(true)
        setDelayAd()
      }
    }

    function setDelayAd(){
      setTimeout(function(){
        setAdvertCap(false)
      },12000)
    }

    async function setHomeWall ()
    {
      setShowApplyModal(false)
      loadAd()
      setIsLoading(true)
      RNFetchBlob
      .config({
        fileCache : true,
        appendExt : 'png'
      })
      .fetch('GET', item.url, {
        //some headers ..
      })
      .then((res) => {
        var PATH = 'file://' + res.path()
        console.log('The file saved to ', PATH)
        ManageWallpaper.setWallpaper(
          {
            uri: PATH,
          },
          callback,
          TYPE.HOME
        )
        }).catch((e)=>{
          console.log(e)
          setIsLoading(false)
        })
    }

    function setLockWall ()
    {
      setShowApplyModal(false)
      showAd()
      setIsLoading(true)
      RNFetchBlob
      .config({
        fileCache : true,
        appendExt : 'png'
      })
      .fetch('GET', item.url, {
        //some headers ..
      })
      .then((res) => {
        var PATH = 'file://' + res.path()
        console.log('The file saved to ', PATH)
        ManageWallpaper.setWallpaper(
          {
            uri: PATH,
          },
          callback,
          TYPE.LOCK
        )
        }).catch((e)=>{
          console.log(e)
          setIsLoading(false)
        })
    }

    function setBothWall ()
    {
      setShowApplyModal(false)
      showAd()
      setIsLoading(true)
      RNFetchBlob
      .config({
        fileCache : true,
        appendExt : 'png'
      })
      .fetch('GET', item.url, {
        //some headers ..
      })
      .then((res) => {
        var PATH = 'file://' + res.path()
        console.log('The file saved to ', PATH)
        ManageWallpaper.setWallpaper(
          {
            uri: PATH,
          },
          callback,
          TYPE.BOTH
        )
        }).catch((e)=>{
          console.log(e)
          setIsLoading(false)
        })
    }

    async function addToFav()
    {
      if(isFav)
      {
        var temp = []
        await AsyncStorage.getItem('favs').then(async (r)=>{
          var res = JSON.parse(r)
          if(!res)
            return
          for(var i=0;i<res.length;i++)
          {
            if(_.isEqual(res[i],item))
            {
              continue
            }
            temp.push(res[i])
          }
          await AsyncStorage.setItem('favs',JSON.stringify(temp))
        })
        setIsFav(false)
      }
      else
      {
        await AsyncStorage.getItem('favs').then(async (res)=>{
          var temp = JSON.parse(res)
          if(!temp)
          {
            var temp2 = []
            temp2.push(item)
            await AsyncStorage.setItem('favs', JSON.stringify(temp2) )
          }
          else{
            temp.push(item)
            await AsyncStorage.setItem('favs', JSON.stringify(temp) )
          }
        })
        setIsFav(true)
      }
    }

    function renderHeart()
    {
      if(isFav)
      {
        return <View style={styles.iconView}>
          <Icon name="heart" type='antdesign' size={25*scaleHeight} color={iconColor?'white':'black'}/>
        </View>
      }
      return <View style={styles.iconView}>
        <Icon name="hearto" type='antdesign' size={25*scaleHeight} color={iconColor?'white':'black'}/>
      </View>
    }

    function  toggleBottom() {
        var toValue = 0;
        if(bottomMenuVisible) {
          toValue = 200*scaleHeight;
        }
        Animated.spring(
          translateBottom,
          {
            toValue: toValue,
            velocity: 25,
            tension: 2,
            friction: 4,
            useNativeDriver:true,
          },
        ).start();
        setBottomMenuVisible(!bottomMenuVisible)
    }

    function renderBottomTab()
    {
      {
      return(
        <>
        <Animated.View style={[styles.bottomTab,{transform: [{translateY: translateBottom,}]}]}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}} >
            <View style={{flexDirection:'row'}} >
              <TouchableOpacity style={{...styles.icon, marginLeft:30*scaleHeight}} onPress={toggleBottom}>
                <View style={{marginTop:15*scaleHeight, paddingRight:10*scaleWidth}}>
                  <Icon name="up" type='antdesign' size={25*scaleHeight} color={iconColor?'white':'black'}/>
                </View>
              </TouchableOpacity>
              <Text style={styles.NameHeader}>{item.name.toUpperCase()}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={styles.icon} onPress={() => {
                handleDownload()
              }}>
                <View style={styles.iconView}>
                  <Icon name="download" type='feather' size={25*scaleHeight} color={iconColor?'white':'black'}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={()=>setShowApplyModal(true)}>
                <View style={styles.iconView}>
                  <Icon name="arrow-up-circle" type='feather' size={25*scaleHeight} color={iconColor?'white':'black'}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.icon, marginRight:30*scaleWidth}} onPress={()=>{addToFav()}}>
                {renderHeart()}
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
          <Modal
          animationType="FadeIn"
          visible={showApplyModal}
          useNativeDriver={true}
          onBackdropPress={() => setShowApplyModal(false)}
          >
          <View style={styles.modal}>
            <TouchableOpacity onPress={()=>{
              setHomeWall()
              }}>
              <View style={{...styles.modalItem, marginTop:30*scaleHeight}}>
                <Icon name="shopping-bag" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Homescreen wallpaper</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setLockWall}>
              <View style={styles.modalItem}>
                <Icon name="settings" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Lockscreen wallpaper</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setBothWall}>
              <View style={{...styles.modalItem, marginBottom:30*scaleHeight}}>
                <Icon name="info" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Both</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

        </>
      )}
    }

    const getPermissionAndroid = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Image Download Permission',
            message: 'Your permission is required to save images to your device',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          return true;
        }
        Alert.alert(
          'Save remote Image',
          'Grant Me Permission to save Image',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } catch (err) {
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + err.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      }
    };

    async function handleDownload() {
      showAd()
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }
      let dirs = RNFetchBlob.fs.dirs.SDCardDir
      const PATH = (dirs + `/Pictures/Elegant-Walls/` + item.name + '_' + item.author + '.png')
      RNFetchBlob.fs.exists(PATH)
      .then((exist) => {
          if(!exist)
          {
            RNFetchBlob.config({
              addAndroidDownloads:{
                useDownloadManager:true,
                notification:true,
                mime:'image',
                path:PATH,
              }
            })
              .fetch('GET', item.url)
              .then(res => {
                setIsLoading(false)
              })
              .catch(error => console.log("error: ",error));
          }
          else{
            setIsLoading(false)
          }
      })
      .catch(() => { console.log("File error")})

    };

  return (
    <View style={{flex:1}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle ={theme.mode=='dark'?'light-content':'dark-content'}/>
      <View style={styles.container}>
          <LoadImage source={item} resizeMode="cover" style={{height:"100%", width:"100%"}}/>
        {renderBottomTab()}
        <Loader loading={isLoading}/>
      </View>
      <View>
          </View>
    </View>
  );
};//

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  snackbar:{
    marginBottom:-100*scaleHeight,
    width:"80%",
    alignSelf:'center',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    fontFamily:'Linotte-Bold'
  },
  bottomTab:{
    width:"100%",
    height:300*scaleHeight,
    bottom:-10*scaleHeight,
    backgroundColor: 'black',
    position:'absolute',
    borderTopEndRadius:25*scaleHeight,
    borderTopLeftRadius:25*scaleHeight,
    borderBottomEndRadius:25*scaleHeight,
    borderBottomLeftRadius:25*scaleHeight,
    paddingTop: 14
  },
  modal:{
    height:210*scaleHeight,
    width:"80%",
    justifyContent:'space-between',
    alignSelf:'center',
    borderTopEndRadius:15,
    borderTopLeftRadius:15,
    borderBottomEndRadius:15,
    borderBottomLeftRadius:15
  },
  modalText: {
    marginHorizontal: 15*scaleWidth,
    textAlign: "center",
    fontFamily:'Linotte-Bold'
  },
  modalItem:{
    paddingLeft:25*scaleWidth,
    flexDirection:'row',
    marginVertical:5,
    alignItems:'center',
  },
  activityIndicatorWrapper: {
    height: 250*scaleHeight,
    position:'absolute',
    width: "100%",
    borderRadius: 10,
    top:windowHeight/2-150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  NameHeader:{
    fontSize: 20*scaleHeight,
    fontFamily:'Linotte-Bold',
    marginTop: 15*scaleHeight
  },
  iconView:{
    paddingLeft: 25*scaleWidth,
    paddingTop:15*scaleHeight,
  }
});

export default SetWallpaper;
