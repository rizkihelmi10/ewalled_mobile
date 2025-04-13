import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import {useTheme} from '@/app/src/context/ThemeContext';
import useWallet from '@/app/src/hooks/useWallet';
import formatBalance from '../src/utils/FormatBalanceUtils';
import { useState, useEffect } from 'react';

export default function TransferScreen() {
  const { isDarkMode } = useTheme();
  const wallet = useWallet();
  const balance = formatBalance(wallet.wallet?.balance?? 0);
  const checkBalance = wallet.wallet?.balance ?? 0;
  const [amount, setAmount] = useState('0');
  const [error, setError] = useState('');

  useEffect(() => {
    const numAmount = parseFloat(amount.replace(/,/g, ''));
    if (numAmount > (wallet.wallet?.balance ?? 0)) {
      setError('Amount exceeds available balance');
    } else {
      setError('');
    }
  }, [amount, wallet.wallet?.balance]);

  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-20 shadow-sm`}>
        <View className="flex flex-row justify-between items-center align-middle content-center px-4 py-2 h-full">
          <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Transfer</Text>
        </View>
      </View>

      <View className="bg-[#19918F] p-4">
        <Text className="text-white text-sm mb-1">To:</Text>
              <TouchableOpacity className="flex flex-row items-center justify-between">
                <Text className="text-white text-base">Select account number</Text>
                <Text className="text-white">▼</Text>
              </TouchableOpacity>
      </View>

      <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <Text className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Amount</Text>
        <View className="flex-row items-center mt-2">
          <Text className={`mr-2 ${isDarkMode ? 'text-white' : 'text-gray-500'}`}>IDR</Text>
          <TextInput
            className={`text-3xl font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        {error && <Text style={{color: 'red'}}>{error}</Text>}
        
        <View className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} my-3`} />
        
        <View className="flex-row justify-between items-center">
          <Text className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Balance</Text>
          <Text className={`text-sm ${isDarkMode ? 'text-white' : 'text-blue-500'}`}>{balance}</Text>
        </View>
      </View>

      <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4`}>
        <Text className={`text-sm mb-1 ${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Notes</Text>
        <View className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pb-2`}>
          <TextInput
            className={`${isDarkMode ? 'text-white' : 'text-gray-700'}`}
            placeholder="Add notes (optional)"
            placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
          />
        </View>
      </View>

      <View className="flex-1" />

      <View className="p-4">
        <TouchableOpacity className="bg-[#19918F] py-4 rounded-lg">
          <Text className="text-white text-center font-medium text-lg">Transfer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}