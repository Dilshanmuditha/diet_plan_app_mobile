import React from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ColorSheet} from '../../utils/ColorSheet';
import {Dimensions, PixelRatio} from 'react-native';
import {baseURL} from '../../../ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Assistants from '../../components/Assistants';

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;
const {width, height} = Dimensions.get('window');

const PersonalAssistants = () => {
  

  return (
    <Assistants/>
  );
};

const styles = StyleSheet.create({
  container: {flex: 2, padding: 20},
});

export default PersonalAssistants;
