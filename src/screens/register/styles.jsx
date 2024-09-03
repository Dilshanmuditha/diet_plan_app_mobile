import {Dimensions, StyleSheet} from 'react-native'; 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PixelRatio } from 'react-native';
const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale; 

const styles = StyleSheet.create({
  formContainer: {
    flex: 2,
    width: 'auto',
    resizeMode: 'contain',
    alignItems: 'center',
    marginTop:hp('2.5%'),
    
  },
  FormInputsView: {
    width: wp('85%'),
    marginTop: 20,
  },
  FormInputTitle: {
    marginLeft: 10,
    fontFamily: 'Outfit-Light',
    color: '#000000',
    fontWeight: '300',
    marginBottom: 5,
    fontSize:16,

  },
  textInput: {
    width:wp('85%'),
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    color:'#000000',
    fontSize:16,
    fontFamily: 'Outfit-Light',
  },
  termsandCon: {
    flex: 1,
    alignSelf: 'center',
    alignContent:'center',
    marginTop:15,
    width: wp('80%')
  },
  privacyDiv: {
    flexDirection: 'row',
    justifyContent:'center',
    width: wp('85%'),
    alignSelf: 'center',
  },
  privacyText: {
    flex:1,
    fontSize: 14,
    fontFamily: 'Outfit-Regular',
    marginLeft:5,
    color: '#000000',
  },
  errorMessage:{
    color: 'red',
    fontFamily: 'Outfit-Regular',
    fontSize: 12,
    alignSelf:'center'
  },
  registerButton:{
    marginTop: 20,
    marginBottom: 15,
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18423B',
    borderRadius: 50,
    paddingBottom: 7,
    paddingTop: 7,
    alignSelf: 'center',
    borderColor: '#18423B',
    borderWidth: 1,
  },
  registerButtonText:{
    color: '#FFFFFF',
    fontSize: getFontSize(18),
    fontFamily:'Outfit-Regular',
  },
  donthaveAccDiv:{
    flexDirection:'row',
    marginBottom:20,
    marginTop:20,
    alignSelf:'center',
  },
  login:{
    color:'#000000',
    textDecorationLine:'underline',
    fontFamily:'Outfit-SemiBold'
  },
  container2: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    marginTop: 5,
    marginBottom: 10,
    width: wp('85%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 50,
    paddingBottom: 7,
    paddingTop: 7,
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'row',
  },
  buttonContent: { 
    alignItems: 'left',
    width: wp('25%'),
  },
  icons: {
    marginLeft: 30,
    width: 25,
    height: 25,
  },
  btnText: {
    fontSize:16,
    fontFamily:'Outfit-Regular',
    color:'#000000'
  },
  orText: {
    fontSize: 16,
    textAlign:'center',
    fontFamily:'Outfit-Regular',
    marginBottom: 15,
    color:'#000000'
  },
  inputFocused: { 
    backgroundColor:'blue',
  },
  error:{
    fontFamily: 'Outfit-Regular',
    color:'#FF2828',
    fontSize:12,
  },
  checkbox:{ 
    color:'red'
  },
  verifyButton:{ 
    width: wp('85%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18423B',
    borderRadius: 50,
    paddingBottom: 10,
    paddingTop: 10,
    alignSelf: 'center',
    borderColor: '#18423B',
    borderWidth: 1,
    bottom:-25
  },
  
});

export default styles;
