import React from 'react';
import { View, Text, StyleSheet,Switch } from 'react-native';
import { useTheme } from '../themes'
import styled from 'styled-components/native'

const Container = styled.View`
  background: ${props => props.theme.backgroundAlt};
`

const Title = styled.Text`
  color: ${props => props.theme.text};
`

const Settings = () => {
  const theme = useTheme()
  return (
    <Container style={styles.container}>
        <Title>Settings Page</Title>
        <Switch
          value={theme.mode === 'dark'}
          onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
        />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Settings;