import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';
import { Icon } from 'react-native-elements';
import ManageWallpaper, { TYPE } from 'react-native-manage-wallpaper';
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SetWallpaper = ({route}) => {
    const {item} = route.params
    const [showApplyModal, setShowApplyModal] = useState(false)

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
        <View style={styles.bottomTab}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <TouchableOpacity style={{...styles.icon, marginLeft:30}}>
              <Icon name="info" type='feather' size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Icon name="download" type='feather' size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={()=>setShowApplyModal(true)}>
              <Icon name="arrow-up-circle" type='feather' size={25}/>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.icon, marginRight:30}}>
              <Icon name="heart" type='feather' size={25}/>
            </TouchableOpacity>
          </View>
          <Modal
          animationType="fade"
          transparent={true}
          visible={showApplyModal}
          animationOut="slideOutDown"
          onBackdropPress={() => setShowApplyModal(false)}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={{backgroundColor:'rgba(0,0,0,0.5)'}}
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
        </View>
      )
    }

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