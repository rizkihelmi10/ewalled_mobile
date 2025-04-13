import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useTheme } from '../src/context/ThemeContext';

export default function TopUpScreen() {
  const { isDarkMode } = useTheme();
  return (
    <View className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      
      <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} h-20 shadow-sm`}>
        <View className="flex flex-row justify-between items-center align-middle content-center px-4 py-2 h-full">
          <Text className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Top Up</Text>
        </View>
      </View>

      
      <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <Text className={`text-sm ${isDarkMode ? 'text-white' : 'text-gray-400'}`}>Amount</Text>
        <View className="flex-row items-center mt-2">
          <Text className={`${isDarkMode ? 'text-white' : 'text-gray-500'} mr-2`}>IDR</Text>
          <TextInput
            className={`text-3xl font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}
            keyboardType="numeric"
            defaultValue="0"
          />
        </View>
        <View className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mt-3`} />
      </View>

      
      <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <View className="flex-row justify-between items-center">
          <Text className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>BYOND Pay</Text>
          <Ionicons name="chevron-down" size={24} color={isDarkMode ? 'white' : 'black'} />
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
          <Text className="text-white text-center font-medium text-lg">Top Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}