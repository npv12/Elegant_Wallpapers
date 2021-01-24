import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect,useState} from 'react';
import { 
    StyleSheet,
    FlatList,
    Dimensions,
    TouchableOpacity,
    StatusBar
   } from 'react-native';
import styled from 'styled-components/native'
import LoadImage from '../components/LoadImage';
import { useTheme } from '../themes'

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const windowWidth = Dimensions.get('window').width;

const Fav = ({navigation}) => {

    const [data,setData] = useState([])
    const theme = useTheme()

    useEffect(() => {
        retrieveData()
    },[]);

    async function retrieveData(){
        setData(JSON.parse(await AsyncStorage.getItem('favs')))

    }

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
        return <View style={{flex:1, justifyContent:'center',alignContents:'center'}}>
          <Text style={{padding:100}}>No favs set</Text>
        </View>
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
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>Favorites</Text>
        </View>
        {renderWalls()}
        </View>
      </>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  header:{
    padding:20,
    alignItems:'center'
  },
  headerText:{
      fontSize:20,
      fontFamily:'koliko'
  }
});

export default Fav;