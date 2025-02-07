import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Pressable,
  Button,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import tw from "tailwind-react-native-classnames";
import { Linking } from "react-native";

const ScheduleScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const accessToken = await AsyncStorage.getItem("access_token"); // Get the access token
        const response = await axios.get(
          "https://telemed-h2h9awcpdqg0hvac.uksouth-01.azurewebsites.net/api/v1.0/appointments/upcoming",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("API Response:", response.data); // Log the response data to see the structure

        if (response.data.appointments) {
          setAppointments(response.data.appointments);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.first_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      appointment.last_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleAccept = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "accepted" }
          : appointment
      )
    );
  };

  const handleReject = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "rejected" }
          : appointment
      )
    );
  };

  const handleUpdateStatus = (id, status) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status } : appointment
      )
    );
  };

  return (
    <View style={tw`bg-gray-900 p-4 flex-1`}>
      <Text style={tw`text-white text-2xl font-bold`}>Doctor's Schedule</Text>

      <TextInput
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={tw`bg-gray-700 text-white p-4 rounded-lg mt-4 mb-4`}
        placeholder="Search by patient name..."
        placeholderTextColor="#aaa"
      />

      {isLoading ? (
        <Text style={tw`text-white text-xl`}>Loading appointments...</Text>
      ) : (
        <>
          <Text style={tw`text-white text-xl font-bold mt-6`}>
            Upcoming Appointments
          </Text>
          <FlatList
            data={filteredAppointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={tw`bg-gray-800 p-4 rounded-lg mt-4`}>
                <View style={tw`flex-row items-center`}>
                  <Image
                    source={{ uri: item.image_url }}
                    style={tw`w-16 h-16 rounded-full mr-4`}
                  />
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white text-xl font-bold`}>
                      {item.first_name} {item.last_name}
                    </Text>
                    <Text style={tw`text-gray-400`}>Date: {item.date}</Text>
                    <Text style={tw`text-gray-400`}>Time: {item.time}</Text>
                    <Text style={tw`text-gray-400`}>
                      Details: {item.details}
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => handleViewDetails(item)}
                    style={tw`bg-blue-500 p-2 rounded-full mt-2`}
                  >
                    <Text style={tw`text-white text-sm`}>View Details</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </>
      )}

{selectedAppointment && (
  <Modal
    visible={isModalVisible}
    animationType="slide"
    transparent={true}
    onRequestClose={closeModal}
  >
    <Pressable
      style={tw`bg-black bg-opacity-50 flex-1 justify-end`}
      onPress={closeModal}
    >
      <View style={tw`bg-gray-800 p-6 rounded-tl-xl rounded-tr-xl h-3/4`}>
        <Text style={tw`text-white text-3xl font-bold mb-4 text-center`}>
          Appointment Details
        </Text>

        {/* Patient Info */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-400 text-lg`}>Patient:</Text>
          <Text style={tw`text-white text-2xl font-semibold`}>
            {selectedAppointment.first_name} {selectedAppointment.last_name}
          </Text>
          <Text style={tw`text-gray-400 text-lg mt-2`}>Date:</Text>
          <Text style={tw`text-white text-lg`}>
            {selectedAppointment.date}
          </Text>
          <Text style={tw`text-gray-400 text-lg mt-2`}>Time:</Text>
          <Text style={tw`text-white text-lg`}>
            {selectedAppointment.time}
          </Text>
          <Text style={tw`text-gray-400 text-lg mt-2`}>Details:</Text>
          <Text style={tw`text-white text-lg`}>
            {selectedAppointment.details}
          </Text>
        </View>

        {/* Appointment Status */}
        <Text style={tw`text-gray-400 text-lg`}>Status:</Text>
        <Text style={tw`text-white text-lg mb-4`}>
          {selectedAppointment.status}
        </Text>

        {/* Status Actions */}
        {selectedAppointment.status === "pending" && (
          <View style={tw`flex-row justify-between mt-6`}>
            <TouchableOpacity
              onPress={() => handleAccept(selectedAppointment.id)}
              style={tw`bg-blue-600 p-3 rounded-lg flex-1 mr-2`}
            >
              <Text style={tw`text-white text-lg text-center font-semibold`}>
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleReject(selectedAppointment.id)}
              style={tw`bg-red-600 p-3 rounded-lg flex-1 ml-2`}
            >
              <Text style={tw`text-white text-lg text-center font-semibold`}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedAppointment.status === "accepted" && (
          <TouchableOpacity
            onPress={() =>
              handleUpdateStatus(selectedAppointment.id, "completed")
            }
            style={tw`bg-yellow-500 p-4 rounded-lg mt-6`}
          >
            <Text style={tw`text-white text-lg text-center font-semibold`}>
              Complete
            </Text>
          </TouchableOpacity>
        )}

        {selectedAppointment.status === "completed" && (
          <TouchableOpacity
            onPress={() =>
              handleUpdateStatus(selectedAppointment.id, "rescheduled")
            }
            style={tw`bg-teal-600 p-4 rounded-lg mt-6`}
          >
            <Text style={tw`text-white text-lg text-center font-semibold`}>
              Reschedule
            </Text>
          </TouchableOpacity>
        )}

        {/* Meet Link Section */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-gray-400 text-lg`}>Meet Link:</Text>
          <Text
            style={tw`text-blue-500 text-lg underline`}
            onPress={() =>
              Linking.openURL(`${selectedAppointment.meet_link}`)
            }
          >
            {selectedAppointment.meet_link}
          </Text>
        </View>

        {/* Join Now Button */}
        {selectedAppointment.status === "accepted" && (
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`${selectedAppointment.meet_link}`)
            }
            style={tw`bg-green-600 p-4 rounded-lg mt-6`}
          >
            <Text style={tw`text-white text-lg text-center font-semibold`}>
              Join Now
            </Text>
          </TouchableOpacity>
        )}

        {/* Close Button */}
        <View style={tw`mt-6`}>
          <TouchableOpacity
            onPress={closeModal}
            style={tw`bg-gray-600 p-3 rounded-lg w-full`}
          >
            <Text style={tw`text-white text-lg text-center font-semibold`}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  </Modal>
)}

    </View>
  );
};

export default ScheduleScreen;
