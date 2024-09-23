import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../screens/profile';
import HomeScreen from '../../screens/home';

const tab = createBottomTabNavigator();

const screenOptions = {
  tabBarLabelStyle: {
    fontFamily: 'PlayfairDisplay-Medium',
    fontSize: 14,
  },
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    paddingBottom: 10,
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 65,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#ffffff',
  },
};

const BottomTabNavigation = () => {
  return (
    <tab.Navigator screenOptions={screenOptions}>
      <tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarInactiveTintColor: '#6F6F6F',
          tabBarActiveTintColor: '#18423B',
        }}
      />

      <tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          title: 'Profile',
          tabBarInactiveTintColor: '#6F6F6F',
          tabBarActiveTintColor: '#18423B',
        }}
      />
    </tab.Navigator>
  );
};

export default BottomTabNavigation;
