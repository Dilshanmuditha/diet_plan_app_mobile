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
    backgroundColor: '#F5F5ED',
  },
  header1:{
    fontSize: getFontSize(36),
    fontWeight: "bold",
    color: ColorSheet.Primary
  },
  header2:{
    fontSize: getFontSize(24),
    fontWeight: "500",
    color: ColorSheet.LabelTxt,
    marginTop:10,
  },
  header3:{
    fontSize: getFontSize(14),
    fontWeight: "600",
    color: ColorSheet.Black,
    alignSelf:"center",
  },
  container1:{
    flex:1,
    paddingTop:10,
    paddingLeft:10,
    paddingRight:10,
  },
  container2:{
    flex:4,
    width: width,
    height:300,
    alignItems:"center",
  },
  container2Main:{
    marginTop:30,
    marginBottom:30,
    // width: width,
    backgroundColor: "#d6d2d2",
    borderWidth:2,
    borderRadius:10,
    borderColor: ColorSheet.Primary,
    margin:10,
  },
  container2_Header:{
    width: wp('85%'),
    marginLeft:15,
    marginTop:25,
  },
  container2_input:{
    flexDirection:'row',
    alignItems:"flex-end",
    marginTop:10,
    justifyContent:"space-around"
  },
  textInput:{
    width:wp('35%'),
    height:hp('5%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    color:'#000000',
    fontSize:12,
    fontFamily: 'Outfit-Light',
    borderWidth:1,
    margin:4,
    textAlign:"center"
  },
  container2_btn:{
    flexDirection:'row',
    alignItems:"center",
    marginTop:10,
    justifyContent:"center",
    justifyContent:"space-around"
  },
  bmiButton:{
    marginTop: 5,
    marginBottom: 10,
    width: wp('40%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingBottom: 7,
    paddingTop: 7,
    // borderWidth: 1,
    backgroundColor:ColorSheet.Primary
  },
  bmiButtonTxt:{
    color: '#FFFFFF',
    fontSize: getFontSize(12),
    fontFamily:'Outfit-Regular',
  },
  savebmiButton:{
    marginTop: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    paddingBottom: 7,
    paddingTop: 7,
  },
  savebmiButtonTxt:{
    color: '#000000',
    textDecorationLine:"underline",
    fontSize: getFontSize(14),
    fontFamily:'Outfit-Regular',
  },
  bmiResultTxt:{
    color: '#000000',
    fontSize: getFontSize(18),
    fontFamily:'Outfit-Regular',
    marginBottom:20,
  },
  container2_Content:{
    width: wp('85%'),
    alignItems:"center",
    marginTop:20,
    justifyContent:"center",
    marginBottom:10,
    borderRadius:8,
    backgroundColor: ColorSheet.ActiveBottomTab,
  },
  container2_ContentTxt:{
    color: '#000000',
    fontSize: getFontSize(24),
    fontFamily:'Outfit-Regular',
    margin:20,
    alignSelf:"center",
    fontWeight:600
  },
  errorMessage:{
    color: 'red',
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    alignSelf:'center'
  },
});
    
export default styles;
