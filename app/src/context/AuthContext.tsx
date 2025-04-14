// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_BASE_URL } from '@/app/src/config';
import useProfile from '../hooks/useProfile';



type UserProfile = {
  id: number;
  email: string;
  username: string;
  fullname: string;
  avatarUrl: string | null;
  phoneNumber: string;
  accountNumber:number;
};


type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  currentUser: UserProfile | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  currentUser: null,
  setCurrentUser: () => {},
  token: null,
  login: async () => {},
  logout: async () => {},
  fetchProfile: async () => {},
});

// Token storage functions
const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.error('Error storing token:', error);
  }
};

const retrieveToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Provider props type
type AuthProviderProps = {
  children: React.ReactNode;
};

// Provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const { profile } = useProfile();

  useEffect(() => {
    if (profile) {
      setCurrentUser(currentUser);
    }
  }, [profile]);

  // Fetch user profile
  const fetchProfile = async () => {
    try {
      const currentToken = token || await retrieveToken();
      if (!currentToken) return;

      const response = await axios.get(`${API_BASE_URL}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${currentToken}`,
        },
      });

      if (response.data) {
        setCurrentUser(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // If token is invalid, log out
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await logout();
      }
    }
  };

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = await retrieveToken();
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        fetchProfile();
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (newToken: string) => {
    await storeToken(newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    
    // Immediately fetch user profile after login
    if (currentUser === null) {
      await fetchProfile();
    }
  };

  // Logout function
  const logout = async () => {
    await removeToken();
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    currentUser,
    setCurrentUser,
    token,
    login,
    logout,
    fetchProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}
// Custom hook
export const useAuth = () => useContext(AuthContext);

export default AuthContext;