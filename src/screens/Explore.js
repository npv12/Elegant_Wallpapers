import React, { useState,useEffect } from 'react';
import { 
  StyleSheet,
  StatusBar,
  FlatList,
  Dimensions,
  TouchableOpacity,
 } from 'react-native';
import { secret_key } from '../../constants';
import styled from 'styled-components/native'
import LoadImage from '../components/LoadImage';
import { SECRET_KEY, WALL_URL } from '../constants';
import { useTheme } from '../themes'
import SplashScreen from 'react-native-splash-screen';

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const windowWidth = Dimensions.get('window').width;

const Explore = ({navigation}) => {
  const theme = useTheme()
  const [data, setData] = useState([])

  async function getData(){
    fetch(WALL_URL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        SplashScreen.hide()
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
    return <View style={{justifyContent:'center', flex:1, alignItems:'center'}}>
      <Text style={{color:theme.mode=='dark'?'#A9A9A9':'grey', fontSize:20, fontFamily:'Linotte-Bold'}}>Loading your favorite walls.....</Text>
    </View>
  }

  const Item = ({ item, onPress }) => (
    <View style={styles.wallBoundary}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LoadImage source={item} style={styles.Wall}/>
      </TouchableOpacity>
    </View>
);

const renderItem = ({ item }) => {
  return (
    <Item
      item={item}
      onPress={() => navigation.navigate('Wall',{
        item:item
      })}
    />
  );
};

  return (
    <>
   <StatusBar translucent={true} backgroundColor={'transparent'} barStyle ={theme.mode=='dark'?'light-content':'dark-content'}/>
        <View style={{...styles.container}}>
            {renderWalls()}
        </View>
        
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon:{
    paddingHorizontal:10,
  },    
  searchBox:{
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
      justifyContent:'center',
      alignItems:'flex-start',
      shadowOpacity: 1,
      height:70,
      position:'absolute',
      bottom:0,
      width:"100%",
      borderTopEndRadius:30,
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
    width:(windowWidth/2)*0.88,
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

export default Explore;