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

const TopAssistants = () => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const randomNames = [
    'Alex Johnson', 'Chris Evans', 'Jordan Brown', 'Taylor Swift', 
    'Morgan Lee', 'Jamie Foxx', 'Casey Grant', 'Robin White'
  ];
  const getRandomPersonImage = () => `https://picsum.photos/id/${Math.floor(Math.random() * 1000)}/100/100`;
  const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];

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
                "id":1,
                "name" : getRandomName(),
                "Experience" : "Bigginer",
                "Review" : "5",
                "Age" : "20",
                "sex" : "M"
            },
            {
                "id":2,
                "name" : getRandomName(),
                "Experience" : "Expert",
                "Review" : "5",
                "Age" : "20",
                "sex" : "M"
            },
            {
                "id":3,
                "name" : getRandomName(),
                "Experience" : "Intermediate",
                "Review" : "5",
                "Age" : "20",
                "sex" : "M"
            },
            {
                "id":4,
                "name" : getRandomName(),
                "Experience" : "Begineer",
                "Review" : "5",
                "Age" : "20",
                "sex" : "M"
            }
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
        <TouchableOpacity
          style={styles.viewTouch}
          onPress={() =>
           {}
          }>
          <Image
            source={{uri: getRandomPersonImage()}} // Use the random person image URL
            style={styles.image}
          />
         <Text style={styles.name}>
            {item.name.length > 15
              ? `${item.name.slice(0, 15)}...`
              : item.name}
          </Text>
          <Text style={styles.textDetails}>Check availability</Text>
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
      <View style={styles.suggestTxtView}>
        <Text style={styles.suggestTxt}>Top Personal Assistants</Text>
        <Icon
          name="chevron-right-circle-outline"
          size={25}
          color="#000000"
          style={styles.suggestIcon}
          onPress={() => {}}
        />
      </View>
      <FlatList
        data={accounts}
        horizontal
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

export default TopAssistants;

const styles = StyleSheet.create({
  horizontalCard: {
    alignSelf: 'left',
    marginTop: 20, 
    marginRight:10,

  },
  view: { 
    backgroundColor: '#ffffff',
    margin: 7,
    width: 130,
    paddingHorizontal: 10,
  },
  viewTouch: { 
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 12,
    color: '#000000',
    textAlign: 'left',
    fontFamily: 'PlayfairDisplay-Regular',
    marginBottom: 5,
  },
  image: {
    flex:1,
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
    // objectFit:'contain'
  },
  textDetails: { 
    fontSize: 10,
    color: '#18423B',
    textAlign: 'left',
    fontFamily: 'Outfit-Regular',
    textDecorationLine: 'underline',
    marginBottom: 10,
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
