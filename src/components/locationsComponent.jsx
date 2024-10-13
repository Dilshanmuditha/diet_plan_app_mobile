import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Facebook} from 'react-content-loader';
import {useNavigation} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ColorSheet} from '../utils/ColorSheet';
import {PixelRatio} from 'react-native';

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;

const LocationComponents = () => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  //   const fetchRecentToysData = async () => {
  //     try {
  //       const token = await getToken();
  //       const response = await fetch(`${baseURL}api/user/recentToys`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       const data = await response.json();
  //       return data.toys.data;
  //     } catch (error) {
  //       console.error('Error fetching Recent toys:', error);
  //     }
  //   };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const responseRecentToys = await fetchRecentToysData();
        // setRecentToys(responseRecentToys);
        const data = [
          {
            id: 1,
            name: 'Power house',
            locate: 'Colombo',
            review: '5',
            mobile: '+94 741443733',
            email: 'powerhouse@gmail.com',
          },
          {
            id: 2,
            name: 'Power Fitness',
            locate: 'Galle',
            review: '5',
            mobile: '+94 741443733',
            email: 'powerfitenss@powerfitness.com',
          },
          {
            id: 3,
            name: 'Power with Nutrtion',
            locate: 'Mt.Lavinia',
            review: '5',
            mobile: '+94 741443733',
            email: 'powerwithnutrition@gmail.com',
          },
          {
            id: 4,
            name: 'Nutrition house',
            locate: 'Panadura',
            review: '5',
            mobile: '+94 741443733',
            email: 'nutritoinhouse@gmail.com',
          },
        ];
        //   console.log('Banners:', data);  // Log banners
        setAccounts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const renderAccountItem = ({item}) => {
    return (
      <View style={styles.view}>
        <TouchableOpacity style={styles.viewTouch} onPress={() => {}}>
          <Image
            source={require('../assets/bottomIcon/excercise.png')}
            style={styles.image}
          />
          <View style={styles.contentView}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.name}>
                {item.name.length > 20
                  ? `${item.name.slice(0, 17)}...`
                  : item.name}
              </Text>
            </View>

            <Text style={styles.textDetails}>Location : {item.locate}</Text>
            <Text style={styles.textDetails}>Mobile : {item.mobile}</Text>
            <Text style={styles.textDetails}>Email : {item.email}</Text>
            <View style={{flexDirection: 'row'}}>
              {Array.from({length: item.review}, (_, index) => (
                <Image
                  key={index}
                  source={require('../assets/icons/review.png')} // star icon path
                  style={styles.reviewImage}
                />
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#F5F5ED',
        alignContent: 'center',
      }}>
      <FlatList
        data={accounts}
        renderItem={({item}) => renderAccountItem({item})}
        keyExtractor={item => item.id.toString()}
        style={styles.horizontalCard}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default LocationComponents;

const styles = StyleSheet.create({
  horizontalCard: {
    alignSelf: 'left',
    marginTop: 20,
    marginRight: 10,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ColorSheet.Chit,
    margin: 7,
    paddingHorizontal: 10,
  },
  viewTouch: {
    justifyContent: 'space-between',
    marginBottom: 5,
    width: '100%',
    flexDirection: 'row',
  },
  name: {
    fontSize: getFontSize(20),
    color: '#000000',
    textAlign: 'left',
    marginBottom: 5,
    marginRight: 20,
    fontWeight: '600',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    marginTop: 10,
    // objectFit:'contain'
  },
  reviewImage: {
    width: 15,
    height: 15,
  },
  contentView: {
    margin: 10,
    textAlign: 'left',
    width: '100%',
  },
  textDetails: {
    fontSize: getFontSize(12),
    color: '#000000',
    textAlign: 'left',
    marginBottom: 5,
  },
  suggestTxtView: {
    alignSelf: 'center',
    width: wp('87%'),
    flexDirection: 'row',
    alignContent: 'space-between',
    marginTop: 10,
  },
  suggestTxt: {
    fontSize: 22,
    fontFamily: 'PlayfairDisplay-SemiBold',
    color: '#000000',
  },
  suggestIcon: {
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
  },
});
