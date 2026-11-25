
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@react-native-vector-icons/ionicons';
const features = [
  {
    icon: 'barbell-outline',
    title: 'Workout Tracking',
    description: 'Track your exercises, sets, reps and lifting weights.',
  },
  {
    icon: 'calendar-outline',
    title: 'Workout History',
    description: 'Keep track of your completed workouts and training history.',
  },
  {
    icon: 'stats-chart-outline',
    title: 'Progress Tracking',
    description: 'Monitor your workout activity and stay consistent.',
  },
  {
    icon: 'fitness-outline',
    title: 'Custom Routines',
    description: 'Create and manage workout routines according to your goals.',
  },
];

export default function AboutFitlink({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={23} color="#172343" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>About FitLink</Text>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* App Branding */}
        <View style={styles.brandSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="fitness" size={42} color="#FFFFFF" />
          </View>

          <Text style={styles.appName}>FitLink</Text>
          <Text style={styles.tagline}>
            Train Better. Track Progress. Stay Strong.
          </Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        {/* About Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Who We Are</Text>

          <Text style={styles.description}>
            FitLink is a workout tracking application designed to help you
            organize your fitness journey. Whether you are a beginner or an
            experienced athlete, FitLink helps you manage your workouts,
            build routines and track your training progress.
          </Text>
        </View>

        {/* Features */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What You Can Do</Text>

          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Ionicons
                  name={feature.icon}
                  size={23}
                  color="#2563EB"
                />
              </View>

              <View style={styles.featureInfo}>
                <Text style={styles.featureTitle}>
                  {feature.title}
                </Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Mission */}
        <View style={styles.missionCard}>
          <Ionicons name="rocket-outline" size={27} color="#2563EB" />

          <Text style={styles.missionTitle}>Our Mission</Text>

          <Text style={styles.missionDescription}>
            To make workout tracking simple, organized and accessible,
            helping every individual stay consistent and work towards
            becoming stronger.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Made for people who love fitness.
          </Text>
          <Text style={styles.copyright}>
            © {new Date().getFullYear()} FitLink. All rights reserved.
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

  brandSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#FFFFFF',
    marginBottom: 18,
  },

  logoContainer: {
    width: 82,
    height: 82,
    borderRadius: 24,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  appName: {
    fontSize: 29,
    fontWeight: '800',
    color: '#172343',
  },

  tagline: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 7,
  },

  version: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 10,
  },

  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172343',
    marginBottom: 14,
  },

  description: {
    fontSize: 14,
    lineHeight: 23,
    color: '#64748B',
  },

  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    marginBottom: 11,
  },

  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  featureInfo: {
    flex: 1,
  },

  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#172343',
  },

  featureDescription: {
    fontSize: 12,
    lineHeight: 19,
    color: '#64748B',
    marginTop: 4,
  },

  missionCard: {
    backgroundColor: '#EFF6FF',
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 18,
    alignItems: 'center',
  },

  missionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#172343',
    marginTop: 10,
    marginBottom: 8,
  },

  missionDescription: {
    fontSize: 13,
    lineHeight: 21,
    color: '#475569',
    textAlign: 'center',
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 28,
  },

  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#475569',
  },

  copyright: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 8,
  },
});
