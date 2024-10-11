import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import {ActivityIndicator, Text} from 'react-native-paper';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {baseURL, getToken} from '../../../ApiService';
import { useAuth } from '../../../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');
const HomeScreen = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('0.00');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState('');
  const {user, loadUserFromStorage} = useAuth();

  useFocusEffect(
    React.useCallback(() => { 
      loadUserFromStorage();
      return () => {
        console.log('home is unfocused');
      };
    }, []),
  );

 useEffect(() => {
    // Fetch user data when the component mounts
    if (!user) {
      loadUserFromStorage();
    }
  }, [loadUserFromStorage, user]);
  
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const handleCalculateBMI = async () => {
    if (height && weight) {
      try {
        setErrorMessage('');
        setLoading(true);
        const body = {
          height: height,
          weight: weight,
        };
        const response = await fetch(`${baseURL}bmi-calculate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body), // Convert the body to a JSON string
        });
        if (
          response.headers.get('Content-Type')?.includes('application/json')
        ) {
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            showToast("BMI Calculated");
            setBMI(data.data);
          } else {
            setErrorMessage('Calculation Failed');
          }
        } else {
          const errorText = await response.text();
          console.error('Unexpected response format:', errorText);
          setErrorMessage('Calculation Failed: Unexpected response format');
        }
      } catch (error) {
        console.log(error);
        setErrorMessage('Invalid height or Weight.');
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage('Input fields are required');
      console.log(error);
    }
  };

  const saveBMI = async () => {
    if (bmi) {
      const body = {
        bmi: bmi,
      };
      setErrorMessage('');
      const token = await getToken();
      console.log('body', body);

      const response = await fetch(`${baseURL}bmi-save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body), // Convert the body to a JSON string
      });
      console.log(response)
      if (response.headers.get('Content-Type')?.includes('application/json')) {
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          showToast("BMI value saved");
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          await loadUserFromStorage();
        } else {
          setErrorMessage('Save Failed');
        }
      } else {
        const errorText = await response.text();
        console.error('Unexpected response format:', errorText);
        setErrorMessage('Save Failed: Unexpected response format');
      }
    } else {
      setErrorMessage('Please calculate the BMI first');
      console.log(error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container1}>
        <Text style={styles.header1}>Hello! {user?.data?.name || "User not found"} </Text>
        <Text style={styles.header2}>Last BMI Value: {user?.data?.bmi ? (parseFloat(user?.data?.bmi).toFixed(2)) : "0.00"}</Text>
      </View>
      <View style={styles.container2Main}>
        <View style={styles.container2_Header}>
          <Text style={styles.header3}>
            Input your height as cm and weight as Kg for calculate the BMI.
          </Text>
        </View>
        <View style={styles.container2_input}>
          <TextInput
            value={height}
            returnKeyType="next"
            returnKeyLabel="Next"
            placeholder="Height(m)"
            placeholderTextColor="#A5A5A5"
            style={styles.textInput}
            onChangeText={setHeight}
            behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
            keyboardType='number-pad'
          />
          <TextInput
            value={weight}
            returnKeyType="next"
            returnKeyLabel="Next"
            placeholder="Weight(Kg)"
            placeholderTextColor="#A5A5A5"
            style={styles.textInput}
            onChangeText={setWeight}
            behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
            keyboardType='number-pad'
          />
        </View>

        <View style={styles.container2_btn}>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.bmiButton}
            onPress={handleCalculateBMI}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.bmiButtonTxt}>Calculate BMI</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.bmiButton} onPress={saveBMI}>
            <Text style={styles.bmiButtonTxt}>Save BMI</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container2_btn}>
          <Text style={styles.bmiResultTxt}>
            Your BMI value is {parseFloat(bmi).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={styles.container2}>
      <TouchableOpacity onPress={() => console.log("hello")}>
        <View style={styles.container2_Content}>
          <Text style={styles.container2_ContentTxt}>Get Nutrition Plan</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ExerciseScheduleScreen')}>
        <View style={styles.container2_Content} >
        
          <Text style={styles.container2_ContentTxt}>
            Get Exercise Schedule
          </Text>
          
        </View></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
