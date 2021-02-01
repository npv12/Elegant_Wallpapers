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
import { Icon } from 'react-native-elements';
import { STANDARD_HEIGHT,STANDARD_WIDTH } from '../constants';

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

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
        <Icon name="heart" type="feather" size={45} color='grey' style={{paddingBottom:35*scaleHeight}}/>
        <Text style={{color:theme.mode=='dark'?'#A9A9A9':'grey', fontSize:20*scaleHeight, fontFamily:'Linotte-Bold'}}>No Favorites :(</Text>
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

export default Fav;
