import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function ContactUsScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-900 p-6`}>
      <Text style={tw`text-white text-3xl font-bold mb-4`}>Contact Us</Text>

      <Text style={tw`text-gray-300 text-lg`}>📍 <Text style={tw`font-bold`}>Address:</Text> 123 Medical Lane, Nairobi, Kenya</Text>
      <Text style={tw`text-gray-300 text-lg mt-2`}>📧 <Text style={tw`font-bold`}>Email:</Text> support@superfasthealth.com</Text>
      <Text style={tw`text-gray-300 text-lg mt-2`}>📞 <Text style={tw`font-bold`}>Phone:</Text> +254 700 123 456</Text>
      <Text style={tw`text-gray-300 text-lg mt-2`}>💬 <Text style={tw`font-bold`}>Live Chat:</Text> Available on our app</Text>
      <Text style={tw`text-gray-300 text-lg mt-2`}>⏰ <Text style={tw`font-bold`}>Office Hours:</Text> Mon-Fri, 8 AM - 6 PM</Text>

      <Text style={tw`text-white text-xl font-bold mt-6`}>Send Us a Message</Text>
      
      <TextInput 
        style={tw`bg-gray-800 text-white p-3 mt-3 rounded-lg`} 
        placeholder="Your Name" 
        placeholderTextColor="#999" 
      />
      <TextInput 
        style={tw`bg-gray-800 text-white p-3 mt-3 rounded-lg`} 
        placeholder="Your Email" 
        placeholderTextColor="#999" 
        keyboardType="email-address"
      />
      <TextInput 
        style={tw`bg-gray-800 text-white p-3 mt-3 h-24 rounded-lg`} 
        placeholder="Your Message" 
        placeholderTextColor="#999" 
        multiline
      />

      <TouchableOpacity style={tw`bg-green-700 p-4 rounded-lg mt-4 items-center`}>
        <Text style={tw`text-white text-lg font-bold`}>Send Message</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
