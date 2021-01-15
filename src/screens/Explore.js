import React, { useState,useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  StatusBar,
  SafeAreaView, 
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity
 } from 'react-native';
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Explore = () => {

  const [data, setData] = useState([])
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false)
  const [bgColor, setBgColor] = useState('')

  async function getData(){
    fetch('https://jahir.dev/frames/frames.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {getData()},[]);

  function renderWalls(){
    if(data)
    {
      return <View style={{paddingHorizontal:10}}>
              <FlatList
              showsVerticalScrollIndicator ={false}
              showsHorizontalScrollIndicator={false}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.url}
              numColumns={2}
            />
            </View>
    }
    return <Text>Loading</Text>
  }

  const Item = ({ item, onPress }) => (
    <View style={styles.wallBoundary}>
      <TouchableOpacity onPress={onPress} >
        <Image source={{uri:item.url}} style={styles.Wall}/>
      </TouchableOpacity>
    </View>
);

const renderItem = ({ item }) => {
  return (
    <Item
      item={item}
      onPress={() => console.log("Press")}
    />
  );
};

  return (
    <>
    <StatusBar showHideTransition/>
        <View style={{...styles.container, backgroundColor:{bgColor}, marginTop:18}}>
            {renderWalls()}
        </View>
        <View style={styles.bottomTab}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:"3%"}}>
                <TouchableOpacity onPress={()=>{
                        setBgColor('rgba(0,0,0,0.5)')
                        setBottomMenuVisible(true)}}>
                  <Icon name="align-justify" type='feather' size={25} style={styles.icon}/>
                </TouchableOpacity>
                <Icon name="hearto" type='antdesign' size={25} style={styles.icon}/>
            </View>
            <View style={styles.searchBox}>
                <TouchableOpacity onPress={()=>console.log("Searching")}>
                    <Icon name='search' type='feather'size={25} style={{color:'red'}}/> 
                </TouchableOpacity>
            </View>
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={bottomMenuVisible}
          animationOut="slideOutDown"
          onBackdropPress={() => setBottomMenuVisible(false)}
          swipeDirection={['up', 'left', 'right', 'down']}
          style={{justifyContent:'flex-end', margin:0,backgroundColor:'rgba(0,0,0,0.5)'}}
        >
          <View style={{...styles.bottomTab, height:155}}>
            <View style={styles.pil}></View>
            <TouchableOpacity onPress={()=>setBottomMenuVisible(false)}>
              <View style={styles.modalItem}>
                <Icon name="shopping-bag" type="feather" size={25} style={styles.icon}/>
                <Text style={styles.modalText}>Upgrade to Pro</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.modalItem}>
                <Icon name="settings" type="feather" size={25} style={styles.icon}/>
                <Text style={styles.modalText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.modalItem}>
                <Icon name="info" type="feather" size={25} style={styles.icon}/>
                <Text style={styles.modalText}>About</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  icon:{
    paddingHorizontal:10,
  },    
  searchBox:{
    backgroundColor:'lightblue',
    justifyContent:'center',
    height:50,
    width:50,
    borderRadius:70,
    elevation:10,
    shadowColor:'#fff',
    position:'absolute',
    opacity:1,
    bottom:45,
    right:40,
  },
  headerContainer: {},
  bottomTab:{
      backgroundColor:'white',
      justifyContent:'center',
      alignItems:'flex-start',
      shadowOpacity: 1,
      height:70,
      position:'absolute',
      bottom:0,
      width:"100%",
      borderTopEndRadius:25,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
  },
  Wall:{
    width:windowWidth/2*0.88,
    height:250,
    borderRadius:5,
    borderTopRightRadius:5,
  },
  wallBoundary:{
    flex:1,
    margin:8,
    justifyContent:'center',
    alignItems:'center',
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
    marginVertical:5
  },
  pill:{
    backgroundColor:'#898989',
    height:50,
    width:30
  }
});

export default Explore;