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
  mainImageView: {
    height: hp(75),
    marginBottom: hp(5),
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center',
  },
  mainImage: {
    flex: 1,
    width: wp('90%'),
    height: hp('100%'),
    borderRadius: 25,
    opacity: 0.6,
    // resizeMode: 'contain',
  },
  mainText: {
    // textAlign: 'center',
    width: wp('70%'),
    position: 'absolute',
    fontFamily: 'arial-medium',
    fontSize: RFValue(32),
    fontWeight: 'bold',
    color: ColorSheet.Primary,
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
  btnSkip: {
    // marginTop: hp('5%'),
    width: wp('85%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSkipText: {
    color: ColorSheet.GrayTxt,
    fontFamily: 'arial-medium',
    fontSize: RFValue(15),
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});
