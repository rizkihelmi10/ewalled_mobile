import { Image, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Avatar, AvatarBadge, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table";

export default function HomeScreen() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Top Bar */}
      <View className="bg-white h-20 shadow-sm">
        <View className="flex flex-row justify-between items-center px-4 py-2">
          <Avatar size="md" className="items-center mt-2 border-4 border-blue-500">
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",
              }}
            />
            <AvatarBadge />
          </Avatar>
          <View className="ml-3 mt-0">
            <Text className="text-sm font-bold">Chelsea Immanuella</Text>
            <Text className="text-sm text-gray-500">Personal Account</Text>
          </View>
          <Ionicons name="sunny-outline" size={40} color="orange" />
        </View>
      </View>

      <ScrollView>
        <View className="flex flex-column items-center px-4 py-2">
          {/* Greeting */}
          <View className="flex flex-row justify-between items-center px-4 py-2 w-full">
            <View className="flex-1 max-w-[70%]">
              <Text className="text-xl font-bold">Good Morning, Chelsea</Text>
              <Text className="text-sm mt-3 text-gray-500">
                Check all your incoming and outgoing transactions here
              </Text>
            </View>
            <Image
              className="w-20 h-20 mt-2"
              source={require('@/assets/images/sun.png')}
              resizeMode="contain"
            />
          </View>

          {/* Account Info */}
          <View className="mt-5 flex flex-row bg-blue-500 justify-between items-center px-4 py-2 max-w-[95%] rounded-lg w-full">
            <Text className="text-white text-xl font-normal">Account No.</Text>
            <Text className="text-white text-xl font-normal text-right">100899</Text>
          </View>

          {/* Balance & Actions */}
          <View className="mt-5 flex flex-row bg-white justify-between items-center px-4 py-2 max-w-[95%] rounded-lg w-full">
            <View>
              <Text className="text-black text-sm font-normal">Balance</Text>
              <Text className="text-black text-2xl font-bold">
                {isVisible ? "Rp 10.000.000" : "******"}
              </Text>
            </View>

            <TouchableOpacity className="mr-28 mt-5" onPress={() => setIsVisible(!isVisible)}>
              <Ionicons name={isVisible ? "eye-outline" : "eye-off-outline"} size={24} color="black" />
            </TouchableOpacity>

            <View className="flex flex-row items-center">
              <Ionicons className="mb-14 -ml-8 bg-blue-500 px-2 py-2 rounded-lg" name="add" size={24} color="white" />
              <Ionicons className="mb-0 mt-12 -ml-10 bg-blue-500 px-2 py-2 rounded-lg" name="paper-plane-outline" size={24} color="white" />
            </View>
          </View>

          {/* Transaction Table */}
         
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
