import {Dimensions, StyleSheet} from 'react-native';
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

const styles = StyleSheet.create({
  container:{
    flex:1,
    width: width,
    height:height,
    paddingTop:10,
    backgroundColor: ColorSheet.Primary,

  },
  logoutContainer: {
    // position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logout:{
    width: wp("85%"),
    height: hp("5%"),
    backgroundColor: ColorSheet.Red,
    alignItems:"center",
    borderRadius:15
  },
  logoutTxt:{
    color: ColorSheet.White,
    fontSize: getFontSize(26),
    fontWeight: "bold",
  }

});
    
export default styles;
