import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Settings = () => {
  return (
    <View style={styles.container}>
        <Text>Settings Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default Settings;