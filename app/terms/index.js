import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function TermsScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-900 p-6`}>
      <Text style={tw`text-white text-3xl font-bold mb-6`}>Terms and Conditions</Text>

      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>1. Introduction</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          These Terms and Conditions govern your use of <Text style={tw`font-bold`}>Superfast Telemedicine</Text>. 
          By using this app, you agree to our policies.
        </Text>
      </View>

      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>2. User Responsibilities</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          Users must provide <Text style={tw`font-bold`}>accurate information</Text> and comply with 
          all <Text style={tw`font-bold`}>medical laws</Text>.
        </Text>
      </View>

      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>3. Privacy Policy</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          We <Text style={tw`font-bold`}>securely store</Text> your data and will 
          <Text style={tw`font-bold`}> never share it</Text> without consent.
        </Text>
      </View>

      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>4. Refund & Cancellation</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          Appointments <Text style={tw`font-bold`}>must be canceled</Text> at least 
          <Text style={tw`font-bold`}> 24 hours in advance</Text> for a refund.
        </Text>
      </View>
    </ScrollView>
  );
}
