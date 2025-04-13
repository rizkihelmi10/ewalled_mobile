import React from 'react';
import { View, Text, Modal, TouchableOpacity, Platform } from 'react-native';
import { CheckCircle, Printer } from 'lucide-react-native';


type TransferSuccessPageProps = {
  transaction: {
    amount: number;
    transactionId: string;
    fromName: string;
    toName: string;
    description: string;
  };
  visible: boolean;
  onClose: () => void;
};

const TransferSuccessPage: React.FC<TransferSuccessPageProps> = ({
  transaction,
  visible,
  onClose,
}) => {
  const handlePrint = () => {
    // No native print support on mobile unless using plugins
    console.log('Print function not available on mobile.');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 w-[90%] max-w-md">
          {/* Header */}
          <View className="items-center mb-6">
            <View className="bg-green-500 rounded-full p-3 mb-3">
              <CheckCircle size={32} color="white" />
            </View>
            <Text className="text-2xl font-medium text-green-600 dark:text-green-400">
              Transfer Success
            </Text>
          </View>

          {/* Info */}
          <View className="space-y-4 mb-6">
            <InfoRow label="Amount" value={`Rp ${transaction.amount.toLocaleString('id-ID')}`} />
            <InfoRow label="Transaction Id" value={transaction.transactionId} />
            <InfoRow label="From" value={transaction.fromName} />
            <InfoRow label="To" value={transaction.toName} />
            <InfoRow label="Description" value={transaction.description} />
          </View>

          {/* Buttons */}
          <View className="flex-row justify-center space-x-4">
            <TouchableOpacity
              onPress={handlePrint}
              className="flex-row items-center px-5 py-2 border border-blue-500 rounded-lg"
            >
              <Printer size={16} color="#3b82f6" className="mr-2" />
              <Text className="text-blue-500">Print</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
              className="bg-blue-500 px-5 py-2 rounded-lg"
            >
              <Text className="text-white">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <View className="flex-row justify-between">
    <Text className="text-zinc-600 dark:text-zinc-300">{label}</Text>
    <Text className="font-medium text-right text-black dark:text-white">
      {value}
    </Text>
  </View>
);

export default TransferSuccessPage;