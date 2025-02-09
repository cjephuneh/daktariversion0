import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';

const DoctorHomePage = () => {
  const [chats, setChats] = useState([
    {
      id: "1",
      patient: "John Doe",
      message: "Can you help me with my prescription?",
      status: "Pending",
    },
    {
      id: "2",
      patient: "Jane Smith",
      message: "When will you be available?",
      status: "Pending",
    },
  ]);
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patientName: "John Doe",
      date: "2025-03-01",
      time: "10:00 AM",
      status: "pending",
      details: "Consultation for chest pain.",
      photo:"https://th.bing.com/th/id/R.63a4f4f49e91bd9ce1c10127d91e1c50?rik=gqL0210dX1VZdw&riu=http%3a%2f%2fwww.parliament.go.ke%2fsites%2fdefault%2ffiles%2f2022-09%2fmini_cropped+sudi.jpg&ehk=xYLK73BW3pctZMeBJgeRInl718PhMmrkcdjtGAdMmpU%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      date: "2025-03-02",
      time: "2:00 PM",
      status: "accepted",
      details: "Follow-up on skin rash treatment.",
      photo:"https://th.bing.com/th/id/R.63a4f4f49e91bd9ce1c10127d91e1c50?rik=gqL0210dX1VZdw&riu=http%3a%2f%2fwww.parliament.go.ke%2fsites%2fdefault%2ffiles%2f2022-09%2fmini_cropped+sudi.jpg&ehk=xYLK73BW3pctZMeBJgeRInl718PhMmrkcdjtGAdMmpU%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      id: "3",
      patientName: "Emily Johnson",
      date: "2025-03-28",
      time: "11:00 AM",
      status: "completed",
      details: "Routine check-up.",
      photo:"https://th.bing.com/th/id/R.63a4f4f49e91bd9ce1c10127d91e1c50?rik=gqL0210dX1VZdw&riu=http%3a%2f%2fwww.parliament.go.ke%2fsites%2fdefault%2ffiles%2f2022-09%2fmini_cropped+sudi.jpg&ehk=xYLK73BW3pctZMeBJgeRInl718PhMmrkcdjtGAdMmpU%3d&risl=&pid=ImgRaw&r=0",
    },
  ]);
  const [selectedDate, setSelectedDate] = useState("2025-02-01");
  const [modalVisible, setModalVisible] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([
    "10:00 AM",
    "2:00 PM",
    "4:00 PM",
  ]);

  const handleSetAvailableTimes = () => {
    setModalVisible(true);
  };

  const handleTimeSelection = (time) => {
    // Handle time selection logic
    console.log("Selected Time:", time);
    setModalVisible(false); // Close modal after time selection
  };

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) > new Date()
  );

  return (
    <ScrollView contentContainerStyle={tw`bg-gray-900 p-4`}>
      {/* Header Section with Doctor's Name and Notification Icon */}
      <View style={tw`flex-row justify-between items-center`}>
        <Text style={tw`text-white text-2xl font-bold`}>Welcome Daktari</Text>
        <TouchableOpacity>
          <Ionicons name="notifications" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={tw`text-white text-2xl font-bold`}>Dr. John Smith</Text>

      {/* Available Times Card */}
      <View style={tw`bg-gray-800 p-4 rounded-lg mt-6`}>
        <Text style={tw`text-white text-xl font-bold`}>
          Set Your Available Times
        </Text>
        <TouchableOpacity
          style={tw`bg-blue-500 p-3 rounded-lg mt-4`}
          onPress={handleSetAvailableTimes}
        >
          <Text style={tw`text-white text-center text-lg`}>
            Set Available Times
          </Text>
        </TouchableOpacity>

        {/* {/* Date Picker */}
        <DateTimePicker
          style={tw`mt-4`}
          date={selectedDate}
          mode="date"
          placeholder="Select Date"
          format="YYYY-MM-DD"
          minDate="2025-01-01"
          maxDate="2025-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: {
              backgroundColor: "#333",
              borderRadius: 8,
              padding: 10,
            },
            dateText: { color: "white", fontSize: 16 },
          }}
          onDateChange={(date) => setSelectedDate(date)}
        />
      </View>

      {/* Upcoming Appointments */}
      <Text style={tw`text-white text-xl font-bold mt-6`}>
        Upcoming Appointments
      </Text>
      <FlatList
        data={upcomingAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={tw`bg-gray-800 p-4 rounded-lg mb-4`}>
            <View style={tw`flex-row items-center`}>
              <Image
                source={{ uri: item.photo }}
                style={tw`w-16 h-16 rounded-full mr-4`}
              />
              <View style={tw`flex-1`}>
                <Text style={tw`text-white text-xl font-bold`}>
                  {item.patientName}
                </Text>
                <Text style={tw`text-gray-400`}>Date: {item.date}</Text>
                <Text style={tw`text-gray-400`}>Time: {item.time}</Text>
                <Text style={tw`text-gray-400`}>Details: {item.details}</Text>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={tw`mt-4`}
      />

      {/* Chat/Pending Chats Card */}
      <View style={tw`mt-6`}>
        <Text style={tw`text-white text-xl font-bold mb-4`}>Pending Chats</Text>
        <FlatList
          data={chats}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={tw`bg-gray-700 p-4 rounded-lg mb-4 flex-row items-center`}
            >
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/1.jpg",
                }}
                style={tw`w-12 h-12 rounded-full mr-4`}
              />
              <View>
                <Text style={tw`text-white text-lg`}>{item.patient}</Text>
                <Text style={tw`text-gray-400`}>{item.message}</Text>
                <Text style={tw`text-yellow-500`}>{item.status}</Text>
              </View>
            </View>
          )}
        />
      </View>

      {/* Quick Actions */}
      <Text
        style={[tw`text-xl text-gray-900 mb-4`, { fontFamily: "outfit-bold" }]}
      >
        Quick Actions
      </Text>
      <View style={tw`flex-row flex-wrap -mx-2`}>
        {[
          {
            title: "Start Consultation",
            icon: "videocam",
            color: "bg-yellow-100",
            route: "/videocall",
          },
          {
            title: "View Schedule",
            icon: "calendar",
            color: "bg-green-100",
            route: "/schedule",
          },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={tw`w-1/2 px-2 mb-4`}>
            <View
              style={[tw`${item.color} p-4 rounded-2xl`, { minHeight: 100 }]}
            >
              <View
                style={tw`bg-white w-10 h-10 rounded-xl items-center justify-center mb-3`}
              >
                <Ionicons name={item.icon} size={24} color="#1c1917" />
              </View>
              <Text
                style={[tw`text-gray-900`, { fontFamily: "outfit-medium" }]}
              >
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal for Setting Available Times */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <View style={tw`flex-1 justify-end`}>
          <View style={tw`bg-gray-800 p-6 rounded-lg`}>
            <Text style={tw`text-white text-2xl font-bold mb-4`}>
              Set Your Available Times
            </Text>
            <ScrollView>
              <Text style={tw`text-white text-lg`}>Available Time Slots</Text>
              {availableTimes.map((time, index) => (
                <TouchableOpacity
                  key={index}
                  style={tw`bg-blue-500 p-3 rounded-lg mt-2`}
                  onPress={() => handleTimeSelection(time)}
                >
                  <Text style={tw`text-white text-center`}>{time}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default DoctorHomePage;
