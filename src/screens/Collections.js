import React from 'react';
import { View, Text, StyleSheet, SafeAreaView,StatusBar } from 'react-native';

const Collections = () => {
  return (
    <>
        <View style={styles.container}>
            <View style={styles.headerContainer} />
                <Text>Collections</Text>
            <View style={styles.bodyContainer} />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#FFF'
  },
  headerContainer: {
  },
  bodyContainer: {}
});

export default Collections;