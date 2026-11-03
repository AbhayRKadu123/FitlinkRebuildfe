
import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import Toast from 'react-native-toast-message';
export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <RootNavigator />

            <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
