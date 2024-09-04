import React, {createContext, useContext, useEffect, useState} from 'react';
import {baseURL, loginUser, saveToken} from './ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const loadUserFromStorage = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const login = async (email, password) => {
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      // Save user data to AsyncStorage
      try {
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        await saveToken(userData.token);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  };

  const logout = async () => {
    // Remove user data from AsyncStorage
    try {
      const token = await getToken();

      await fetch(`${baseURL}api/user/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      });
      setUser(null);
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('token');
    } catch (error) {
      console.error('Error removing user data:', error);
    }
  };

  // Load user from AsyncStorage on app start
  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider value={{loadUserFromStorage, user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
