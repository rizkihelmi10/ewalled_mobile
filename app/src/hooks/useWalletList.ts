import { useState } from "react";
import axiosInstance from "../api/axiosinstance";
import { useAuth } from "../context/AuthContext";

interface Wallet {
  id: string;
  name: string;
  balance: number;
  currency: string;
  isActive: boolean;
}

interface User {
  id: string;
}

interface UseWalletListResult {
  walletsList: Wallet[] | null;
  fetchWalletsList: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useWalletList = (): UseWalletListResult => {
  const [walletsList, setWalletsList] = useState<Wallet[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  
  const { currentUser } = useAuth() as { currentUser: User | null };

  const fetchWalletsList = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Wallet[]>(
        `/api/wallets/availability/${currentUser?.id}`,
      );
      setWalletsList(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return { walletsList, fetchWalletsList, loading, error };
};

export default useWalletList;