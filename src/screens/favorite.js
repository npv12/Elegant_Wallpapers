import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect,useState} from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    StatusBar,
    SafeAreaView, 
    FlatList,
    Image,
    Dimensions,
    TouchableOpacity,
   } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Fav = () => {

    const [data,setData] = useState([])

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
          onPress={() => navigation.navigate('Wall',{
            item:item
          })}
        />
      );
    };

    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerText}>FAVS</Text>
        </View>
        {renderWalls()}
        </View>
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
    padding:25,
    alignItems:'center'
  },
  headerText:{
      fontSize:35,
  }
});

export default Fav;