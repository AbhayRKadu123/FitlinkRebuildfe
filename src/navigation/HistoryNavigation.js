
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HistoryScreen from "../screens/main/HistoryScreen.js"
import HistoryWorkoutScreen from "../screens/main/WorkoutScreenSubScreen/HistoryWorkoutScreen.js"

const Stack = createNativeStackNavigator();

export default function HistoryNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="History"
        component={HistoryScreen}
      />
       <Stack.Screen
        name="HistoryWorkoutScreen"
        component={HistoryWorkoutScreen}
      />
      {/* HistoryWorkoutScreen */}
    </Stack.Navigator>
  );
}
