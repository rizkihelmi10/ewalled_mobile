import { FormControl } from "@/components/ui/form-control";
import {
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
} from "@/components/ui/form-control"
import { VStack } from "@/components/ui/vstack"
import React from "react"
import { Input, InputField } from "@/components/ui/input"
import { Button, ButtonText } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import {Image} from 'react-native';
import { StyleSheet } from 'react-native';



function Login() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isInvalid, setIsInvalid] = React.useState(false)

  const style = StyleSheet.create({
    logo: {
        width: 250,
        height: 250,
        alignSelf: 'center',
        marginBottom: 40,
        resizeMode: 'contain'
      },
  });

  return (
    <VStack className="w-full max-w-full max-h-full h-full mx-auto my-8 p-6 bg-white rounded-lg ">
             <Image
               style={style.logo}
               source={require('@/assets/images/walledlogo.png')}
              
             />

      {/* Email Field */}
      <FormControl className="mb-4">
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Email</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md">
          <InputField
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            className="px-3 py-2"
          />
        </Input>
      </FormControl>

      {/* Password Field */}
      <FormControl className="mb-6">
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md">
          <InputField
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            className="px-3 py-2"
          />
        </Input>
      </FormControl>

      {/* Login Button */}
      <Button className="w-full bg-blue-500 rounded-md py-3 mb-4">
        <ButtonText className="text-white font-medium">Login</ButtonText>
      </Button>

      {/* Register Link */}
      <Text className="text-center text-sm">
        Don't have an account?{' '}
        <Text className="text-blue-600 font-medium">Register here</Text>
      </Text>
    </VStack>
  )

  
}

export default Login;