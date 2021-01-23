import React, { useState,useEffect } from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    FlatList,
    View,
    Text
  } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import LoadImage from '../components/LoadImage';
import { WALL_URL } from '../constants';
import { useTheme } from '../themes'

const windowWidth = Dimensions.get('window').width;

const SearchScreen = () => {
    const [item,setItem] = useState('')
    const [data,setData] = useState([])
    const [empty,setEmpty] = useState(true)
    const [walls, setWalls] = useState([])
    const theme = useTheme()

    async function getData(){
        fetch(WALL_URL, {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            setData(data)
          })
          .catch((error) => {
            console.log(error);
          });
    }

    useEffect(() => {getData()},[]);


    function searchData(val)
    {
        if(val && data)
            setEmpty(false)
        else    
            {
                setEmpty(true)
                return
            }
        var c = []
        for(var i=0;i<data.length;i++)
        {
            if(data[i].name.toLowerCase().includes(val.toLowerCase()))
                c.push(data[i])
            else if(data[i].collections.toLowerCase().includes(val.toLowerCase()))
                c.push(data[i])
        }
        setWalls(c)
    }

    function renderWalls(){
        if(walls && !empty)
        {
          return <View style={{paddingHorizontal:10}}>
                  <FlatList
                  showsVerticalScrollIndicator ={false}
                  showsHorizontalScrollIndicator={false}
                  data={walls}
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
       <View style={{backgroundColor:theme.mode!='dark'?'white':'black',height:35}}>
    </View>
    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle ={theme.mode=='dark'?'light-content':'dark-content'}/>
    <View style={{...styles.container,backgroundColor:theme.mode!='dark'?'white':'black'}}>
      <TextInput style={{...styles.input,backgroundColor:theme.mode=='dark'?'white':'black'}} placeholder="Search...." defaultValue={item} onChangeText={(val)=>{
          searchData(val)
          setItem(val)
      }}/>
      {renderWalls()}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input:{
      height:35,
      width:"70%",
      borderColor:'black',
      borderWidth:3,
      justifyContent:'flex-end'
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
  header:{
    padding:20,
    alignItems:'center'
  },
  headerText:{
      fontSize:20,
      fontFamily:'koliko'
  }
});

export default SearchScreen;