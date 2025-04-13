import React, { useState } from "react";
import { FormControl } from "@/components/ui/form-control";
import {
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { register } from '@/app/src/services/authServices';
import axios from 'axios';

// Define your navigation types
type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
};

type RegisterScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Register'
>;

const Register: React.FC = () => {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [errors, setErrors] = useState<{[key: string]: string | undefined}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string | undefined} = {};
    let isValid = true;
    
    if (!fullName) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    if (!phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
      isValid = false;
    }
    
    if (!username) {
      newErrors.username = 'Username is required';
      isValid = false;
    }
    
    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userData = {
        fullname: fullName,
        email,
        password,
        phoneNumber,
        username
      };

      const response = await register(userData);
      
      Alert.alert(
        'Registration Successful',
        'Your account has been created successfully. Please login.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Registration Failed', error.message);
      } else {
        Alert.alert('Registration Failed', 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };
  const styles = StyleSheet.create({
    logo: {
      width: 250,
      height: 250,
      alignSelf: 'center',
      marginBottom: 20,
      resizeMode: 'contain'
    },
  });

  return (
    <VStack className="w-full h-full mx-auto p-6 bg-white rounded-lg">
      <Image
        style={styles.logo}
        source={require('@/assets/images/walledlogo.png')}
      />
      
      {/* Full Name Field */}
      <FormControl className="mb-4" isInvalid={!!errors.fullName}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Full Name</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={(text: string) => {
              setFullName(text);
              if (errors.fullName) {
                const { fullName, ...rest } = errors;
                setErrors(rest);
              }
            }}
            className="px-3 py-2"
          />
        </Input>
        {errors.fullName && (
          <FormControlHelper>
            <FormControlHelperText className="text-red-500">
              {errors.fullName}
            </FormControlHelperText>
          </FormControlHelper>
        )}
      </FormControl>
      
      {/* Email Field */}
      <FormControl className="mb-4" isInvalid={!!errors.email}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Email</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter your email"
            value={email}
            onChangeText={(text: string) => {
              setEmail(text);
              if (errors.email) {
                const { email, ...rest } = errors;
                setErrors(rest);
              }
            }}
            className="px-3 py-2"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Input>
        {errors.email && (
          <FormControlHelper>
            <FormControlHelperText className="text-red-500">
              {errors.email}
            </FormControlHelperText>
          </FormControlHelper>
        )}
      </FormControl>
      
      {/* Username Field */}
      <FormControl className="mb-4" isInvalid={!!errors.username}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Username</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter your username"
            value={username}
            onChangeText={(text: string) => {
              setUsername(text);
              if (errors.username) {
                const { username, ...rest } = errors;
                setErrors(rest);
              }
            }}
            className="px-3 py-2"
            autoCapitalize="none"
          />
        </Input>
        {errors.username && (
          <FormControlHelper>
            <FormControlHelperText className="text-red-500">
              {errors.username}
            </FormControlHelperText>
          </FormControlHelper>
        )}
      </FormControl>
      
      {/* Phone Number Field */}
      <FormControl className="mb-4" isInvalid={!!errors.phoneNumber}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Phone Number</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={(text: string) => {
              setPhoneNumber(text);
              if (errors.phoneNumber) {
                const { phoneNumber, ...rest } = errors;
                setErrors(rest);
              }
            }}
            className="px-3 py-2"
            keyboardType="phone-pad"
          />
        </Input>
        {errors.phoneNumber && (
          <FormControlHelper>
            <FormControlHelperText className="text-red-500">
              {errors.phoneNumber}
            </FormControlHelperText>
          </FormControlHelper>
        )}
      </FormControl>
      
      {/* Password Field */}
      <FormControl className="mb-4" isInvalid={!!errors.password}>
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter your password"
            value={password}
            onChangeText={(text: string) => {
              setPassword(text);
              if (errors.password) {
                const { password, ...rest } = errors;
                setErrors(rest);
              }
            }}
            secureTextEntry={true}
            className="px-3 py-2"
          />
        </Input>
        {errors.password && (
          <FormControlHelper>
            <FormControlHelperText className="text-red-500">
              {errors.password}
            </FormControlHelperText>
          </FormControlHelper>
        )}
      </FormControl>
      
      {/* Terms Checkbox */}
      <FormControl isInvalid={!!errors.terms} className="mb-4">
        <Checkbox
          value="terms"
          isChecked={termsAccepted}
          onChange={() => {
            setTermsAccepted(!termsAccepted);
            if (errors.terms) {
              const { terms, ...rest } = errors;
              setErrors(rest);
            }
          }}
          className="flex-row items-center"
        >
          <CheckboxIndicator className="mr-2">
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel className="text-sm">
            I have read and agree to the Terms and Conditions *
          </CheckboxLabel>
        </Checkbox>
        {errors.terms && (
          <FormControlHelper>
            <FormControlHelperText className="text-red-500 ml-6">
              {errors.terms}
            </FormControlHelperText>
          </FormControlHelper>
        )}
      </FormControl>
      
      {/* Register Button */}
      <Button
        className="w-full bg-blue-600 rounded-md py-3 mb-4"
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ButtonText className="text-white font-medium">Register</ButtonText>
        )}
      </Button>
      
      {/* Login Link */}
      <Text className="text-center text-sm">
        Have an account?{' '}
        <Text
          className="text-blue-600 font-medium"
          onPress={() => navigation.navigate('Login')}
        >
          Login here
        </Text>
      </Text>
    </VStack>
  );
};

export default Register;