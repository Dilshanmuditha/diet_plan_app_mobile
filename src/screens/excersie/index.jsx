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

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;
const {width, height} = Dimensions.get('window');

const ExerciseSchedule = () => {
  const {control, handleSubmit, watch} = useForm();

  function getBMICase(bmi) {
    if (bmi < 16) {
      return {
        BMIcase_mild_thinness: 0,
        BMIcase_moderate_thinness: 0,
        BMIcase_sever_thinness: 1,
        BMIcase_normal: 0,
        BMIcase_over_weight: 0,
        BMIcase_obese: 0,
        BMIcase_severe_obese: 0,
      };
    } else if (bmi >= 16 && bmi < 17) {
      return {
        BMIcase_mild_thinness: 0,
        BMIcase_moderate_thinness: 1,
        BMIcase_sever_thinness: 0,
        BMIcase_normal: 0,
        BMIcase_over_weight: 0,
        BMIcase_obese: 0,
        BMIcase_severe_obese: 0,
      };
    } else if (bmi >= 17 && bmi < 18.5) {
      return {
        BMIcase_mild_thinness: 1,
        BMIcase_moderate_thinness: 0,
        BMIcase_sever_thinness: 0,
        BMIcase_normal: 0,
        BMIcase_over_weight: 0,
        BMIcase_obese: 0,
        BMIcase_severe_obese: 0,
      };
    } else if (bmi >= 18.5 && bmi < 25) {
      return {
        BMIcase_mild_thinness: 0,
        BMIcase_moderate_thinness: 0,
        BMIcase_sever_thinness: 0,
        BMIcase_normal: 1,
        BMIcase_over_weight: 0,
        BMIcase_obese: 0,
        BMIcase_severe_obese: 0,
      };
    } else if (bmi >= 25 && bmi < 30) {
      return {
        BMIcase_mild_thinness: 0,
        BMIcase_moderate_thinness: 0,
        BMIcase_sever_thinness: 0,
        BMIcase_normal: 0,
        BMIcase_over_weight: 1,
        BMIcase_obese: 0,
        BMIcase_severe_obese: 0,
      };
    } else if (bmi >= 30 && bmi < 35) {
      return {
        BMIcase_mild_thinness: 0,
        BMIcase_moderate_thinness: 0,
        BMIcase_sever_thinness: 0,
        BMIcase_normal: 0,
        BMIcase_over_weight: 0,
        BMIcase_obese: 1,
        BMIcase_severe_obese: 0,
      };
    } else {
      return {
        BMIcase_mild_thinness: 0,
        BMIcase_moderate_thinness: 0,
        BMIcase_sever_thinness: 0,
        BMIcase_normal: 0,
        BMIcase_over_weight: 0,
        BMIcase_obese: 0,
        BMIcase_severe_obese: 1,
      };
    }
  }

  // Function to calculate BFP cases
  function getBFPCase(bfp, gender) {
    if (gender === 'male') {
      if (bfp >= 2 && bfp < 14) {
        return {
          BFPcase_Athletes: 1,
          BFPcase_Fitness: 0,
          BFPcase_Acceptable: 0,
          BFPcase_Obese: 0,
        };
      } else if (bfp >= 14 && bfp < 18) {
        return {
          BFPcase_Athletes: 0,
          BFPcase_Fitness: 1,
          BFPcase_Acceptable: 0,
          BFPcase_Obese: 0,
        };
      } else if (bfp >= 18 && bfp <= 24) {
        return {
          BFPcase_Athletes: 0,
          BFPcase_Fitness: 0,
          BFPcase_Acceptable: 1,
          BFPcase_Obese: 0,
        };
      } else {
        return {
          BFPcase_Athletes: 0,
          BFPcase_Fitness: 0,
          BFPcase_Acceptable: 0,
          BFPcase_Obese: 1,
        };
      }
    } else {
      if (bfp >= 2 && bfp < 21) {
        return {
          BFPcase_Athletes: 1,
          BFPcase_Fitness: 0,
          BFPcase_Acceptable: 0,
          BFPcase_Obese: 0,
        };
      } else if (bfp >= 21 && bfp < 24) {
        return {
          BFPcase_Athletes: 0,
          BFPcase_Fitness: 1,
          BFPcase_Acceptable: 0,
          BFPcase_Obese: 0,
        };
      } else if (bfp >= 24 && bfp <= 32) {
        return {
          BFPcase_Athletes: 0,
          BFPcase_Fitness: 0,
          BFPcase_Acceptable: 1,
          BFPcase_Obese: 0,
        };
      } else {
        return {
          BFPcase_Athletes: 0,
          BFPcase_Fitness: 0,
          BFPcase_Acceptable: 0,
          BFPcase_Obese: 1,
        };
      }
    }
  }

  const onSubmit = async data => {
    const weight = parseFloat(data.Weight);
    const height = parseFloat(data.Height);
    const bmi = weight / (height * height);
    const age = parseInt(data.Age);

    // Automatically calculate BFP based on BMI, age, and gender
    const bfp =
      data.Gender === 'male'
        ? 1.2 * bmi + 0.23 * age - 16.2
        : 1.2 * bmi + 0.23 * age - 5.4;
    const genderCases =
      data.Gender === 'male'
        ? {Gender_Male: 1, Gender_Female: 0}
        : {Gender_Male: 0, Gender_Female: 1};

    const payload = {
      Weight: weight,
      Height: height,
      BMI: bmi,
      'Body Fat Percentage': bfp,
      Age: age,
      activity_level: parseInt(data.ActivityLevel),
      ...genderCases,
      ...getBMICase(bmi),
      ...getBFPCase(bfp, data.Gender),
    };

    console.log('Payload:', payload);

    const response = await fetch(`${baseURL}predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        Alert.alert('You Need to follow', data.messages[0]);
      } else {
        setErrorMessage('Server Failed');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Get Exercise Schedule</Text>

      <Text>Weight (kg):</Text>
      <Controller
        control={control}
        name="Weight"
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your weight"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Height (m):</Text>
      <Controller
        control={control}
        name="Height"
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your height in meters"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Age:</Text>
      <Controller
        control={control}
        name="Age"
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Text>Activity Level:</Text>
      <Controller
        control={control}
        name="ActivityLevel"
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <RNPickerSelect
            onValueChange={onChange}
            items={[
              {label: 'Low', value: '1'},
              {label: 'Moderate', value: '2'},
              {label: 'High', value: '3'},
            ]}
            placeholder={{label: 'Select your activity level', value: ''}}
            value={value}
          />
        )}
      />

      <Text>Gender:</Text>
      <Controller
        control={control}
        name="Gender"
        defaultValue=""
        render={({field: {onChange, value}}) => (
          <RNPickerSelect
            onValueChange={onChange}
            items={[
              {label: 'Male', value: 'male'},
              {label: 'Female', value: 'female'},
            ]}
            placeholder={{label: 'Select your gender', value: ''}}
            value={value}
          />
        )}
      />
      <TouchableOpacity
        style={styles.bmiButton}
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.bmiButtonTxt}>Get Exercise Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 2, padding: 20},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 40},
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
  },
  bmiButton: {
    marginTop: 25,
    alignSelf: 'center',
    marginBottom: 100,
    width: wp('92%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingBottom: 7,
    paddingTop: 7,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor: ColorSheet.Primary,
  },
  bmiButtonTxt: {
    color: '#FFFFFF',
    fontSize: getFontSize(18),
    fontFamily: 'Outfit-Regular',
  },
});

export default ExerciseSchedule;
