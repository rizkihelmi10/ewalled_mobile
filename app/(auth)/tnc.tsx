  'use client'

  import { useState } from 'react'
  import { Button } from '@/components/ui/button'
  import { useNavigation } from 'expo-router'
  import { NativeStackNavigationProp } from '@react-navigation/native-stack'

  export default function TermsAndConditions() {
    const [agreed, setAgreed] = useState(false)
    type RootStackParamList = {
      login: undefined;
      register: undefined;
      TermsAndConditions: undefined;
    };

    type RegisterScreenNavigationProp = NativeStackNavigationProp<
      RootStackParamList,
      'TermsAndConditions'
    >;
    const navigation = useNavigation<RegisterScreenNavigationProp>();

    const handleAgree = () => {
      if (agreed) {
        navigation.navigate('register')
      }
    }
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-2xl font-bold mb-6">Terms and Conditions</h1>
      
        <div className="prose prose-sm h-[60vh] overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            These Terms and Conditions govern your use of our service. By accessing or using our service, 
            you agree to be bound by these terms.
          </p>

          <h2 className="text-xl font-semibold mb-4">2. Use of Service</h2>
          <p className="mb-4">
            You agree to use the service only for lawful purposes and in accordance with these Terms. 
            You are responsible for maintaining the confidentiality of your account.
          </p>

          <h2 className="text-xl font-semibold mb-4">3. Privacy</h2>
          <p className="mb-4">
            Your privacy is important to us. Please review our Privacy Policy to understand how we collect, 
            use and protect your personal information.
          </p>

          <h2 className="text-xl font-semibold mb-4">4. Limitations</h2>
          <p className="mb-4">
            We reserve the right to modify or terminate the service for any reason, without notice at any time.
            We reserve the right to refuse service to anyone for any reason at any time.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-4">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4"
          />
          <label htmlFor="agree" className="text-sm">
            I have read and agree to the Terms and Conditions
          </label>
        </div>

        <Button
          onPress={handleAgree}
          disabled={!agreed}
          className="mt-6"
        >
          Continue
        </Button>
      </div>
    )
  }