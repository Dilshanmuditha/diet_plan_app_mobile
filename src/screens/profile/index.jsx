import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import React from 'react';
import {baseURL, getToken} from '../../../ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import RNExitApp from 'react-native-exit-app';
import { useAuth } from '../../../AuthContext';

const Profile = () => {
  const {user, logout} = useAuth();
  const showToast = () => {
    ToastAndroid.show('Logout successfull!', ToastAndroid.SHORT);
  };
  
  const handleLogout = async () => {
    try {
        showToast();
        setTimeout(async () => {
            await logout();
            RNExitApp.exitApp();
          }, 500);
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logout} onPress={handleLogout}>
          <Text style={styles.logoutTxt}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Profile;
