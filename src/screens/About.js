import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import {StyleSheet,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import styled from 'styled-components/native'
import { CREDITS_URL, DISCLAIMER_TEXT, FREE_APP, MADNESS_TELE, PRANAV_TELE, PRO_APP, UNFUNNYGAY_TELE } from '../constants';
import { useTheme } from '../themes'

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const About = () => {
  const theme = useTheme()
  return (
    <View style={styles.container}>
      <ScrollView>
      <Text style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00', paddingTop:5}}>Legal</Text>
        <View>
            <Text style={styles.item}>Version</Text>
            <Text style={{...styles.item, fontSize:16, paddingTop:5, color:'#898989'}}>4.0</Text>
        </View>
        <TouchableOpacity onPress={()=>Linking.openURL(FREE_APP)}>
            <Text style={styles.item}>Changelog</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>Linking.openURL(CREDITS_URL)}  style={{paddingTop:8}}>
            <Text style={styles.item}>Licences</Text>
        </TouchableOpacity>
        <Text style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Author</Text>
          <TouchableOpacity onPress={()=>Linking.openURL(UNFUNNYGAY_TELE)}>
            <Text style={styles.item}>Sarath</Text>
            <Text style={{...styles.item, fontSize:16, paddingTop:5, color:'#898989'}}>Project manager/Founder</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL(PRANAV_TELE)}>
            <Text style={styles.item}>Pranav Santhosh</Text>
            <Text style={{...styles.item, fontSize:16, paddingTop:5, color:'#898989'}}>Blame me :D</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL(MADNESS_TELE)}>
            <Text style={styles.item}>Join telegram channel</Text>
          </TouchableOpacity>
          <Text style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Support Development</Text>
          <TouchableOpacity onPress={()=>Linking.openURL(FREE_APP)}>
            <Text style={styles.item}>Rate</Text>
            <Text style={{...styles.item, fontSize:16, paddingTop:5, color:'#898989'}}>Love the app? Rate it at playstore</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>Linking.openURL(PRO_APP)}>
            <Text style={styles.item}>Pro</Text>
            <Text style={{...styles.item, fontSize:16, paddingTop:5, color:'#898989'}}>Buy the pro app and go adfree</Text>
          </TouchableOpacity>
          <View>
          <Text style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Disclaimer</Text>
            <Text style={{...styles.item, fontSize:16, paddingTop:5, color:'#898989'}}>
                {DISCLAIMER_TEXT}
            </Text>
          </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    fontSize:25,
    paddingHorizontal:25,
    paddingTop:50,
    fontFamily:'Linotte-Bold',
  },
  item:{
    paddingHorizontal:25,
    fontSize:18,
    paddingTop:15,
    fontFamily:'Manrope-medium'
  }
});

export default About;