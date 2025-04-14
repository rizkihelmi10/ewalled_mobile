import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback } from 'react-native';
import {useTheme} from '@/app/src/context/ThemeContext';
import useWallet from '@/app/src/hooks/useWallet';
import formatBalance from '../src/utils/FormatBalanceUtils';
import { useState, useEffect } from 'react';
import { useAuth } from '../src/context/AuthContext';
import axiosInstance from '../src/api/axiosinstance';
import TransferSuccessPage from '@/app/trasnsfersuccess';
import useWalletList from '../src/hooks/useWalletList';

interface Wallet {
  id: string;
  balance: number;
  accountNumber: string;
  user: {
    fullname: string;
  };
}

interface TransactionResult {
  id: number;
  walletId: number;
  transactionType: string;
  amount: number;
  category: string;
  isIncome: boolean;
  recipientWalletId: number;
  transactionDate: string;
  description: string;
}

interface User {
  id: string;
  fullname: string;
}

export default function TransferScreen() {
  const { isDarkMode } = useTheme();
  const wallet = useWallet();
  const balance = formatBalance(wallet.wallet?.balance ?? 0);
  const [amount, setAmount] = useState('0');
  const [error, setError] = useState('');
  const [recipient, setRecipient] = useState("Penerima");
  const [notes, setNotes] = useState("");
  const [showRecipientDropdown, setShowRecipientDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [category, setCategory] = useState("Select Category");
  const [transactionResult, setTransactionResult] = useState<TransactionResult | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<Wallet | null>(null);
  
  const categories = ["Food", "Shopping", "Transportation", "Bills", "Entertainment", "Others"];
  
  const {fetchWalletAgain} = useWallet();
  const {walletsList, fetchWalletsList} = useWalletList();
  const {currentUser} = useAuth();
  
  useEffect(() => {
    if (currentUser?.id) {
      fetchWalletsList();
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (amount) {
      const numAmount = parseFloat(amount.replace(/,/g, ''));
      if (numAmount > (wallet.wallet?.balance ?? 0)) {
        setError('Amount exceeds available balance');
      } else {
        setError('');
      }
    }
  }, [amount, wallet.wallet?.balance]);

  const handleRecipientSelect = (selectedWallet: Wallet) => {
    setSelectedRecipient(selectedWallet);
    setRecipient(`${selectedWallet.user.fullname} (${selectedWallet.accountNumber})`);
    setShowRecipientDropdown(false);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowCategoryDropdown(false);
  };

  const resetForm = () => {
    setAmount("");
    setRecipient("Penerima");
    setNotes("");
    setSelectedRecipient(null);
    setTransactionResult(null);
    setCategory("Select Category");
    fetchWalletAgain();
  };

  const handleTransfer = async () => {
    const amountValue = amount.replace(/\./g, "").replace(",", ".");
    const numericAmount = parseFloat(amountValue);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (!recipient || recipient === "Penerima") {
      alert("Please select a recipient");
      return;
    }

    if (!selectedRecipient) {
      alert("Please select a valid recipient");
      return;
    }

    if (category === "Select Category") {
      alert("Please select a category");
      return;
    }

    const recipientName = selectedRecipient.user.fullname;
    const recipientAccountNumber = selectedRecipient.accountNumber;

    try {
      console.log("Sending request to API...");
      const response = await axiosInstance.post(`/api/transactions`, {
        walletId: currentUser?.id,
        transactionType: "TRANSFER",
        recipientAccountNumber: recipientAccountNumber,
        category: category,
        amount: numericAmount,
        description: notes,
      });
    
      console.log("API Response received:", response);
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
      
      // Log the raw response before any JSON parsing
      console.log("Raw response data:", response.data);
      
      // Try to safely log the data
      try {
        console.log("Response data type:", typeof response.data);
        if (typeof response.data === 'object') {
          // Log individual properties
          Object.keys(response.data).forEach(key => {
            console.log(`data.${key}:`, response.data[key]);
          });
        }
      } catch (logError) {
        console.error("Error logging response data:", logError);
      }
      
      // Store the response data directly without destructuring
      const transactionData = response.data;
      
      // Create result with direct property access, with fallbacks
      setTransactionResult({
        id: transactionData && transactionData.id !== undefined ? transactionData.id : 0,
        walletId: currentUser?.id || 0,
        transactionType: "TRANSFER",
        amount: numericAmount,
        category: category,
        isIncome: false,
        recipientWalletId: parseInt(recipientAccountNumber),
        transactionDate: new Date().toISOString(),
        description: notes || "-"      
      });
      
    } catch (error: any) {
      console.error(
        "Error during transfer:",
        error.response?.data?.message,
      );
      alert(`Error: ${error?.response?.data?.message || "Unknown error occurred"}`);
    }
  };  if (transactionResult) {
    console.log("Transaction result:", transactionResult);
    return (
      <TransferSuccessPage
        transaction={{
          transactionId: transactionResult.id,
          amount: transactionResult.amount,
          fromName: currentUser?.fullname || "",
          toName: recipient,
          description: transactionResult.description
        }}
        onClose={resetForm} 
        visible={true}
      />
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: isDarkMode ? '#1F2937' : '#F9FAFB'}}>
      <View style={{
        backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
          height: '100%'
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: isDarkMode ? '#FFFFFF' : '#000000'
          }}>Transfer</Text>
        </View>
      </View>

      <View style={{backgroundColor: '#19918F', padding: 16}}>
        <Text style={{color: 'white', fontSize: 14, marginBottom: 4}}>To:</Text>
        <TouchableOpacity 
          style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}
          onPress={() => setShowRecipientDropdown(!showRecipientDropdown)}
        >
          <Text style={{color: 'white', fontSize: 16}}>
            {selectedRecipient ? `${selectedRecipient.user.fullname} (${selectedRecipient.accountNumber})` : 'Select account number'}
          </Text>
          <Text style={{color: 'white'}}>{showRecipientDropdown ? '▲' : '▼'}</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={showRecipientDropdown}
        animationType="fade"
        onRequestClose={() => setShowRecipientDropdown(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowRecipientDropdown(false)}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={{
              position: 'absolute',
              top: 160,
              left: 0,
              right: 0,
              backgroundColor: 'white',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              maxHeight: 300,
              shadowColor: "#000",
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5
            }}>
              <ScrollView>
                {walletsList && walletsList.map((wallet: Wallet | any) => (
                  <TouchableOpacity
                    key={wallet.id}
                    style={{padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f0f0'}}
                    onPress={() => handleRecipientSelect(wallet)}
                  >
                    <Text style={{color: '#333'}}>
                      {`${wallet.user.fullname} (${wallet.accountNumber})`}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={{
        backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? '#4B5563' : '#E5E7EB'
      }}>
        <Text style={{fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#9CA3AF'}}>Amount</Text>
        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 8}}>
          <Text style={{marginRight: 8, color: isDarkMode ? '#FFFFFF' : '#6B7280'}}>IDR</Text>
          <TextInput
            style={{
              fontSize: 30,
              fontWeight: '500',
              color: isDarkMode ? '#FFFFFF' : '#000000',
              flex: 1
            }}
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
          />
        </View>
        
        {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
        
        <View style={{
          height: 1,
          backgroundColor: isDarkMode ? '#4B5563' : '#E5E7EB',
          marginVertical: 12
        }} />
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Text style={{fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#9CA3AF'}}>Balance</Text>
          <Text style={{fontSize: 14, color: isDarkMode ? '#FFFFFF' : '#3B82F6'}}>{balance}</Text>
        </View>
      </View>

      <View style={{
        backgroundColor: isDarkMode ? '#374151' : '#FFFFFF',
        padding: 16
      }}>
        <Text style={{fontSize: 14, marginBottom: 4, color: isDarkMode ? '#FFFFFF' : '#9CA3AF'}}>Category</Text>
        <TouchableOpacity 
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: isDarkMode ? '#4B5563' : '#E5E7EB',
            paddingBottom: 8
          }}
          onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
        >
          <Text style={{color: isDarkMode ? '#FFFFFF' : '#4B5563'}}>{category}</Text>
          <Text style={{color: isDarkMode ? '#FFFFFF' : '#4B5563'}}>{showCategoryDropdown ? '▲' : '▼'}</Text>
        </TouchableOpacity>

        <Modal
          transparent={true}
          visible={showCategoryDropdown}
          animationType="fade"
          onRequestClose={() => setShowCategoryDropdown(false)}
        >
          <TouchableWithoutFeedback onPress={() => setShowCategoryDropdown(false)}>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <View style={{
                position: 'absolute',
                top: '40%',
                left: 16,
                right: 16,
                backgroundColor: isDarkMode ? '#374151' : 'white',
                borderRadius: 8,
                maxHeight: 300,
                shadowColor: "#000",
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5
              }}>
                <ScrollView>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={{
                        padding: 16,
                        borderBottomWidth: 1,
                        borderBottomColor: isDarkMode ? '#4B5563' : '#f0f0f0'
                      }}
                      onPress={() => handleCategorySelect(cat)}
                    >
                      <Text style={{color: isDarkMode ? '#FFFFFF' : '#333'}}>
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>

        <Text style={{fontSize: 14, marginBottom: 4, marginTop: 16, color: isDarkMode ? '#FFFFFF' : '#9CA3AF'}}>Notes</Text>
        <View style={{
          borderBottomWidth: 1,
          borderBottomColor: isDarkMode ? '#4B5563' : '#E5E7EB',
          paddingBottom: 8
        }}>
          <TextInput
            style={{color: isDarkMode ? '#FFFFFF' : '#4B5563'}}
            placeholder="Add notes (optional)"
            placeholderTextColor={isDarkMode ? '#6B7280' : '#9CA3AF'}
            value={notes}
            onChangeText={setNotes}
          />
        </View>
      </View>

      <View style={{flex: 1}} />

      <View style={{padding: 16}}>
        <TouchableOpacity 
          style={{
            backgroundColor: '#19918F',
            paddingVertical: 16,
            borderRadius: 8
          }}
          onPress={handleTransfer}
        >
          <Text style={{color: 'white', textAlign: 'center', fontWeight: '500', fontSize: 18}}>
            Transfer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}