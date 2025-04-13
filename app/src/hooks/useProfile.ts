import { useState } from "react";
import axiosInstance from "../api/axiosinstance";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

interface UseProfileResult {
  profile: UserProfile | null;
  fetchProfile: () => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const useProfile = (): UseProfileResult => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<UserProfile>(`/users/me`);
      setProfile(response.data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return { profile, fetchProfile, loading, error };
};

export default useProfile;