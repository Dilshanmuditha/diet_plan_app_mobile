import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {ColorSheet} from '../../utils/ColorSheet';
import {useNavigation} from '@react-navigation/native';

const WelcomeTwo = () => {
    const navigation = useNavigation();

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={ColorSheet.White}
          animated={true}
        />
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <View style={styles.mainImageView}>
            <Image
              source={require('../../assets/images/welcomeTwoImg.jpg')}
              style={styles.mainImage}
            />
            <Text style={styles.mainText}>
            CUSTOM WORKOUTS TO BOOST YOUR STRENGTH AND ENDURANCE...
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.btnText}>Get Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnSkip}>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default WelcomeTwo