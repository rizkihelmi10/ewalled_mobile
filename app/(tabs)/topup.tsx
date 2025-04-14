import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useTheme } from '../src/context/ThemeContext';
import axiosInstance from '../src/api/axiosinstance';
import {useAuth } from '../src/context/AuthContext';
import useWallet from '../src/hooks/useWallet';
import TopupSuccessPage from '../topupsuccess';

export default function TopUpScreen() {
  const { isDarkMode } = useTheme();
  const [amount, setAmount] = useState("");
    const [recipient, setRecipient] = useState("Pilih Metode"); // Default text
    const [notes, setNotes] = useState("");
    const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(
        !!localStorage.getItem("token"),
    );
    const [transactionResult, setTransactionResult] = useState(null);
    const [selectedRecipient, setSelectedRecipient] = useState(null);

    const { currentUser } = useAuth();
    const { fetchWalletAgain, wallet } = useWallet();

    const paymentMethods = [
      { id: 1, name: "Byond Pay" },
      { id: 2, name: "Sup Pay" },
      { id: 3, name: "Gu Pay" },
  ];

  const handleRecipientSelect = (method: any) => {
    setSelectedRecipient(method);
    setRecipient(method.name);
    setShowRecipientDropdown(false);
    setNotes("Top Up from " + method.name);
};

const resetForm = () => {
  setAmount("");
  setRecipient("Penerima");
  setNotes("");
  setSelectedRecipient(null);
  setTransactionResult(null);
  fetchWalletAgain();
};
const handleAmountChange = (text: string) => {
  if (!/^\d*$/.test(text)) {
    // If non-numeric characters are found, only keep the numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    setAmount(numericValue);
    return;
  }
  
  const numValue = parseInt(text);
  if (numValue > 1000) {
    return;
  }
  
  setAmount(text);
};

const handleTopup = async () => {
  const amountValue = amount.replace(/\./g, "").replace(",", ".");
  const numericAmount = parseFloat(amountValue);

  // Validasi amount
  if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Masukkan jumlah top-up yang valid");
      return;
  }

  // Validasi metode pembayaran
  if (!selectedRecipient) {
      alert("Pilih metode pembayaran terlebih dahulu");
      return;
  }

  try {
      const token = localStorage.getItem("token");
      if (!token) {
          setIsAuthenticated(false);
          return;
      }

      // Pastikan currentUser dan ID-nya ada
      if (!currentUser?.id) {
          alert("Pengguna tidak valid. Silakan login ulang.");
          return;
      }

      // Kirim permintaan top-up ke backend
      const response = await axiosInstance.post(`/api/transactions`, {
        walletId: currentUser?.id,
        transactionType: "TOP_UP",
        recipientAccountNumber: (selectedRecipient as { name: string })?.name || "",
        category: "topUp",
        amount: numericAmount,
        description: notes,
        isIncome: false,
      });
      const transactionData = response.data;

      // Tampilkan hasil transaksi sukses
      setTransactionResult({
          id: `${Date.now()}${Math.floor(
              Math.random() * 10000,
          )}`.substring(0, 14), 
          amount: numericAmount, 
          paymentMethod: (selectedRecipient as { name: string })?.name || "", 
          description: notes || "Topup", 
          success: true, 
      } as any);
  } catch (error) {
      console.error("Error selama top-up:", error);
      alert("Top-up gagal");
  }
};if (transactionResult) {
  return (
      <TopupSuccessPage
          transaction={transactionResult}
          onClose={resetForm}
          visible={true}
      />
  );
}



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
            value={amount}
            onChangeText={handleAmountChange}
            defaultValue="0"
          />
        </View>
        <View className={`h-px ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mt-3`} />
      </View>

      
      <View className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <TouchableOpacity 
          onPress={() => setShowRecipientDropdown(!showRecipientDropdown)}
          className="flex-row justify-between items-center">
          <Text className={`font-medium ${isDarkMode ? 'text-white' : 'text-black'}`}>
            {recipient}
          </Text>
          <Ionicons 
            name={showRecipientDropdown ? "chevron-up" : "chevron-down"} 
            size={24} 
            color={isDarkMode ? 'white' : 'black'} 
          />
        </TouchableOpacity>
        {showRecipientDropdown && (
          <View className={`mt-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-md`}>
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                onPress={() => handleRecipientSelect(method)}
                className={`p-3 border-b ${isDarkMode ? 'border-gray-600' : 'border-gray-200'}`}
              >
                <Text className={isDarkMode ? 'text-white' : 'text-black'}>
                  {method.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
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
        <TouchableOpacity 
          onPress={handleTopup}
          className="bg-[#19918F] py-4 rounded-lg">
          <Text className="text-white text-center font-medium text-lg">Top Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}