import React, { useEffect,useState } from 'react';
import {StyleSheet,TouchableOpacity,Dimensions,Linking,StatusBar,Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native'
import { CREDITS_URL, DISCLAIMER_TEXT, FREE_APP, MADNESS_TELE, PRANAV_TELE, PRO_APP, UNFUNNYGAY_TELE, VERSION_URL,VERSION_NUMBER,STANDARD_HEIGHT,STANDARD_WIDTH, CONTRIBUTORS } from '../constants';
import { useTheme } from '../themes'
import Modal from 'react-native-modal';
import ScrollableModal from '../components/ScrollableModal';

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};

`

const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

const About = () => {
  const theme = useTheme()
  const [changelogVisible, setChangelogVisible] = useState(false)
  const [changelog, setChangelog] = useState('')
  const [contributors, setContributors] = useState(null)

  async function getData(){
    fetch(VERSION_URL, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setChangelog(responseJson.Changelogs)
      })
      .catch((error) => {
        console.log(error);
      })

      fetch(CONTRIBUTORS, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((responseJson) => {
          setContributors(responseJson)
        })
        .catch((error) => {
          console.log(error);
        })
  }

  useEffect(() => {getData()},[]);

  function openChangelog(){
    setChangelogVisible(!changelogVisible)
  }
  function renderModal(){
    return(
      <ScrollableModal visible={changelogVisible} changeVisible={setChangelogVisible} changelog={changelog}/>
  )
  }

  function Authors(){
    if(contributors)
      return contributors.map(function(data){
        return (<TouchableOpacity onPress={()=>Linking.openURL(data.url)} activeOpacity={0.6}>
        <Text style={styles.item}>{data.name}</Text>
        <Text style={{...styles.item, fontSize:16*scaleHeight, paddingTop:5*scaleHeight, color:'#898989'}}>{data.title}</Text>
      </TouchableOpacity>)
      })
    else return null
  }
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle ={theme.mode=='dark'?'light-content':'dark-content'}/>
      <ScrollView>
      <Text style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00', paddingTop:5*scaleHeight}}>Legal</Text>
        <View>
            <Text style={styles.item}>Version</Text>
            <Text style={{...styles.item, fontSize:16*scaleHeight, paddingTop:5*scaleHeight, color:'#898989'}}>{VERSION_NUMBER}</Text>
        </View>
        <TouchableOpacity onPress={()=>openChangelog()} activeOpacity={0.6}>
            <Text style={styles.item}>Changelog</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL(CREDITS_URL)}  style={{paddingTop:8*scaleHeight}} activeOpacity={0.6}>
            <Text style={styles.item}>Licences</Text>
        </TouchableOpacity>
        <Text style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Contributors</Text>
            {Authors()}
          <Text style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Support Development</Text>
          <TouchableOpacity onPress={()=>Linking.openURL(FREE_APP)} activeOpacity={0.6}>
            <Text style={styles.item}>Rate</Text>
            <Text style={{...styles.item, fontSize:16*scaleHeight, paddingTop:5*scaleHeight, color:'#898989'}}>Love the app? Rate it at playstore</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL(PRO_APP)} activeOpacity={0.6}>
            <Text style={styles.item}>Pro</Text>
            <Text style={{...styles.item, fontSize:16*scaleHeight, paddingTop:5*scaleHeight, color:'#898989'}}>Buy the pro app and go adfree</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL(MADNESS_TELE)} activeOpacity={0.6}>
            <Text style={styles.item}>Join telegram channel</Text>
            <Text style={{...styles.item, fontSize:16*scaleHeight, paddingTop:5*scaleHeight, color:'#898989'}}>Report bugs, suggest features or just simply have fun</Text>
          </TouchableOpacity>
          <View>
          <Text style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Disclaimer</Text>
            <Text style={{...styles.item, fontSize:16*scaleHeight, paddingTop:5*scaleHeight, color:'#898989', textAlign:'justify'}}>
                {DISCLAIMER_TEXT}
            </Text>
          </View>
        </ScrollView>
        {renderModal()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    fontSize:25*scaleHeight,
    paddingHorizontal:25*scaleWidth,
    paddingTop:50*scaleHeight,
    fontFamily:'Linotte-Bold',
  },
  item:{
    paddingHorizontal:25*scaleWidth,
    fontSize:18*scaleHeight,
    paddingTop:15*scaleHeight,
    fontFamily:'Manrope-medium'
  },
  changelogContainer:{
    width:200*scaleWidth,
    height:300*scaleHeight,
    borderTopEndRadius:25,
    borderBottomEndRadius:25,
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25
  },
  test:{
    width:200*scaleWidth,
    height:300*scaleHeight,
    borderTopEndRadius:25,
    borderBottomEndRadius:25,
    borderTopLeftRadius:25,
    borderBottomLeftRadius:25,
    alignContent:'center',
    alignItems:'center',
    paddingTop:35,
    padding:15
  },
  scroll:{

  }
});

export default About;
