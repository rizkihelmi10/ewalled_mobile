import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  ActivityIndicator,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  topup: undefined;
  transfer: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

type Currency = {
  code: string;
  name: string;
  country: string;
};

export default function HomeScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [amount, setAmount] = useState('1');
  const [exchangeRate, setExchangeRate] = useState(16807.8283);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFromCurrency, setShowFromCurrency] = useState(false);
  const [showToCurrency, setShowToCurrency] = useState(false);
  const [fromCurrency, setFromCurrency] = useState<Currency>({ code: 'USD', name: 'US Dollar', country: 'United States' });
  const [toCurrency, setToCurrency] = useState<Currency>({ code: 'IDR', name: 'Indonesian Rupiah', country: 'Indonesia' });
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { logout, currentUser } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const colorScheme = useColorScheme();
  const { wallet } = useWallet();
  const balance = formatBalance(wallet?.balance ?? 0);
  const account = wallet?.accountNumber ?? '';

  const currencies: Currency[] = [
    { code: 'USD', name: 'US Dollar', country: 'United States' },
    { code: 'EUR', name: 'Euro', country: 'European Union' },
    { code: 'GBP', name: 'British Pound', country: 'United Kingdom' },
    { code: 'JPY', name: 'Japanese Yen', country: 'Japan' },
    { code: 'IDR', name: 'Indonesian Rupiah', country: 'Indonesia' },
    { code: 'SGD', name: 'Singapore Dollar', country: 'Singapore' },
  ];

  const convertedAmount = (parseFloat(amount) || 0) * exchangeRate;

  useEffect(() => {
    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  const fetchExchangeRate = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.frankfurter.app/latest?from=${fromCurrency.code}&to=${toCurrency.code}`
      );
      const data = await response.json();
      if (data.rates?.[toCurrency.code]) {
        setExchangeRate(data.rates[toCurrency.code]);
      } else {
        throw new Error('Invalid exchange rate data');
      }
    } catch (err) {
      setError('Failed to fetch exchange rate');
      console.error('Exchange rate error:', err);
    } finally {
      setLoading(false);
    }
  };

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

  const CurrencyModal = ({ visible, onClose, onSelect, selectedCurrency }: {
    visible: boolean;
    onClose: () => void;
    onSelect: (currency: Currency) => void;
    selectedCurrency: Currency;
  }) => (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-end">
        <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-t-xl p-4`}>
          <Text className={`text-lg font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
            Select Currency
          </Text>
          {currencies.map((currency) => (
            <TouchableOpacity
              key={currency.code}
              onPress={() => {
                onSelect(currency);
                onClose();
              }}
              className={`p-3 border-b border-gray-200 ${
                selectedCurrency.code === currency.code ? 'bg-gray-100' : ''
              }`}
            >
              <Text className={isDarkMode ? 'text-white' : 'text-black'}>
                ({currency.code}) {currency.name} - {currency.country}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity onPress={onClose} className="mt-4">
            <Text className="text-center text-blue-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

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
                {!isVisible ? balance : '**********'}</Text>
            </View>

            <TouchableOpacity 
              className="mr-4" 
              onPress={() => setIsVisible(!isVisible)}
            >
              <Ionicons
                name={isVisible ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color={isDarkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>

            <View className="flex flex-row items-center space-x-2">
              {/* Top-up Button */}
              <TouchableOpacity 
                onPress={() => navigation.navigate('topup')}
                className="bg-[#19918F] p-2 rounded-lg"
              >
                <Ionicons
                  name="add"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              
              {/* Transfer Button */}
              <TouchableOpacity 
                onPress={() => navigation.navigate('transfer')}
                className="bg-[#19918F] p-2 rounded-lg"
              >
                <Ionicons
                  name="paper-plane-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Currency Conversion Section */}
          <View className={`mt-5 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-5 rounded-xl w-[95%] shadow-sm`}>
            <Text className={`text-lg font-bold mb-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>
              Currency Conversion
            </Text>

            {/* You Send Section */}
            <View className="mb-5">
              <Text className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>You Send</Text>
              <View className={`flex-row items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <TouchableOpacity 
                  onPress={() => setShowFromCurrency(true)}
                  className="flex-1 flex-row items-center"
                >
                  <View className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} items-center justify-center mr-3`}>
                    <Text className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {fromCurrency.code}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {fromCurrency.name}
                    </Text>
                    <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {fromCurrency.country}
                    </Text>
                  </View>
                  <Ionicons 
                    name="chevron-down" 
                    size={18} 
                    color={isDarkMode ? 'white' : 'gray'} 
                  />
                </TouchableOpacity>

                <TextInput
                  className={`${isDarkMode ? 'text-white bg-gray-600' : 'text-black bg-gray-100'} text-lg font-bold p-2 rounded-lg w-24 text-right`}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="1"
                  placeholderTextColor={isDarkMode ? '#9CA3AF' : '#6B7280'}
                />
              </View>
            </View>

            <View className="items-center my-2">
              <View className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} items-center justify-center`}>
                <Ionicons 
                  name="swap-vertical" 
                  size={20} 
                  color={isDarkMode ? '#19918F' : '#19918F'} 
                />
              </View>
            </View>

            {/* Recipient Gets Section */}
            <View className="mt-2">
              <Text className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>Recipient Gets</Text>
              <View className={`flex-row items-center justify-between p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <TouchableOpacity 
                  onPress={() => setShowToCurrency(true)}
                  className="flex-1 flex-row items-center"
                >
                  <View className={`w-8 h-8 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'} items-center justify-center mr-3`}>
                    <Text className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {toCurrency.code}
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {toCurrency.name}
                    </Text>
                    <Text className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {toCurrency.country}
                    </Text>
                  </View>
                  <Ionicons 
                    name="chevron-down" 
                    size={18} 
                    color={isDarkMode ? 'white' : 'gray'} 
                  />
                </TouchableOpacity>
                <View className={`${isDarkMode ? 'bg-gray-600' : 'bg-gray-100'} p-2 rounded-lg w-24`}>
                  <Text className={`text-lg font-bold text-right ${isDarkMode ? 'text-white' : 'text-black'}`}>
                    {loading ? (
                      <ActivityIndicator size="small" color={isDarkMode ? 'white' : 'black'} />
                    ) : (
                      convertedAmount.toFixed(2)
                    )}
                  </Text>
                </View>
              </View>
            </View>

            {error && (
              <Text className="text-red-500 text-sm mt-2">
                {error}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Currency Selection Modals */}
      <CurrencyModal
        visible={showFromCurrency}
        onClose={() => setShowFromCurrency(false)}
        onSelect={(currency: Currency) => setFromCurrency(currency)}
        selectedCurrency={fromCurrency}
      />
      <CurrencyModal
        visible={showToCurrency}
        onClose={() => setShowToCurrency(false)}
        onSelect={(currency: Currency) => setToCurrency(currency)}
        selectedCurrency={toCurrency}
      />
    </View>
  );
}