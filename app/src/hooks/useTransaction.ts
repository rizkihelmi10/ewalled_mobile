import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosinstance";


interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: string;
  type: string;

}

interface User {
  id: string;

}

interface TransactionsHookResult {
  transactions: Transaction[] | null;
  loading: boolean;
  error: Error | null;
}

const useTransactions = (): TransactionsHookResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  
  const { currentUser } = useAuth() as { currentUser: User | null };

  useEffect(() => {
    const fetchTransactions = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Transaction[]>(
          `/transactions?walletId=${currentUser?.id}`,
        );
        setTransactions(response.data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) fetchTransactions();
  }, [currentUser?.id]);

  return { transactions, loading, error };
};

export default useTransactions;