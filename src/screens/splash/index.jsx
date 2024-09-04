import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { ColorSheet } from '../../utils/ColorSheet'
import { useAuth } from '../../../AuthContext'

const Splash = () => {
    const navigation = useNavigation()
    const {user, loadUserFromStorage} = useAuth();

    useEffect(() => {
      if (user) {
        console.log(user)
        navigation.navigate('HomeScreen');
      }
    }, [user]);

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={ColorSheet.White}
          animated={true}
        />
        <View></View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image
            source={require('../../assets/app_logo.png')}
            style={styles.logo}
          />
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('WelcomeScreenOne')}
        >
          <Text style={styles.btnText}>Next</Text>
        </TouchableOpacity>
      </View>
    )
  
}

export default Splash