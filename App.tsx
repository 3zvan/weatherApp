import React, { useState } from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { Alert } from 'react-native';

import LoadingScreen from './screens/LoadingScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto': require('./assets/fonts/Roboto-Regular.ttf')
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (!fontsLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setFontsLoaded(true)} onError={(err) => Alert.alert(err.toString())} />
    )
  }

  return (
    <LoadingScreen />
  );
}