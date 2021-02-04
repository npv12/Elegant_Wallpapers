import React, { useEffect,useState } from 'react';
import { 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableOpacity,
  } from 'react-native';
  import styled from 'styled-components/native'
  import { FlatList } from 'react-native-gesture-handler';
  import LoadImage from '../components/LoadImage';
  import { SECRET_KEY, WALL_URL,STANDARD_HEIGHT,STANDARD_WIDTH } from '../constants';
  import { useTheme } from '../themes'

  const View = styled.View`
    background: ${props => props.theme.background};
  `
  
  const Text = styled.Text`
    color: ${props => props.theme.text};
  `

  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

const SpecificCollection = ({navigation,route}) => {
const {value} = route.params;
const [data,setData] = useState([])
const theme = useTheme()

async function getData(){
  fetch(WALL_URL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      filterData(data)
    })
    .catch((error) => {
      console.log(error);
    });
}

function filterData(data){
  var c = []
    for(var i=0;i<data.length;i++)
    {
      if(data[i].collections.toLowerCase().split(",").includes(value.toLowerCase()))
        c.push(data[i])
    }
    setData(c)
}

useEffect(() => {getData()},[]);

function renderWalls(){
    if(data.length)
    {
      return <View style={{paddingHorizontal:10*scaleWidth}}>
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
      <Text style={{color:theme.mode=='dark'?'#A9A9A9':'grey', fontSize:20*scaleHeight, fontFamily:'Linotte-Bold'}}>Loading your perfect collection.....</Text>
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
    <View style={{backgroundColor:theme.mode!='dark'?'white':'black',height:35*scaleHeight}}>
    </View>
    <StatusBar translucent={true} backgroundColor={'transparent'} barStyle ={theme.mode=='dark'?'light-content':'dark-content'}/>
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>{value.toUpperCase()}</Text>
        </View>
      {renderWalls()}
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Wall:{
    width:windowWidth/2*0.88,
    height:250*scaleHeight,
    borderRadius:5,
    borderTopRightRadius:5,
  },
  wallBoundary:{
    flex:1,
    margin:8*scaleHeight,
    justifyContent:'center',
    alignItems:'center',
  },
  header:{
    padding:20*scaleHeight,
    alignItems:'center'
  },
  headerText:{
      fontSize:20*scaleHeight,
      fontFamily:'koliko'
  }
});

export default SpecificCollection;