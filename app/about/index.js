import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import tw from 'tailwind-react-native-classnames';

export default function AboutUsScreen() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-900 p-6`}>
      {/* Header Section */}
      <Text style={tw`text-white text-3xl font-bold mb-4`}>About Us</Text>
      {/* <Image 
        source={{ uri: 'https://source.unsplash.com/800x400/?healthcare,technology' }} 
        style={tw`w-full h-40 rounded-lg mb-4`}
      /> */}

      {/* Intro */}
      <Text style={tw`text-gray-300 text-lg leading-6 mb-4`}>
        Welcome to <Text style={tw`font-bold`}>Daktari 360 Telemedicine</Text>, where we bridge the gap between <Text style={tw`font-bold`}>patients</Text> and <Text style={tw`font-bold`}>doctors</Text> through technology.
        Our platform provides <Text style={tw`font-bold`}>affordable, accessible, and efficient</Text> healthcare at your fingertips.
      </Text>

      {/* Our Mission */}
      <Text style={tw`text-white text-xl font-bold mt-4`}>Our Mission</Text>
      <Text style={tw`text-gray-300 text-lg mb-4`}>
        To revolutionize healthcare by providing <Text style={tw`font-bold`}>on-demand medical consultations</Text> with expert professionals.
      </Text>

      {/* Our Vision */}
      <Text style={tw`text-white text-xl font-bold`}>Our Vision</Text>
      <Text style={tw`text-gray-300 text-lg mb-4`}>
        A world where <Text style={tw`font-bold`}>high-quality healthcare</Text> is accessible at the <Text style={tw`font-bold`}>tap of a button</Text>.
      </Text>

      {/* Our Values */}
      <Text style={tw`text-white text-xl font-bold`}>Our Values</Text>
      <Text style={tw`text-gray-300 text-lg mb-4`}>
        ✅ <Text style={tw`font-bold`}>Innovation:</Text> Leveraging technology to enhance healthcare.{"\n"}
        ✅ <Text style={tw`font-bold`}>Accessibility:</Text> Ensuring medical support for all.{"\n"}
        ✅ <Text style={tw`font-bold`}>Trust:</Text> Providing professional, secure, and ethical services.{"\n"}
        ✅ <Text style={tw`font-bold`}>Compassion:</Text> Every patient deserves care, dignity, and respect.
      </Text>

      {/* Our Story */}
      <Text style={tw`text-white text-xl font-bold mt-6`}>Our Story</Text>
      <Text style={tw`text-gray-300 text-lg mb-4`}>
        Daktari 360 started with a simple idea: <Text style={tw`font-bold`}>Make healthcare available anywhere, anytime</Text>. Founded by medical professionals and tech innovators, 
        we saw a need for <Text style={tw`font-bold`}>remote consultations</Text>—allowing people to receive <Text style={tw`font-bold`}>expert medical advice</Text> from the comfort of their homes.
      </Text>

      {/* Why Choose Us? */}
      <Text style={tw`text-white text-xl font-bold`}>Why Choose Us?</Text>
      <Text style={tw`text-gray-300 text-lg mb-4`}>
        ⭐ <Text style={tw`font-bold`}>24/7 Access:</Text> Consult a doctor anytime, anywhere.{"\n"}
        ⭐ <Text style={tw`font-bold`}>Certified Doctors:</Text> Our network consists of highly trained professionals.{"\n"}
        ⭐ <Text style={tw`font-bold`}>Secure & Confidential:</Text> Your data is protected with industry-leading security.{"\n"}
        ⭐ <Text style={tw`font-bold`}>Affordable Care:</Text> Get quality healthcare without breaking the bank.
      </Text>

      {/* Testimonials */}
      <Text style={tw`text-white text-xl font-bold mt-6`}>What Our Users Say</Text>
      <View style={tw`mt-4 p-4 bg-gray-800 rounded-lg`}>
        <Text style={tw`text-gray-300 text-lg`}>“Daktari 360 has truly changed my life! I can consult a doctor within minutes.”</Text>
        <Text style={tw`text-gray-400 text-sm mt-2`}>- Sarah M., Nairobi</Text>
      </View>
      <View style={tw`mt-4 p-4 bg-gray-800 rounded-lg`}>
        <Text style={tw`text-gray-300 text-lg`}>“Fast, reliable, and affordable healthcare—exactly what I needed.”</Text>
        <Text style={tw`text-gray-400 text-sm mt-2`}>- John K., Mombasa</Text>
      </View>

      {/* Closing */}
      <Text style={tw`text-gray-300 text-lg mt-6 leading-6 mb-20`}>
        We are more than just a company—we are a <Text style={tw`font-bold`}>movement</Text> towards a healthier world. 🚀 Join us today!
      </Text>
    </ScrollView>
  );
}
