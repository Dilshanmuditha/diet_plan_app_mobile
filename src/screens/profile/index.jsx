import {
  Text,
  View,
  Image,
  RefreshControl,
  ToastAndroid,
  Alert,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {getToken} from '../../TokenService';
import RNExitApp from 'react-native-exit-app';
import ButtonGreen from '../../components/ButtonGreen';
import ProfileBtn from '../../components/ProfileBtn';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useAuth} from '../../../AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;
const {width, height} = Dimensions.get('window');

const Profile = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState(false);
  const [subscriptionCheckComplete, setSubscriptionCheckComplete] =
    useState(false);

  const {user, loadUserFromStorage, logout} = useAuth();

  useFocusEffect(
    React.useCallback(() => {
      loadUserFromStorage();
      return () => {
        console.log('home is unfocused');
      };
    }, []),
  );

  useEffect(() => {
    // Fetch user data when the component mounts
    if (!user) {
      loadUserFromStorage();
    }
  }, [loadUserFromStorage, user]);

  const handleLogout = async () => {
    try {
      setLoading(true);
      showToast();

      setTimeout(async () => {
        await logout();
        RNExitApp.exitApp();
      }, 500);
      // navigation.navigate('ScreenThree')
    } catch (error) {
      console.error('logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        marginBottom: 60,
        alignContent: 'center',
        backgroundColor: '#F5F5ED',
      }}>
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={styles.headerBack}>
            <Text
              style={styles.edit}
              onPress={() => navigation.navigate('editProfileScreen')}>
              Edit
            </Text>
          </View>

          <View>
          
            <Image
              source={require('../../assets/bottomIcon/profile.png')}
              style={styles.image}
            />
            <Text style={styles.userName}>
              {user?.data?.name || 'User not found'}{' '}
            </Text>
            <Text style={styles.userEmail}>
              {user?.data?.email || 'User not found'}{' '}
            </Text>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          stickyHeaderIndices={[0]}>
          <View style={styles.contain}>
            <Text style={styles.contentTxt}>Account Settings</Text>
            <ProfileBtn
              iconName="credit-card-outline"
              label="Subscription Plan"
              onPress={() => {}}
            />
            <ProfileBtn iconName="bell-outline" label="Notifications" />
            <ProfileBtn iconName="history" onPress={() => {}} label="History" />

            <Text style={styles.contentTxt}>Support & About</Text>

            <ProfileBtn
              iconName="flag-variant-outline"
              label="Report a problem"
            />
            <ProfileBtn
              iconName="help-circle-outline"
              onPress={() => {}}
              label="Help & Support"
            />
            <ProfileBtn
              iconName="alert-circle-outline"
              label="Terms and Policies"
            />
            <ButtonGreen
              loading={loading}
              onPress={handleLogout}
              label="Logout"
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    position: 'absolute',
    width: wp('100%'),
    zIndex: 1,
  },
  headerBack: {
    flex: 1,
    backgroundColor: '#18423B',
    height: 125,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  edit: {
    textAlign: 'right',
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'PlayfairDisplay-Regular',
    marginRight: 30,
    marginTop: 20,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: -45,
    backgroundColor: '#ffffff',
  },
  userName: {
    textAlign: 'center',
    marginTop: 10,
    color: '#000000',
    fontSize: 22,
    fontFamily: 'PlayfairDisplay-SemiBold',
  },
  userEmail: {
    textAlign: 'center',
    color: '#000000',
    fontSize: 12,
    fontFamily: 'PlayfairDisplay-Regular',
    marginBottom: 10,
  },
  contain: {
    alignSelf: 'center',
    marginTop: 225,
    marginBottom: 20,
  },
  contentTxt: {
    textAlign: 'left',
    marginVertical: 10,
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Outfit-Regular',
  },
});
