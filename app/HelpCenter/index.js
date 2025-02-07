import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function HelpCenterScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-900 p-6`}>
      <Text style={tw`text-white text-3xl font-bold mb-6`}>Help Center</Text>

      {/* Booking an Appointment */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>🔹 How do I book an appointment?</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          Tap on a doctor’s profile, select a date and time, and confirm your booking. 
          You will receive a confirmation email and notification.
        </Text>
      </View>

      {/* Resetting Password */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>🔹 How do I reset my password?</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          Go to <Text style={tw`font-bold`}>Settings → Account → Reset Password</Text>, 
          or click <Text style={tw`font-bold`}>Forgot Password</Text> on the login screen.
        </Text>
      </View>

      {/* Doctor Cancellation */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>🔹 What happens if my doctor cancels?</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          You will be notified immediately, and you can choose to <Text style={tw`font-bold`}>reschedule</Text> 
          or receive a <Text style={tw`font-bold`}>full refund</Text>.
        </Text>
      </View>

      {/* Payment Methods */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>🔹 What payment methods do you accept?</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          We accept <Text style={tw`font-bold`}>M-Pesa, Visa, Mastercard, PayPal</Text>, 
          and other mobile payment options.
        </Text>
      </View>

      {/* Refund Policy */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>🔹 Can I get a refund if I cancel my appointment?</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          Yes, you can cancel and receive a refund if you cancel at least <Text style={tw`font-bold`}>24 hours</Text> before the appointment. 
          Refunds take <Text style={tw`font-bold`}>3-5 business days</Text> to process.
        </Text>
      </View>

      {/* Prescription Delivery */}
      <View style={tw`mb-5`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>🔹 Can I get my prescriptions delivered?</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          Yes! We offer <Text style={tw`font-bold`}>same-day prescription delivery</Text> in select locations. 
          Check your location in the app for availability.
        </Text>
      </View>

      {/* Technical Issues */}
      <View style={tw`mb-20`}>
        <Text style={tw`text-white text-xl font-bold mb-2`}>🔹 What should I do if I face technical issues?</Text>
        <Text style={tw`text-gray-300 text-lg leading-relaxed`}>
          Try restarting the app. If the issue persists, contact <Text style={tw`font-bold`}>support@daktari360.com</Text> or use the live chat feature in the app.
        </Text>
      </View>

    </ScrollView>
  );
}
