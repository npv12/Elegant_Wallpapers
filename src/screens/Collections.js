import React from 'react';
import { View, Text, StyleSheet, SafeAreaView,StatusBar } from 'react-native';

const Collections = () => {
  return (
    <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.headerContainer} />
                <Text>Collections</Text>
            <View style={styles.bodyContainer} />
        </View>
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {},
  bodyContainer: {}
});

export default Collections;