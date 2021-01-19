import React from 'react'
import ThemeManager, { useTheme } from '../themes'
import { Switch,Text } from 'react-native'
import styled from 'styled-components/native'

const Container = styled.View`
  background: ${props => props.theme.backgroundAlt};
`

const Title = styled.Text`
  color: ${props => props.theme.text};
`

function HomeScreen() {
    const theme = useTheme()
    console.log(theme)
    return (
      <Container style={{flex:1, alignItems: 'center',justifyContent: 'flex-end'}}>
        <Title style={{fontSize:42,}}>Crowdbotics app</Title>
        <Switch
          value={theme.mode === 'dark'}
          onValueChange={value => theme.setMode(value ? 'dark' : 'light')}
        />
      </Container>
    )
  }

  function Test() {
    return (
        <HomeScreen />
    )
  }
  
  export default Test