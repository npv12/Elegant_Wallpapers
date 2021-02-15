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
    Image,
    ScrollView,
    View,
    ToastAndroid,
    FlatList
} from 'react-native';
import { Icon } from 'react-native-elements';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import { BlurView } from "@react-native-community/blur";
import Modal from 'react-native-modal';
import RNFetchBlob from 'rn-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../themes'
import _ from 'lodash';
import Loader from '../components/Loader'
import ImageColors from "react-native-image-colors"
import styled from 'styled-components/native'
import Clipboard from '@react-native-clipboard/clipboard';
import LoadImage from '../components/LoadImage';
import loadAd from '../components/Advert';
import { STANDARD_HEIGHT,STANDARD_WIDTH } from '../constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

const SView = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const SetWallpaper = ({route, navigation}) => {
    const theme = useTheme()
    const {item} = route.params
    const [showApplyModal, setShowApplyModal] = useState(false)
    const [isFav, setIsFav] = useState(false)
    const [iconColor, setIconColor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [translateBottom, setTranslateBottom] = useState(new Animated.Value(200*scaleHeight))
    const [advertCap, setAdvertCap] = useState(false)
    const [bottomMenuVisible, setBottomMenuVisible] = useState(false)
    const [colors, setColors] = useState({average:'#FFF', vibrant:'#FFF', dominant:'#FFF'})
    const [variousCollection, setVariousCollections] = useState([])

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
      //extract colors
      const col = (await ImageColors.getColors(item.thumbnail, {
      fallback: '#000000',
      quality: 'high',
      pixelSpacing: 5,
    }))
    if(col)
    {
      setColors(col)
    }

    //splitting the collections and setting it for further use
    setVariousCollections(item.collections.toLowerCase().split(","))

    //image size for better viewing. currently not in use
      Image.getSize(item.thumbnail, (w,h)=>{
      }).catch()



      //taking out favorites from storage
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


    //callback function for setwallpaper
    function callback(response)
    {
      if(response.status=='success')
      {
        setIsLoading(false)
      }
      else{
        setIsLoading(false)
      }
    }

    //this will show ad and cap it up
    function showAd(){
      if(!advertCap)  {
        loadAd()
        setAdvertCap(true)
        setDelayAd()
      }
    }

    //hax for cap
    function setDelayAd(){
      setTimeout(function(){
        setAdvertCap(false)
      },12000)
    }

    //sets wall by first downloading using rnfetch so that app doesn't crash
    //TODO: replace rnfetch with expo file system as rnfetch isn't maintained anymore
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
        //console.log('The file saved to ', PATH)
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

    //same as home but lock
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
        //console.log('The file saved to ', PATH)
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

    //for both
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
        //console.log('The file saved to ', PATH)
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

    //adds the wall to fav and stores it
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

    //lets make everything into separate components coz why not?
    function renderHeart()
    {
      if(isFav)
      {
        return <View style={styles.iconView}>
          <Icon name="heart" type='antdesign' size={25*scaleHeight} color='white'/>
        </View>
      }
      return <View style={styles.iconView}>
        <Icon name="hearto" type='antdesign' size={25*scaleHeight} color='white'/>
      </View>
    }

    //animation controller
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

    //renders the arrow on the bottom tab
    function renderArrow(){
      if(bottomMenuVisible)
        return <View style={{marginTop:15*scaleHeight, paddingRight:10*scaleWidth}}>
          <Icon name="down" type='antdesign' size={25*scaleHeight} color='white'/>
        </View>
      return <View style={{marginTop:15*scaleHeight, paddingRight:10*scaleWidth}}>
        <Icon name="up" type='antdesign' size={25*scaleHeight} color='white'/>
      </View>
    }

    //copies the color to clipboard when the color is selected
    function copyToClip(colors){
      Clipboard.setString(colors);
      ToastAndroid.showWithGravityAndOffset(
        'Color has been copied',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        25,
        50
      );
    }

    //collextionBox for the flatlist
    function renderCollectionBox({item}){
      return <TouchableOpacity style={{...styles.box, backgroundColor: 'rgba(0,0,0,0.6)', width:windowWidth/2-50, height: 65}} onPress={()=>{navigation.navigate('Collection',{
        value:item
      })}}>
                <Text style={{fontSize:20,color:'white'}}>{item}</Text>
              </TouchableOpacity>
    }

    //the explanded view that hosts most of the data
    function renderExpandedView(){
      return(
        <ScrollView>
          <View style={{marginTop: 50}}>
            <Text style={{...styles.bottomHeader}}>Colors</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} >
              <TouchableOpacity style={{...styles.box, backgroundColor: colors.average}} activeOpacity={0.8} onPress={()=>copyToClip(colors.average)}/>
              <TouchableOpacity style={{...styles.box, backgroundColor: colors.darkMuted}} activeOpacity={0.8} onPress={()=>copyToClip(colors.darkMuted)}/>
              <TouchableOpacity style={{...styles.box, backgroundColor: colors.darkVibrant}} activeOpacity={0.8} onPress={()=>copyToClip(colors.darkVibrant)}/>
              <TouchableOpacity style={{...styles.box, backgroundColor: colors.dominant}} activeOpacity={0.8} onPress={()=>copyToClip(colors.dominant)}/>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity style={{...styles.box, backgroundColor: colors.lightMuted}} activeOpacity={0.8} onPress={()=>copyToClip(colors.lightMuted)}/>
              <TouchableOpacity style={{...styles.box, backgroundColor: colors.lightVibrant}} activeOpacity={0.8} onPress={()=>copyToClip(colors.lightVibrant)}/>
              <TouchableOpacity style={{...styles.box, backgroundColor: colors.muted}} activeOpacity={0.8} onPress={()=>copyToClip(colors.muted)}/>
              <TouchableOpacity style={{...styles.box, backgroundColor: colors.vibrant}} activeOpacity={0.8} onPress={()=>copyToClip(colors.vibrant)}/>
            </View>
            <Text style={{...styles.bottomHeader}}>Collections</Text>
            <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <FlatList
              horizontal
              data={variousCollection}
              renderItem={renderCollectionBox}
              keyExtractor={(item) => item}
            />
            </View>
            <Text style={styles.bottomHeader}>Resolution</Text>
            <View style={{justifyContent: 'space-between', alignItems: 'center'}}>
              <TouchableOpacity style={{...styles.box, backgroundColor: 'rgba(0,0,0,0.6)', width:windowWidth/2-50, height: 65}} onPress={()=>{navigation.navigate('Collection',{value:item})}}>
                <Text style={{fontSize:20,color:'white'}}>{item.resolution}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height:100, width:windowWidth}}/>
        </ScrollView>
      )
    }

    //the whole bottom tab is a separate component. this page is literally bottomTab xD
    function renderBottomTab()
    {
      {
      return(
        <>
        <Animated.View style={[styles.bottomTab,{transform: [{translateY: translateBottom,}]}]}>
        <BlurView
          style={{...styles.bottomTab, backgroundColor: 'rgba(255,255,255,0.1)'}}
          blurType="dark"
          blurAmount={27}
          />
          <View style={{flexDirection:'row',justifyContent:'space-between'}} >
            <View style={{flexDirection:'row'}} >
              <TouchableOpacity style={{...styles.icon, marginLeft:30*scaleHeight}} onPress={toggleBottom}>
                {renderArrow()}
              </TouchableOpacity>
              <Text style={{...styles.NameHeader, color:'white'}}>{item.name.toUpperCase()}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'flex-end'}}>
              <TouchableOpacity style={styles.icon} onPress={() => {
                handleDownload()
              }}>
                <View style={styles.iconView}>
                  <Icon name="download" type='feather' size={25*scaleHeight} color='white'/>
                </View>

              </TouchableOpacity>
              <TouchableOpacity style={styles.icon} onPress={()=>setShowApplyModal(true)}>
                <View style={styles.iconView}>
                  <Icon name="arrow-up-circle" type='feather' size={25*scaleHeight} color='white'/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{...styles.icon, marginRight:30*scaleWidth}} onPress={()=>{addToFav()}}>
                {renderHeart()}
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height:14, width: windowWidth}}/>
          {renderExpandedView()}
        </Animated.View>
          <Modal
          animationType="FadeIn"
          visible={showApplyModal}
          useNativeDriver={true}
          onBackdropPress={() => setShowApplyModal(false)}
          >
          <SView style={styles.modal}>
            <TouchableOpacity onPress={()=>{
              setHomeWall()
              }}>
              <SView style={{...styles.modalItem, marginTop:30*scaleHeight}}>
                <Icon name="shopping-bag" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Homescreen wallpaper</Text>
              </SView>
            </TouchableOpacity>
            <TouchableOpacity onPress={setLockWall}>
              <SView style={styles.modalItem}>
                <Icon name="settings" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Lockscreen wallpaper</Text>
              </SView>
            </TouchableOpacity>
            <TouchableOpacity onPress={setBothWall}>
              <SView style={{...styles.modalItem, marginBottom:30*scaleHeight}}>
                <Icon name="info" type="feather" size={25*scaleHeight} style={styles.icon} color={iconColor?'white':'black'}/>
                <Text style={styles.modalText}>Set Both</Text>
              </SView>
            </TouchableOpacity>
          </SView>
        </Modal>

        </>
      )}
    }

    //have to check for perms before the app decides to crash itself up
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

    //wallpaper downloader.
    async function handleDownload() {
      showAd()
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }
      let dirs = RNFetchBlob.fs.dirs.SDCardDir
      const PATH = (dirs + `/Pictures/Elegant-Walls/` + item.name + '_' + item.author + '.jpg')
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
    position:'absolute',
    borderTopEndRadius:25*scaleHeight,
    borderTopLeftRadius:25*scaleHeight,
    borderBottomEndRadius:25*scaleHeight,
    borderBottomLeftRadius:25*scaleHeight,
    paddingVertical: 14,
    marginBottom: 0
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
  },
  box:{
    height:50,
    width:85,
    margin:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius:15,
    borderTopRightRadius:15,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
  },
  bottomHeader:{
    fontSize:22,
    textAlign: 'center',
  }
});

export default SetWallpaper;
