import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function TransferScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <View className="bg-white h-20 shadow-sm">
        <View className="flex flex-row justify-between items-center align-middle content-center px-4 py-2 h-full">
          <Text className="text-xl font-bold">Transfer</Text>
        </View>
      </View>

      <View className="bg-blue-500 p-4">
        <Text className="text-white text-sm mb-1">To:</Text>
        <Text className="text-white text-base">9000008940208</Text>
      </View>

      <View className="bg-white p-4 border-b border-gray-200">
        <Text className="text-gray-400 text-sm">Amount</Text>
        <View className="flex-row items-center mt-2">
          <Text className="text-gray-500 mr-2">IDR</Text>
          <TextInput
            className="text-3xl font-medium"
            keyboardType="numeric"
            defaultValue="100.000"
          />
        </View>
        
        <View className="h-px bg-gray-200 my-3" />
        
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-400 text-sm">Balance</Text>
          <Text className="text-blue-500 text-sm">IDR 10.000.000</Text>
        </View>
      </View>

      <View className="bg-white p-4">
        <Text className="text-gray-400 text-sm mb-1">Notes</Text>
        <View className="border-b border-gray-200 pb-2">
          <TextInput
            className="text-gray-700"
            placeholder="Add notes (optional)"
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View className="flex-1" />

      <View className="p-4">
        <TouchableOpacity className="bg-blue-500 py-4 rounded-lg">
          <Text className="text-white text-center font-medium text-lg">Transfer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}