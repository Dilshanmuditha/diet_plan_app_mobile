import {
  RefreshControl,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  Platform,
  Image,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button, HelperText} from 'react-native-paper';
// import {baseURL} from '../../ApiService.js';
// import {
//   saveTempToken,
//   saveTempTokenInSignUp,
//   saveToken,
// } from '../../TokenService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Linking} from 'react-native';
import styles from './styles';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { baseURL } from '../../../ApiService.js';

const Register = () => {
  const [email, setEmail] = useState('');
  const onChangeEmail = email => setEmail(email);
  const [password, setPassword] = useState('');
  const onChangePassword = password => setPassword(password);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const onChangeConfirmPassword = passwordConfirm =>
    setPasswordConfirm(passwordConfirm);
  const [name, setName] = useState('');
  const [isSelected, setSelection] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isNameActive, setIsNameActive] = useState(false);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [isPasswordActive, setIsPasswordActive] = useState(false);
  const [isConfirmPasswordActive, setIsConfirmPasswordActive] = useState(false);
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [rightIcon, setRightIcon] = useState('eye');
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [loading, setLoading] = useState(false);
  const [socialloading, setSocialloading] = useState(false);

  const [passwordConfirmVisibility, setConfirmPasswordVisibility] =
    useState(true);

  //use navigation
  const navigation = useNavigation();

  const showToast = () => {
    ToastAndroid.show('Registered Successfully!', ToastAndroid.SHORT);
  };

  //handle when refresh the screen data should lose
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setName('');
    setEmail('');
    setErrorMessage('');
    setPassword('');
    setPasswordConfirm('');
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  const handlePasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-slash');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-slash') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  const handleConfirmPasswordVisibility = () => {
    if (rightIcon === 'eye') {
      setRightIcon('eye-slash');
      setConfirmPasswordVisibility(!passwordConfirmVisibility);
    } else if (rightIcon === 'eye-slash') {
      setRightIcon('eye');
      setConfirmPasswordVisibility(!passwordConfirmVisibility);
    }
  };

  const hasEmailErrors = () => {
    const emailSpaceRegex = /\s/;
    const hasSpaces = emailSpaceRegex.test(email);
    const hasAtSymbol = email.includes('@');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const parts = email.split('.');
    const hasCharactersAfterLastDot =
      parts.length >= 2 && parts[parts.length - 1].length > 0;

    const hasForwardSlash = email.includes('/');

    return (
      !emailRegex.test(email) ||
      hasSpaces ||
      !hasAtSymbol ||
      !hasCharactersAfterLastDot ||
      hasForwardSlash
    );
  };

  const getFullNameError = () => {
    const nameRegex = /[!@#$%^&*(),.?":{}|<>\-=_+;~`\/]|[\d]/g;
    const nameSpaceRegex = /^\s*$/;

    if (nameRegex.test(name) || nameSpaceRegex.test(name)) {
      return 'Full Name is invalid';
    }

    if (name.length < 3) {
      return 'Full Name minimum characters are 3';
    }

    if (name.length > 150) {
      return 'Full Name maximum characters are 150';
    }

    return '';
  };

  const hasNameErrors = () => {
    return !!getFullNameError();
  };

  const hasMinimumCharactorName = () => {
    return name.length < 3;
  };
  const hasMaximumCharactorName = () => {
    return name.length > 150;
  };

  const hasPasswordErrors = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*])[A-Za-z\d@#$!%^&*]{8,}$/;
    return !passwordRegex.test(password) || password.length > 12;
  };
  const hasConfirmPasswordErrors = () => {
    return password !== passwordConfirm;
  };

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     client_id:
  //       '674541776720-s5jq33tl7okl7u7mfu5q22rgk5vo5ee6.apps.googleusercontent.com',
  //     iosClientId:
  //       '674541776720-rdbmldgo2gfsdqjmsen2ntmn50deguvv.apps.googleusercontent.com',
  //   });
  // }, []);

  const registerWithGoogle = async () => {
    try {
      setSocialloading(true);
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      console.log('====================================');
      console.log(userInfo);
      console.log('====================================');
      const response = await fetch(`${baseURL}api/user/socialRegister`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userInfo.user.name,
          email: userInfo.user.email,
          googleId: userInfo.user.id,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // await saveToken(data.token);
        navigation.navigate('LoginScreen');
      } else {
        // Handle registration error
        setErrorMessage('Registration failed. Email already registered');
      }
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('user sign in progress');
      } else {
        console.error('get error', error);
      }
    } finally {
      setSocialloading(false);
    }
  };
  if (socialloading) {
    return (
      <ActivityIndicator
        size="large"
        style={{flex: 1, justifyContent: 'center', textAlign: 'center'}}
        color="#18423B"
      />
    );
  }
  const registerApi = async () => {
    console.log(baseURL);

    if (!name && !email && !password) {
      setErrorMessage('Please fill the all details.');
    } else if (!name) {
      setErrorMessage('Full Name is required.');
    } else if (!email) {
      setErrorMessage('Email is required.');
    } else if (!password) {
      setErrorMessage('Password is required.');
    } else if (!passwordConfirm) {
      setErrorMessage('Confirm password is required.');
    } else if (hasNameErrors()) {
      setErrorMessage('Full Name is invalid');
    } else if (hasMinimumCharactorName()) {
      setErrorMessage('Full Name minimum charactors are 3');
    } else if (hasMaximumCharactorName()) {
      setErrorMessage('Full Name maximum charactors are 150');
    } else if (hasEmailErrors()) {
      setErrorMessage('Email is invalid.');
    } else if (hasPasswordErrors()) {
      setErrorMessage('Password is invalid.');
    } else if (hasConfirmPasswordErrors()) {
      setErrorMessage('Password does not match.');
    } else if (!isSelected) {
      setErrorMessage(
        'Please agree to all the terms and conditions before registering.',
      );
    } else {
      try {
        setLoading(true);
        
        const body = {
          name: name,
          email: email,
          password: password
        };
        
        console.log("body", body);
        
        const response = await fetch(`${baseURL}register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body) // Convert the body to a JSON string
        });
        
        console.log(response);
      
        if (response.headers.get('Content-Type')?.includes('application/json')) {
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            // Registration successful
            showToast();
            navigation.navigate('LoginScreen');
          } else {
            setErrorMessage('Registration Failed: email has already been taken');
          }
        } else {
          const errorText = await response.text();
          console.error('Unexpected response format:', errorText);
          setErrorMessage('Registration Failed: Unexpected response format');
        }
      } catch (error) {
        console.error('Registration Failed:', error);
        setErrorMessage('Registration Failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <View
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
              <View style={styles.FormInputsView}>
                <Text style={styles.FormInputTitle}>Full Name *</Text>
                <TextInput
                  value={name}
                  maxLength={151}
                  returnKeyType="next"
                  returnKeyLabel="Next"
                  placeholder="Enter your full name"
                  placeholderTextColor="#A5A5A5"
                  onChangeText={setName}
                  style={[
                    styles.textInput,
                    {
                      borderWidth: isNameActive ? 1 : 0,
                      borderColor:
                        hasNameErrors() ||
                        hasMinimumCharactorName() ||
                        (hasMaximumCharactorName() && name)
                          ? '#FF2828'
                          : isNameActive
                          ? 'black'
                          : '#A5A5A5',
                      color:
                        hasNameErrors() ||
                        hasMinimumCharactorName() ||
                        (hasMaximumCharactorName() && name)
                          ? '#FF2828'
                          : '#000000',
                    },
                  ]}
                  onSubmitEditing={() => {
                    emailInputRef.focus();
                  }}
                  onFocus={() => setIsNameActive(true)}
                  onBlur={() => setIsNameActive(false)}
                  behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                />
                {/* {getFullNameError() && name ? (
                  <HelperText type="error" visible={true} style={styles.error}>
                    {getFullNameError()}
                  </HelperText>
                ) : null}  */}
              </View>
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
                      borderColor:
                        hasEmailErrors() && email
                          ? '#FF2828'
                          : isEmailActive
                          ? 'black'
                          : '#A5A5A5',
                      color: hasEmailErrors() && email ? '#FF2828' : '#000000',
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
                {/* {hasEmailErrors() && email ? (
                  <HelperText type="error" visible={true} style={styles.error}>
                    Email address is invalid!
                  </HelperText>
                ) : null} */}
              </View>
              <View style={styles.FormInputsView}>
                <Text style={styles.FormInputTitle}>Password *</Text>

                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    value={password}
                    maxLength={13}
                    placeholder="Enter your password"
                    placeholderTextColor="#A5A5A5"
                    onChangeText={onChangePassword}
                    style={[
                      styles.textInput,
                      {
                        borderWidth: isPasswordActive ? 1 : 0,
                        borderColor:
                          password && hasPasswordErrors()
                            ? '#FF2828'
                            : isPasswordActive
                            ? 'black'
                            : '#A5A5A5',
                        color:
                          password && hasPasswordErrors()
                            ? '#FF2828'
                            : '#000000',
                      },
                    ]}
                    returnKeyType="next"
                    returnKeyLabel="Next"
                    ref={input => {
                      passwordInputRef = input;
                    }}
                    onSubmitEditing={() => {
                      confirmPasswordInputRef.focus();
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
                {/* {password && hasPasswordErrors() ? (
                  <HelperText type="error" visible={true} style={styles.error}>
                    Minimum of 8 characters and maximum of 12 characters, have
                    uppercase and lowercase letters, a number, and a special
                    character. Spaces are not permitted.
                  </HelperText>
                ) : null} */}
              </View>
              <View style={styles.FormInputsView}>
                <Text style={styles.FormInputTitle}>Confirm Password *</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    value={passwordConfirm}
                    placeholder="Confirm your password"
                    placeholderTextColor="#A5A5A5"
                    onChangeText={onChangeConfirmPassword}
                    secureTextEntry={passwordConfirmVisibility}
                    style={[
                      styles.textInput,
                      {
                        borderWidth: isConfirmPasswordActive ? 1 : 0,
                        borderColor:
                          hasConfirmPasswordErrors() && passwordConfirm
                            ? '#FF2828'
                            : isConfirmPasswordActive
                            ? 'black'
                            : '#A5A5A5',
                        color:
                          hasConfirmPasswordErrors() && passwordConfirm
                            ? '#FF2828'
                            : '#000000',
                      },
                    ]}
                    returnKeyType="done"
                    returnKeyLabel="Register"
                    ref={input => {
                      confirmPasswordInputRef = input;
                    }}
                    onSubmitEditing={() => {
                      Keyboard.dismiss();
                    }}
                    onFocus={() => setIsConfirmPasswordActive(true)}
                    onBlur={() => setIsConfirmPasswordActive(false)}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'null'}
                  />
                  <TouchableOpacity
                    onPress={handleConfirmPasswordVisibility}
                    style={{marginLeft: -40}}>
                    <Icon
                      name={passwordConfirmVisibility ? 'eye-off' : 'eye'}
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
            <View style={styles.checkbox}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={isSelected}
                onValueChange={setSelection}
                boxType="square"
                onCheckColor="#18423B"
                tintColor="#18423B"
                onTintColor="#18423B"
                lineWidth={1}
              />
            </View>

            <Text style={styles.privacyText}>
              By registering, you agree to our{' '}
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontFamily: 'Outfit-SemiBold',
                }}
                onPress={() =>
                  Linking.openURL(
                    'https://dilshanmuditha.github.io/',
                  )
                }>
                Terms of use and Privacy Policy.
              </Text>
            </Text>
          </View>
          {errorMessage ? (
            <Text style={styles.errorMessage}>{errorMessage}</Text>
          ) : null}
        </View>
        <TouchableOpacity style={styles.registerButton} onPress={registerApi}>
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.registerButtonText}>Register</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <View style={styles.container2}>
          <TouchableOpacity style={styles.button} onPress={registerWithGoogle}>
            <View style={styles.buttonContent}>
              {/* <Image
                source={require('../../assets/icons/google.png')}
                style={styles.icons}
              /> */}
            </View>
            <Text style={styles.btnText}>Sign up using Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <View style={styles.buttonContent}>
              {/* <Image
                source={require('../../assets/icons/apple.png')}
                style={styles.icons}
              /> */}
            </View>
            <Text style={styles.btnText}>Sign up using Apple ID</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.donthaveAccDiv}>
          <Text style={{color: '#000000', fontFamily: 'Outfit-Regular'}}>
            Already have an account?{' '}
          </Text>
          <Text
            style={styles.login}
            onPress={() => navigation.navigate('LoginScreen')}>
            Login
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
