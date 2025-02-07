import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function App() {
  const router = useRouter();

  useEffect(() => {
    // Automatically navigate to the next page after 3 seconds
    const timer = setTimeout(() => {
      router.push('/auth/sign-in');
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [router]);

  return (
    <LinearGradient
      colors={['#FFFFFF', '#E0F7FA', '#B2EBF2']} // Light blue gradient (adjust based on your image)
      style={styles.gradient}
    >
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/image.png')} // Replace with your logo
          style={styles.logo} 
        />
        <Text style={styles.appName}>Daktari360</Text>
        <Text style={styles.tagline}>TELEMEDICINE</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: width * 0.4, // 40% of screen width
    height: width * 0.4, // Keep it proportional
    maxWidth: 200, // Set a maximum width to prevent it from becoming too large on bigger screens
    maxHeight: 200, // Set a maximum height for similar reasons
    resizeMode: 'contain', // Ensure the logo retains its aspect ratio
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#00796B', // Dark teal color (adjust based on your image)
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Subtle shadow for better readability
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  tagline: {
    fontSize: 18,
    color: '#00796B', // Dark teal color (adjust based on your image)
    marginTop: 10,
    fontWeight: '600',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)', // Subtle shadow for better readability
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});