import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';

const ChatScreen = ({ route }) => {
  const { patient } = route.params;  // Patient data passed from the PatientDetailScreen
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: "Hello, how are you feeling today?", sender: 'doctor' },
    { id: '2', text: "I'm feeling better, thank you!", sender: 'patient' },
    // Previous messages here...
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages([...messages, { id: Date.now().toString(), text: message, sender: 'doctor' }]);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView style={tw`flex-1`} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={tw`flex-1 bg-gray-900`}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={tw`p-4 ${item.sender === 'doctor' ? 'bg-purple-700 self-end' : 'bg-gray-600 self-start'} mb-2 rounded-lg max-w-3/4`}>
              <Text style={tw`text-white`}>{item.text}</Text>
            </View>
          )}
          inverted
        />
        <View style={tw`p-4 flex-row items-center bg-gray-800`}>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#aaa"
            style={tw`bg-gray-700 text-white p-4 rounded-lg flex-1 mr-2`}
          />
          <TouchableOpacity onPress={handleSendMessage} style={tw`bg-purple-800 p-4 rounded-full`}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
