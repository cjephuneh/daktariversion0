import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'tailwind-react-native-classnames';
import { useRoute } from '@react-navigation/native';

const PatientDetailScreen = () => {
  const route = useRoute();
  const { patientId } = route.params;
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        if (!token) {
          console.error('No access token found');
          return;
        }
    
        const url = `https://telemed-h2h9awcpdqg0hvac.uksouth-01.azurewebsites.net/api/v1.0/patients/${patientId}`;
        console.log("Fetching from:", url);
    
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
    
        // Log raw text response before parsing
        const text = await response.text();
        console.log("Raw API Response:", text);
    
        // Try parsing JSON only if the response is valid
        const data = JSON.parse(text);
    
        if (response.ok && data.appointments.length > 0) {
          setPatient(data.appointments[0]);
        } else {
          console.error('Error fetching patient details:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    

    fetchPatientDetails();
  }, [patientId]);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!patient) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-gray-900`}>
        <Text style={tw`text-white text-lg`}>No appointment details found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`bg-gray-900 p-4`}>
      <View style={tw`bg-purple-700 rounded-lg p-4`}>
        <Image 
          source={{ uri: `https://yourbackend.com${patient.doctor_image_url}` || 'https://via.placeholder.com/150' }} 
          style={tw`w-32 h-32 rounded-full self-center`} 
        />
        <Text style={tw`text-white text-3xl font-bold text-center mt-4`}>
          Dr. {patient.doctor_first_name} {patient.doctor_specialization}
        </Text>
        <Text style={tw`text-gray-400 text-center text-xl`}>
          Specialization: {patient.doctor_specialization}
        </Text>
      </View>

      <View style={tw`mt-6`}>
        <Text style={tw`text-white text-2xl font-bold`}>Appointment Details</Text>
        <View style={tw`bg-gray-800 p-4 rounded-lg mt-4`}>
          <Text style={tw`text-yellow-500 font-bold`}>Date:</Text>
          <Text style={tw`text-white`}>{patient.date} at {patient.time}</Text>

          <Text style={tw`text-yellow-500 font-bold mt-2`}>Purpose:</Text>
          <Text style={tw`text-white`}>{patient.purpose}</Text>

          <Text style={tw`text-yellow-500 font-bold mt-2`}>Status:</Text>
          <Text style={tw`text-white`}>{patient.status}</Text>

          <Text style={tw`text-yellow-500 font-bold mt-2`}>Meeting Link:</Text>
          <Text style={tw`text-blue-400`}>{patient.meet_link}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PatientDetailScreen;
