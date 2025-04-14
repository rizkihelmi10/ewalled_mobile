import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useWallet from '../src/hooks/useWallet';


import { useAuth } from '@/app/src/context/AuthContext';
import { useColorScheme } from 'react-native';
import {
  Avatar,
  AvatarBadge,
  AvatarImage,
} from '@/components/ui/avatar';
import { useTheme } from '@/app/src/context/ThemeContext';
import formatBalance from '../src/utils/FormatBalanceUtils';

type RootStackParamList = {
  login: undefined;
  '(auth)': undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

export default function HomeScreen() {
  const [isVisible, setIsVisible] = useState(true);
 const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout, currentUser } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const {wallet} = useWallet();
  const ballance = formatBalance(wallet?.balance ?? 0);
  const account = wallet?.accountNumber ?? '';
  console.log(wallet);
  console.log(ballance);
  console.log("Account number:", account); 
  
  // const toggleDarkMode = () => {
  //   setIsDarkMode(prev => !prev);
  // };

  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logged out successfully');
      navigation.navigate('(auth)');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-20 shadow-sm`}>
        <View className="flex flex-row justify-between items-center px-4 py-2">
          <Avatar size="md" className="mt-2 border-4 border-[#19918F]">
            <AvatarImage
              source={{
                uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
              }}
            />
            <AvatarBadge />
          </Avatar>

          <View className="ml-3">
            <Text className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
              {currentUser?.fullname}
            </Text>
            <Text className="text-sm text-gray-500">Personal Account</Text>
          </View>

          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={toggleDarkMode}>
              <Ionicons
                name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
                size={28}
                color={isDarkMode ? '#ffffff' : 'orange'}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout} className="ml-4">
              <Ionicons name="log-out-outline" size={24} color="#19918F" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        <View className="px-4 py-2 items-center">
          {/* Greeting */}
          <View className="flex flex-row justify-between items-center px-4 py-2 w-full">
            <View className="flex-1 max-w-[70%]">
              <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {getGreeting()}, {currentUser?.fullname || 'User'}
              </Text>
              <Text className="text-sm mt-3 text-gray-500">
                Check all your incoming and outgoing transactions here
              </Text>
            </View>

            <Image
              className="w-20 h-20 mt-2"
              source={isDarkMode
                ? require('@/assets/images/night.png')
                : require('@/assets/images/sun.png')}
              resizeMode="contain"
            />
          </View>

          {/* Account Number */}
          <View className="mt-5 flex-row bg-[#19918F] justify-between items-center px-4 py-2 rounded-lg w-full">
            <Text className="text-white text-xl">Account No.</Text>
            <Text className="text-white text-xl text-right">{account}</Text>
          </View>

          {/* Balance Section */}
          <View className={`mt-5 flex-row ${isDarkMode ? 'bg-gray-800' : 'bg-white'} justify-between items-center px-4 py-2 rounded-lg w-[95%]`}>
            <View>
              <Text className={`text-sm ${isDarkMode ? 'text-white' : 'text-black'}`}>Balance</Text>
              <Text className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                {!isVisible ? ballance : '**********'}</Text>
            </View>

            <TouchableOpacity className="mr-28 mt-5" onPress={() => setIsVisible(!isVisible)}>
              <Ionicons
                name={isVisible ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color={isDarkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>

            <View className="flex flex-row items-center">
              <Ionicons
                className="mb-14 -ml-8 bg-[#19918F] px-2 py-2 rounded-lg"
                name="add"
                size={24}
                color="white"
              />
              <Ionicons
                className="mt-12 -ml-10 bg-[#19918F] px-2 py-2 rounded-lg"
                name="paper-plane-outline"
                size={24}
                color="white"
              />
            </View>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}