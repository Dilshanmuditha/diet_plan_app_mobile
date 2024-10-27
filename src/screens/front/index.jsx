import React, { useState } from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const FrontImageScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/body/front.jpg')}
        style={styles.overlay}
      />
    </View>
  )
}

export default FrontImageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    width: width,
    height: height,
    opacity: 0.4,
  },
});