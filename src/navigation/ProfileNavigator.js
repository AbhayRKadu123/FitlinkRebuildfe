
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from "../screens/main/ProfileScreen.js"
import HistoryWorkoutScreen from "../screens/main/WorkoutScreenSubScreen/HistoryWorkoutScreen.js"
import AboutFitlink from '../screens/main/ProfileScreenSubscreens/AboutFitlink.js';
import HelpAndSupport from "../screens/main/ProfileScreenSubscreens/HelpAndSupport.js"
import setting from "../screens/main/ProfileScreenSubscreens/setting.js"
import NotificationPage from "../screens/main/ProfileScreenSubscreens/NotificationPage.js"
const Stack = createNativeStackNavigator();

export default function ProfileNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
      />
       <Stack.Screen
        name="AboutFitlink"
        component={AboutFitlink}
      />
      {/* HelpAndSupport */}
       <Stack.Screen
        name="HelpAndSupport"
        component={HelpAndSupport}
      />
       <Stack.Screen
        name="NotificationPage"
        component={NotificationPage}
      />
       <Stack.Screen
        name="setting"
        component={setting}
      />
      {/* NotificationPage */}
      {/* HistoryWorkoutScreen */}
    </Stack.Navigator>
  );
}
