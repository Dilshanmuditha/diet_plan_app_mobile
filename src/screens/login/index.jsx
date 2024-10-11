import {
  RefreshControl,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import styles from './styles';
import { baseURL, fetchUserData, loginUser, saveToken } from '../../../ApiService';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {HelperText} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GoogleSignin} from 'react-native-google-signin';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const onChangeEmail = email => setEmail(email);
  const [password, setPassword] = useState('');
  const onChangePassword = password => setPassword(password);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [rightIconColor, setRightIconColor] = useState('#0C8A7B');
  const navigation = useNavigation();
  const {user, login} = useAuth();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setErrorMessage('');
    setEmail('');
    setPassword('');
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const hasEmailErrors = () => {
    return (
      !email.includes('@') ||
      !email.split('@')[1].includes('.') ||
      email.includes(' ')
    );
  };

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-slash');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-slash') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const showToast = () => {
    ToastAndroid.show('Login successfull!', ToastAndroid.SHORT);
  };
  const handleLogin = async () => {
    if (email && password) {
     try {
       setLoading(true);
       await login(email, password);
       showToast(); 
       navigation.navigate('protectedScreen');
     } catch (error) {
       setLoading(false);
       console.log(error);
       setErrorMessage('Invalid Username or Password.');
     } finally {
       setLoading(false);
     }
    }else{
     setErrorMessage('Input fields are required');
    }
   };
  // const handleLogin = async () => {
  //  if (email && password) {
  //   const body = {
  //     email: email,
  //     password: password
  //   };
  //   try {
  //     setLoading(true);
  //     const response = await login(email, password);
  //       console.log(response)
  //       if (response) {
  //         await AsyncStorage.setItem('userData', JSON.stringify(data.data));
  //         await saveToken(data.token);
  //         showToast(); 
  //         navigation.navigate('HomeScreen');
  //       } else {
  //         setErrorMessage('Login Failed: Invalid credentials');
  //       }
  //     // if (response.headers.get('Content-Type')?.includes('application/json')) {
  //     //   const data = await response.json();
  //     //   console.log(data)
  //     //   if (response.ok) {
  //     //     await AsyncStorage.setItem('userData', JSON.stringify(data.data));
  //     //     await saveToken(data.token);
  //     //     showToast(); 
  //     //     navigation.navigate('HomeScreen');
  //     //   } else {
  //     //     setErrorMessage('Login Failed: Invalid credentials');
  //     //   }
  //     // } else {
  //     //   const errorText = await response.text();
  //     //   console.error('Unexpected response format:', errorText);
  //     //   setErrorMessage('Login Failed: Invalid credentials');
  //     // }
  //   } catch (error) {
  //     console.log(error);
  //     setErrorMessage('Invalid Username or Password.');
  //   } finally {
  //     setLoading(false);
  //   }
  //  }else{
  //   setErrorMessage('Input fields are required');
  //  }
  // };

  return (
    <SafeAreaView
    style={{flex: 1, backgroundColor: '#F5F5ED', alignContent: 'center'}}>
    <ScrollView
      style={{alignSelf: 'center'}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <KeyboardAvoidingView
        style={styles.formContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'null'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Log in to your account</Text>
            <View style={styles.FormInputsView}>
              <Text style={styles.FormInputTitle}>Email Address *</Text>
              <TextInput
                value={email}
                returnKeyType="next"
                returnKeyLabel="Next"
                placeholder="Enter your email address"
                placeholderTextColor="#A5A5A5"
                style={[
                  styles.textInput,
                  {
                    borderWidth: isEmailActive ? 1 : 0,
                    borderColor: email && isEmailActive ? 'black' : '#A5A5A5',
                  },
                ]}
                onSubmitEditing={() => {
                  passwordInputRef.focus();
                }}
                ref={input => {
                  emailInputRef = input;
                }}
                onFocus={() => setIsEmailActive(true)}
                onBlur={() => setIsEmailActive(false)}
                onChangeText={onChangeEmail}
                behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
              />
              {hasEmailErrors() && email ? (
                <HelperText type="error" visible={true} style={styles.error}>
                  Email address is invalid!
                </HelperText>
              ) : null}
            </View>
            <View style={styles.FormInputsView}>
              <Text style={styles.FormInputTitle}>Password *</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  value={password}
                  placeholder="Enter your password"
                  placeholderTextColor="#A5A5A5"
                  onChangeText={onChangePassword}
                  style={[
                    styles.textInput,
                    {
                      borderWidth: isPasswordActive ? 1 : 0,
                      borderColor:
                        password && isPasswordActive ? 'black' : '#A5A5A5',
                    },
                  ]}
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  ref={input => {
                    passwordInputRef = input;
                  }}
                  onFocus={() => setIsPasswordActive(true)}
                  onBlur={() => setIsPasswordActive(false)}
                  secureTextEntry={passwordVisibility}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                />
                <TouchableOpacity
                  onPress={handlePasswordVisibility}
                  style={{marginLeft: -40}}>
                  <Icon
                    name={passwordVisibility ? 'eye-off' : 'eye'}
                    size={20}
                    color="#000000"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={styles.termsandCon}>
        <View style={styles.privacyDiv}>
          <Text
            style={styles.forgotPw}
            onPress={() => navigation.navigate('forgotPasswordScreen')}>
            Forgot Password
          </Text>
        </View>
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <View style={styles.container2}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <View style={styles.buttonContent}>
            {/* <Image
              source={require('../assets/icons/google.png')}
              style={styles.icons}
            /> */}
          </View>
          <Text style={styles.btnText}>Sign in using Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <View style={styles.buttonContent}>
            {/* <Image
              source={require('../assets/icons/apple.png')}
              style={styles.icons}
            /> */}
          </View>
          <Text style={styles.btnText}>Sign in using Apple ID</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.donthaveAccDiv}>
        <Text style={{color: '#000000', fontFamily: 'Outfit-Regular'}}>
          Don't have an account?{' '}
        </Text>
        <Text
          style={styles.login}
          onPress={() => navigation.navigate('RegisterScreen')}>
          Register
        </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
  )
}

export default Login