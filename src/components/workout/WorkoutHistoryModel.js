
import React from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

// Dummy history data
const dummyWorkoutHistory = [
  {
    exerciseName: 'Bench Press',
    date: '12 November 2026',
    sets: [
      { setNumber: 1, weight: 75, reps: 10 },
      { setNumber: 2, weight: 80, reps: 8 },
      { setNumber: 3, weight: 80, reps: 7 },
    ],
  },
  {
    exerciseName: 'Incline Dumbbell Press',
    date: '12 November 2026',
    sets: [
      { setNumber: 1, weight: 25, reps: 12 },
      { setNumber: 2, weight: 25, reps: 10 },
      { setNumber: 3, weight: 25, reps: 9 },
    ],
  },
];

const WorkoutHistoryModal = ({
  visible,
  onClose,
  exerciseName,
}) => {
  const history = dummyWorkoutHistory.find(
    item =>
      item.exerciseName.toLowerCase() ===
      (exerciseName || '').toLowerCase()
  );

  return (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={styles.overlay}>
      <Pressable
        style={styles.backdrop}
        onPress={onClose}
      />

      <View style={styles.modalContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Previous Workout</Text>
            <Text style={styles.date}>
              {history?.date || 'No previous session'}
            </Text>
          </View>

          <Pressable onPress={onClose}>
            <Ionicons
              name="close-circle-outline"
              size={28}
              color="#64748B"
            />
          </Pressable>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {history ? (
            <>
              <Text style={styles.exerciseName}>
                {history.exerciseName}
              </Text>

              <View style={styles.tableHeader}>
                <Text style={styles.column}>SET</Text>
                <Text style={styles.column}>WEIGHT</Text>
                <Text style={styles.column}>REPS</Text>
              </View>

              {history.sets.map(set => (
                <View key={set.setNumber} style={styles.tableRow}>
                  <Text style={styles.cell}>{set.setNumber}</Text>
                  <Text style={styles.cell}>{set.weight} kg</Text>
                  <Text style={styles.cell}>{set.reps}</Text>
                </View>
              ))}
            </>
          ) : (
            <Text style={styles.emptyText}>
              No previous history found for this exercise.
            </Text>
          )}
        </ScrollView>

        <Pressable
          style={styles.closeButton}
          onPress={onClose}
        >
          <Text style={styles.closeButtonText}>Close History</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);
};

export default WorkoutHistoryModal;

const styles = StyleSheet.create({
overlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 25,
},

backdrop: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'rgba(0,0,0,0.6)',
},

modalContainer: {
  width: '100%',
  maxHeight: '65%',
  backgroundColor: '#FFFFFF',
  borderRadius: 22,
  padding: 22,
  elevation: 15,
},

header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 22,
},

title: {
  fontSize: 20,
  fontWeight: '700',
  color: '#0F172A',
},

date: {
  fontSize: 12,
  color: '#64748B',
  marginTop: 5,
},
  exerciseName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 18,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  column: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  emptyText: {
    color: '#64748B',
    textAlign: 'center',
    paddingVertical: 30,
  },
  closeButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 25,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
