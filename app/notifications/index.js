import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notificationsData = [
  { id: '1', type: 'Booking', message: 'John Doe booked an appointment for 3:00 PM' },
  { id: '2', type: 'Update', message: 'Your profile has been successfully updated' },
  { id: '3', type: 'Booking', message: 'Jane Smith booked an appointment for 4:00 PM' },
  { id: '4', type: 'Reminder', message: 'Your next appointment is in 2 hours' },
  { id: '5', type: 'Update', message: 'A new feature has been added to the app' },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(notificationsData);

  useEffect(() => {
    // In a real-world app, you could fetch notifications from an API or state management
    // For now, we'll use the static data in `notificationsData`
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Ionicons 
        name={item.type === 'Booking' ? 'book' : 'notifications'} 
        size={24} 
        color={styles.icon.color} 
        style={styles.icon}
      />
      <View style={styles.notificationText}>
        <Text style={styles.notificationType}>{item.type}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.notificationsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827', // Dark background color from sign-up
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FCD34D', // Accent yellow for header
    marginBottom: 20,
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#1F2937', // Slightly lighter dark from sign-up
    borderRadius: 8,
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#FCD34D', // Accent yellow border
  },
  icon: {
    marginRight: 15,
    color: '#FCD34D', // Accent yellow for icons
  },
  notificationText: {
    flex: 1,
  },
  notificationType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FCD34D', // Accent yellow for notification type
  },
  notificationMessage: {
    fontSize: 12,
    color: '#D1D5DB', // Light gray color for message text
  },
});
