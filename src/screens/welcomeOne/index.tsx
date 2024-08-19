import {View, Text, StatusBar, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {ColorSheet} from '../../utils/ColorSheet';
import {useNavigation} from '@react-navigation/native';

const WelcomeOne = () => {
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
            source={require('../../assets/images/welcomeOne.jpg')}
            style={styles.mainImage}
          />
          <Text style={styles.mainText}>
          PERSONALIZED NUTRITION FOR YOUR FITNESS GOALS...
          </Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('WelcomeScreenTwo')}>
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSkip}
          onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.btnSkipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeOne;
