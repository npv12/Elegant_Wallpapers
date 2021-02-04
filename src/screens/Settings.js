import React, { useEffect } from 'react';
import { View, StyleSheet,Switch,TouchableOpacity,Linking,Dimensions,StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL, VERSION_NUMBER,STANDARD_HEIGHT,STANDARD_WIDTH } from '../constants';
import { useTheme } from '../themes'
import styled from 'styled-components/native'

const Container = styled.View`
  background: ${props => props.theme.background};
`

const Title = styled.Text`
  color: ${props => props.theme.text};
`
const scaleWidth = Dimensions.get('window').width/STANDARD_WIDTH
const scaleHeight = Dimensions.get('window').height/STANDARD_HEIGHT

const Settings = ({navigation}) => {
  const theme = useTheme()
  return (
    <Container style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle ={theme.mode=='dark'?'light-content':'dark-content'}/>
      <ScrollView>
          <Title style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Appearence</Title>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingEnd:15*scaleWidth}}>
            <Title style={styles.item}>Dark Theme</Title>
            <Switch
              value={theme.mode === 'dark'}
              onValueChange={value => {
                theme.setMode(value ? 'dark' : 'light')
                AsyncStorage.setItem('theme',value ? 'dark' : 'light')
              }}
              thumbColor={theme.mode=='dark'?'#AAFF00':'black'}
              style={{...styles.item}}
            />
            </View>
          <Title style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Storage</Title>
          <View>
            <Title style={styles.item}>Wallpaper is stored to</Title>
            <Title style={{...styles.item, fontSize:16*scaleHeight, paddingTop:5*scaleHeight, color:'#898989'}}>/storage/emulated/0/Pictures/Elegant-Walls</Title>
          </View>
          <Title style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Legal</Title>
          <View>
            <TouchableOpacity onPress={()=>Linking.openURL(PRIVACY_POLICY_URL)} activeOpacity={0.6}>
              <Title style={styles.item}>Privacy policy</Title>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL(TERMS_OF_USE_URL)} activeOpacity={0.6}>
              <Title style={{...styles.item, paddingTop:25*scaleHeight}}>Terms of use</Title>
            </TouchableOpacity>
          </View>
          <Title style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Version</Title>
          <TouchableOpacity onPress={()=>navigation.navigate('About')} activeOpacity={0.6}>
            <Title style={styles.item}>Elegant version</Title>
            <Title style={{...styles.item, fontSize:16*scaleHeight, paddingTop:5*scaleHeight, color:'#898989'}}>{VERSION_NUMBER}</Title>
          </TouchableOpacity>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    fontSize:25*scaleHeight,
    padding:25*scaleHeight,
    paddingTop:50*scaleHeight,
    fontFamily:'Linotte-Bold',
  },
  item:{
    paddingHorizontal:25*scaleWidth,
    fontSize:16*scaleHeight,
    paddingTop:5*scaleHeight,
    fontFamily:'Manrope-medium'
  }
});

export default Settings;