// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Text, Platform } from 'react-native';
// import { Camera, useCameraDevice, useFrameProcessor } from 'react-native-vision-camera';
// import { runOnJS } from 'react-native-reanimated';
// import * as poseDetection from '@tensorflow-models/pose-detection';
// import '@tensorflow/tfjs-backend-cpu';
// import '@tensorflow/tfjs-backend-webgl';

// const HeightDetect = () => {
//   const [hasPermission, setHasPermission] = useState(false);
//   const [cameraPosition, setCameraPosition] = useState('back');
//   const device = useCameraDevice(cameraPosition);
//   const [height, setHeight] = useState(null);

//   const convertPixelsToHeight = (pixelHeight) => {
//     const conversionFactor = 0.1;
//     return pixelHeight * conversionFactor;
//   };

//   const calculateHeight = (landmarks) => {
//     'worklet';
//     const head = landmarks.find((lm) => lm.part === 'nose');
//     const feet = landmarks.find((lm) => lm.part === 'left_ankle' || lm.part === 'right_ankle');
//     if (head && feet) {
//       const pixelHeight = Math.abs(head.y - feet.y);
//       return convertPixelsToHeight(pixelHeight);
//     }
//     return 0;
//   };

//   // const detectPose = async (frame) => {
//   //   'worklet';
//   //   const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);
//   //   const poses = await detector.estimatePoses(frame);
//   //   return poses;
//   // };

//   // const frameProcessor = useFrameProcessor((frame) => {
//   //   // 'worklet'
//   //   // console.log(`Frame: ${frame.width}x${frame.height} (${frame.pixelFormat})`);
//   //   detectPose(frame)
//   //     .then((poses) => {
//   //       if (poses.length > 0) {
//   //         const height = calculateHeight(poses[0].keypoints);
//   //         runOnJS(setHeight)(height);
//   //       }
//   //     })
//   //     .catch((error) => {
//   //       console.error('Pose detection failed:', error);
//   //     });
//   // }, []);

//   useEffect(() => {
//     const checkPermissions = async () => {
//       try {
//         const cameraPermission = await Camera.requestCameraPermission();
//         const microphonePermission = Platform.OS === 'android'
//           ? await Camera.requestMicrophonePermission()
//           : 'authorized';

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

//   if (!device) {
//     return <Text>No camera available</Text>;
//   }

//   // if (!hasPermission) {
//   //   return <Text>No camera permissions</Text>;
//   // }

//   return (
//     <View style={StyleSheet.absoluteFill}>
//       <Camera
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         // frameProcessor={frameProcessor}
//         // frameProcessorFps={1} // Limit FPS to avoid performance issues
//       />
//       {height && <Text style={styles.heightText}>Height: {height.toFixed(2)} cm</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   heightText: {
//     color: 'white',
//     fontSize: 20,
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//   },
// });

// export default HeightDetect;
