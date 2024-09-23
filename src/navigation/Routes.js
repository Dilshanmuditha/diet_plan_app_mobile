import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screens/splash';
import WelcomeOne from '../screens/welcomeOne';
import WelcomeTwo from '../screens/welcomeTwo';
import Register from '../screens/register';
import Login from '../screens/login';
import CameraComponent from '../screens/camera';
import HeightDetect from '../screens/HeightDetect';
import HomeScreen from '../screens/home';
import BackImageScreen from '../screens/back';
import SideImageScreen from '../screens/side';
import FrontImageScreen from '../screens/front';
import { BottomNavigation } from 'react-native-paper';
import BottomTabNavigation from './stack/BottomTabNavigation';

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
        <Stack.Screen name="WelcomeScreenTwo" component={WelcomeTwo} />
        <Stack.Screen name="LoginScreen" component={Login} />
        <Stack.Screen name="RegisterScreen" component={Register} />
        <Stack.Screen name="CameraScreen" component={CameraComponent} />
        <Stack.Screen name="HeightDetectScreen" component={HeightDetect} />
        {/* <Stack.Screen name="HomeScreen" component={HomeScreen} /> */}
        <Stack.Screen name="BackImgScreen" component={BackImageScreen} />
        <Stack.Screen name="SideImgScreen" component={SideImageScreen} />
        <Stack.Screen name="FrontImgScreen" component={FrontImageScreen} />
        <Stack.Screen
          name="protectedScreen"
          component={BottomTabNavigation}
          options={{headerShown: false, gestureEnabled: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
