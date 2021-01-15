import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    Dimensions,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SetWallpaper = ({route}) => {
    const {item} = route.params
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer} />
      <Image source={{uri:item.url}} style={styles.wall}/>
      <View style={styles.bodyContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wall:{
      height:windowHeight,
      width:windowWidth
  }
});

export default SetWallpaper;