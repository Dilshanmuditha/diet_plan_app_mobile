// import React, { useEffect, useRef, useState } from 'react';
// import { StyleSheet, View, Text, TouchableOpacity, Platform,Image } from 'react-native';
// import { Camera, useCameraDevice,  useCameraDevices } from 'react-native-vision-camera';
// import { styles } from './styles';

// const CameraComponent = () => {
//   const REAL_WORLD_DISTANCE = 1.7;
//   const KNOWN_PIXEL_DISTANCE = 500;

//   const [hasPermission, setHasPermission] = useState(false);
//   const [cameraPosition, setCameraPosition] = useState('back');
//   const [imageSource, setImageSource] = useState();
//   const device = useCameraDevice(cameraPosition);
//   const cameraRef = useRef(null);
//   const [showCamera, setShowCamera] = useState(true);
  
//   // const device = devices.cameraPosition;

//   // useEffect(() => {
//   //   console.log('Available devices:', device);
//   // }, [device]);

//   useEffect(() => {
//     const checkPermissions = async () => {
//       try {
//         const cameraPermission = await Camera.requestCameraPermission();
//         const microphonePermission =
//           Platform.OS === 'android'
//             ? await Camera.requestMicrophonePermission()
//             : 'authorized';

//         if (
//           cameraPermission === 'authorized' &&
//           microphonePermission === 'authorized'
//         ) {
//           setHasPermission(true);
//         } else {
//           setHasPermission(false);
//         }
//       } catch (error) {
//         console.error('Error checking permissions:', error);
//         setHasPermission(false);
//       }
//     };

//     checkPermissions();
//   }, []);

//   const takePicture = async (imagePath) => {
//     if (imagePath) {
//       try {
//         // const photo = await cameraRef.current.takePhoto({
//         //   quality: 0.5,
//         //   skipMetadata: true,
//         // });
    
//         console.log("image",imagePath)
//         const formData = new FormData();
//         formData.append('image', {
//           uri: imagePath,
//           type: 'image/jpeg',
//           name: 'photo.jpg',
//         });
    
//         fetch('http://127.0.0.1:5000/estimate_height', {
//           method: 'POST',
//           body: formData,
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         })
//         .then(response => response.json())
//         .then(responseJson => {
//           console.log('Estimated Height:', responseJson.estimated_height);
//           // Display the height to the user
//         })
//         .catch(error => {
//           console.error('Error:', error);
//         });
//       } catch (error) {
//         console.error('Error taking picture:', error);
//       }
//     }
//   };
//   const capturePhoto = async () => {
//     if (cameraRef.current !== null) {
//       const photo = await cameraRef.current.takePhoto({});
//       setImageSource(photo.path);
//       setShowCamera(false);
//       console.log(photo.path);
//     }
//   };
//   if (!device) {
//     return <Text>No camera available</Text>;
//   }

//   return (
//     // <View style={styles.container}>
//     //   <Camera
//     //     ref={cameraRef}
//     //     style={styles.camera}
//     //     device={device}  // Make sure the device is defined
//     //     isActive={true}
//     //     photo={true}
//     //   >
//     //     <Text>sasd</Text>
//     //   </Camera>
//     //   <View style={styles.overlayContainer}>
//     //     <View style={styles.line} />
//     //     <View style={styles.line} />
//     //   </View>
//     //   <View style={styles.overlay}>
//     //     <Text style={styles.overlayText}>Align with the Lines</Text>
//     //   </View>
//     //   <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
//     //     <Text style={styles.captureText}>Take</Text>
//     //   </TouchableOpacity>
//     // </View>
//     <View style={styles.container}>
//       {showCamera ? (
//         <>
//           <Camera
//             ref={cameraRef}
//             style={StyleSheet.absoluteFill}
//             device={device}
//             isActive={true}
//             photo={true}
//           />

//           <View style={styles.buttonContainer}>
//             {/* <View style={styles.overlayContainer}>
              
//             </View> */}
//             <View style={styles.line} />
//             <View style={styles.line} />
//             {/* <View style={styles.overlay}>
//               <Text style={styles.overlayText}>Align with the Lines</Text>
//             </View> */}
//             <TouchableOpacity
//               style={styles.camButton}
//               onPress={() => capturePhoto()}
//             />
//           </View>
//         </>
//       ) : (
//         <>
//           {imageSource !== '' ? (
//             <Image
//               style={styles.image}
//               source={{
//                 uri: `file://'${imageSource}`,
//               }}
//             />
//           ) : null}

//           <View style={styles.backButton}>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: 'rgba(0,0,0,0.2)',
//                 padding: 10,
//                 justifyContent: 'center',
//                 alignItems: 'center',
//                 borderRadius: 10,
//                 borderWidth: 2,
//                 borderColor: '#fff',
//                 width: 100,
//               }}
//               onPress={() => setShowCamera(true)}>
//               <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
//             </TouchableOpacity>
//           </View>
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttons}>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#fff',
//                   padding: 10,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 10,
//                   borderWidth: 2,
//                   borderColor: '#77c3ec',
//                 }}
//                 onPress={() => setShowCamera(true)}>
//                 <Text style={{color: '#77c3ec', fontWeight: '500'}}>
//                   Retake
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#77c3ec',
//                   padding: 10,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   borderRadius: 10,
//                   borderWidth: 2,
//                   borderColor: 'white',
//                 }}
//                 onPress={() => takePicture(imageSource)}>
//                 <Text style={{color: 'white', fontWeight: '500'}}>
//                   Use Photo
//                 </Text>
               
//               </TouchableOpacity>
//             </View>
//           </View>
//         </>
//       )}
//     </View>
//   );
// };

// export default CameraComponent;
