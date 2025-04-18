import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import DoughnutChart from '@/components/DoughnutChart';
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
  recipientName?: string;
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
      day: '2-digit', month: 'long', year: 'numeric'
    });
  };

  const formatAmount = (amount: number) => {
    return amount.toLocaleString('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
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

          <View className="space-y-4">
            {transactions && transactions.length > 0 ? (
              transactions.map((transaction: DisplayTransaction, index: number) => (
                <View 
                  key={index} 
                  className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                >
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className={`font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                        {transaction.recipientName || 'N/A'}
                      </Text>
                      <Text className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {transaction.transactionType || "N/A"}
                      </Text>
                    </View>
                    <Text className={transaction.isIncome ? 'text-green-500' : 'text-red-500'}>
                      {transaction.isIncome ? '+' : '-'}{formatAmount(transaction.amount)}
                    </Text>
                  </View>
                  <Text className={`text-xs mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {formatDate(transaction.date)}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-center text-gray-500 py-5">
                No transactions found.
              </Text>
            )}
          </View>
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