import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Dimensions,
    TouchableOpacity,
    Image ,
    FlatList
  } from 'react-native';

  const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SpecificCollection = ({navigation,route}) => {
const {data,value} = route.params;

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
            <Text style={styles.headerText}>{value.toUpperCase()}</Text>
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
    padding:25,
    alignItems:'center'
  },
  headerText:{
      fontSize:35,
  }
});

export default SpecificCollection;