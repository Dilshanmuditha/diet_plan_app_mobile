import React, { useState } from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';

const {width, height} = Dimensions.get('window');
const BackImageScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../assets/body/back.jpg')}
        style={styles.overlay}
      />
    </View>
  )
}

export default BackImageScreen

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