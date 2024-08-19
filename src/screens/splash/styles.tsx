import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ColorSheet} from '../../utils/ColorSheet';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorSheet.White,
    width: '100%',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  logo: {
    width: wp('50%'),
    height: hp('40%'),
    resizeMode: 'contain',
  },
  btn: {
    // marginTop: hp('5%'),
    width: wp('85%'),
    height: hp('6%'),
    backgroundColor: ColorSheet.Primary,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: ColorSheet.White,
    fontFamily: 'arial-medium',
    fontSize: RFValue(15),
    textAlign: 'center',
  },
});
