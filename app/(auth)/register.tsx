import { FormControl } from "@/components/ui/form-control";
import {
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control"
import { VStack } from "@/components/ui/vstack"
import React from "react"
import { Input, InputField } from "@/components/ui/input"
import { Button, ButtonText } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckboxLabel } from "@/components/ui/checkbox"
import { CheckIcon } from "@/components/ui/icon"
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';

function Register() {
  const [fullName, setFullName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [avatarUrl, setAvatarUrl] = React.useState('')
  const [termsAccepted, setTermsAccepted] = React.useState(false)

    const style = StyleSheet.create({
      logo: {
          width: 250,
          height: 250,
          alignSelf: 'center',
          marginBottom: 0,
          resizeMode: 'contain'
        },
    });
  return (
    <VStack className="w-full max-w-full h-full mx-auto mb-0 mt-0 p-6 bg-white rounded-lg ">
  <Image
                 style={style.logo}
                 source={require('@/assets/images/walledlogo.png')}
                
               />

      
      <FormControl className="mb-4" >
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Fullname</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter your full name"
            value={fullName}
            onChangeText={(text) => setFullName(text)}
            className="px-3 py-2"
          />
        </Input>
      </FormControl>

      
      <FormControl className="mb-4">
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Email</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            className="px-3 py-2"
          />
        </Input>
      </FormControl>

      
      <FormControl className="mb-4">
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            className="px-3 py-2"
          />
        </Input>
      </FormControl>

      
      <FormControl className="mb-4">
        <FormControlLabel>
          <FormControlLabelText className="text-sm font-medium">Avatar Url</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1 border border-gray-300 rounded-md bg-gray-100">
          <InputField
            placeholder="Enter avatar URL"
            value={avatarUrl}
            onChangeText={(text) => setAvatarUrl(text)}
            className="px-3 py-2"
          />
        </Input>
      </FormControl>

      <Checkbox
      value={termsAccepted.toString()} 
      isChecked={termsAccepted} 
      onChange={(isSelected: boolean) => setTermsAccepted(isSelected)} 
      className="mb-6 flex-row items-center"
    >
        <CheckboxIndicator className="mr-2">
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel className="text-sm">
          I have read and agree to the Terms and Conditions *
        </CheckboxLabel>
      </Checkbox>

      
      <Button className="w-full bg-blue-600 rounded-md py-3 mb-4">
        <ButtonText className="text-white font-medium">Register</ButtonText>
      </Button>

      
      <Text className="text-center text-sm">
        Have an account?{' '}
        <Text className="text-blue-600 font-medium">Login here</Text>
      </Text>
    </VStack>
  )
}

export default Register;