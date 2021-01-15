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
  Modal,
 } from 'react-native';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Explore = () => {

  const [data, setData] = useState([])
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false)

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
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.url}
              numColumns={2}
            />
            </View>
    }
    return <Text>Loading</Text>
  }

  const Item = ({ item, onPress, style }) => (
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
      style={{height:10 }}
    />
  );
};

  return (
    <>
    <StatusBar showHideTransition/>
        <View style={styles.container}>
            {renderWalls()}
        </View>
        <View style={styles.bottomTab}>
            <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:"3%"}}>
                <TouchableOpacity onPress={()=>setBottomMenuVisible(true)}>
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
          animationType="slide"
          transparent={true}
          visible={bottomMenuVisible}
        >
          <View style={{...styles.bottomTab, height:235}}>

            <TouchableOpacity onPress={()=>setBottomMenuVisible(false)}>
              <View style={styles.modalItem}>
                <Text style={styles.modalText}>Upgrade to Pro</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.modalItem}>
                <Text style={styles.modalText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.modalItem}>
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
    width:windowWidth/2*0.92,
    height:250,
    borderRadius:5,
    borderTopRightRadius:5,
  },
  wallBoundary:{
    flex:1,
    margin:4
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
  }
});

export default Explore;