
import React, { use, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GetUserDetail } from "../../utils/GetUserDetail.js"
import { removeData } from "../../storage/storage.js"
import Toast from 'react-native-toast-message';
import NotificationPage from './ProfileScreenSubscreens/NotificationPage.js';
const ProfileScreen = ({ navigation }) => {
  // Sample profile data for now
  const [user] = useState({
    name: 'Abhay Kadu',
    email: 'abhay@example.com',
    workouts: 28,
    totalReps: '1.2k',
    totalWeight: '7.5k kg',
    goal: 'Build Strength',
    calories: '2000 kcal',
    protein: '150g Protein',
  });
  let [userdetail, setuserdetail] = useState(null)

  const handleEditProfile = () => {
    Alert.alert('Edit Profile', 'Edit profile functionality coming soon!');
  };

  const fetchUserDetails = async () => {
    try {
      const response = await GetUserDetail();
      setuserdetail(response.user)

      if (response.success) {
        console.log('User Details:', response.user);
      }
    } catch (error) {
      console.log('Failed to fetch user details');
    }
  };
  const handleLogout = () => {
    removeData('token');
    Toast.show({
      type: 'success',
      text1: 'User logged out successfully.',
      text2: 'Thanks for using our app!❤️',
      position: 'top',
      visibilityTime: 2500,
    });
    return navigation?.replace('Auth');

  };

  const handleMenuPress = (title) => {
    if (title == "About FitLink") {
      navigation.navigate("AboutFitlink")

    } else if (title == "Help & Support") {
      navigation.navigate("HelpAndSupport")

      // HelpAndSupport
    }
    else if (title == 'Notifications') {
      // setting
      navigation.navigate("NotificationPage")



    } else if (title == 'App Settings') {
      // NotificationPage
      navigation.navigate("setting")


    }
    else {
      Alert.alert(title, `${title} functionality coming soon!`);
    }
  };
  useEffect(() => {
    fetchUserDetails()

  }, [])

  const ProfileStat = ({ icon, value, label, color }) => (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={23} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  const MenuItem = ({ icon, title, subtitle, onPress, color = '#246BFD' }) => (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={[styles.menuIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={21} color={color} />
      </View>

      <View style={styles.menuTextContainer}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle ? (
          <Text style={styles.menuSubtitle}>{subtitle}</Text>
        ) : null}
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9AA4B7" />
    </TouchableOpacity>
  );

  return (
    // <SafeAreaView style={styles.container} edges={['top']}>
    <>
      <StatusBar
        backgroundColor="#246BFD"
        barStyle="light-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.topBar}>
            <Text style={styles.headerTitle}>My Profile</Text>

            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() => handleMenuPress('Settings')}
            >
              <Ionicons name="settings-outline" size={23} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={54} color="#246BFD" />
            </View>

            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={handleEditProfile}
            >
              <Ionicons name="camera" size={15} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{userdetail?.name || user.name}</Text>
          <Text style={styles.userEmail}>{userdetail?.email || user.email}</Text>

          <View style={styles.taglineContainer}>
            <Text style={styles.tagline}>Stronger Every Day</Text>
            <Ionicons name="barbell" size={16} color="#FFFFFF" />
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <ProfileStat
            icon="barbell-outline"
            value={user.workouts}
            label="Workouts"
            color="#246BFD"
          />

          <ProfileStat
            icon="trophy-outline"
            value={user.totalReps}
            label="Total Reps"
            color="#F5A623"
          />

          <ProfileStat
            icon="star-outline"
            value={user.totalWeight}
            label="Total Weight"
            color="#F5A623"
          />
        </View>

        {/* My Goals */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Your Fitness</Text>

          <MenuItem
            icon="locate-outline"
            title="My Goals"
            subtitle={user.goal}
            onPress={() => handleMenuPress('My Goals')}
          />

          <View style={styles.menuDivider} />

          <MenuItem
            icon="nutrition-outline"
            title="Nutrition Profile"
            subtitle={`${user.calories} • ${user.protein}`}
            color="#20A66B"
            onPress={() => handleMenuPress('Nutrition Profile')}
          />
        </View>

        {/* App Settings */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>General</Text>

          <MenuItem
            icon="settings-outline"
            title="App Settings"
            onPress={() => handleMenuPress('App Settings')}
          />

          <View style={styles.menuDivider} />

          <MenuItem
            icon="notifications-outline"
            title="Notifications"
            onPress={() => handleMenuPress('Notifications')}
          />

          <View style={styles.menuDivider} />

          <MenuItem
            icon="help-circle-outline"
            title="Help & Support"
            onPress={() => handleMenuPress('Help & Support')}
          />

          <View style={styles.menuDivider} />

          <MenuItem
            icon="information-circle-outline"
            title="About FitLink"
            subtitle="Version 1.0.0"
            onPress={() => handleMenuPress('About FitLink')}
          />
        </View>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={21} color="#246BFD" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Made with ❤️ for your fitness journey
        </Text>

        <View style={{ height: 25 }} />
      </ScrollView>
    </>

  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FC',
  },

  scrollContent: {
    paddingBottom: 15,
  },

  // Profile Header
  profileHeader: {
    backgroundColor: '#246BFD',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },

  topBar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#FFFFFF',
  },

  settingsButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },

  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  editAvatarButton: {
    position: 'absolute',
    bottom: 2,
    right: 0,
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: '#14264D',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  userName: {
    fontSize: 23,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 5,
  },

  userEmail: {
    fontSize: 13,
    color: '#DCE7FF',
    marginTop: 5,
  },

  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 13,
  },

  tagline: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  // Statistics
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: -18,
    gap: 10,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingVertical: 17,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#AAB5CC',
    shadowOpacity: 0.10,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
  },

  statValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#172343',
    marginTop: 9,
  },

  statLabel: {
    fontSize: 10,
    color: '#7C87A1',
    marginTop: 4,
    textAlign: 'center',
  },

  // Sections
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    marginHorizontal: 18,
    marginTop: 20,
    paddingHorizontal: 15,
    paddingTop: 16,
    paddingBottom: 5,
    elevation: 2,
    shadowColor: '#AAB5CC',
    shadowOpacity: 0.08,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },

  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#172343',
    marginBottom: 8,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
  },

  menuIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  menuTextContainer: {
    flex: 1,
    marginLeft: 13,
  },

  menuTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172343',
  },

  menuSubtitle: {
    fontSize: 11,
    color: '#8490A9',
    marginTop: 4,
  },

  menuDivider: {
    height: 1,
    backgroundColor: '#EDF0F6',
    marginLeft: 55,
  },

  // Logout
  logoutButton: {
    height: 51,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#246BFD',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 18,
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  logoutText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#246BFD',
  },

  footerText: {
    textAlign: 'center',
    fontSize: 11,
    color: '#9AA4B7',
    marginTop: 19,
  },
});
