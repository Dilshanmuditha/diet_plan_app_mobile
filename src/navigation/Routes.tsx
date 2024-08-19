import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splash';
import WelcomeOne from '../screens/welcomeOne';

const Stack = createStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'SplashScreen'}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={Splash} />
        <Stack.Screen name="WelcomeScreenOne" component={WelcomeOne} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
