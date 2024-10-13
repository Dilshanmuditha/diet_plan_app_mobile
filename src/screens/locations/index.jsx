import React, { useState } from 'react';
import {View, Image, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import { ColorSheet } from '../../utils/ColorSheet';
import Assistants from '../../components/Assistants';
import LocationComponents from '../../components/locationsComponent';

const {width, height} = Dimensions.get('window');
const LocationsScreen = () => {
  return (
    // <View style={styles.container}>
    //   <Image
    //     source={require('./../../assets/body/back.jpg')}
    //     style={styles.overlay}
    //   />
    // </View>
    <SafeAreaView style={{
      flex: 1,
      width: '100%',
      backgroundColor: '#F5F5ED',
      alignContent: 'center',
    }}>
        <View style={styles.container}>
          <Searchbar placeholder='Find gym and nutrition stores' iconColor='#424B5A' style={styles.searchbar}/>
        </View>
        <LocationComponents/>
    </SafeAreaView>
  )
}

export default LocationsScreen

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
  },
  searchbar: {
    backgroundColor: ColorSheet.Secondary,
    textAlign:"left",
    marginTop:10,
  },
});