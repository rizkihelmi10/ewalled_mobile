import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DoughnutChart from '@/components/DoughnutChart';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableData,
} from "@/components/ui/table";
import { useTheme } from '@/app/src/context/ThemeContext';
import useTransactions from '@/app/src/hooks/useTransaction';
import {
  groupTransactionsByExpenseAndCategory,
  groupTransactionsByIncomeAndCategory,
} from '../src/utils/groupTransactionsByIncomeAndCategory';

interface DisplayTransaction {
  date: string;
  amount: number;
  category?: string;
  isIncome: boolean;
  transactionType?: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
  }[];
}

interface TabButtonsProps {
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

const AnalyticsScreen = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("Income");
  const { transactions } = useTransactions();

  const expenseCategories: ChartData = groupTransactionsByExpenseAndCategory(transactions || []);
  const incomeCategories: ChartData = groupTransactionsByIncomeAndCategory(transactions || []);

  const transformToDoughnutData = (chartData: ChartData) => ({
    data: chartData.datasets[0].data,
    colors: chartData.datasets[0].backgroundColor,
    labels: chartData.labels
  });

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  };

  return (
    <ScrollView className={`flex-1 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <View className="p-5 space-y-5">
        <View className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm">
          <View className="flex flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-semibold dark:text-white">Analytics Overview</Text>
            <TabButtons setActiveTab={setActiveTab} activeTab={activeTab} />
          </View>

          <Text className="text-lg mb-2 dark:text-white">
            {activeTab === "Income" ? "Your Total Income" : "Your Total Expense"}
          </Text>
          <DoughnutChart categories={transformToDoughnutData(
            activeTab === "Income" ? incomeCategories : expenseCategories
          )} />
        </View>

        <View className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-sm">
          <Text className="text-xl font-semibold mb-3 dark:text-white">Transaction History</Text>

          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 dark:bg-gray-700">
                <TableHead className="text-gray-700 dark:text-gray-200">Date</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200">Type</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200">Amount</TableHead>
                <TableHead className="text-gray-700 dark:text-gray-200">Category</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions && transactions.length > 0 ? (
                transactions.map((transaction: DisplayTransaction, index: number) => (
                  <TableRow key={index} className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'}`}>
                    <TableData className="text-gray-800 dark:text-gray-200">
                      {formatDate(transaction.date)}
                    </TableData>
                    <TableData className="text-gray-600 dark:text-gray-300 capitalize">
                      {transaction.transactionType || "N/A"}
                    </TableData>
                    <TableData className={transaction.isIncome ? 'text-green-500' : 'text-red-500'}>
                      {transaction.isIncome ? '+' : '-'}${transaction.amount.toLocaleString()}
                    </TableData>
                    <TableData className="text-gray-800 dark:text-gray-200">
                      {transaction.category || 'Others'}
                    </TableData>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableData className="text-center text-gray-500 py-5">
                    No transactions found.
                  </TableData>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </View>
      </View>
    </ScrollView>
  );
};

const TabButtons: React.FC<TabButtonsProps> = ({ setActiveTab, activeTab }) => {
  const tabList = ["Income", "Expense"];

  return (
    <View className="flex-row bg-gray-100 dark:bg-gray-700 p-1 rounded-xl">
      {tabList.map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => setActiveTab(tab)}
          className={`px-6 py-2.5 rounded-lg transition duration-200 ${
            activeTab === tab
              ? "bg-blue-600 shadow-lg shadow-blue-500/50"
              : "bg-blue-600"
          }`}
        >
          <Text
            className={`text-sm font-semibold ${
              activeTab === tab
                ? "text-black"
                : "text-gray-600 dark:text-gray-300"
            }`}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default AnalyticsScreen;