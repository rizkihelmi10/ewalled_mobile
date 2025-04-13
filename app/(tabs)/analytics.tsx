import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  DoughnutChart  from '@/components/DoughnutChart' 
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableData,
} from "@/components/ui/table";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

const AnalyticsScreen = () => {
  const categories = {
    data: [100, 200, 300, 400],
    colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      <DoughnutChart categories={categories} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData>2023-01-01</TableData>
            <TableData>$100</TableData>
            <TableData>Food</TableData>
          </TableRow>
          <TableRow>
            <TableData>2023-01-02</TableData>
            <TableData>$200</TableData>
            <TableData>Shopping</TableData>
          </TableRow>
          <TableRow>
            <TableData>2023-01-03</TableData>
            <TableData>$300</TableData>
            <TableData>
              <Table className="w-full mt-5">
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction History</TableHead>
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
                    <TableRow key={index}>
                      <TableData>
                        <Text>{txn.name} - {txn.type}{'\n'}{txn.date}</Text>
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