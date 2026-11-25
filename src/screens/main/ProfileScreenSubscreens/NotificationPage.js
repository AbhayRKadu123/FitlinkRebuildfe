
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';

// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@react-native-vector-icons/ionicons';
const initialNotifications = [
  {
    id: '1',
    title: 'Workout Completed!',
    message: 'Great job! You completed your Push Day workout.',
    time: '10 minutes ago',
    icon: 'checkmark-circle',
    color: '#16A34A',
    background: '#DCFCE7',
    unread: true,
    section: 'Today',
  },
  {
    id: '2',
    title: 'Weekly Goal Progress',
    message: 'You have completed 3 out of 5 workouts this week.',
    time: '2 hours ago',
    icon: 'trophy',
    color: '#D97706',
    background: '#FEF3C7',
    unread: true,
    section: 'Today',
  },
  {
    id: '3',
    title: 'Workout Reminder',
    message: 'Time to train! Stay consistent with your fitness goals.',
    time: '5 hours ago',
    icon: 'alarm',
    color: '#2563EB',
    background: '#DBEAFE',
    unread: false,
    section: 'Today',
  },
  {
    id: '4',
    title: 'New Personal Record!',
    message: 'Congratulations! You achieved a new personal best.',
    time: 'Yesterday',
    icon: 'barbell',
    color: '#9333EA',
    background: '#F3E8FF',
    unread: false,
    section: 'Earlier',
  },
  {
    id: '5',
    title: 'Welcome to FitLink',
    message: 'Start building routines and tracking your workouts.',
    time: '2 days ago',
    icon: 'fitness',
    color: '#2563EB',
    background: '#DBEAFE',
    unread: false,
    section: 'Earlier',
  },
];

export default function NotificationPage({ navigation }) {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const unreadCount = notifications.filter(
    item => item.unread
  ).length;

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(item => ({ ...item, unread: false }))
    );
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(item =>
        item.id === id ? { ...item, unread: false } : item
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  const renderNotification = (item) => (
    <TouchableOpacity
      key={item.id}
      activeOpacity={0.8}
      style={[
        styles.notificationCard,
        item.unread && styles.unreadCard,
      ]}
      onPress={() => markAsRead(item.id)}
    >
      <View
        style={[
          styles.notificationIcon,
          { backgroundColor: item.background },
        ]}
      >
        <Ionicons
          name={item.icon}
          size={23}
          color={item.color}
        />
      </View>

      <View style={styles.notificationInfo}>
        <View style={styles.titleRow}>
          <Text style={styles.notificationTitle}>
            {item.title}
          </Text>

          {item.unread && <View style={styles.unreadDot} />}
        </View>

        <Text style={styles.notificationMessage}>
          {item.message}
        </Text>

        <Text style={styles.notificationTime}>
          {item.time}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteNotification(item.id)}
      >
        <Ionicons
          name="close"
          size={19}
          color="#94A3B8"
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const todayNotifications = notifications.filter(
    item => item.section === 'Today'
  );

  const earlierNotifications = notifications.filter(
    item => item.section === 'Earlier'
  );

  return (
    <SafeAreaView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={23}
            color="#172343"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Notifications</Text>

        <TouchableOpacity
          onPress={markAllAsRead}
          disabled={unreadCount === 0}
        >
          <Text
            style={[
              styles.markReadText,
              unreadCount === 0 && { color: '#CBD5E1' },
            ]}
          >
            Read all
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryIcon}>
            <Ionicons
              name="notifications"
              size={25}
              color="#2563EB"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.summaryTitle}>
              Stay Updated
            </Text>
            <Text style={styles.summaryDescription}>
              You have {unreadCount} unread notification
              {unreadCount !== 1 ? 's' : ''}.
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {unreadCount}
            </Text>
          </View>
        </View>

        {/* Today */}
        {todayNotifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today</Text>

            {todayNotifications.map(renderNotification)}
          </View>
        )}

        {/* Earlier */}
        {earlierNotifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Earlier</Text>

            {earlierNotifications.map(renderNotification)}
          </View>
        )}

        {/* Empty State */}
        {notifications.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="notifications-off-outline"
                size={42}
                color="#2563EB"
              />
            </View>

            <Text style={styles.emptyTitle}>
              No Notifications
            </Text>

            <Text style={styles.emptyDescription}>
              You're all caught up! We'll notify you when
              something important happens.
            </Text>
          </View>
        )}

        <View style={styles.footer}>
          <Ionicons
            name="fitness-outline"
            size={23}
            color="#2563EB"
          />
          <Text style={styles.footerText}>
            Keep training. Keep progressing.
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

  markReadText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2563EB',
  },

  scrollContent: {
    paddingBottom: 25,
  },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 18,
    padding: 16,
    borderRadius: 16,
  },

  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 13,
  },

  summaryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#172343',
  },

  summaryDescription: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
  },

  countBadge: {
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  countText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  section: {
    marginHorizontal: 18,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#172343',
    marginBottom: 12,
  },

  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 15,
    marginBottom: 10,
  },

  unreadCard: {
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },

  notificationIcon: {
    width: 47,
    height: 47,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  notificationInfo: {
    flex: 1,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  notificationTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#172343',
    flex: 1,
  },

  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#2563EB',
    marginLeft: 5,
  },

  notificationMessage: {
    fontSize: 12,
    lineHeight: 18,
    color: '#64748B',
    marginTop: 5,
  },

  notificationTime: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 7,
  },

  deleteButton: {
    padding: 5,
    marginLeft: 5,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 35,
    paddingTop: 75,
  },

  emptyIcon: {
    width: 85,
    height: 85,
    borderRadius: 25,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#172343',
    marginTop: 18,
  },

  emptyDescription: {
    fontSize: 13,
    lineHeight: 21,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 8,
  },

  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  footerText: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 8,
  },
});
