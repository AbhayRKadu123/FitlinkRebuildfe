
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useEffect } from 'react';
import {
  // ScrollView,
  RefreshControl,
} from 'react-native';
// import {Ionicons} from '@react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from "../../../api/api.js"// Adjust the path as necessary

// --------------------------------------------------
// MOCK DATA
// --------------------------------------------------

const mockRoutine = {
  id: 'routine_001',
  name: 'Push Day',
  muscleGroups: 'Chest • Shoulders • Triceps',
  exercises: [
    {
      exerciseId: 'ex_001',
      exerciseName: 'Bench Press',
      muscleGroup: 'Chest',
      sets: [
        { weight: '80', reps: '10' },
        { weight: '85', reps: '8' },
        { weight: '87.5', reps: '6' },
      ],
    },
    {
      exerciseId: 'ex_002',
      exerciseName: 'Shoulder Press',
      muscleGroup: 'Shoulders',
      sets: [
        { weight: '15', reps: '12' },
        { weight: '17.5', reps: '10' },
        { weight: '20', reps: '8' },
      ],
    },
    {
      exerciseId: 'ex_003',
      exerciseName: 'Triceps Pushdown',
      muscleGroup: 'Triceps',
      sets: [
        { weight: '25', reps: '15' },
        { weight: '30', reps: '12' },
        { weight: '35', reps: '10' },
      ],
    },
  ],
};

// Available exercises for the Add Exercise button.
// Replace this with your exercises API later.
const availableExercises = [
  {
    exerciseId: 'ex_004',
    exerciseName: 'Incline Dumbbell Press',
    muscleGroup: 'Chest',
  },
  {
    exerciseId: 'ex_005',
    exerciseName: 'Cable Fly',
    muscleGroup: 'Chest',
  },
  {
    exerciseId: 'ex_006',
    exerciseName: 'Lateral Raises',
    muscleGroup: 'Shoulders',
  },
  {
    exerciseId: 'ex_007',
    exerciseName: 'Overhead Triceps Extension',
    muscleGroup: 'Triceps',
  },
  {
    exerciseId: 'ex_008',
    exerciseName: 'Dips',
    muscleGroup: 'Triceps',
  },
];

// --------------------------------------------------
// MAIN SCREEN
// --------------------------------------------------

const LogWorkoutScreen = ({ navigation, route }) => {
  // const routine = route?.params?.routine || mockRoutine;
  // const { routineId } = route.params;
  // const [exercises, setExercises] = useState(() => {
  //   const routineExercises = routine.exercises || mockRoutine.exercises;

  //   return routineExercises.map((exercise) => ({
  //     ...exercise,
  //     sets: exercise.sets?.length
  //       ? exercise.sets.map((set) => ({
  //         weight: String(set.weight ?? ''),
  //         reps: String(set.reps ?? ''),
  //       }))
  //       : [{ weight: '', reps: '' }],
  //     expanded: true,
  //   }));
  // });
  const routineId = route?.params?.routineId;
  const IsHistory=true;

  const [routine, setRoutine] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [existingSessionId, setExistingSessionId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Alert.alert('Routine ID', `The routine ID is: ${routineId}`);
  }, [routineId]);
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [startTime] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // --------------------------------------------------
  // ADD SET
  // --------------------------------------------------
  // useEffect(() => {
  //   const fetchWorkout = async () => {
  //     try {
  //       // const routineId =routineId;

  //       const response = await API.get(
  //         `/routines/getWorkoutByRoutineId/${routineId}`
  //       );

  //       const routine = response.data.data;

  //       if (!Array.isArray(routine?.exercises)) {
  //         console.log('Unexpected routine response:', routine);
  //         // Alert.alert('Error', 'Exercises not found');
  //         return;
  //       }

  //       setExercises(
  //         routine.exercises.map((exercise) => ({
  //           exerciseId: exercise._id,
  //           exerciseName: exercise.exerciseName || exercise.name || exercise?.exerciseId?.name,
  //           muscleGroup: exercise.muscleGroup || '',
  //           sets: exercise.sets?.length
  //             ? exercise.sets.map((set) => ({
  //               weight: String(set.weight ?? ''),
  //               reps: String(set.reps ?? ''),
  //             }))
  //             : [{ weight: '', reps: '' }],
  //           expanded: true,
  //         }))
  //       );

  //     } catch (error) {
  //       console.log(
  //         'Fetch workout error:',
  //         error.response?.data || error.message
  //       );

  //       // Alert.alert(
  //       //   'Error',
  //       //   error.response?.data?.message || error.message
  //       // );
  //     }
  //   };

  //   fetchWorkout();
  // }, [route?.params?.routine?._id, route?.params?.routine?.id]);


  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        if (!routineId) {
          // Alert.alert('Error', 'Routine ID not found');
            Toast.show({
                              type: 'error',
                              text1: 'Routine ID not found',     
                              
                              text2: 'Routine ID not found.',
                              position: 'top',
                              // visibilityTime: 2500,
                          });
          return;
        }

        setLoading(true);

        // 1. Fetch routine details
        const routineResponse = await API.get(
          `/routines/getWorkoutByRoutineId/${routineId}`
        );

        const routineData = routineResponse.data.data;
        setRoutine(routineData);

        // 2. Fetch today's existing session
        const sessionResponse = await API.get(
          `/routines/today/${routineId}`
        );

        const existingSession = sessionResponse.data.data;

        if (existingSession?._id) {
          setExistingSessionId(existingSession._id);
          setNotes(existingSession.notes || '');
        }

        // 3. Map routine exercises and merge existing session values
        const mappedExercises = routineData.exercises.map((item) => {
          const exerciseDetails = item.exerciseId;

          const savedExercise = existingSession?.exercises?.find(
            (saved) =>
              String(saved.exerciseId) === String(exerciseDetails?._id)
          );

          const savedSets = savedExercise?.sets || [];

          const targetSetCount = Number(item.sets) || 1;

          const totalSetCount = Math.max(
            targetSetCount,
            savedSets.length
          );

          const sets = Array.from(
            { length: totalSetCount },
            (_, index) => ({
              weight: String(savedSets[index]?.weight ?? ''),
              reps: String(savedSets[index]?.reps ?? ''),
            })
          );

          return {
            exerciseId: exerciseDetails?._id,
            exerciseName:
              exerciseDetails?.name ||
              exerciseDetails?.exerciseName ||
              'Exercise',
            muscleGroup: exerciseDetails?.muscleGroup || '',
            sets,
            expanded: true,
          };
        });

        setExercises(mappedExercises);

        console.log('Existing session:', existingSession);
        console.log('Loaded exercises:', mappedExercises);

      } catch (error) {
        console.log(
          'Fetch workout error:',
          error.response?.data || error.message
        );

        // Alert.alert(
        //   'Error',
        //   error.response?.data?.message || 'Unable to load workout'
        // );
            Toast.show({
                              type: 'error',
                              text1: 'error loading workout',     
                              
                              text2: error.response?.data?.message || 'Unable to load workout',
                              position: 'top',
                              // visibilityTime: 2500,
                          });
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [routineId]);


  const handleAddSet = (exerciseIndex) => {
    setExercises((previous) =>
      previous.map((exercise, index) => {
        if (index !== exerciseIndex) return exercise;

        return {
          ...exercise,
          sets: [
            ...exercise.sets,
            { weight: '', reps: '' },
          ],
        };
      }),
    );
  };

  // --------------------------------------------------
  // DELETE SET
  // --------------------------------------------------
  const onRefresh = async () => {
    setRefreshing(true);
    // await getAllRoutine();
    setRefreshing(false);
    // setselectedid(null);
  };
  const handleDeleteSet = (exerciseIndex, setIndex) => {
    setExercises((previous) =>
      previous.map((exercise, index) => {
        if (index !== exerciseIndex) return exercise;

        if (exercise.sets.length === 1) {
          // Alert.alert(
          //   'Cannot delete set',
          //   'An exercise must have at least one set.',
          // );
           Toast.show({
                              type: 'error',
                              text1: 'Cannot delete set',     
                              
                              text2: 'An exercise must have at least one set.',
                              position: 'top',
                              // visibilityTime: 2500,
                          });
          return exercise;
        }

        return {
          ...exercise,
          sets: exercise.sets.filter(
            (_, currentIndex) => currentIndex !== setIndex,
          ),
        };
      }),
    );
  };

  // --------------------------------------------------
  // UPDATE SET WEIGHT / REPS
  // --------------------------------------------------

  const handleSetChange = (
    exerciseIndex,
    setIndex,
    field,
    value,
  ) => {
    setExercises((previous) =>
      previous.map((exercise, index) => {
        if (index !== exerciseIndex) return exercise;

        return {
          ...exercise,
          sets: exercise.sets.map((set, currentIndex) => {
            if (currentIndex !== setIndex) return set;

            return {
              ...set,
              [field]: value,
            };
          }),
        };
      }),
    );
  };

  // --------------------------------------------------
  // EXPAND / COLLAPSE EXERCISE
  // --------------------------------------------------

  const handleToggleExercise = (exerciseIndex) => {
    setExercises((previous) =>
      previous.map((exercise, index) =>
        index === exerciseIndex
          ? { ...exercise, expanded: !exercise.expanded }
          : exercise,
      ),
    );
  };

  // --------------------------------------------------
  // ADD EXERCISE
  // --------------------------------------------------

  const handleAddExercise = () => {
    const unusedExercises = availableExercises.filter(
      (available) =>
        !exercises.some(
          (selected) => selected.exerciseId === available.exerciseId,
        ),
    );

    if (unusedExercises.length === 0) {
      // Alert.alert('No exercises available', 'All mock exercises have been added.');
       Toast.show({
                              type: 'error',
                              text1: 'No exercises available',     
                              
                              text2: 'All mock exercises have been added.',
                              position: 'top',
                              // visibilityTime: 2500,
                          });
      return;
    }

    const buttons = unusedExercises.slice(0, 3).map((exercise) => ({
      text: exercise.exerciseName,
      onPress: () => {
        setExercises((previous) => [
          ...previous,
          {
            ...exercise,
            sets: [{ weight: '', reps: '' }],
            expanded: true,
          },
        ]);
      },
    }));

    buttons.push({
      text: 'Cancel',
      style: 'cancel',
    });

    // Alert.alert(
    //   'Add Exercise',
    //   'Select an exercise to add',
    //   buttons,
    // );
     Toast.show({
                              type: 'error',
                              text1:  'Add Exercise',     
                              
                              text2: 'Select an exercise to add',
                              position: 'top',
                              // visibilityTime: 2500,
                          });
  };

  // --------------------------------------------------
  // DELETE EXERCISE
  // --------------------------------------------------

  const handleDeleteExercise = (exerciseIndex) => {
    Alert.alert(
      'Remove Exercise',
      'Are you sure you want to remove this exercise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setExercises((previous) =>
              previous.filter((_, index) => index !== exerciseIndex),
            );
          },
        },
      ],
    );
  };

  // --------------------------------------------------
  // SAVE WORKOUT API
  // --------------------------------------------------

  const handleSaveWorkout = async () => {
    if (exercises.length === 0) {
      // Alert.alert('No exercises', 'Please add at least one exercise.');
       Toast.show({
                              type: 'error',
                              text1:  'No exercises',     
                              
                              text2: 'Please add at least one exercise.',
                              position: 'top',
                              // visibilityTime: 2500,
                          });
      return;
    }


    for (const exercise of exercises) {
      const completedSets = exercise.sets.filter(
        (set) =>
          set.weight.trim() !== '' &&
          set.reps.trim() !== ''
      );

      for (const set of exercise.sets) {
        const hasWeight = set.weight.trim() !== '';
        const hasReps = set.reps.trim() !== '';

        // If only one field is entered, reject that incomplete set.
        if (hasWeight !== hasReps) {
          Toast.show({
            type: 'error',
            text1: 'Incomplete Set',
            text2: `Enter both weight and reps for ${exercise.exerciseName}, or leave both empty.`,
            position: 'top',
          });
          return;
        }

        if (
          hasWeight &&
          (!Number.isFinite(Number(set.weight)) ||
            !Number.isFinite(Number(set.reps)) ||
            Number(set.weight) < 0 ||
            Number(set.reps) <= 0)
        ) {
          Toast.show({
            type: 'error',
            text1: 'Invalid Set',
            text2: `Invalid values for ${exercise.exerciseName}`,
            position: 'top',
          });
          return;
        }
      }

      if (completedSets.length === 0) {
        // This exercise can be skipped if another exercise has a completed set.
        continue;
      }
    }

    const hasAtLeastOneCompletedSet = exercises.some((exercise) =>
      exercise.sets.some(
        (set) =>
          set.weight.trim() !== '' &&
          set.reps.trim() !== ''
      )
    );

    if (!hasAtLeastOneCompletedSet) {
      Toast.show({
        type: 'error',
        text1: 'No Sets Logged',
        text2: 'Please complete at least one set.',
        position: 'top',
      });
      return;
    }
    const payload = {
      routineId,
      routineName: routine?.title || 'Workout',
      date: new Date().toISOString(),
      startTime: startTime.toISOString(),
      notes: notes.trim(),

      exercises: exercises
        .map((exercise) => ({
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.exerciseName,
          muscleGroup: exercise.muscleGroup,

          // Send only sets where both values are entered
          sets: exercise.sets
            .filter(
              (set) =>
                set.weight.trim() !== '' &&
                set.reps.trim() !== ''
            )
            .map((set, index) => ({
              setNumber: index + 1,
              weight: Number(set.weight),
              reps: Number(set.reps),
              isCompleted: true,
            })),
        }))
        // Don't send exercises with no completed sets
        .filter((exercise) => exercise.sets.length > 0),
    };

    try {
  setSaving(true);

  let response;

  if (existingSessionId) {
    // Update today's existing workout session
    response = await API.put(
      `/routines/${existingSessionId}`,
      payload
    );
  } else {
    // Create a new workout session
    response = await API.post(
      '/routines/log',
      payload
    );
  }

  Toast.show({
    type: 'success',
    text1: 'Workout Saved',
    text2: response.data?.message || 'Workout saved successfully!',
    position: 'top',
  });

} catch (error) {
  console.log(
    'SAVE WORKOUT ERROR:',
    error.response?.data || error.message
  );

  Toast.show({
    type: 'error',
    text1: 'Save Failed',
    text2: error.response?.data?.message || 'Unable to save workout.',
    position: 'top',
  })
  
} finally {
  setSaving(false);
}
  };

  // --------------------------------------------------
  // HELPER VALUES
  // --------------------------------------------------

  const totalSets = exercises.reduce(
    (total, exercise) => total + exercise.sets.length,
    0,
  );

  const formattedDate = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#F7F9FE" barStyle="dark-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2563EB']}
            progressBackgroundColor="#FFFFFF"
            size="default"
          />
        }
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={23} color="#172343" />
          </TouchableOpacity>

          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Log Workout</Text>
            <Text style={styles.headerSubtitle}>
              Track your workout performance
            </Text>
          </View>
        </View>

        {/* ROUTINE CARD */}
        <View style={styles.routineCard}>
          <View style={styles.routineIcon}>
            <Ionicons name="barbell" size={34} color="#246BFD" />
          </View>

          <View style={styles.routineInfo}>
            <Text style={styles.routineName}>
              {routine?.title || 'workout routine'}
            </Text>

            <Text style={styles.routineMuscles}>
              {routine?.muscleGroups || 'Your workout routine'}
            </Text>

            <View style={styles.routineMeta}>
              <Ionicons name="fitness-outline" size={16} color="#246BFD" />
              <Text style={styles.metaText}>
                {exercises?.length} Exercises
              </Text>

              <View style={styles.metaDivider} />

              <Ionicons name="layers-outline" size={16} color="#246BFD" />
              <Text style={styles.metaText}>
                {totalSets} Sets
              </Text>
            </View>
          </View>
        </View>

        {/* DATE AND TIME */}
        <View style={styles.detailsRow}>
          <View style={styles.detailCard}>
            <Ionicons name="calendar-outline" size={23} color="#246BFD" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formattedDate}</Text>
            </View>
          </View>

          <View style={styles.detailCard}>
            <Ionicons name="time-outline" size={23} color="#246BFD" />
            <View style={styles.detailText}>
              <Text style={styles.detailLabel}>Start Time</Text>
              <Text style={styles.detailValue}>
                {startTime.toLocaleTimeString('en-IN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* EXERCISES HEADER */}
        <View style={styles.exerciseHeader}>
          <Text style={styles.sectionTitle}>Exercises</Text>
          <Text style={styles.exerciseCount}>
            {exercises.length} Exercises
          </Text>
        </View>

        {/* EXERCISE CARDS */}
        {exercises.map((exercise, exerciseIndex) => (
          <View key={exercise.exerciseId || exerciseIndex} style={styles.exerciseCard}>
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
                onPress={() => handleToggleExercise(exerciseIndex)}
              >
                <Text style={styles.exerciseName}>
                  {exercise.exerciseName}
                </Text>
                <Text style={styles.muscleName}>
                  {exercise.muscleGroup}
                </Text>
                <Text style={styles.setSummary}>
                  {exercise.sets.length} Sets
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleToggleExercise(exerciseIndex)}
              >
                <Ionicons
                  name={exercise.expanded ? 'chevron-up' : 'chevron-down'}
                  size={22}
                  color="#64708B"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => handleDeleteExercise(exerciseIndex)}
              >
                <Ionicons name="trash-outline" size={20} color="#E05252" />
              </TouchableOpacity>
            </View>

            {exercise.expanded && (
              <View style={styles.setSection}>
                {/* COLUMN HEADINGS */}
                <View style={styles.setHeadingRow}>
                  <Text style={[styles.columnHeading, styles.setColumn]}>
                    SET
                  </Text>
                  <Text style={[styles.columnHeading, styles.valueColumn]}>
                    WEIGHT (KG)
                  </Text>
                  <Text style={[styles.columnHeading, styles.valueColumn]}>
                    REPS
                  </Text>
                  <View style={styles.deleteColumn} />
                </View>

                {/* SET ROWS */}
                {exercise.sets.map((set, setIndex) => (
                  <View key={setIndex} style={styles.setRow}>
                    <View style={styles.setNumber}>
                      <Text style={styles.setNumberText}>
                        {setIndex + 1}
                      </Text>
                    </View>

                    <TextInput
                      style={styles.setInput}
                      value={set.weight}
                      onChangeText={(value) =>
                        handleSetChange(
                          exerciseIndex,
                          setIndex,
                          'weight',
                          value,
                        )
                      }
                      placeholder="0"
                      placeholderTextColor="#A0A9BA"
                      keyboardType="decimal-pad"
                    />

                    <TextInput
                      style={styles.setInput}
                      value={set.reps}
                      onChangeText={(value) =>
                        handleSetChange(
                          exerciseIndex,
                          setIndex,
                          'reps',
                          value,
                        )
                      }
                      placeholder="0"
                      placeholderTextColor="#A0A9BA"
                      keyboardType="number-pad"
                    />

                    <TouchableOpacity
                      style={styles.deleteSetButton}
                      onPress={() =>
                        handleDeleteSet(exerciseIndex, setIndex)
                      }
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#8792A8"
                      />
                    </TouchableOpacity>
                  </View>
                ))}

                {/* ADD SET */}
                <TouchableOpacity
                  style={styles.addSetButton}
                  onPress={() => handleAddSet(exerciseIndex)}
                >
                  <Ionicons name="add-circle" size={20} color="#246BFD" />
                  <Text style={styles.addSetText}>Add Set</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}

        {/* ADD EXERCISE */}
        <TouchableOpacity
          style={styles.addExerciseButton}
          onPress={handleAddExercise}
        >
          <Ionicons name="add-circle" size={23} color="#246BFD" />
          <Text style={styles.addExerciseText}>Add Exercise</Text>
        </TouchableOpacity>

        {/* NOTES */}
        <View style={styles.notesContainer}>
          <View style={styles.notesHeader}>
            <Ionicons name="document-text-outline" size={21} color="#246BFD" />
            <Text style={styles.notesTitle}>Workout Notes (Optional)</Text>
          </View>

          <TextInput
            style={styles.notesInput}
            placeholder="How was your workout today?"
            placeholderTextColor="#929DB2"
            value={notes}
            onChangeText={setNotes}
            multiline
            textAlignVertical="top"
          />
        </View>

        {/* SAVE BUTTON */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            saving && styles.saveButtonDisabled,
          ]}
          onPress={handleSaveWorkout}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={23} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>{exercises.length > 0 ? 'Update Workout' : 'Save Workout'}</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={{ height: 25 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogWorkoutScreen;

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
    marginBottom: 23,
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
    width: 31,
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

  setInput: {
    flex: 1,
    height: 42,
    backgroundColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#DDE4F1',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#172343',
    paddingVertical: 0,
  },

  deleteSetButton: {
    width: 35,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F2F4F9',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addSetButton: {
    height: 40,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#246BFD',
    borderStyle: 'dashed',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    marginTop: 3,
  },

  addSetText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#246BFD',
  },

  addExerciseButton: {
    height: 52,
    borderRadius: 15,
    backgroundColor: '#E4EDFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
    marginTop: 2,
    marginBottom: 22,
  },

  addExerciseText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#246BFD',
  },

  notesContainer: {
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
    minHeight: 85,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DDE4F1',
    padding: 13,
    fontSize: 13,
    color: '#172343',
  },

  saveButton: {
    height: 55,
    borderRadius: 17,
    backgroundColor: '#246BFD',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 3,
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
