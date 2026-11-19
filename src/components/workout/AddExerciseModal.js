
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';

import { Ionicons } from '@react-native-vector-icons/ionicons';
import API from '../../api/api';


const AddExerciseModal = ({
  visible,
  onClose,
  onSelect,
  selectedExerciseIds = [],
}) => {

  const [search, setSearch] = useState('');
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);


  // Fetch exercises whenever modal opens or search changes
  useEffect(() => {
    if (!visible) return;

    const timer = setTimeout(() => {
      getExercises();
    }, 350);

    return () => clearTimeout(timer);

  }, [visible, search]);


  // GET exercises from backend
  const getExercises = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        `/routines/getExercises?SearchedName=${encodeURIComponent(search)}`
      );

      console.log('Exercises fetched successfully:', response.data.exercises);

      if (response.data.success) {
        setExercises(response.data.exercises || []);
      } else {
        setExercises([]);
      }

    } catch (error) {
      console.log(
        'Get Exercises Error:',
        error.response?.data || error.message
      );

      setExercises([]);

    } finally {
      setLoading(false);
    }
  };


  // Select exercise
  const handleSelect = exercise => {

    onSelect?.(exercise);

    setSearch('');

    onClose?.();
  };


  // Close modal
  const handleClose = () => {

    setSearch('');

    onClose?.();
  };


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleClose}
    >

      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>

          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>

              {/* Header */}
              <View style={styles.header}>

                <View>
                  <Text style={styles.title}>
                    Add Exercise
                  </Text>

                  <Text style={styles.subtitle}>
                    Choose an exercise for this workout
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClose}
                >
                  <Ionicons
                    name="close"
                    size={22}
                    color="#172343"
                  />
                </TouchableOpacity>

              </View>


              {/* Search */}
              <View style={styles.searchContainer}>

                <Ionicons
                  name="search-outline"
                  size={20}
                  color="#7B8499"
                />

                <TextInput
                  style={styles.searchInput}
                  placeholder="Search exercises..."
                  placeholderTextColor="#929AAF"
                  value={search}
                  onChangeText={setSearch}
                />

                {search.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSearch('')}
                  >
                    <Ionicons
                      name="close-circle"
                      size={19}
                      color="#929AAF"
                    />
                  </TouchableOpacity>
                )}

              </View>


              {/* Exercise List */}
              <ScrollView
                style={styles.exerciseList}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >

                {loading ? (

                  <View style={styles.emptyContainer}>
                    <ActivityIndicator
                      size="large"
                      color="#3157C8"
                    />

                    <Text style={styles.emptyText}>
                      Loading exercises...
                    </Text>
                  </View>

                ) : exercises.length > 0 ? (

                  exercises.map(exercise => {

                    const isSelected = selectedExerciseIds
                      .map(String)
                      .includes(String(exercise.id));

                    return (

                      <TouchableOpacity
                        key={String(exercise.id)}
                        style={[
                          styles.exerciseItem,
                          isSelected && styles.selectedItem,
                        ]}
                        disabled={isSelected}
                        onPress={() => handleSelect(exercise)}
                      >

                        {/* Exercise Icon */}
                        <View style={styles.exerciseIcon}>
                          <Ionicons
                            name="barbell-outline"
                            size={21}
                            color="#3157C8"
                          />
                        </View>


                        {/* Exercise Details */}
                        <View style={styles.exerciseInfo}>

                          <Text style={styles.exerciseName}>
                            {exercise.name}
                          </Text>

                          <Text style={styles.muscleGroup}>
                            {exercise.muscle}
                          </Text>

                        </View>


                        {/* Selection Icon */}
                        {isSelected ? (

                          <Ionicons
                            name="checkmark-circle"
                            size={23}
                            color="#22A06B"
                          />

                        ) : (

                          <Ionicons
                            name="add-circle-outline"
                            size={24}
                            color="#3157C8"
                          />

                        )}

                      </TouchableOpacity>

                    );

                  })

                ) : (

                  <View style={styles.emptyContainer}>

                    <Ionicons
                      name="search-outline"
                      size={35}
                      color="#AAB2C2"
                    />

                    <Text style={styles.emptyText}>
                      No exercises found
                    </Text>

                  </View>

                )}

              </ScrollView>


              {/* Footer */}
              <View style={styles.footer}>

                <Text style={styles.footerText}>
                  Added exercises will only affect this workout.
                </Text>

              </View>

            </View>
          </TouchableWithoutFeedback>

        </View>
      </TouchableWithoutFeedback>

    </Modal>
  );

};

export default AddExerciseModal;


// Styles
const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(10, 20, 45, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },

  modalContainer: {
    width: '100%',
    maxHeight: '78%',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 20,
    elevation: 12,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#172343',
  },

  subtitle: {
    fontSize: 12,
    color: '#8992A6',
    marginTop: 5,
  },

  closeButton: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: '#F0F3FA',
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchContainer: {
    height: 47,
    borderRadius: 13,
    backgroundColor: '#F4F6FB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    marginBottom: 14,
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    color: '#172343',
    fontSize: 14,
  },

  exerciseList: {
    flexGrow: 0,
    maxHeight: 350,
  },

  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F7',
  },

  selectedItem: {
    opacity: 0.65,
  },

  exerciseIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  exerciseInfo: {
    flex: 1,
    marginLeft: 12,
  },

  exerciseName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#172343',
  },

  muscleGroup: {
    fontSize: 12,
    color: '#8992A6',
    marginTop: 4,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 35,
  },

  emptyText: {
    color: '#8992A6',
    marginTop: 10,
    fontSize: 13,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F2F7',
    marginTop: 12,
    paddingTop: 13,
  },

  footerText: {
    textAlign: 'center',
    color: '#929AAF',
    fontSize: 11,
  },

});
