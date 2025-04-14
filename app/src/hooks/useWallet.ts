import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axiosInstance from "../api/axiosinstance";


interface Wallet {
  id: number; // 👈 change from string to number
  userId: number;
  balance: number;
  currency?: string; // optional, since it's not in the response
  accountNumber: string;
  createdAt?: string;
  updatedAt?: string;
}

interface User {
  id: string;

}

interface WalletHookResult {
  wallet: Wallet | null;
  fetchWalletAgain: () => void;
  loading: boolean;
  error: Error | null;
}

const useWallet = (): WalletHookResult => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [refetch, setRefetch] = useState<number>(1);
  
  const { currentUser } = useAuth() as { currentUser: User | null };

  const fetchWalletAgain = (): void => {
    setRefetch((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchWallet = async (): Promise<void> => {
      try {
        setLoading(true);
        const walletData: Wallet = await axiosInstance.get(`/api/wallets/${currentUser?.id}`);
        console.log("Fetched Wallet:", walletData);
        setWallet(walletData); 
      }  catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.id) fetchWallet();
  }, [currentUser?.id, refetch]);

  return { wallet, fetchWalletAgain, loading, error };
};

export default useWallet;