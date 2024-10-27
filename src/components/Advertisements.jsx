import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  RefreshControl,
  SafeAreaView,
  Modal,
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

const Advertisement = () => {
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [selectedImage, setSelectedImage] = useState(null); // New state for modal
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility

  const randomNames = [
    'Power House', 'Fitness Guider', 'Power Fitness', 'Healthy life style', 
    'Panadura Power', 'Nutrition House'
  ];
  const imgdata = [
    require('../assets/images/gymAd1.png'),
    require('../assets/images/gymAd2.png'),
    require('../assets/images/gymAd3.png'),
    require('../assets/images/gymAd4.png'),
    require('../assets/images/gymAd5.png'),
  ];
 const getRandomName = () => randomNames[Math.floor(Math.random() * randomNames.length)];
 const getRandomImage = () => imgdata[Math.floor(Math.random() * imgdata.length)];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = Array.from({length: 8}, (_, i) => ({
            id: i + 1,
            name: getRandomName(),
            date: '2024-10-11 : 12:00',
            image: getRandomImage(),
          }));
        setAccounts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const openImagePreview = (image) => {
    setSelectedImage(image);
    setIsModalVisible(true);
  };

  const closeImagePreview = () => {
    setIsModalVisible(false);
    setSelectedImage(null);
  };
  const renderAccountItem = ({item}) => {
    return (
      <View style={styles.view}>
        <TouchableOpacity style={styles.viewTouch} onPress={() => openImagePreview(item.image)}>
        
          <View style={styles.contentView}>
            <View style={{}}>
              <Text style={styles.name}>
                {item.name.length > 20
                  ? `${item.name.slice(0, 17)}...`
                  : item.name}
              </Text>
              <Text style={styles.date}>
                {item.date}
              </Text>
            </View>
            <Image
              source={item.image}
              style={styles.image}
            />
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
      <View style={styles.suggestTxtView}>
        
      </View>
      <FlatList
        data={accounts}
        renderItem={({item}) => renderAccountItem({item})}
        keyExtractor={item => item.id.toString()}
        style={styles.horizontalCard}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
      <Modal
        visible={isModalVisible}
        transparent={true}
        onRequestClose={closeImagePreview}
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity style={styles.closeButton} onPress={closeImagePreview}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={selectedImage} style={styles.fullImage} />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Advertisement;

const styles = StyleSheet.create({
  horizontalCard: {
    alignSelf: 'left',
    marginTop: 10,
    marginRight: 10,
  },
  view: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ColorSheet.Chit,
    margin: 7,
    paddingHorizontal: 5,
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
    fontFamily: 'PlayfairDisplay-Regular',
    marginBottom: 5,
    marginRight:20
  },
  date: {
    fontSize: getFontSize(12),
    color: '#000000',
    textAlign: 'left',
    fontFamily: 'PlayfairDisplay-Regular',
    // marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 5,
    marginTop: 5,
    // objectFit:'contain'
  },
  contentView: {
    margin: 5,
    textAlign: 'left',
    width: '100%',
  },
  textDetails: {
    fontSize: getFontSize(12),
    color: '#18423B',
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
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#000',
    fontSize: 16,
  },
});
