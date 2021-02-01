import React, { useEffect } from 'react';
import { View, StyleSheet,Switch,TouchableOpacity,Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL, VERSION_NUMBER } from '../constants';
import { useTheme } from '../themes'
import styled from 'styled-components/native'

const Container = styled.View`
  background: ${props => props.theme.background};
`

const Title = styled.Text`
  color: ${props => props.theme.text};
`

const Settings = ({navigation}) => {
  const theme = useTheme()
  return (
    <Container style={styles.container}>
      <ScrollView>
          <Title style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Appearence</Title>
          <View style={{flexDirection:'row', justifyContent:'space-between', paddingEnd:15}}>
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
            <Title style={{...styles.item, fontSize:16, paddingTop:5, color:'#898989'}}>/storage/emulated/0/Pictures/Elegant-Walls</Title>
          </View>
          <Title style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Legal</Title>
          <View>
            <TouchableOpacity onPress={()=>Linking.openURL(PRIVACY_POLICY_URL)} activeOpacity={0.6}>
              <Title style={styles.item}>Privacy policy</Title>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>Linking.openURL(TERMS_OF_USE_URL)} activeOpacity={0.6}>
              <Title style={{...styles.item, paddingTop:25}}>Terms of use</Title>
            </TouchableOpacity>
          </View>
          <Title style={{...styles.header,color:theme.mode=='dark'?'#AAFF00':'#7CCC00'}}>Version</Title>
          <TouchableOpacity onPress={()=>navigation.navigate('About')} activeOpacity={0.6}>
            <Title style={styles.item}>Elegant version</Title>
            <Title style={{...styles.item, fontSize:16, paddingTop:5, color:'#898989'}}>{VERSION_NUMBER}</Title>
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
    fontSize:25,
    padding:25,
    paddingTop:50,
    fontFamily:'Linotte-Bold',
  },
  item:{
    paddingHorizontal:25,
    fontSize:16,
    paddingTop:5,
    fontFamily:'Manrope-medium'
  }
});

export default Settings;