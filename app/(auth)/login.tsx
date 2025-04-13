import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { useAuth } from '@/app/src/context/AuthContext';
import { API_BASE_URL } from '@/app/src/config';

type RootStackParamList = {
  login: undefined;
  register: undefined;
  // 'home' removed if not explicitly defined
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'login'
>;

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 8,
    alignSelf: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 5,
    padding: 12,
    width: '100%',
    marginBottom: 15,
  },
  errorBox: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#EF4444',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  successBox: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#22C55E',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#19918F',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  registerText: {
    color: '#3B82F6',
    fontWeight: '500',
  },
});

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // This assumes you're using nested routes like (tabs)/index.tsx
      navigation.navigate('(tabs)' as never);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const params = navigation.getState().routes.find(r => r.name === 'login')?.params as any;
      if (params?.message) {
        setSuccessMessage(params.message);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
      });

      if (response.data?.token) {
        await login(response.data.token);
        navigation.navigate('(tabs)' as never);
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const status = err.response?.status;
      const message = err.response?.data?.message || err.message || "An unexpected error occurred.";
      if (status === 401) {
        setError("Invalid email or password");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.card}>
        <Image style={styles.logo} source={require('@/assets/images/walledlogo.png')} />

        {error ? <View style={styles.errorBox}><Text style={{ color: '#B91C1C' }}>{error}</Text></View> : null}
        {successMessage ? <View style={styles.successBox}><Text style={{ color: '#15803D' }}>{successMessage}</Text></View> : null}

        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          value={formData.password}
          onChangeText={text => handleChange('password', text)}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={styles.loginButton}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white', fontWeight: '500' }}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text>
            Don't have an account?{' '}
            <Text
              onPress={() => navigation.navigate('register')}
              style={styles.registerText}
            >
              Register here
            </Text>
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;
