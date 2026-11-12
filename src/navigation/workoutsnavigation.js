
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WorkoutsScreen from '../screens/main/WorkoutsScreen';
// import CreateRoutineScreen from '../screens/main/CreateRoutineScreen';
import CreateNewRoutineScreen from '../screens/main/WorkoutScreenSubScreen/CreateNewRoutineScreen';
import { View, Text } from 'react-native';
import EditRoutineScreen from '../screens/main/WorkoutScreenSubScreen/EditRoutineScreen';



const Stack = createNativeStackNavigator();

export default function workoutsnavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="WorkoutsMain"
        component={WorkoutsScreen}
      />

      <Stack.Screen
        name="CreateRoutine"
        component={CreateNewRoutineScreen}
      />
      <Stack.Screen
        name="EditRoutine"
        component={EditRoutineScreen}
      // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
