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
    ScrollView
} from 'react-native';
import { Icon } from 'react-native-elements';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../themes'
import _ from 'lodash';
import Loader from '../components/Loader'
import styled from 'styled-components/native'
import LoadImage from '../components/LoadImage';
import loadAd from '../components/Advert';

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
    const [Visible, setVisible] = useState(false)
    const [snackbarText, setSnackbarText] = useState("TestSub")
    const [infoVisible, setInfoVisible] = useState(false)
    const [bounceValue, setBounceValue] = useState(new Animated.Value(75))
    const [height, setHeight] = useState(40)
    const [scaleValue, setScaleValue] = useState(new Animated.Value(0.1))
    const [scaleValueSnack, setScaleValueSnack] = useState(new Animated.Value(0.2))
    const [bounceValueSnack, setBounceValueSnack] = useState(new Animated.Value(20))

    if(theme.mode=='dark' && !iconColor)
    setIconColor(true)
  else if(theme.mode=='light' && iconColor)
    setIconColor(false)

    useEffect(() => {
      retrieveData()
    },[]);

    async function retrieveData()
    {
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
        setSnackScale(true)
        setSnackbarText("Wallpaper set successfully")
      }
      else{
        setIsLoading(false)
        setSnackScale(true)
        setSnackbarText("Something went wrong. Please try again")
      }
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
          setSnackScale(true)
          setSnackbarText("No internet connection")
        })
    }

    function setLockWall ()
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
          TYPE.LOCK
        )
        }).catch((e)=>{
          console.log(e)
          setIsLoading(false)
          setSnackScale(true)
          setSnackbarText("No internet connection")
        })
    }

    function setBothWall ()
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
          TYPE.BOTH
        )
        }).catch((e)=>{
          console.log(e)
          setIsLoading(false)
          setSnackScale(true)
          setSnackbarText("No internet connection")
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
        return <Icon name="heart" type='antdesign' size={25} color={iconColor?'white':'black'}/>
      }
      return <Icon name="hearto" type='antdesign' size={25} color={iconColor?'white':'black'}/>
    }

    function setDelay(){
      setTimeout(function(){
        setSnackScale(false)
      },1500)
    }

    function  setInfoScale() {  
      setInfoTranslate()
      setSnackbarText(`\nName: ${item.name}\n\nAuthor: ${item.author}\n\nCollection: ${item.collections}\n\n`)
      var toValue = 1; 
      if(infoVisible) {
        toValue = 0.2;
      }
      Animated.timing(
        scaleValue,
        {
          toValue: toValue,
          velocity: 25,
          tension: 2,
          friction: 6,
          useNativeDriver:true,
        }, 
      ).start();
      setInfoVisible(!infoVisible) ;
  }

  function  setInfoTranslate() {   
    var toValue = 0   
    if(infoVisible) {
      toValue = 75;
      setHeight(50)
    }
    Animated.spring(
      bounceValue,
      {
        toValue: toValue,
        velocity: 25,
        tension: 3,
        friction: 8,
        useNativeDriver:true,
      }, 
    ).start();
  }

  function  setSnackScale(t) {  
    setSnackTranslate(!t)
    var toValue = 1; 
    if(!t) {
      toValue = 0.2;
    }
    Animated.timing(
      scaleValueSnack,
      {
        toValue: toValue,
        velocity: 25,
        tension: 2,
        friction: 6,
        useNativeDriver:true,
      }, 
    ).start();
    setVisible(!t) ;
    if(t){
      setDelay()
    }
}

function  setSnackTranslate(t) {   
  var toValue = 0   
  if(t) {
    toValue = 35;
  }
  Animated.spring(
    bounceValueSnack,
    {
      toValue: toValue,
      velocity: 25,
      tension: 3,
      friction: 8,
      useNativeDriver:true,
    }, 
  ).start();
}
    function renderExtraSpace()
    {
        return(
          <Animated.View style={[{...styles.bottomTab, justifyContent:'flex-start',bottom:40,height:150 ,backgroundColor:!iconColor?'white':'black'},{transform: [{translateY: bounceValue,},{scaleY: scaleValue},]}]}>
            <Text style={{...styles.modalText, textAlign:'left', fontSize:16, paddingTop:5,}}>
              {snackbarText}
            </Text>
        </Animated.View>
        )
    }

    function renderBottomSnack()
    {
        return(
          <Animated.View style={[{...styles.bottomTab, justifyContent:'flex-start',bottom:40,height:60 ,backgroundColor:!iconColor?'white':'black'},{transform: [{translateY: bounceValueSnack,},{scaleY: scaleValueSnack},]}]}>
            <Text style={{...styles.modalText, textAlign:'center', fontSize:16, paddingTop:10,}}>
              {snackbarText}
            </Text>
        </Animated.View>
        )
    }

    function renderBottomTab()
    {
      return(
        <>
        {renderExtraSpace()}
        {renderBottomSnack()}
        <View style={{...styles.bottomTab}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}} >
            <TouchableOpacity style={{...styles.icon, marginLeft:30}} onPress={()=>setInfoScale()}>
              <Icon name="info" type='feather' size={25} color={iconColor?'white':'black'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={() => {
              handleDownload()
              setSnackScale(true)
            }}>
              <Icon name="download" type='feather' size={25} color={iconColor?'white':'black'}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>setShowApplyModal(true)}>
              <Icon name="arrow-up-circle" type='feather' size={25} color={iconColor?'white':'black'}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.icon, marginRight:30}} onPress={()=>{addToFav()}}>
              {renderHeart()}
            </TouchableOpacity>
          </View>
          </View>
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
              <View style={{...styles.modalItem, marginTop:30}}>
                <Icon name="shopping-bag" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Homescreen wallpaper</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setLockWall}>
              <View style={styles.modalItem}>
                <Icon name="settings" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Lockscreen wallpaper</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setBothWall}>
              <View style={{...styles.modalItem, marginBottom:30}}>
                <Icon name="info" type="feather" size={25} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Both</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
        
        </>
      )
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
      loadAd()
      setSnackScale(true)
      setSnackbarText("Download started")
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
                LoadAdvert()
                setSnackScale(true)
                setSnackbarText("Download complete")
              })
              .catch(error => console.log("error: ",error));
          }
          else{
            setSnackScale(true)
            setSnackbarText("Wallpaper already downloaded");
            setIsLoading(false)
          }
      })
      .catch(() => { console.log("File error")})
      
    };

  return (
    <View style={{flex:1}}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={styles.container}>
        <View>
          <LoadImage source={item} style={styles.wall}/>
        </View>
        {renderBottomTab()}
        <Loader loading={isLoading}/>
      </View>
      <View>
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wall:{
      height:"100%",
      width:'100%',
  },
  snackbar:{
    marginBottom:-100, 
    width:"80%", 
    alignSelf:'center',
    borderTopLeftRadius:15, 
    borderTopRightRadius:15,
    fontFamily:'Linotte-Bold'
  },
  bottomTab:{
    width:"80%", 
    height:65, 
    bottom:0, 
    position:'absolute', 
    margin:'10%',
    justifyContent:'center',
    borderTopEndRadius:15,
    borderTopLeftRadius:15,
    borderBottomEndRadius:15,
    borderBottomLeftRadius:15
  },
  icon:{
    marginHorizontal:10,
  },
  modal:{
    height:210,
    width:"80%",
    justifyContent:'space-between',
    alignSelf:'center',
    borderTopEndRadius:15,
    borderTopLeftRadius:15,
    borderBottomEndRadius:15,
    borderBottomLeftRadius:15
  },
  modalText: {
    marginHorizontal: 15,
    textAlign: "center",
    fontFamily:'Linotte-Bold'
  },
  modalItem:{
    paddingLeft:25,
    flexDirection:'row',
    marginVertical:5,
    alignItems:'center',
  },
});

export default SetWallpaper;