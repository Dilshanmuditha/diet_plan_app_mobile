import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { ColorSheet } from '../../utils/ColorSheet';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heightText: {
    position: 'absolute',
    bottom: 20,
    fontSize: 24,
    color: 'white',
  },
});