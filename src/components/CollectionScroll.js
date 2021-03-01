import React, {useEffect,useRef} from 'react';
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

const CollectionScroll = ({...props}) => {
  const theme = useTheme()
  const scrollRef = useRef();

  function scrollPos(val){
    props.setOffset((val.nativeEvent.contentOffset.y))
  }



  function renderWalls(){
    if(!props.data || props.data.length==0)
      return <View style={{justifyContent:'center', flex:1, alignItems:'center'}}>
        <Text style={{color:theme.mode=='dark'?'#A9A9A9':'grey', fontSize:20*scaleHeight, fontFamily:'Linotte-Bold'}}>Loading your favorite walls.....</Text>
      </View>
    return <View style={{paddingHorizontal:10*scaleWidth}}>
            <FlatList
            ref={scrollRef}
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            data={props.data}
            renderItem={renderItem}
            keyExtractor={(item) => item.url}
          />
          </View>
  }

  const Item = ({ item, onPress }) => (
    <View style={styles.wallBoundary}>
      <TouchableOpacity onPress={()=>props.onPress(item)} activeOpacity={0.9}>
        <LoadImage source={item} style={styles.Wall}/>
        <View style={styles.header}>
        <Text style={styles.headerText}>{item.collections.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    </View>
);

const renderItem = ({ item }) => {
  return (
    <Item
      item={item}
      onPress={props.onPress}
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
    width:windowWidth-40,
    height:200*scaleHeight,
    borderTopRightRadius:20,
    borderTopLeftRadius:20,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
  },
  headerText:{
    fontSize:25*scaleHeight,
    color:'white',
    alignItems:'center',
    alignSelf:'center',
    textAlign:'center',
    fontFamily:'koliko',
    justifyContent:'center',
    position:'absolute',
    top:95*scaleHeight,
  },
  header:{
    position:'absolute',
    left:windowWidth/2,
  },
  wallBoundary:{
    flex:1,
    margin:8*scaleHeight,
    justifyContent:'center',
    alignItems:'center',
  },
});

export default CollectionScroll;
