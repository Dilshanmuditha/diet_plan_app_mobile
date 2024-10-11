import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select';
import {Dimensions} from 'react-native';
import {blue100} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PixelRatio } from 'react-native';
import { ColorSheet } from '../../utils/ColorSheet';

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;
const {width, height} = Dimensions.get('window');
// Function to calculate BMI cases
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
    if (bfp < 6) {
      return {
        BFPcase_Athletes: 0,
        BFPcase_Fitness: 0,
        BFPcase_Acceptable: 0,
        BFPcase_Obese: 1,
      };
    } else if (bfp >= 6 && bfp <= 13) {
      return {
        BFPcase_Athletes: 1,
        BFPcase_Fitness: 0,
        BFPcase_Acceptable: 0,
        BFPcase_Obese: 0,
      };
    } else if (bfp >= 14 && bfp <= 17) {
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
    // Similar logic for female
    // You can add similar rules here based on gender female
  }
}

const ExerciseSchedule = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Parse BMI and Body Fat Percentage from form data
    const bmi = parseFloat(data.BMI);
    const bfp = parseFloat(data.BodyFatPercentage);

    // Get BMI and BFP cases based on calculations
    const bmiCases = getBMICase(bmi);
    const bfpCases = getBFPCase(bfp, data.Gender);

    // Combine user input with BMI and BFP cases
    const finalData = {
      ...data,
      ...bmiCases,
      ...bfpCases,
    };

    // Submit the final data (you can replace this with an API call)
    console.log('Submitted Data:', finalData);
    Alert.alert('Form Submitted', 'Your data has been submitted successfully.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Submit Your Data</Text>

      {/* Weight */}
      <Text>Weight (kg):</Text>
      <Controller
        control={control}
        name="Weight"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your weight"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* Height */}
      <Text>Height (cm):</Text>
      <Controller
        control={control}
        name="Height"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your height"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* BMI */}
      <Text>BMI:</Text>
      <Controller
        control={control}
        name="BMI"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your BMI"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* Body Fat Percentage */}
      <Text>Body Fat Percentage (%):</Text>
      <Controller
        control={control}
        name="BodyFatPercentage"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your body fat percentage"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* Age */}
      <Text>Age:</Text>
      <Controller
        control={control}
        name="Age"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      {/* Activity Level */}
      <Text>Activity Level:</Text>
      <Controller
        control={control}
        name="ActivityLevel"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onValueChange={onChange}
            items={[
              { label: 'Low', value: 'low' },
              { label: 'Moderate', value: 'moderate' },
              { label: 'High', value: 'high' },
            ]}
            placeholder={{ label: 'Select your activity level', value: '' }}
            value={value}
          />
        )}
      />

      {/* Gender */}
      <Text>Gender:</Text>
      <Controller
        control={control}
        name="Gender"
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <RNPickerSelect
            onValueChange={onChange}
            items={[
              { label: 'Male', value: 'male' },
              { label: 'Female', value: 'female' },
            ]}
            placeholder={{ label: 'Select your gender', value: '' }}
            value={value}
          />
        )}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.bmiButton} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.bmiButtonTxt}>Get Exercise Plan</Text>
          </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    padding: 10,
  },
  bmiButton:{
    marginTop: 5,
    marginBottom: 10,
    width: wp('92%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingBottom: 7,
    paddingTop: 7,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
    backgroundColor:ColorSheet.Primary
  },
  bmiButtonTxt:{
    color: '#FFFFFF',
    fontSize: getFontSize(18),
    fontFamily:'Outfit-Regular',
  },
});

export default ExerciseSchedule;
