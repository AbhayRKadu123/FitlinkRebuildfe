
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

const recentWorkouts = [
  {
    id: '1',
    title: 'Push Day',
    details: 'Chest, Shoulders & Triceps',
    date: 'Yesterday',
    duration: '52 min',
    icon: 'barbell-outline',
  },
  {
    id: '2',
    title: 'Pull Day',
    details: 'Back & Biceps',
    date: '2 days ago',
    duration: '46 min',
    icon: 'fitness-outline',
  },
];

export default function HomeScreen({ navigation }) {
  // Demo values; replace with user data later.
  const userName = 'Athlete';
  const hasCompletedWorkoutToday = true;
  // const hasRecentWorkouts = recentWorkouts.length > 0;
  const hasRecentWorkouts = false;
const weeklyActivity = [
  { day: 'Thu', completed: true },
  { day: 'Fri', completed: false },
  { day: 'Sat', completed: true },
  { day: 'Sun', completed: false },
  { day: 'Mon', completed: true },
  { day: 'Tue', completed: true },
  { day: 'Wed', completed: false },
];

const weeklyWorkoutCount = weeklyActivity.filter(
  day => day.completed,
).length;

const weeklyGoal = 5;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F9FC" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Greeting and profile avatar */}
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>FITLINK</Text>
            <Text style={styles.greeting}>Hello, {userName} 👋</Text>
            <Text style={styles.subGreeting}>
              Ready to get stronger today?
            </Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Open profile"
            style={styles.avatar}
            onPress={() => navigation.navigate('Profile')}
          >
            <Ionicons name="person-outline" size={25} color="#2563EB" />
          </Pressable>
        </View>

        {/* Today's workout status */}
        <View style={styles.statusCard}>
          <View style={styles.statusTopRow}>
            <View>
              <Text style={styles.statusLabel}>TODAY'S ACTIVITY</Text>
              <Text style={styles.statusTitle}>
                {hasCompletedWorkoutToday
                  ? 'Workout completed!'
                  : 'Make today count'}
              </Text>
            </View>

            <View style={styles.statusIcon}>
              <Ionicons
                name={hasCompletedWorkoutToday ? 'checkmark-circle' : 'flash'}
                size={25}
                color="#FFFFFF"
              />
            </View>
          </View>

          <Text style={styles.statusDescription}>
            {hasCompletedWorkoutToday
              ? 'Great work. Keep building consistency.'
              : 'One session at a time. Start when you are ready.'}
          </Text>

          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                {
                  width: hasCompletedWorkoutToday ? '100%' : '0%',
                },
              ]}
            />
          </View>

          <Text style={styles.progressLabel}>
            {hasCompletedWorkoutToday ? '1 workout completed' : 'No workout logged yet'}
          </Text>
        </View>
        {/* Weekly Activity */}
<View style={styles.weeklyCard}>
  <View style={styles.weeklyHeader}>
    <View>
      <Text style={styles.weeklyTitle}>Weekly Activity</Text>
      <Text style={styles.weeklySubtitle}>
        Your consistency this week
      </Text>
    </View>

    <View style={styles.weeklyIcon}>
      <Ionicons
        name="calendar-outline"
        size={22}
        color="#2563EB"
      />
    </View>
  </View>

  <View style={styles.weeklyStats}>
    <View>
      <Text style={styles.weeklyCount}>
        {weeklyWorkoutCount}
      </Text>
      <Text style={styles.weeklyStatLabel}>
        Workouts this week
      </Text>
    </View>

    <View style={styles.goalBadge}>
      <Text style={styles.goalText}>
        Goal: {weeklyGoal}
      </Text>
    </View>
  </View>

  <View style={styles.weeklyProgressTrack}>
    <View
      style={[
        styles.weeklyProgressFill,
        {
          width: `${Math.min(
            (weeklyWorkoutCount / weeklyGoal) * 100,
            100,
          )}%`,
        },
      ]}
    />
  </View>

  <View style={styles.weeklyDays}>
    {weeklyActivity.map(item => (
      <View key={item.day} style={styles.weeklyDay}>
        <View
          style={[
            styles.dayIndicator,
            item.completed && styles.activeDayIndicator,
          ]}
        >
          {item.completed && (
            <Ionicons
              name="checkmark"
              size={14}
              color="#FFFFFF"
            />
          )}
        </View>

        <Text style={styles.weeklyDayLabel}>
          {item.day}
        </Text>
      </View>
    ))}
  </View>
</View>

        {/* Quick actions */}
        <Text style={styles.sectionTitle}>Quick actions</Text>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.primaryAction}
            onPress={() => navigation.navigate('Workouts')}
          >
            <View style={styles.actionIconPrimary}>
              <Ionicons name="play" size={20} color="#2563EB" />
            </View>
            <Text style={styles.primaryActionTitle}>Start Workout</Text>
            <Text style={styles.primaryActionSubtitle}>
              Get your session going
            </Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#FFFFFF"
              style={styles.actionArrow}
            />
          </Pressable>

          <Pressable
            style={styles.secondaryAction}
            onPress={() => navigation.navigate('Workouts')}
          >
            <View style={styles.actionIconSecondary}>
              <Ionicons name="list-outline" size={21} color="#2563EB" />
            </View>
            <Text style={styles.secondaryActionTitle}>View Routines</Text>
            <Text style={styles.secondaryActionSubtitle}>
              Choose your plan
            </Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color="#2563EB"
              style={styles.actionArrow}
            />
          </Pressable>
        </View>

        {/* Recent sessions */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent workouts</Text>

          <Pressable onPress={() => navigation.navigate('History')}>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        {hasRecentWorkouts ? (
          recentWorkouts.map(workout => (
            <Pressable
              key={workout.id}
              style={styles.workoutCard}
              onPress={() => navigation.navigate('History')}
            >
              <View style={styles.workoutIcon}>
                <Ionicons
                  name={workout.icon}
                  size={23}
                  color="#2563EB"
                />
              </View>

              <View style={styles.workoutInfo}>
                <Text style={styles.workoutTitle}>{workout.title}</Text>
                <Text style={styles.workoutDetails}>
                  {workout.details}
                </Text>
                <Text style={styles.workoutDate}>{workout.date}</Text>
              </View>

              <View style={styles.durationContainer}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color="#64748B"
                />
                <Text style={styles.duration}>{workout.duration}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="barbell-outline"
                size={28}
                color="#2563EB"
              />
            </View>
            <Text style={styles.emptyTitle}>Your journey starts here</Text>
            <Text style={styles.emptyDescription}>
              Complete your first workout and your sessions will appear here.
            </Text>
            <Pressable
              style={styles.emptyButton}
              onPress={() => navigation.navigate('Workouts')}
            >
              <Text style={styles.emptyButtonText}>Explore workouts</Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.footerText}>
          Small steps. Stronger every day.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  eyebrow: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    color: '#2563EB',
    marginBottom: 5,
  },
  greeting: {
    fontSize: 25,
    fontWeight: '800',
    color: '#172554',
  },
  subGreeting: {
    marginTop: 5,
    fontSize: 13,
    color: '#64748B',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F0FF',
    borderWidth: 1,
    borderColor: '#D5E3FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusCard: {
    backgroundColor: '#2563EB',
    borderRadius: 22,
    padding: 20,
    marginBottom: 27,
  },
  statusTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusLabel: {
    color: '#DCE8FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  statusTitle: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '800',
    marginTop: 8,
  },
  statusIcon: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDescription: {
    color: '#E6EEFF',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 13,
  },
  progressTrack: {
    height: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.25)',
    marginTop: 20,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
  progressLabel: {
    color: '#E6EEFF',
    fontSize: 11,
    marginTop: 9,
  },
  sectionTitle: {
    color: '#172554',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 14,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 28,
  },
  primaryAction: {
    flex: 1,
    minHeight: 160,
    backgroundColor: '#2563EB',
    borderRadius: 19,
    padding: 15,
  },
  secondaryAction: {
    flex: 1,
    minHeight: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    borderWidth: 1,
    borderColor: '#E4EAF3',
    padding: 15,
  },
  actionIconPrimary: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  actionIconSecondary: {
    width: 39,
    height: 39,
    borderRadius: 13,
    backgroundColor: '#E8F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  primaryActionTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryActionTitle: {
    color: '#172554',
    fontSize: 14,
    fontWeight: '800',
  },
  primaryActionSubtitle: {
    color: '#E6EEFF',
    fontSize: 11,
    marginTop: 6,
    lineHeight: 16,
  },
  secondaryActionSubtitle: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 6,
    lineHeight: 16,
  },
  actionArrow: {
    position: 'absolute',
    right: 14,
    bottom: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  seeAll: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 14,
  },
  workoutCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E9EEF5',
    padding: 14,
    marginBottom: 11,
  },
  workoutIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutInfo: {
    flex: 1,
    marginLeft: 12,
  },
  workoutTitle: {
    color: '#172554',
    fontSize: 14,
    fontWeight: '800',
  },
  workoutDetails: {
    color: '#64748B',
    fontSize: 11,
    marginTop: 4,
  },
  workoutDate: {
    color: '#94A3B8',
    fontSize: 10,
    marginTop: 5,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: 5,
  },
  duration: {
    color: '#64748B',
    fontSize: 10,
  },
  emptyCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9EEF5',
    padding: 23,
  },
  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 20,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 13,
  },
  emptyTitle: {
    color: '#172554',
    fontSize: 16,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptyDescription: {
    color: '#64748B',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 19,
    marginTop: 8,
  },
  emptyButton: {
    backgroundColor: '#EAF1FF',
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 12,
    marginTop: 16,
  },
  emptyButtonText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '800',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 22,
  },
  weeklyCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 20,
  padding: 18,
  marginBottom: 27,
  borderWidth: 1,
  borderColor: '#E4EAF3',
},

weeklyHeader: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

weeklyTitle: {
  fontSize: 17,
  fontWeight: '800',
  color: '#172554',
},

weeklySubtitle: {
  fontSize: 12,
  color: '#64748B',
  marginTop: 5,
},

weeklyIcon: {
  width: 42,
  height: 42,
  borderRadius: 13,
  backgroundColor: '#E8F0FF',
  alignItems: 'center',
  justifyContent: 'center',
},

weeklyStats: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: 20,
},

weeklyCount: {
  fontSize: 28,
  fontWeight: '800',
  color: '#172554',
},

weeklyStatLabel: {
  fontSize: 12,
  color: '#64748B',
  marginTop: 3,
},

goalBadge: {
  backgroundColor: '#E8F0FF',
  paddingHorizontal: 12,
  paddingVertical: 7,
  borderRadius: 10,
},

goalText: {
  fontSize: 12,
  fontWeight: '700',
  color: '#2563EB',
},

weeklyProgressTrack: {
  height: 7,
  borderRadius: 5,
  backgroundColor: '#E8EEF7',
  overflow: 'hidden',
  marginTop: 16,
},

weeklyProgressFill: {
  height: '100%',
  borderRadius: 5,
  backgroundColor: '#2563EB',
},

weeklyDays: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 18,
},

weeklyDay: {
  alignItems: 'center',
  gap: 7,
},

dayIndicator: {
  width: 28,
  height: 28,
  borderRadius: 10,
  backgroundColor: '#EEF2F7',
  alignItems: 'center',
  justifyContent: 'center',
},

activeDayIndicator: {
  backgroundColor: '#2563EB',
},

weeklyDayLabel: {
  fontSize: 11,
  fontWeight: '600',
  color: '#64748B',
},
});
