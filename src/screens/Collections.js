import React, { useState,useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  Touchable,
  Linking
} from 'react-native';
import _ from 'lodash'
import { FlatList } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import Modal from 'react-native-modal';
import { secret_key } from '../../constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Collections = ({navigation}) => {

  const [collection, setCollection]=useState([])
  const [data, setData]=useState([])
  const [bottomMenuVisible, setBottomMenuVisible] = useState(false)

  async function getData(){
    fetch('https://api.jsonbin.io/b/60026ecc4f42973a289d8284', {
      method: 'GET',
      headers: {
        'secret-key': secret_key,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        convertData(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function filterOut(value){
    var c = []
    for(var i=0;i<data.length;i++)
    {
      if(data[i].collections.toLowerCase().split(",").includes(value))
        c.push(data[i])
    }
    navigation.navigate('Collection',{
      data:c,
      value:value
    })}

  function convertData(data)
  {
    var c =[]
    var fin = []
    var key=0;
    for(var i=0;i<data.length;i++)
    {
      var temp = data[i].collections.toLowerCase().split(",");
      for(var j=0;j<temp.length;j++)
      {
        if(!c.includes(temp[j]))
          {
            var t={
              collections:temp[j],
              url:data[i].url,
              thumbnail:data[i].thumbnail,
              key:key.toString()
            }
            c.push(temp[j])
            fin.push(t)
            key=key+1
          }
      }
    }
    setCollection(fin)
  }

  useEffect(() => {getData()},[]);

  const Item = ({ item, onPress }) => (
    <View style={styles.wallBoundary}>
      <TouchableOpacity onPress={onPress} >
        <Image source={{uri:item.url}} style={styles.Wall}/>
        <View style={styles.header}>
        <Text style={styles.headerText}>{item.collections.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    </View>
);

function renderItem  ({ item }) {
  return (
    <Item
      item={item}
      onPress={() => filterOut(item.collections)}
    />
  );
};

  function renderCollections(){
    return(
      <View style={{paddingHorizontal:10}}>
              <FlatList
              showsVerticalScrollIndicator ={false}
              showsHorizontalScrollIndicator={false}
              data={collection}
              renderItem={renderItem}
              keyExtractor={(item) => item.key}
            />
            </View>
    )
  }

  return (
    <>
        <View style={styles.container}>
            <View style={styles.headerContainer} />
                {renderCollections()}
            <View style={styles.bodyContainer} />
        </View>
        <View style={styles.bottomTab}>
        <View style={{flex:1, flexDirection:'row', alignItems:'center', paddingLeft:"3%"}}>
                <TouchableOpacity onPress={()=>{
                        //setBgColor('rgba(0,0,0,0.5)')
                        setBottomMenuVisible(true)}}>
                  <Icon name="align-justify" type='feather' size={25} style={styles.icon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Fav')}>
                <Icon name="hearto" type='antdesign' size={25} style={styles.icon}/>
                </TouchableOpacity>
            </View>
            <View style={styles.searchBox}>
                <TouchableOpacity onPress={()=>console.log("Searching")}>
                    <Icon name='search' type='feather'size={25} style={{color:'red'}}/> 
                </TouchableOpacity>
            </View>
        </View>
        <Modal
          animationType="slidein"
          transparent={true}
          visible={bottomMenuVisible}
          onBackdropPress={() => setBottomMenuVisible(false)}
          useNativeDriver={true} 
          style={{justifyContent:'flex-end', margin:0,backgroundColor:'rgba(0,0,0,0.5)'}}
        >
          <View style={{...styles.bottomTab, height:165}}>
            <View style={styles.pill}></View>
            <TouchableOpacity onPress={()=>Linking.openURL('https://play.google.com/store/apps/details?id=com.madness.wallz.pro')}>
              <View style={styles.modalItem}>
                <Icon name="shopping-bag" type="feather" size={25} style={styles.icon}/>
                <Text style={styles.modalText}>Upgrade to Pro</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              navigation.navigate('Settings')
              setBottomMenuVisible(false)
              }}>
              <View style={styles.modalItem}>
                <Icon name="settings" type="feather" size={25} style={styles.icon}/>
                <Text style={styles.modalText}>Settings</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              setBottomMenuVisible(false)
              navigation.navigate('About')
              }}>
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
    backgroundColor:'#FFF'
  },
  headerContainer: {
  },
  Wall:{
    width:windowWidth-30,
    height:200,
    borderRadius:5,
    borderTopRightRadius:5,
  },
  headerText:{
    fontSize:25,
    color:'white',
    alignItems:'center',
    alignSelf:'center',
    textAlign:'center'
  },  
  header:{
    fontSize:25,
    position:'absolute',
    top:150,
    left:25,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
  },  
  wallBoundary:{
    flex:1,
    margin:8,
    justifyContent:'center',
    alignItems:'center',
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
    height:5,
    width:30,
    marginBottom:15,
    alignSelf:'center'
  },
  icon:{
    paddingHorizontal:10,
  }
});

export default Collections;