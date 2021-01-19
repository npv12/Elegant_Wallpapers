import React from 'react';
import { View, Text, StyleSheet,Switch } from 'react-native';
import { useTheme } from '../themes'
import styled from 'styled-components/native'

const Container = styled.View`
  background: ${props => props.theme.background};
`

const Title = styled.Text`
  color: ${props => props.theme.text};
`

const Settings = () => {
  const theme = useTheme()
  return (
    <Container style={styles.container}>
        <Title style={styles.header}>Settings Page</Title>
        <View style={{ flexDirection:'row', justifyContent:'space-between',}}>
          <Title style={styles.item}>Appearence</Title>
        <Switch
          value={theme.mode === 'dark'}
          onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
          style={{padding:15}}
        />
        </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
    fontSize:35,
    alignSelf:'center',
    textAlign:'center',
    padding:25,
  },
  item:{
    padding:15,
    fontSize:25
  }
});

export default Settings;