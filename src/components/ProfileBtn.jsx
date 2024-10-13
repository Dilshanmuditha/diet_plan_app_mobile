import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ProfileBtn = ({label,onPress, iconName}) => {
  return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Icon
          name={iconName}
          size={20}
          color="#000000"
          style={styles.icon}
        />
        <Text style={styles.btnText}>{label}</Text>
      </TouchableOpacity>
      
  );
};

export default ProfileBtn;

const styles = StyleSheet.create({
  button: {
    flexDirection:'row',
    marginTop: 10,
    width: wp('87%'),
    height:50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingBottom: 10,
    paddingTop: 10,
  },
  icon:{
    flex:1,
    alignItems:"flex-start",
    textAlign:'center',
  },
  btnText: {
    flex:4,
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',

  },

});
