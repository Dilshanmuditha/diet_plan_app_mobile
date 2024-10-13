import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [
            require('../assets/images/welcomeOne.jpg'),
            require('../assets/images/welcomeOne.jpg'),
            require('../assets/images/welcomeOne.jpg')
          ];
        //   console.log('Banners:', data);  // Log banners
          setBanners(data);
        
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.carouselContainer}>
      {/* <SliderBox
        images={banners}
        dotColor="#4B696D"
        inactiveDotColor="#C2D1D9"
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        ImageComponentStyle={styles.image}
        autoplay
        circleLoop
        autoplayInterval={3000}  
      />  */}
       <Image
      source={require('../assets/images/welcomeOne.jpg')}
      style={styles.image}
    />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop:20,
  },
  dotStyle: {
    bottom: -30,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: -5
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#90A4AE',
    marginRight: -5
  },
  image: {
    width: wp('95%'),
    height: hp('18%'),
    borderRadius: 10
  },
});
