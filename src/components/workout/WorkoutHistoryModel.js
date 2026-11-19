
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

const WorkoutHistoryModal = ({
  visible,
  onClose,
  exerciseName,
  data = null,
}) => {
  // Find exercise inside the previous workout session
  const exercise = data?.exercises?.find(
    item =>
      (item?.exerciseName || '').trim().toLowerCase() ===
      (exerciseName || '').trim().toLowerCase()
  );

  const formattedDate = data?.date
    ? new Date(data.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Previous workout';

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
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Workout History</Text>
              <Text style={styles.date}>{formattedDate}</Text>
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
            {exercise ? (
              <>
                {/* Exercise information */}
                <Text style={styles.exerciseName}>
                  {exercise.exerciseName}
                </Text>

                <Text style={styles.muscleGroup}>
                  {exercise.muscleGroup}
                </Text>

                {/* Table Header */}
                <View style={styles.tableHeader}>
                  <Text style={styles.column}>SET</Text>
                  <Text style={styles.column}>REPS</Text>
                  <Text style={styles.column}>WEIGHT</Text>
                </View>

                {/* Actual completed sets */}
                {exercise.sets?.map((set, index) => (
                  <View key={set.setNumber || index} style={styles.tableRow}>
                    <Text style={styles.cell}>
                      {set.setNumber}
                    </Text>

                    <Text style={styles.cell}>
                      {set.reps}
                    </Text>

                    <Text style={styles.cell}>
                      {set.weight} kg
                    </Text>
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
            <Text style={styles.closeButtonText}>
              Close
            </Text>
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
    fontSize: 17,
    fontWeight: '700',
    color: '#0F172A',
  },
  muscleGroup: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 5,
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
