import axios from 'axios'; 
import {getToken, saveToken} from './TokenService';

// const baseURL =  "http://10.0.2.2:8000/" 
const baseURL =  "http://10.0.2.2:5000/" 

const api = axios.create({
  baseURL: `${baseURL}api/`,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (email, password) => {
  const response = await fetch(`${baseURL}login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email, password}),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  } else { 
    return response.json();
  }
};

const getHeaders = async () => {
  try {
    const token = await getToken();

    if (token) {
      return {
        Authorization: `Bearer ${token}`,
      };
    } else {
      throw new Error('No token found');
    }
  } catch (error) {
    console.error('Error getting token:', error);
    throw error;
  }
};

const fetchUserData = async () => {
  try {
    // const token = await getToken();
    // console.log('get token',token);
    const response = await fetch(`${baseURL}api/user/data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error('Error user data:', error);
  }
};

const fetchProtectedData = async () => {
  try {
    const headers = await getHeaders(); 
    const response = await api.get('admin/locations', {headers});
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchCategoriesData = async () => {
  try { 
    const response = await api.get('user/active-categories-list');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchPreferenceData = async () => {
  try {  
    const response = await api.get('admin/play-themes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const fetchLocationsData = async () => {
  try { 
    const response = await api.get('admin/locations'); 
    return response.data;
  } catch (error) {
    throw error;
  }
};

export {
  api,
  fetchUserData,
  fetchProtectedData,
  fetchCategoriesData,
  fetchPreferenceData,
  fetchLocationsData,
  baseURL,
};
