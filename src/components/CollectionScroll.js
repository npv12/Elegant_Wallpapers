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

  useEffect(() => {
    setDelay()
  },[]);

  function setDelay(){
    setTimeout(function(){
      scrollRef.current._listRef._scrollRef.scrollTo({x:0,y:props.offset,animated:true})
    },350)
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
            onMomentumScrollEnd={scrollPos}
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
    width:windowWidth-30,
    height:180*scaleHeight,
    borderRadius:8,
    borderTopRightRadius:8,
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
    top:85*scaleHeight,
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


/*

export default class CollectionScroll extends React.Component {
    constructor(args) {
        super(args);

        let dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this._layoutProvider = new LayoutProvider(
            index => {
                return 0
            },
            (type, dim) => {
                switch (type) {
                    case 0:
                        dim.width = windowWidth-30;
                        dim.height = 200*scaleHeight
                        break;
                    default:
                        dim.width = 0;
                        dim.height = 0;
                }
            }
        );

        this._rowRenderer = this._rowRenderer.bind(this);
        this.state = {
            dataProvider: dataProvider.cloneWithRows(this.props.data)
        };
    }

    _rowRenderer(type, data) {

        switch (type) {
            case 0:
                return (
                    <View style={styles.wallBoundary}>
                    <TouchableOpacity onPress={()=>this.props.onPress(data)} activeOpacity={0.9}>
                      <LoadImage source={data} style={styles.Wall}/>
                      <View style={styles.header}>
                      <Text style={styles.headerText}>{data.collections.toUpperCase()}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
            default : null
        }
    }

    render() {
            return <RecyclerListView
                      layoutProvider={this._layoutProvider}
                      dataProvider={this.state.dataProvider}
                      rowRenderer={this._rowRenderer}
                      />;
    }
}
const styles = {
    container: {
        flex: 1,
      },
      headerContainer: {
      },
      Wall:{
        width:windowWidth-30,
        height:180*scaleHeight,
        borderRadius:8,
        borderTopRightRadius:8,
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
        top:85*scaleHeight,
      },
      header:{
        height:180*scaleHeight,
        width:windowWidth-30,
        position:'absolute',
        margin:8*scaleHeight
      },
      wallBoundary:{
        flex:1,
        margin:8*scaleHeight,
        justifyContent:'center',
        alignItems:'center',
      },
      searchBox:{
        justifyContent:'center',
        height:50*scaleHeight,
        width:50*scaleWidth,
        borderRadius:70,
        elevation:10,
        shadowColor:'#fff',
        position:'absolute',
        opacity:1,
        bottom:45*scaleHeight,
        right:40*scaleWidth,
      },
      modalText: {
        marginBottom: 15*scaleHeight,
        textAlign: "center"
      },
      modalItem:{
        paddingLeft:25*scaleWidth,
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:5*scaleHeight
      },
};

*/
