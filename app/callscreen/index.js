import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { StreamVideoClient, StreamVideoProvider, Call } from '@stream-io/video-react-native-sdk';

const API_KEY = '2nve74ufxjr9';
const USER_ID = 'tommaso-id';
const USER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3Mzg5NDAyODksInVzZXJfaWQiOiJ0b21tYXNvLWlkIn0.YlOi0OVz9l5mMdu5J5DUuI3m_IWuaXFae7O-HdB8hs8';
const CALL_ID = '4b772a64-752c-45e8-a5aa-8c41bb5a3a55';

export default function VideoCallScreen() {
  const [call, setCall] = useState(null);

  useEffect(() => {
    const client = new StreamVideoClient({
      apiKey: API_KEY,
      userId: USER_ID,
      token: USER_TOKEN,
    });

    const newCall = client.call('default', CALL_ID);
    newCall.join().then(() => {
      setCall(newCall);
    });
  }, []);

  return (
    <StreamVideoProvider client={client}>
      <View style={{ flex: 1 }}>
        {call ? <Call call={call} /> : <Text>Connecting...</Text>}
      </View>
    </StreamVideoProvider>
  );
}
