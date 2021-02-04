import React, { Component } from "react";
import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import LoadImage from './LoadImage';
import {STANDARD_HEIGHT, STANDARD_WIDTH} from '../constants';

const windowWidth = Dimensions.get('window').width;
const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

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