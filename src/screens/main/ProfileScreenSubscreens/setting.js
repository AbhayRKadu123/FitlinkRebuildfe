
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@react-native-vector-icons/ionicons';
const SettingItem = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
}) => {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!onPress && !rightElement}
    >
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={21} color="#2563EB" />
      </View>

      <View style={styles.settingInfo}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.settingSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      {rightElement || (
        <Ionicons
          name="chevron-forward"
          size={19}
          color="#94A3B8"
        />
      )}
    </TouchableOpacity>
  );
};

export default function setting({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [workoutReminders, setWorkoutReminders] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const showDummyAlert = (title) => {
    Alert.alert(title, 'This feature will be available soon.');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color="#172343" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Settings</Text>

        <View style={{ width: 42 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Account Settings */}
        <Text style={styles.sectionTitle}>ACCOUNT</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="person-outline"
            title="Edit Profile"
            subtitle="Manage your personal information"
            onPress={() => showDummyAlert('Edit Profile')}
          />

          <SettingItem
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Update your account password"
            onPress={() => showDummyAlert('Change Password')}
          />
        </View>

        {/* Notifications */}
        <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle="Receive app notifications"
            rightElement={
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                thumbColor={notifications ? '#2563EB' : '#F8FAFC'}
              />
            }
          />

          <SettingItem
            icon="alarm-outline"
            title="Workout Reminders"
            subtitle="Get reminded to stay consistent"
            rightElement={
              <Switch
                value={workoutReminders}
                onValueChange={setWorkoutReminders}
                trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                thumbColor={workoutReminders ? '#2563EB' : '#F8FAFC'}
              />
            }
          />
        </View>

        {/* Workout Preferences */}
        <Text style={styles.sectionTitle}>WORKOUT PREFERENCES</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="volume-high-outline"
            title="Sound Effects"
            subtitle="Enable workout interaction sounds"
            rightElement={
              <Switch
                value={soundEffects}
                onValueChange={setSoundEffects}
                trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                thumbColor={soundEffects ? '#2563EB' : '#F8FAFC'}
              />
            }
          />

          <SettingItem
            icon="trophy-outline"
            title="Weekly Workout Goal"
            subtitle="Manage your weekly target"
            onPress={() => showDummyAlert('Weekly Workout Goal')}
          />
        </View>

        {/* Appearance */}
        <Text style={styles.sectionTitle}>APPEARANCE</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Switch between light and dark themes"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: '#CBD5E1', true: '#93C5FD' }}
                thumbColor={darkMode ? '#2563EB' : '#F8FAFC'}
              />
            }
          />
        </View>

        {/* Privacy */}
        <Text style={styles.sectionTitle}>PRIVACY & SECURITY</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="shield-checkmark-outline"
            title="Privacy Policy"
            onPress={() => showDummyAlert('Privacy Policy')}
          />

          <SettingItem
            icon="document-text-outline"
            title="Terms & Conditions"
            onPress={() => showDummyAlert('Terms & Conditions')}
          />
        </View>

        {/* App Information */}
        <Text style={styles.sectionTitle}>ABOUT</Text>
        <View style={styles.sectionCard}>
          <SettingItem
            icon="information-circle-outline"
            title="About FitLink"
            onPress={() => navigation.navigate('AboutFitLink')}
          />

          <SettingItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => navigation.navigate('HelpSupport')}
          />

          <SettingItem
            icon="star-outline"
            title="Rate FitLink"
            onPress={() => showDummyAlert('Rate FitLink')}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerAppName}>FitLink</Text>
          <Text style={styles.footerVersion}>Version 1.0.0</Text>
          <Text style={styles.footerCopyright}>
            Made for your fitness journey.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  header: {
    height: 58,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172343',
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1,
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 10,
  },

  sectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    borderRadius: 16,
    paddingHorizontal: 14,
  },

  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  settingIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },

  settingInfo: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172343',
  },

  settingSubtitle: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 4,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 30,
  },

  footerAppName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2563EB',
  },

  footerVersion: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 5,
  },

  footerCopyright: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 7,
  },
});
