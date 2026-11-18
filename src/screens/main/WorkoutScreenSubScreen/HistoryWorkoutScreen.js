
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';

import { Ionicons } from '@react-native-vector-icons/ionicons';
import API from '../../../api/api';
// --------------------------------------------------
// DUMMY HISTORY DATA
// --------------------------------------------------

const mockHistory = {
  _id: 'session_001',
  routineName: 'Push Day',
  date: '2026-11-16T00:00:00.000Z',
  startTime: '2026-11-16T10:30:00.000Z',
  endTime: '2026-11-16T12:00:00.000Z',
  duration: '1h 30m',
  notes: 'Good workout. Strength was better today.',
  exercises: [
    {
      exerciseId: 'ex_001',
      exerciseName: 'Bench Press',
      muscleGroup: 'Chest',
      sets: [
        { weight: 80, reps: 10 },
        { weight: 85, reps: 8 },
        { weight: 90, reps: 6 },
      ],
    },
    {
      exerciseId: 'ex_002',
      exerciseName: 'Incline Dumbbell Press',
      muscleGroup: 'Chest',
      sets: [
        { weight: 30, reps: 12 },
        { weight: 32.5, reps: 10 },
        { weight: 35, reps: 8 },
      ],
    },
    {
      exerciseId: 'ex_003',
      exerciseName: 'Shoulder Press',
      muscleGroup: 'Shoulders',
      sets: [
        { weight: 20, reps: 12 },
        { weight: 22.5, reps: 10 },
        { weight: 25, reps: 8 },
      ],
    },
    {
      exerciseId: 'ex_004',
      exerciseName: 'Triceps Pushdown',
      muscleGroup: 'Triceps',
      sets: [
        { weight: 30, reps: 15 },
        { weight: 35, reps: 12 },
        { weight: 40, reps: 10 },
      ],
    },
  ],
};

// --------------------------------------------------
// MAIN SCREEN
// --------------------------------------------------

const HistoryWorkoutScreen = ({ navigation, route }) => {

  // Dummy data for now
const Id = route?.params?.Id;

const [workout, setWorkout] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchWorkoutHistory = async () => {
        // Alert.alert('success', 'Workout session ID is not missing');

    try {
      if (!Id) {
        Alert.alert('Error', 'Workout session ID is missing');
        return;
      }

      setLoading(true);

      const response = await API.get(`/routines/${Id}`);

      setWorkout(response.data.data);
        // Alert.alert('success', 'Workout fetched successfully');


    } catch (error) {
      console.log(
        'Fetch workout history error:',
        error.response?.data || error.message
      );

      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to fetch workout history'
      );
    } finally {
      setLoading(false);
    }
  };

  fetchWorkoutHistory();
}, [Id]);

const [expandedExercises, setExpandedExercises] = useState([]);

useEffect(() => {
  if (workout?.exercises) {
    setExpandedExercises(workout?.exercises?.map(() => true));
  }
}, [workout]);

  // --------------------------------------------------
  // HELPER VALUES
  // --------------------------------------------------

  const totalSets = workout?.exercises?.reduce(
    (total, exercise) => total + exercise.sets.length,
    0
  );

  const formattedDate = new Date(workout?.date).toLocaleDateString(
    'en-IN',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }
  );

  const formattedStartTime = new Date(
    workout?.startTime
  ).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // --------------------------------------------------
  // EXPAND / COLLAPSE
  // --------------------------------------------------

  const handleToggleExercise = (exerciseIndex) => {
    setExpandedExercises(previous =>
      previous.map((expanded, index) =>
        index === exerciseIndex ? !expanded : expanded
      )
    );
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center', marginTop: 50 }}>
        Loading workout history...
      </Text>
    </SafeAreaView>
  );
}

if (!workout) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center', marginTop: 50 }}>
        Workout history not found.
      </Text>
    </SafeAreaView>
  );
}
  return (
    
  

   
      

    <SafeAreaView style={styles.container}>
     

      
      
      
      <StatusBar
        backgroundColor="#F7F9FE"
        barStyle="dark-content"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* HEADER */}

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

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>
              Workout History
            </Text>

            <Text style={styles.headerSubtitle}>
              View your workout performance
            </Text>
          </View>
        </View>

        {/* ROUTINE CARD */}

        <View style={styles.routineCard}>
          <View style={styles.routineIcon}>
            <Ionicons
              name="barbell"
              size={34}
              color="#246BFD"
            />
          </View>

          <View style={styles.routineInfo}>
            <Text style={styles.routineName}>
              {workout.routineName}
            </Text>

            <Text style={styles.routineMuscles}>
              {workout.exercises
                .map(exercise => exercise.muscleGroup)
                .filter((value, index, self) =>
                  self.indexOf(value) === index
                )
                .join(' • ')}
            </Text>

            <View style={styles.routineMeta}>
              <Ionicons
                name="fitness-outline"
                size={16}
                color="#246BFD"
              />

              <Text style={styles.metaText}>
                {workout?.exercises?.length} Exercises
              </Text>

              <View style={styles.metaDivider} />

              <Ionicons
                name="layers-outline"
                size={16}
                color="#246BFD"
              />

              <Text style={styles.metaText}>
                {totalSets} Sets
              </Text>
            </View>
          </View>
        </View>

        {/* DATE AND TIME */}

        <View style={styles.detailsRow}>

          <View style={styles.detailCard}>
            <Ionicons
              name="calendar-outline"
              size={23}
              color="#246BFD"
            />

            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>
                Date
              </Text>

              <Text style={styles.detailValue}>
                {formattedDate}
              </Text>
            </View>
          </View>

          <View style={styles.detailCard}>
            <Ionicons
              name="time-outline"
              size={23}
              color="#246BFD"
            />

            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>
                Start Time
              </Text>

              <Text style={styles.detailValue}>
                {formattedStartTime}
              </Text>
            </View>
          </View>

        </View>

        {/* WORKOUT SUMMARY */}

        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <Ionicons
              name="barbell-outline"
              size={21}
              color="#246BFD"
            />

            <Text style={styles.summaryValue}>
              {workout?.exercises?.length}
            </Text>

            <Text style={styles.summaryLabel}>
              Exercises
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Ionicons
              name="layers-outline"
              size={21}
              color="#246BFD"
            />

            <Text style={styles.summaryValue}>
              {totalSets}
            </Text>

            <Text style={styles.summaryLabel}>
              Total Sets
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Ionicons
              name="hourglass-outline"
              size={21}
              color="#246BFD"
            />

            <Text style={styles.summaryValue}>
              {workout.duration}
            </Text>

            <Text style={styles.summaryLabel}>
              Duration
            </Text>
          </View>
        </View>

        {/* EXERCISES HEADER */}

        <View style={styles.exerciseHeader}>
          <Text style={styles.sectionTitle}>
            Exercises
          </Text>

          <Text style={styles.exerciseCount}>
            {workout?.exercises?.length} Exercises
          </Text>
        </View>

        {/* EXERCISE CARDS */}

        {workout?.exercises?.map((exercise, exerciseIndex) => (

          <View
            key={exercise.exerciseId || exerciseIndex}
            style={styles.exerciseCard}
          >

            <View style={styles.exerciseTop}>

              <View style={styles.exerciseIcon}>
                <Ionicons
                  name="barbell-outline"
                  size={25}
                  color="#246BFD"
                />
              </View>

              <TouchableOpacity
                style={styles.exerciseNameContainer}
                onPress={() =>
                  handleToggleExercise(exerciseIndex)
                }
              >
                <Text style={styles.exerciseName}>
                  {exercise.exerciseName}
                </Text>

                <Text style={styles.muscleName}>
                  {exercise.muscleGroup}
                </Text>

                <Text style={styles.setSummary}>
                  {exercise.sets.length} Sets Completed
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() =>
                  handleToggleExercise(exerciseIndex)
                }
              >
                <Ionicons
                  name={
                    expandedExercises[exerciseIndex]
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  size={22}
                  color="#64708B"
                />
              </TouchableOpacity>

            </View>

            {/* SET DETAILS */}

            {expandedExercises[exerciseIndex] && (

              <View style={styles.setSection}>

                {/* COLUMN HEADINGS */}

                <View style={styles.setHeadingRow}>

                  <Text style={[
                    styles.columnHeading,
                    styles.setColumn
                  ]}>
                    SET
                  </Text>

                  <Text style={[
                    styles.columnHeading,
                    styles.valueColumn
                  ]}>
                    WEIGHT (KG)
                  </Text>

                  <Text style={[
                    styles.columnHeading,
                    styles.valueColumn
                  ]}>
                    REPS
                  </Text>

                  <View style={styles.deleteColumn} />

                </View>

                {/* SET ROWS */}

                {exercise.sets.map((set, setIndex) => (

                  <View
                    key={setIndex}
                    style={styles.setRow}
                  >

                    <View style={styles.setNumber}>
                      <Text style={styles.setNumberText}>
                        {setIndex + 1}
                      </Text>
                    </View>

                    <View style={styles.readOnlyInput}>
                      <Text style={styles.inputValue}>
                        {set.weight}
                      </Text>
                    </View>

                    <View style={styles.readOnlyInput}>
                      <Text style={styles.inputValue}>
                        {set.reps}
                      </Text>
                    </View>

                    <View style={styles.completedIcon}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#16A34A"
                      />
                    </View>

                  </View>

                ))}

              </View>
            )}

          </View>

        ))}

        {/* NOTES */}

        {workout.notes ? (
          <View style={styles.notesContainer}>

            <View style={styles.notesHeader}>
              <Ionicons
                name="document-text-outline"
                size={21}
                color="#246BFD"
              />

              <Text style={styles.notesTitle}>
                Workout Notes
              </Text>
            </View>

            <View style={styles.notesInput}>
              <Text style={styles.notesValue}>
                {workout.notes}
              </Text>
            </View>

          </View>
        ) : null}

        {/* HISTORY FOOTER */}

        <View style={styles.footer}>
          <Ionicons
            name="shield-checkmark-outline"
            size={18}
            color="#16A34A"
          />

          <Text style={styles.footerText}>
            Completed Workout • Read Only
          </Text>
        </View>

        <View style={{ height: 25 }} />

      </ScrollView>
    </SafeAreaView>
  

  );
};

export default HistoryWorkoutScreen;

// --------------------------------------------------
// STYLES
// --------------------------------------------------

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F7F9FE',
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 12,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  backButton: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerText: {
    marginLeft: 13,
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#172343',
  },

  headerSubtitle: {
    fontSize: 12,
    color: '#7C87A1',
    marginTop: 3,
  },

  routineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 19,
    padding: 14,
    marginBottom: 17,
    elevation: 2,
  },

  routineIcon: {
    width: 65,
    height: 65,
    borderRadius: 15,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  routineInfo: {
    flex: 1,
    marginLeft: 13,
  },

  routineName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172343',
  },

  routineMuscles: {
    fontSize: 12,
    color: '#75819A',
    marginTop: 4,
  },

  routineMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },

  metaText: {
    fontSize: 11,
    color: '#64708B',
    fontWeight: '600',
  },

  metaDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#DCE2EF',
    marginHorizontal: 6,
  },

  detailsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },

  detailCard: {
    flex: 1,
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 11,
    gap: 9,
    borderWidth: 1,
    borderColor: '#E7ECF5',
  },

  detailText: {
    flex: 1,
  },

  detailLabel: {
    fontSize: 10,
    color: '#8490A9',
  },

  detailValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#172343',
    marginTop: 4,
  },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    paddingVertical: 17,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E7ECF5',
  },

  summaryItem: {
    flex: 1,
    alignItems: 'center',
    gap: 5,
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#172343',
  },

  summaryLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#8490A9',
  },

  summaryDivider: {
    width: 1,
    height: 45,
    backgroundColor: '#E7ECF5',
  },

  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#172343',
  },

  exerciseCount: {
    fontSize: 12,
    color: '#246BFD',
    fontWeight: '700',
  },

  exerciseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    padding: 13,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: '#E4EAF7',
    elevation: 1,
  },

  exerciseTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  exerciseIcon: {
    width: 52,
    height: 52,
    borderRadius: 13,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  exerciseNameContainer: {
    flex: 1,
    marginLeft: 11,
  },

  exerciseName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#172343',
  },

  muscleName: {
    fontSize: 11,
    color: '#8490A9',
    marginTop: 3,
  },

  setSummary: {
    fontSize: 10,
    color: '#246BFD',
    fontWeight: '700',
    marginTop: 3,
  },

  iconButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  setSection: {
    marginTop: 15,
  },

  setHeadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  columnHeading: {
    fontSize: 9,
    color: '#8490A9',
    fontWeight: '800',
    textAlign: 'center',
  },

  setColumn: {
    width: '15%',
  },

  valueColumn: {
    flex: 1,
  },

  deleteColumn: {
    width: 35,
  },

  setRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 9,
    gap: 7,
  },

  setNumber: {
    width: '15%',
    height: 42,
    borderRadius: 11,
    backgroundColor: '#EAF1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  setNumberText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#246BFD',
  },

  readOnlyInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#F7F9FE',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#DDE4F1',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#172343',
  },

  completedIcon: {
    width: 35,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notesContainer: {
    marginTop: 8,
    marginBottom: 20,
  },

  notesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    marginBottom: 10,
  },

  notesTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#172343',
  },

  notesInput: {
    minHeight: 75,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE4F1',
    padding: 13,
  },

  notesValue: {
    fontSize: 13,
    color: '#64708B',
    lineHeight: 20,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 14,
  },

  footerText: {
    fontSize: 11,
    color: '#8490A9',
    fontWeight: '600',
  },

});
