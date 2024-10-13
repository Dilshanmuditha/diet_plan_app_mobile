import {StyleSheet, Text,} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {PixelRatio} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native-paper';

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

const ButtonGreen = ({label,style, onPress, loading}) => {
  return (
    <TouchableOpacity style={[styles.button,style]} onPress={onPress} disabled={loading}>
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.btnText}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonGreen;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#18423B',
    borderRadius: 50,
    paddingBottom: 7,
    paddingTop: 7,
    borderWidth:1,
    borderColor:'#18423B'
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
});
