import React from 'react';
import {StyleSheet } from 'react-native';
import styled from 'styled-components/native'

const View = styled.View`
  background: ${props => props.theme.background};
`

const Text = styled.Text`
  color: ${props => props.theme.text};
`

const About = () => {
  return (
    <View style={styles.container}>
        <Text>About Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default About;