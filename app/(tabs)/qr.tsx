// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Camera, CameraView } from 'expo-camera';
// import QRCode from 'react-native-qrcode-svg';

// const QRCodeScanner = () => {
//   const [scanMode, setScanMode] = useState(true);
//   const [scannedData, setScannedData] = useState('');
//   const [userQRData] = useState('user-id-12345');
//   const [hasPermission, setHasPermission] = useState<boolean | null>(null);

//   useEffect(() => {
//     const getCameraPermissions = async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === 'granted');
//     };

//     getCameraPermissions();
//   }, []);

//   const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
//     setScannedData(data);
//   };

//   const toggleMode = () => {
//     setScanMode(!scanMode);
//     setScannedData('');
//   };

//   if (hasPermission === null) {
//     return <Text>Requesting for camera permission</Text>;
//   }
//   if (hasPermission === false) {
//     return <Text>No access to camera</Text>;
//   }

//   return (
//     <View className="flex-1 items-center justify-center p-5 bg-gray-100">
//       <Text className="text-2xl font-bold mb-5">
//         QR Code {scanMode ? 'Scanner' : 'Display'}
//       </Text>

//       {scanMode ? (
//         <View className="w-full aspect-square mb-5 items-center justify-center bg-white rounded-xl overflow-hidden">
//           <CameraView
//             onBarcodeScanned={scannedData ? undefined : handleBarCodeScanned}
//             style={{ width: '100%', height: '100%' }}
//             barcodeScannerSettings={{
//               barCodeTypes: ['qr'],
//             }}
//           />

//           {scannedData !== '' && (
//             <View className="p-4 bg-white rounded-xl mt-5 w-full">
//               <Text className="text-lg">Scanned Data: {scannedData}</Text>
//             </View>
//           )}
//         </View>
//       ) : (
//         <View className="items-center mb-5 p-5 bg-white rounded-xl">
//           <QRCode
//             value={userQRData}
//             size={200}
//             color="black"
//             backgroundColor="white"
//           />
//           <Text className="mt-3 text-lg">Your Personal QR Code</Text>
//         </View>
//       )}

//       <TouchableOpacity
//         className="w-full bg-blue-500 p-4 rounded-xl items-center"
//         onPress={toggleMode}
//       >
//         <Text className="text-white text-lg font-bold">
//           {scanMode ? 'Show My QR Code' : 'Scan QR Code'}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };
// export default QRCodeScanner;