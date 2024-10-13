import {View, Text, Image} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from '../../screens/profile';
import HomeScreen from '../../screens/home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LocationsScreen from '../../screens/locations';

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
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/bottomIcon/home.png')}
              style={{width: 22, height:22, tintColor: focused ? '#18423B' : '#6F6F6F'}}
            />
          ),
          title: 'Home',
          tabBarInactiveTintColor: '#6F6F6F',
          tabBarActiveTintColor: '#18423B',
        }}
      />

      <tab.Screen
        name="ExcerciseScreen"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/bottomIcon/excercise.png')}
              style={{width: 22, height:22, tintColor: focused ? '#18423B' : '#6F6F6F'}}
            />
          ),
          title: 'Exercise',
          tabBarInactiveTintColor: '#6F6F6F',
          tabBarActiveTintColor: '#18423B',
        }}
      />

      <tab.Screen
        name="DietScreen"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/bottomIcon/diet.png')}
              style={{width: 22, height:22, tintColor: focused ? '#18423B' : '#6F6F6F'}}
            />
          ),
          title: 'Diet',
          tabBarInactiveTintColor: '#6F6F6F',
          tabBarActiveTintColor: '#18423B',
        }}
      />
      <tab.Screen
        name="locationsScreen"
        component={LocationsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/bottomIcon/location.png')}
              style={{width: 22, height:22, tintColor: focused ? '#18423B' : '#6F6F6F'}}
            />
          ),
          title: 'Locations',
          tabBarInactiveTintColor: '#6F6F6F',
          tabBarActiveTintColor: '#18423B',
        }}
      />
      <tab.Screen
        name="ProfileScreen"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={require('../../assets/bottomIcon/profile.png')}
              style={{width: 22, height:22, tintColor: focused ? '#18423B' : '#6F6F6F'}}
            />
        //     <Icon
        //   name="account"
        //   size={25}
        //   color="#000000"
        //   style={{width: 22, height:22, tintColor: focused ? '#18423B' : '#6F6F6F'}}
        // />
          ),
          title: 'Profile',
          tabBarInactiveTintColor: '#6F6F6F',
          tabBarActiveTintColor: '#18423B',
        }}
      />
    </tab.Navigator>
  );
};

export default BottomTabNavigation;
