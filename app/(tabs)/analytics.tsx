import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DoughnutChart from '@/components/DoughnutChart'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table";
import { useTheme } from '@/app/src/context/ThemeContext';

const AnalyticsScreen = () => {
  const { isDarkMode } = useTheme();
  const categories = {
    data: [100, 200, 300, 400],
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
  };
  return (
    <View className={`flex-1 p-5 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Text className={`text-2xl font-bold mb-5 ${isDarkMode ? 'text-white' : 'text-black'}`}>Analytics</Text>
      <DoughnutChart categories={categories} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={isDarkMode ? 'text-white' : 'text-black'}>Date</TableHead>
            <TableHead className={isDarkMode ? 'text-white' : 'text-black'}>Amount</TableHead>
            <TableHead className={isDarkMode ? 'text-white' : 'text-black'}>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
            <TableData className={isDarkMode ? 'text-white' : 'text-black'}>2023-01-01</TableData>
            <TableData className={isDarkMode ? 'text-white' : 'text-black'}>$100</TableData>
            <TableData className={isDarkMode ? 'text-white' : 'text-black'}>Food</TableData>
          </TableRow>
          <TableRow className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
            <TableData className={isDarkMode ? 'text-white' : 'text-black'}>2023-01-02</TableData>
            <TableData className={isDarkMode ? 'text-white' : 'text-black'}>$200</TableData>
            <TableData className={isDarkMode ? 'text-white' : 'text-black'}>Shopping</TableData>
          </TableRow>
          <TableRow className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
            <TableData className={isDarkMode ? 'text-white' : 'text-black'}>2023-01-03</TableData>
            <TableData className={isDarkMode ? 'text-white' : 'text-black'}>$300</TableData>
            <TableData>
              <Table className="w-full mt-5">
                <TableHeader>
                  <TableRow>
                    <TableHead className={isDarkMode ? 'text-white' : 'text-black'}>Transaction History</TableHead>
                    <TableHead />
                    <TableHead />
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'Adityo Gizwanda', type: 'Transfer', date: '08 December 2024', amount: '-75.000,00', color: 'text-red-500' },
                    { name: 'Adityo Gizwanda', type: 'Transfer', date: '08 December 2024', amount: '+75.000,00', color: 'text-green-500' },
                    { name: 'Adityo Gizwanda', type: 'Transfer', date: '08 December 2024', amount: '-75.000,00', color: 'text-red-500' },
                    { name: 'Adityo Gizwanda', type: 'Transfer', date: '08 December 2024', amount: '-75.000,00', color: 'text-red-500' },
                  ].map((txn, index) => (
                    <TableRow key={index} className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
                      <TableData>
                        <Text className={isDarkMode ? 'text-white' : 'text-black'}>{txn.name} - {txn.type}{'\n'}{txn.date}</Text>
                      </TableData>
                      <TableData />
                      <TableData className={txn.color}>{txn.amount}</TableData>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter />
              </Table>
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  );
};

export default AnalyticsScreen;