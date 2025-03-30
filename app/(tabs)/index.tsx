import { Image, StyleSheet, Platform, View, Text, TouchableOpacity } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Login from '../(auth)/login';
import Register from '../(auth)/register';
import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
} from '@/components/ui/avatar';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table"

export default function HomeScreen() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View className="flex-1 bg-gray-50">
     
      <View className="bg-white object-position:top h-20 shadow-sm">
        <View className="flex flex-row justify-between items-center px-4 py-2">
          <Avatar size="md" className="items-center mt-2 border-4 border-blue-500">
            <AvatarImage
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            />
            <AvatarBadge />
          </Avatar>
          <View className="ml-3 mt-0">
            <Text className="text-sm font-bold">Chelsea Immanuella</Text>
            <Text className="text-sm text-gray-500">Personal Account</Text>
          </View>
          <Ionicons name="sunny-outline" size={40} color="orange" className="mt-0 ml-32" />
        </View>
      </View>

      
      <ScrollView>
        <View className="flex flex-column space-between items-center px-4 py-2">
       
          <View className="flex flex-row justify-between items-center px-4 py-2">
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

         
          <View className="mt-5 flex flex-row bg-blue-500 justify-between items-center px-4 py-2 max-w-[95%] rounded-lg w-full">
            <Text className="text-white text-xl font-normal">Account No.</Text>
            <Text className="text-white text-xl font-normal text-right">100899</Text>
          </View>

         
          <View className="mt-5 flex flex-row bg-white  max-h-[50%] justify-between items-center px-4 py-2 max-w-[95%] rounded-lg w-full">
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
          <Table className="w-full mt-5 white-space-nowrap">
      <TableHeader>
        <TableRow className="white-space-nowrap">
          <TableHead className="white-space-nowrap">Transaction History</TableHead>
          <TableHead></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="white-space-nowrap">
          <TableData>Adityo Gizwanda 
            Transfer <br/> 
            08 December 2024
          </TableData>
          <TableData></TableData>
          <TableData className="white-space-nowrap">-75.000,00</TableData>
        </TableRow>
        <TableRow>
        <TableData>Adityo Gizwanda 
            Transfer <br/> 
            08 December 2024
          </TableData>
          <TableData></TableData>
          <TableData className="text-green-500">+75.000,00</TableData>
        </TableRow>
        <TableRow>
        <TableData>Adityo Gizwanda 
            Transfer <br/> 
            08 December 2024
          </TableData>
          <TableData></TableData>
          <TableData>-75.000,00</TableData>
        </TableRow>
        <TableRow>
        <TableData>Adityo Gizwanda 
            Transfer <br/> 
            08 December 2024
          </TableData>
          <TableData></TableData>
          <TableData>-75.000,00</TableData>
        </TableRow>
       
      </TableBody>
      <TableFooter>
       
      </TableFooter>
    </Table>          

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
