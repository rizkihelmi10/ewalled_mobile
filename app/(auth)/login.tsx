import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import axios from 'axios';
import { useAuth } from '@/app/src/context/AuthContext';
import { API_BASE_URL } from '@/app/src/config';
import { Image } from 'react-native';

type RootStackParamList = {
  login: undefined;
  home: undefined;
  register: undefined;
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
  }
});

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { isAuthenticated, login } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('home');
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      console.log("Attempting login with:", formData);
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      
      await login(response?.data?.token);
      navigation.navigate('home');
    } catch (err: any) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Login failed. Please check your email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'white' }}>
      <View style={{ width: '90%', maxWidth: 400, padding: 24, backgroundColor: 'white', borderRadius: 8, alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={require('@/assets/images/walledlogo.png')}
        />
        {error ? (
          <View style={{ 
            backgroundColor: '#FEE2E2', 
            borderWidth: 1, 
            borderColor: '#EF4444', 
            padding: 10, 
            borderRadius: 5, 
            marginBottom: 15,
            width: '100%'
          }}>
            <Text style={{ color: '#B91C1C' }}>{error}</Text>
          </View>
        ) : null}

        {successMessage ? (
          <View style={{ 
            backgroundColor: '#DCFCE7', 
            borderWidth: 1, 
            borderColor: '#22C55E', 
            padding: 10, 
            borderRadius: 5, 
            marginBottom: 15,
            width: '100%'
          }}>
            <Text style={{ color: '#15803D' }}>{successMessage}</Text>
          </View>
        ) : null}

        <View style={{ marginBottom: 15, width: '100%' }}>
          <TextInput
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            style={{ 
              borderWidth: 1, 
              borderColor: '#D1D5DB', 
              borderRadius: 5, 
              padding: 12,
              width: '100%'
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={{ marginBottom: 20, width: '100%' }}>
          <TextInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
            style={{ 
              borderWidth: 1, 
              borderColor: '#D1D5DB', 
              borderRadius: 5, 
              padding: 12,
              width: '100%'
            }}
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          style={{ 
            backgroundColor: '#3B82F6', 
            padding: 12, 
            borderRadius: 5, 
            alignItems: 'center',
            width: '100%'
          }}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white', fontWeight: '500' }}>Login</Text>
          )}
        </TouchableOpacity>

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <Text>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => navigation.navigate('register')}>
              <Text style={{ color: '#3B82F6', fontWeight: '500' }}>
                Register here
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;