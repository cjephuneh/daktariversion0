import React, { useState } from 'react';
import { 
  Text, TextInput, TouchableOpacity, View, Image, 
  KeyboardAvoidingView, Platform, Alert, ActivityIndicator,
  Dimensions, ScrollView
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiBase } from '../../../lib/config.ts'; // Adjust the import path as needed
import tw from 'tailwind-react-native-classnames';

// Get screen width & height for responsiveness
const { width, height } = Dimensions.get('window');

export default function SignIn() {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiBase.post(
        `https://telemed-h2h9awcpdqg0hvac.uksouth-01.azurewebsites.net/api/v1.0/signin`,
        { email, password, role: "Doctor" }
      );

      if (response.data && response.data.access_token) {
        await AsyncStorage.setItem('access_token', response.data.access_token);
        Alert.alert("Success", "Login successful!");
        router.replace('/home'); 
      } else {
        Alert.alert("Login Failed", "Invalid response from server.");
      }
    } catch (error) {
      Alert.alert("Login Failed", error.response?.data?.message || "Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={tw`flex-1`}
    >
      <LinearGradient colors={['#FFFFFF', '#E0F7FA', '#B2EBF2']} style={tw`flex-1`}>
        <ScrollView contentContainerStyle={tw`flex-grow p-6`}>

          {/* Header */}
          <View style={[tw`mt-12 mb-6`, { width: width * 0.9 }]}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={tw`w-10 h-10 bg-white rounded-full items-center justify-center shadow-lg`}
            >
              <Ionicons name="arrow-back" size={24} color="#00796B" />
            </TouchableOpacity>
          </View>

          {/* Logo and Welcome Message */}
          <View style={tw`items-center mb-8`}>
            <Image
              source={require('../../../assets/images/logo.png')}
              style={{ width: width * 0.3, height: width * 0.3 }}
              resizeMode="contain"
            />
            <Text style={[tw`font-bold mt-6`, { fontSize: width * 0.07, color: '#00796B' }]}>
              Welcome Back Daktari!
            </Text>
            <Text style={[tw`mt-2`, { fontSize: width * 0.045, color: '#00796B' }]}>
              Sign in to continue
            </Text>
          </View>

          {/* Email Input */}
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
                  style={[tw`px-4 py-3 text-lg`, { color: '#00796B', fontSize: width * 0.045 }]}
                />
              </View>
            </View>
          </BlurView>

          {/* Password Input */}
          <BlurView intensity={30} style={tw`rounded-2xl overflow-hidden mb-6`}>
            <View style={tw`p-1`}>
              <View style={tw`bg-white rounded-xl flex-row items-center`}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor="#6B7280"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  style={[tw`flex-1 px-4 py-3`, { fontSize: width * 0.045, color: '#00796B' }]}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={tw`px-4`}>
                  <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#00796B" />
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            style={[tw`rounded-2xl py-4 mb-4 overflow-hidden`, { width: width * 0.9 }]}
            disabled={loading}
          >
            <LinearGradient colors={['#00796B', '#004D40']} style={tw`absolute inset-0 rounded-2xl`} />
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={[tw`text-center font-bold`, { fontSize: width * 0.05, color: '#FFFFFF' }]}>
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Social Sign In */}
          <View style={tw`mt-6`}>
            <View style={tw`flex-row items-center mb-6`}>
              <View style={[tw`flex-1 h-px`, { backgroundColor: '#00796B' }]} />
              <Text style={[tw`mx-4`, { fontSize: width * 0.04, color: '#00796B' }]}>Or continue with</Text>
              <View style={[tw`flex-1 h-px`, { backgroundColor: '#00796B' }]} />
            </View>

            <View style={tw`flex-row justify-center space-x-4`}>
              {['google', 'apple', 'facebook'].map((provider) => (
                <TouchableOpacity
                  key={provider}
                  style={[tw`rounded-full items-center justify-center shadow-lg`, { width: width * 0.15, height: width * 0.15, backgroundColor: "white" }]}
                >
                  <Ionicons name={`logo-${provider}`} size={width * 0.08} color="#00796B" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sign Up Link */}
          <View style={tw`flex-row justify-center mt-6`}>
            <Text style={[tw`text-lg`, { fontSize: width * 0.045, color: '#00796B' }]}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('auth/sign-up')}>
              <Text style={[tw`font-bold`, { fontSize: width * 0.045, color: '#004D40' }]}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}
