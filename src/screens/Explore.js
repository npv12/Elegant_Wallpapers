import React, { useState,useEffect } from 'react';
import { 
  StyleSheet,
  StatusBar,
  SafeAreaView, 
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
 } from 'react-native';
import { secret_key } from '../../constants';
import styled from 'styled-components/native'
import { SECRET_KEY, WALL_URL } from '../constants';

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const windowWidth = Dimensions.get('window').width;

const Explore = ({navigation}) => {
  const [data, setData] = useState([])

  async function getData(){
    fetch(WALL_URL, {
      method: 'GET',
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
        <Image source={{uri:item.thumbnail}} style={styles.Wall}/>
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
    <StatusBar showHideTransition backgroundColor="black" barStyle="light-content"/>
        <View style={{...styles.container, paddingTop:18}}>
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