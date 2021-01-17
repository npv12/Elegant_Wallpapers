import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Fav = () => {

    const [item,setItem] = useState([])

    useEffect(() => {
        retrieveData()
    },[]);

    async function retrieveData(){
        console.log(await AsyncStorage.getItem('favs'))
    }

    return (
        <View style={styles.container}>
        <View style={styles.headerContainer} />
        <Text>FAVS</Text>
        <View style={styles.bodyContainer} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {},
  bodyContainer: {}
});

export default Fav;