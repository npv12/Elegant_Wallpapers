import React from 'react';
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
 } from 'react-native';
import styled from 'styled-components/native'
import LoadImage from '../components/LoadImage';
import {STANDARD_HEIGHT, STANDARD_WIDTH} from '../constants';
import { useTheme } from '../themes'
import { FlatList } from 'react-native-gesture-handler';

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

const windowWidth = Dimensions.get('window').width;

const Wall = ({...props}) => {
  const theme = useTheme()
  const length = props.data.length
  console.log(length)

  function renderWalls(){
    if(!props.data || props.data.length==0)
      return <View style={{justifyContent:'center', flex:1, alignItems:'center'}}>
        <Text style={{color:theme.mode=='dark'?'#A9A9A9':'grey', fontSize:20*scaleHeight, fontFamily:'Linotte-Bold'}}>Loading your favorite walls.....</Text>
      </View>
    return <View style={{paddingHorizontal:10*scaleWidth}}>
            <FlatList
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.url}
            numColumns={2}
            scrollsToTop={false}
          />

          </View>
  }

  const Item = ({ item, onPress }) => (
    <View >
      <TouchableOpacity style={styles.wallBoundary} onPress={onPress} activeOpacity={0.9}>
        <LoadImage source={item} style={styles.Wall}/>
      </TouchableOpacity>
    </View>
);

const renderItem = ({ item }) => {
  
  return (
    <Item
      item={item}
      onPress={() => props.navigation.navigate('Wall',{
        item:item
      })}
    />
  );
};
  return (
    <>
    {renderWalls()}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Wall:{
    width:(windowWidth/2)*0.88,
    height:250*scaleHeight,
    borderRadius:5,
    borderTopRightRadius:5,
  },
  wallBoundary:{
    flex:1,
    margin:8,
    justifyContent:'center',
    alignItems:'center',
  },
});

export default Wall;
