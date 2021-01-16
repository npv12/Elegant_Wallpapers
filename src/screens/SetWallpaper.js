import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    Dimensions,
    Animated,
    Platform,
    PermissionsAndroid,
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import Modal from 'react-native-modal';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SetWallpaper = ({route}) => {
    const {item} = route.params
    const [showApplyModal, setShowApplyModal] = useState(false)
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(100))
    const [viewAnimation, setViewAnimation] = useState(true)

    function toggleAnimation()
    {
      if(viewAnimation)
      {
        console.log("animating")
        Animated.timing(animatedValue, {
          toValue:300,
          timing:1500,
          useNativeDriver:true
        }).start(()=>setViewAnimation(false))
      }
      else{
        console.log("no")
        Animated.timing(animatedValue,{
          toValue: 100,
          timing:1500,
          useNativeDriver:true
        }).start(()=>{
          setViewAnimation(true)
        })
      }
    }

    function callback()
    {
      setShowApplyModal(false)
    }

    function setHomeWall ()
    {
      ManageWallpaper.setWallpaper(
        {
          uri: item.url,
        },
        callback,
        TYPE.HOME
      )
      
    }

    function setLockWall ()
    {
      ManageWallpaper.setWallpaper(
        {
          uri: item.url,
        },
        callback,
        TYPE.LOCK
      )
    }

    function setBothWall ()
    {
      ManageWallpaper.setWallpaper(
        {
          uri: item.url,
        },
        callback,
        TYPE.BOTH
      )
    }

    function renderBottomTab()
    {
      return(
        <>
        <Animated.View style={styles.bottomTab}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}} >
            <TouchableOpacity style={{...styles.icon, marginLeft:30}} onPress={toggleAnimation}>
              <Icon name="info" type='feather' size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={handleDownload}>
              <Icon name="download" type='feather' size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>setShowApplyModal(true)}>
              <Icon name="arrow-up-circle" type='feather' size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.icon, marginRight:30}}>
              <Icon name="heart" type='feather' size={25}/>
            </TouchableOpacity>
          </View>
          </Animated.View>
          <Modal
          animationType="fade"
          transparent={true}
          visible={showApplyModal}
          onBackdropPress={() => setShowApplyModal(false)}
          style={{}}
        >
          <View style={styles.modal}>
            <TouchableOpacity onPress={setHomeWall}>
              <View style={{...styles.modalItem, marginTop:30}}>
                <Icon name="shopping-bag" type="feather" size={25} style={styles.icon}/>
                <Text style={styles.modalText}>Set Homescreen wallpaper</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setLockWall}>
              <View style={styles.modalItem}>
                <Icon name="settings" type="feather" size={25} style={styles.icon}/>
                <Text style={styles.modalText}>Set Lockscreen wallpaper</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={setBothWall}>
              <View style={{...styles.modalItem, marginBottom:30}}>
                <Icon name="info" type="feather" size={25} style={styles.icon}/>
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
      if (Platform.OS === 'android') {
        const granted = await getPermissionAndroid();
        if (!granted) {
          return;
        }
      }

      RNFetchBlob.config({
        fileCache: true,
        appendExt: 'png',
      })
        .fetch('GET', item.url)
        .then(res => {
          console.log(res.data)
          CameraRoll.save(res.data, 'photo')
            .then(res => {
              Alert.alert(
                'Save remote Image',
                'Save Complete ',
                [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                {cancelable: false},
              );
            })
            .catch(err => console.log(err))
        })
        .catch(error => console.log("error: ",error));
    };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{uri:item.url}} style={styles.wall}/>
      </View>
      {renderBottomTab()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wall:{
      height:windowHeight,
      width:windowWidth,
      position:'absolute'
  },
  bottomTab:{
    backgroundColor:'white', 
    width:"80%", 
    height:50, 
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
    backgroundColor:'white',
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
    textAlign: "center"
  },
  modalItem:{
    paddingLeft:25,
    flexDirection:'row',
    marginVertical:5,
    alignItems:'center',
  },
});

export default SetWallpaper;