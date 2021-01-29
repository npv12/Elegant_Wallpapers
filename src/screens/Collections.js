import React, { useState,useEffect } from 'react';
import { 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  StatusBar
} from 'react-native';
import _ from 'lodash'
import { FlatList } from 'react-native-gesture-handler';
import { secret_key } from '../../constants';
import styled from 'styled-components/native'
import LoadImage from '../components/LoadImage';
import { SECRET_KEY, WALL_URL } from '../constants';
import { useTheme } from '../themes'

const SView = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const windowWidth = Dimensions.get('window').width;

const Collections = ({navigation}) => {
  const [collection, setCollection]=useState([])
  const [data, setData]=useState([])
  const theme = useTheme()

  async function getData(){
    fetch(WALL_URL, {
      method: 'GET',
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
    
    navigation.navigate('Collection',{
      value:value
    })
  }

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
            break;
          }
      }
    }
    setCollection(fin)
  }

  useEffect(() => {getData()},[]);

  const Item = ({ item, onPress }) => (
    <View style={styles.wallBoundary}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        <LoadImage source={item} style={styles.Wall}/>
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
    if(!data)
    {
      return <View style={{justifyContent:'center', flex:1, alignItems:'center'}}>
      <Text style={{color:theme.mode=='dark'?'#A9A9A9':'grey', fontSize:20, fontFamily:'Linotte-Bold'}}>Loading your favorite walls.....</Text>
    </View>
    }
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
    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle ={theme.mode=='dark'?'light-content':'dark-content'}/>
        <SView style={styles.container}>
            <SView style={styles.headerContainer} />
                {renderCollections()}
            <SView style={styles.bodyContainer} />
        </SView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
  },
  Wall:{
    width:windowWidth-30,
    height:200,
    borderRadius:8,
    borderTopRightRadius:8,
  },
  headerText:{
    fontSize:25,
    color:'white',
    alignItems:'center',
    alignSelf:'center',
    textAlign:'center',
    fontFamily:'koliko',
    justifyContent:'center',
    position:'absolute',
    top:85,
  },  
  header:{
    height:200,
    width:windowWidth-30,
    position:'absolute',
    margin:8
  },  
  wallBoundary:{
    flex:1,
    margin:8,
    justifyContent:'center',
    alignItems:'center',
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