import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';
import { useRouter } from 'expo-router';

const PatientListScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          console.error('No access token found');
          return;
        }

        const response = await fetch(
          'https://telemed-h2h9awcpdqg0hvac.uksouth-01.azurewebsites.net/api/v1.0/appointments/past',
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setAppointments(data.appointments || []);
        } else {
          console.error('Error fetching appointments:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.doctor_first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={tw`bg-gray-900 p-4 flex-1`}>
      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search past appointments..."
        placeholderTextColor="#aaa"
        style={tw`bg-gray-700 text-white p-4 rounded-lg mt-2 mb-4`}
      />

      <Text style={tw`text-white text-2xl font-bold mb-4`}>Past Appointments</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : appointments.length === 0 ? (
        <View style={tw`bg-gray-800 p-6 rounded-lg mt-4 flex items-center`}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={tw`w-20 h-20 rounded-full mb-4`}
          />
          <Text style={tw`text-white text-lg font-bold`}>No Past Appointments</Text>
          <Text style={tw`text-gray-400 text-center mt-2`}>
            You have not had any past appointments yet.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push({ pathname: 'PatientDetailScreen', params: { patientId: item.id } })}
              style={tw`bg-gray-800 p-4 rounded-lg mt-4`}
            >
              <View style={tw`flex-row items-center`}>
                <Image
                  source={{ uri: item.doctor_image_url || 'https://via.placeholder.com/150' }}
                  style={tw`w-16 h-16 rounded-full mr-4`}
                />
                <View>
                  <Text style={tw`text-white text-xl font-bold`}>{item.doctor_first_name}</Text>
                  <Text style={tw`text-gray-400`}>Specialization: {item.doctor_specialization}</Text>
                  <Text style={tw`text-gray-400`}>Date: {item.date}</Text>
                  <Text style={tw`text-gray-400`}>Time: {item.time}</Text>
                  <Text style={tw`text-gray-400`}>Status: {item.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default PatientListScreen;
