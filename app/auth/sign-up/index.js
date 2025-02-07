import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import tw from 'tailwind-react-native-classnames';

export default function SignUp() {
  const navigation = useNavigation();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <LinearGradient
        colors={['#FFFFFF', '#E0F7FA', '#B2EBF2']} // Light blue gradient (adjust based on your image)
        style={tw`flex-1`}
      >
        <View style={tw`flex-1 px-6`}>
          {/* Header Section */}
          <View style={tw`pt-16`}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={tw`w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg`}
            >
              <Ionicons name="arrow-back" size={24} color="#00796B" /> {/* Dark teal color */}
            </TouchableOpacity>
          </View>

          {/* Welcome Text */}
          <View style={tw`my-8`}>
            <Text style={[tw`text-3xl font-bold`, { color: '#00796B' }]}>Create Account</Text>
            <Text style={[tw`text-lg mt-2`, { color: '#00796B' }]}>Join us and start</Text>
          </View>

          {/* Input Fields */}
          <BlurView intensity={30} style={tw`rounded-2xl overflow-hidden mb-4`}>
            <View style={tw`p-1`}>
              <View style={tw`bg-white rounded-xl`}>
                <TextInput
                  placeholder="Full Name"
                  placeholderTextColor="#6B7280"
                  value={name}
                  onChangeText={setName}
                  style={[
                    tw`px-4 py-3 text-lg`,
                    { fontFamily: 'outfit', color: '#00796B' } // Dark teal text
                  ]}
                />
              </View>
            </View>
          </BlurView>

          <BlurView intensity={30} style={tw`rounded-2xl overflow-hidden mb-4`}>
            <View style={tw`p-1`}>
              <View style={tw`bg-white rounded-xl`}>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#6B7280"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={[
                    tw`px-4 py-3 text-lg`,
                    { fontFamily: 'outfit', color: '#00796B' } // Dark teal text
                  ]}
                />
              </View>
            </View>
          </BlurView>

          <BlurView intensity={30} style={tw`rounded-2xl overflow-hidden mb-6`}>
            <View style={tw`p-1`}>
              <View style={tw`bg-white rounded-xl flex-row items-center`}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={[
                    tw`flex-1 px-4 py-3 text-lg`,
                    { fontFamily: 'outfit', color: '#00796B' } // Dark teal text
                  ]}
                />
                <TouchableOpacity 
                  onPress={() => setShowPassword(!showPassword)}
                  style={tw`px-4`}
                >
                  <Ionicons 
                    name={showPassword ? "eye-off" : "eye"} 
                    size={24} 
                    color="#00796B" // Dark teal color
                  />
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>

          {/* Terms and Conditions */}
          <View style={tw`flex-row items-center mb-6`}>
            <TouchableOpacity style={tw`mr-2`}>
              <View style={tw`w-6 h-6 border-2 border-gray-600 rounded-md items-center justify-center`}>
                <Ionicons name="checkmark" size={16} color="#00796B" /> {/* Dark teal color */}
              </View>
            </TouchableOpacity>
            <Text style={[tw`flex-1`, { color: '#00796B' }]}>
              I agree to the <Text style={tw`text-yellow-500`}>Terms of Service</Text> and{' '}
              <Text style={tw`text-yellow-500`}>Privacy Policy</Text>
            </Text>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={() => router.replace('/home')}
            style={tw`rounded-2xl py-4 mb-4 overflow-hidden`}
          >
            <LinearGradient
              colors={['#00796B', '#004D40']} // Dark teal gradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={tw`absolute inset-0 rounded-2xl`}
            />
            <Text style={[
              tw`text-center text-lg font-bold`,
              { fontFamily: 'outfit-bold', color: '#FFFFFF' } // White text
            ]}>
              Create Account
            </Text>
          </TouchableOpacity>

          {/* Social Sign Up */}
          <View style={tw`my-6`}>
            <View style={tw`flex-row items-center mb-6`}>
              <View style={[tw`flex-1 h-px`, { backgroundColor: '#00796B' }]} />
              <Text style={[tw`mx-4`, { color: '#00796B' }]}>Or sign up with</Text>
              <View style={[tw`flex-1 h-px`, { backgroundColor: '#00796B' }]} />
            </View>

            <View style={tw`flex-row justify-center space-x-4`}>
              {['google', 'apple', 'facebook'].map((provider) => (
                <TouchableOpacity
                  key={provider}
                  style={tw`w-14 h-14 bg-white rounded-full items-center justify-center shadow-lg`}
                >
                  <Ionicons 
                    name={`logo-${provider}`} 
                    size={24} 
                    color="#00796B" // Dark teal color
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sign In Link */}
          <View style={tw`flex-row justify-center mt-6`}>
            <Text style={[tw`text-lg`, { color: '#00796B' }]}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('auth/sign-in')}>
              <Text style={[tw`text-lg font-bold`, { color: '#004D40' }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}