import { useState } from "react";
import axios from "axios";

interface TransactionData {
  walletId: string;
  transactionType: "TRANSFER" | "TOP_UP";
  category: string;
  amount: number;
  recipientAccountNumber: string;
  description: string;
}


interface TransactionResponse {
  id: string;
  status: string;
  timestamp: string;
}

interface UseTransferResult {
  loading: boolean;
  error: Error | null;
  data: TransactionResponse | null;
  postTransfer: (transactionData: TransactionData) => Promise<void>;
}

const useTransfer = (): UseTransferResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TransactionResponse | null>(null);

  const postTransfer = async (transactionData: TransactionData): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<TransactionResponse>(
        "/api/transactions",
        transactionData,
      );
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, postTransfer };
};

export default useTransfer;