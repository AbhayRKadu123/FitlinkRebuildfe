
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@react-native-vector-icons/ionicons';
const filters = ['All Time', 'This Month', 'Last 3 Months', 'This Year'];

const workouts = [
  {
    id: '1',
    name: 'Push Day',
    exercises: 6,
    duration: 55,
    date: 'Nov 08, 2026',
    icon: 'barbell-outline',
    color: '#EAF1FF',
  },
  {
    id: '2',
    name: 'Pull Day',
    exercises: 5,
    duration: 50,
    date: 'Nov 06, 2026',
    icon: 'fitness-outline',
    color: '#EAF7F1',
  },
  {
    id: '3',
    name: 'Leg Day',
    exercises: 7,
    duration: 65,
    date: 'Nov 04, 2026',
    icon: 'body-outline',
    color: '#FFF3E8',
  },
  {
    id: '4',
    name: 'Shoulder Day',
    exercises: 5,
    duration: 45,
    date: 'Nov 02, 2026',
    icon: 'barbell-outline',
    color: '#F2EDFF',
  },
];

const weeklyData = [1, 2, 2.5, 1.5, 2.4, 1.9, 3];

const StatCard = ({ icon, value, label, color }) => (
  <View style={styles.statCard}>
    <View style={[styles.statIcon, { backgroundColor: color + '18' }]}>
      <Ionicons name={icon} size={21} color={color} />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const HistoryScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('All Time');

  const handleWorkoutPress = (workout) => {
    // Later navigate to workout details
    console.log('Selected workout:', workout.name);
  };

  return (
    // <SafeAreaView style={styles.container} edges={['top']}>
    <>
      <StatusBar
        backgroundColor="#FFFFFF"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Workout History</Text>
            <Text style={styles.subtitle}>
              Track your progress over time
            </Text>
          </View>

          <TouchableOpacity style={styles.calendarButton}>
            <Ionicons name="calendar-outline" size={23} color="#246BFD" />
          </TouchableOpacity>
        </View>

        {/* Date Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterScroll}
          contentContainerStyle={styles.filterContainer}
        >
          {filters.map((filter) => {
            const active = selectedFilter === filter;

            return (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  active && styles.activeFilter,
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.activeFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <StatCard
            icon="barbell-outline"
            value="28"
            label="Workouts"
            color="#246BFD"
          />

          <StatCard
            icon="time-outline"
            value="1,482"
            label="Total Minutes"
            color="#4285F4"
          />

          <StatCard
            icon="flame-outline"
            value="12.5k"
            label="Calories"
            color="#FF9635"
          />
        </View>

        {/* Workout Trend */}
        <View style={styles.chartCard}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleContainer}>
              <Ionicons
                name="stats-chart"
                size={21}
                color="#246BFD"
              />
              <Text style={styles.sectionTitle}>Workout Trend</Text>
            </View>

            <Text style={styles.chartPeriod}>Last 7 Weeks</Text>
          </View>

          <View style={styles.chartArea}>
            <View style={styles.yAxis}>
              <Text style={styles.axisText}>3</Text>
              <Text style={styles.axisText}>2</Text>
              <Text style={styles.axisText}>1</Text>
              <Text style={styles.axisText}>0</Text>
            </View>

            <View style={styles.chartContent}>
              <View style={styles.gridLines}>
                {[0, 1, 2, 3].map((item) => (
                  <View key={item} style={styles.gridLine} />
                ))}
              </View>

              <View style={styles.barContainer}>
                {weeklyData.map((value, index) => (
                  <View key={index} style={styles.barColumn}>
                    <View
                      style={[
                        styles.bar,
                        { height: `${(value / 3) * 100}%` },
                      ]}
                    />
                    <Text style={styles.weekLabel}>
                      W{index + 1}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Recent Workouts */}
        <View style={styles.recentHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>

          <TouchableOpacity
            onPress={() => console.log('See all workouts')}
          >
            <Text style={styles.seeAll}>
              See All <Ionicons name="arrow-forward" size={13} />
            </Text>
          </TouchableOpacity>
        </View>

        {workouts.map((workout) => (
          <TouchableOpacity
            key={workout.id}
            style={styles.workoutCard}
            activeOpacity={0.8}
            onPress={() => handleWorkoutPress(workout)}
          >
            <View
              style={[
                styles.workoutIcon,
                { backgroundColor: workout.color },
              ]}
            >
              <Ionicons
                name={workout.icon}
                size={25}
                color="#246BFD"
              />
            </View>

            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>
                {workout.name}
              </Text>

              <Text style={styles.workoutDetails}>
                {workout.exercises} exercises • {workout.duration} min
              </Text>

              <Text style={styles.workoutDate}>
                {workout.date}
              </Text>
            </View>

            <View style={styles.completedIcon}>
              <Ionicons
                name="checkmark"
                size={15}
                color="#FFFFFF"
              />
            </View>
          </TouchableOpacity>
        ))}

        {/* Bottom spacing */}
        <View style={{ height: 25 }} />
      </ScrollView>
      </>
    
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FE',
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23,
  },

  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#111C3A',
  },

  subtitle: {
    fontSize: 14,
    color: '#7C87A1',
    marginTop: 5,
  },

  calendarButton: {
    width: 48,
    height: 48,
    borderRadius: 15,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterScroll: {
    marginBottom: 20,
  },

  filterContainer: {
    alignItems: 'center',
    gap: 8,
  },

  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderRadius: 25,
    backgroundColor: '#EDF1F8',
  },

  activeFilter: {
    backgroundColor: '#246BFD',
  },

  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64708B',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  statsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#AAB5CC',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 9,
  },

  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#172343',
  },

  statLabel: {
    fontSize: 11,
    color: '#7C87A1',
    marginTop: 4,
    textAlign: 'center',
  },

  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 17,
    marginBottom: 25,
    elevation: 2,
    shadowColor: '#AAB5CC',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#172343',
  },

  chartPeriod: {
    fontSize: 11,
    color: '#7C87A1',
    fontWeight: '600',
  },

  chartArea: {
    height: 155,
    flexDirection: 'row',
  },

  yAxis: {
    justifyContent: 'space-between',
    paddingBottom: 24,
    paddingRight: 10,
  },

  axisText: {
    fontSize: 10,
    color: '#8490A9',
  },

  chartContent: {
    flex: 1,
    position: 'relative',
  },

  gridLines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    paddingBottom: 25,
  },

  gridLine: {
    height: 1,
    backgroundColor: '#E9EEF7',
    width: '100%',
  },

  barContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },

  barColumn: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  bar: {
    width: 17,
    backgroundColor: '#3478F6',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 8,
  },

  weekLabel: {
    fontSize: 10,
    color: '#8490A9',
    marginTop: 8,
  },

  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  seeAll: {
    color: '#246BFD',
    fontSize: 13,
    fontWeight: '700',
  },

  workoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 11,
    elevation: 2,
    shadowColor: '#AAB5CC',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  workoutIcon: {
    width: 52,
    height: 52,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },

  workoutInfo: {
    flex: 1,
    marginLeft: 12,
  },

  workoutName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#172343',
  },

  workoutDetails: {
    fontSize: 11,
    color: '#7C87A1',
    marginTop: 5,
  },

  workoutDate: {
    fontSize: 10,
    color: '#A0A9BA',
    marginTop: 4,
  },

  completedIcon: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#28B66B',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
