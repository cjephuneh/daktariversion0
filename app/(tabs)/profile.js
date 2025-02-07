import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Switch, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';

export default function DoctorProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [doctorProfile, setDoctorProfile] = useState(null);
  const [notifications, setNotifications] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [darkMode, setDarkMode] = useState(true);


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) throw new Error('No access token found');

        const response = await fetch(
          'https://telemed-h2h9awcpdqg0hvac.uksouth-01.azurewebsites.net/api/v1.0/profile',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) throw new Error('Failed to fetch profile');

        const data = await response.json();
        console.log("API Response:", data); // Debugging log

        setDoctorProfile({
          name: `${data.first_name} ${data.last_name}` || "Unknown Name",
          email: data.email || "No email provided",
          gender: data.gender || "Not specified",
          phone: data.phone_number || "No phone number",
          role: data.role || "Unknown Role",
          verified: data.verified ? "✅ Verified" : "❌ Not Verified",
          avatar: data.image_url ? { uri: data.image_url } : require('../../assets/images/image.png')
        });
      } catch (error) {
        console.error(error);
        setDoctorProfile({ name: "Unknown Name", role: "Not Available" });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <ActivityIndicator size="large" color="#FCD34D" />
      </View>
    );
  }

  if (!doctorProfile) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <Text style={tw`text-white text-lg`}>Failed to load profile</Text>
      </View>
    );
  }

  const menuItems = [
    
    {
      title: "Appointments",
      items: [
        { icon: "calendar-outline", label: "My Appointments", route: "schedule" },
        { icon: "clipboard-outline", label: "Appointment History", route: "patients" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: "headset-outline", label: "Help Center", route: "/helpcenter" },
        { icon: "chatbubble-outline", label: "Contact Us", route: "/contactus" },
        { icon: "document-text-outline", label: "Terms & Privacy", route: "/terms" },
        { icon: "information-circle-outline", label: "About Us", route: "/callscreen" },
      ]
    }
  ];

  return (
    <ScrollView style={tw`flex-1 bg-gray-900`}>
      {/* Profile Header */}
      <View style={tw`bg-gray-800 p-6 rounded-b-3xl shadow-xl`}>
        <View style={tw`flex-row items-center mt-6`}>
          <Image source={doctorProfile.avatar} style={tw`w-20 h-20 rounded-full`} />
          <View style={tw`ml-4 flex-1`}>
            <Text style={tw`text-white text-2xl font-bold`}>{doctorProfile.name}</Text>
            <Text style={tw`text-gray-400`}>{doctorProfile.role}</Text>
            <Text style={tw`text-gray-400 text-sm`}>{doctorProfile.verified}</Text>
          </View>
        </View>
      </View>

      {/* Profile Details */}
      <View style={tw`px-6 py-4`}>
        <Text style={tw`text-white text-lg font-bold mb-2`}>Personal Information</Text>
        <View style={tw`bg-gray-800 p-4 rounded-xl`}>
          <Text style={tw`text-gray-400`}>📧 Email: <Text style={tw`text-white`}>{doctorProfile.email}</Text></Text>
          <Text style={tw`text-gray-400 mt-2`}>📞 Phone: <Text style={tw`text-white`}>{doctorProfile.phone}</Text></Text>
          <Text style={tw`text-gray-400 mt-2`}>⚧ Gender: <Text style={tw`text-white`}>{doctorProfile.gender}</Text></Text>
        </View>
      </View>

      {/* Quick Stats
      <View style={tw`px-6 py-4`}>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-gray-400 text-sm`}>Total Patients</Text>
            <Text style={tw`text-white text-xl font-bold`}>{doctorProfile.totalPatients}</Text>
          </View>
        </View>
      </View> */}

      {/* Recent Appointments
      <View style={tw`px-6 py-4`}>
        <Text style={tw`text-white text-lg font-bold mb-4`}>Recent Appointments</Text>
          <TouchableOpacity
            style={tw`bg-gray-800 rounded-xl p-4 mb-3 flex-row items-center`}
          >
            <View style={tw`w-10 h-10 bg-gray-700 rounded-full items-center justify-center`}>
              <Ionicons name="calendar-outline" size={20} color="#FCD34D" />
            </View>
            {/* <View style={tw`flex-1 ml-4`}>
              <Text style={tw`text-white font-bold`}>{appointment.patient}</Text>
              <Text style={tw`text-gray-400 text-sm`}>{appointment.date} at {appointment.time}</Text>
            </View> 
          </TouchableOpacity>
      </View> */}

      {/* Menu Sections */}
      {menuItems.map((section, index) => (
        <View key={index} style={tw`px-6 py-4`}>
          <Text style={tw`text-white text-lg font-bold mb-4`}>{section.title}</Text>
          <View style={tw`bg-gray-800 rounded-xl overflow-hidden`}>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                style={tw`flex-row items-center p-4 ${itemIndex !== section.items.length - 1 ? 'border-b border-gray-700' : ''}`}
                onPress={() => router.push(item.route)}
              >
                <Ionicons name={item.icon} size={24} color="#FCD34D" />
                <Text style={tw`text-white ml-4 flex-1`}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      {/* Settings */}
      <View style={tw`px-6 py-4`}>
        <Text style={tw`text-white text-lg font-bold mb-4`}>Settings</Text>
        <View style={tw`bg-gray-800 rounded-xl overflow-hidden`}>
          <View style={tw`flex-row items-center justify-between p-4 border-b border-gray-700`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="notifications-outline" size={24} color="#FCD34D" />
              <Text style={tw`text-white ml-4`}>Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#374151', true: '#FCD34D' }}
              thumbColor={notifications ? '#ffffff' : '#9CA3AF'}
            />
          </View>
          <View style={tw`flex-row items-center justify-between p-4 border-b border-gray-700`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="finger-print-outline" size={24} color="#FCD34D" />
              <Text style={tw`text-white ml-4`}>Biometric Login</Text>
            </View>
            <Switch
              value={biometrics}
              onValueChange={setBiometrics}
              trackColor={{ false: '#374151', true: '#FCD34D' }}
              thumbColor={biometrics ? '#ffffff' : '#9CA3AF'}
            />
          </View>
          <View style={tw`flex-row items-center justify-between p-4`}>
            <View style={tw`flex-row items-center`}>
              <Ionicons name="moon-outline" size={24} color="#FCD34D" />
              <Text style={tw`text-white ml-4`}>Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#374151', true: '#FCD34D' }}
              thumbColor={darkMode ? '#ffffff' : '#9CA3AF'}
            />
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        style={tw`mx-6 my-8 bg-red-500 p-4 rounded-full flex-row justify-center items-center`}
        onPress={() => {/* Handle logout */}}
      >
        <Ionicons name="log-out-outline" size={24} color="white" style={tw`mr-2`} />
        <Text style={tw`text-white font-bold text-lg`}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
