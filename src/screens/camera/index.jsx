import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { styles } from './styles';

const CameraComponent = () => {
  const REAL_WORLD_DISTANCE = 1.7;
  const KNOWN_PIXEL_DISTANCE = 500;

  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    const checkPermissions = async () => {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = Platform.OS === 'android' ? await Camera.requestMicrophonePermission() : 'authorized';
  
      if (cameraPermission === 'authorized' && microphonePermission === 'authorized') {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    };
  
    checkPermissions();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current && hasPermission) {
      try {
        const photo = await cameraRef.current.takePhoto({
          quality: 0.5,
          skipMetadata: true,
        });
    
        const formData = new FormData();
        formData.append('image', {
          uri: photo.path,
          type: 'image/jpeg',
          name: 'photo.jpg',
        });
    
        fetch('http://127.0.0.1:5000/estimate_height', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => response.json())
        .then(responseJson => {
          console.log('Estimated Height:', responseJson.estimated_height);
          // Display the height to the user
        })
        .catch(error => {
          console.error('Error:', error);
        });
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (!device) {
    return <Text>Loading camera...</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive={true}
        photo
      >
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Align with the Lines</Text>
        </View>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.captureText}>Capture</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

export default CameraComponent;
