
import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    Pressable,
    StyleSheet,
    StatusBar,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import axios from 'axios';
import API from '../../../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const COLORS = {
    primary: '#2563EB',
    primaryLight: '#EFF6FF',
    background: '#F8FAFC',
    white: '#FFFFFF',
    text: '#111827',
    secondary: '#64748B',
    border: '#E5E7EB',
    lightBlue: '#DBEAFE',
};

const goals = [
    { name: 'Build Muscle', icon: 'barbell-outline' },
    { name: 'Lose Fat', icon: 'flame-outline' },
    { name: 'Endurance', icon: 'fitness-outline' },
    { name: 'Strength', icon: 'trending-up-outline' },
];

const exercises = [
    {
        id: '1',
        name: 'Bench Press',
        muscle: 'Chest • Triceps',
        icon: 'barbell-outline',
    },
    {
        id: '2',
        name: 'Pull Up',
        muscle: 'Back • Biceps',
        icon: 'body-outline',
    },
    {
        id: '3',
        name: 'Squat',
        muscle: 'Quads • Glutes',
        icon: 'fitness-outline',
    },
    {
        id: '4',
        name: 'Shoulder Press',
        muscle: 'Shoulders',
        icon: 'barbell-outline',
    },
    {
        id: '5',
        name: 'Deadlift',
        muscle: 'Back • Hamstrings',
        icon: 'barbell-outline',
    },
    {
        id: '6',
        name: 'Bicep Curl',
        muscle: 'Biceps',
        icon: 'fitness-outline',
    },
    {
        id: '7',
        name: 'Tricep Pushdown',
        muscle: 'Triceps',
        icon: 'fitness-outline',
    },
    {
        id: '8',
        name: 'Lateral Raise',
        muscle: 'Side Delts',
        icon: 'body-outline',
    },
    {
        id: '9',
        name: 'Leg Press',
        muscle: 'Quads',
        icon: 'fitness-outline',
    },
    {
        id: '10',
        name: 'Incline Dumbbell Press',
        muscle: 'Upper Chest',
        icon: 'barbell-outline',
    },
];

const durations = ['30 min', '45 min', '60 min', '75 min', '90 min'];
const frequencies = ['2 days', '3 days', '4 days', '5 days', '6 days'];

const CreateNewRoutineScreen = ({ navigation }) => {
    const [routineName, setRoutineName] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('Build Muscle');
    const [search, setSearch] = useState('');
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [duration, setDuration] = useState('45 min');
    const [frequency, setFrequency] = useState('3 days');

    const [showDurationOptions, setShowDurationOptions] = useState(false);
    const [showFrequencyOptions, setShowFrequencyOptions] = useState(false);

    const filteredExercises = useMemo(() => {
        return exercises.filter(exercise =>
            exercise.name.toLowerCase().includes(search.toLowerCase()) ||
            exercise.muscle.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const isSelected = id =>
        selectedExercises.some(item => item.id === id);

    const addExercise = exercise => {
        if (isSelected(exercise.id)) return;

        setSelectedExercises(prev => [
            ...prev,
            {
                ...exercise,
                sets: 3,
                reps: 12,
                rest: 60,
            },
        ]);
    };

    const removeExercise = id => {
        setSelectedExercises(prev =>
            prev.filter(item => item.id !== id)
        );
    };

    const updateExercise = (id, field, value) => {
        setSelectedExercises(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, [field]: Math.max(1, value) }
                    : item
            )
        );
    };

    // const handleCreateRoutine = async () => {
    //     if (!routineName.trim()) {
    //         Alert.alert('Routine name required', 'Please enter a routine name.');
    //         return;
    //     }

    //     if (selectedExercises.length === 0) {
    //         Alert.alert(
    //             'Add exercises',
    //             'Please select at least one exercise.'
    //         );
    //         return;
    //     }

    //     try {
    //         // const token = await AsyncStorage.getItem('token');
    //         let token = 'token'
    //         const routineData = {
    //             title: routineName.trim(),
    //             goal: selectedGoal,
    //             duration,
    //             frequency,
    //             exercises: selectedExercises.map((item, index) => ({
    //                 exerciseId: item.id,
    //                 order: index + 1,
    //                 sets: Number(item.sets),
    //                 reps: Number(item.reps),
    //                 restSeconds: Number(item.rest),
    //             })),
    //         };

    //         console.log('New Routine:', routineData);
    //         // Alert.alert(
    //         //     'Routine Created!')
    //         const response = await axios.post(
    //             `${API}/routines/newroutine`,
    //             routineData,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                     'Content-Type': 'application/json',
    //                 },
    //             }
    //         );

    //         Alert.alert(
    //             'Routine Created!',
    //             `${routineName} has been created successfully.`,
    //             [
    //                 {
    //                     text: 'OK',
    //                     onPress: () => navigation.goBack(),
    //                 },
    //             ]
    //         );

    //         console.log('Create Routine Response:', response.data);

    //     } catch (error) {
    //         console.log(
    //             'Create Routine Error:',
    //             error.response?.data || error.message
    //         );

    //         Alert.alert(
    //             'Error',error||
    //             error.response?.data?.message ||
    //             'Failed to create routine. Please try again.'
    //         );
    //     }
    // };
    const handleCreateRoutine = async () => {
    if (!routineName.trim()) {
        Alert.alert('Routine name required', 'Please enter a routine name.');
        return;
    }

    if (selectedExercises.length === 0) {
        Alert.alert('Add exercises', 'Please select at least one exercise.');
        return;
    }

    try {
        const token = await AsyncStorage.getItem('token')||"token";

        if (!token) {
            Alert.alert('Login required', 'Please log in again.');
            return;
        }

        const routineData = {
            title: routineName.trim(),
            goal: selectedGoal,
            duration,
            frequency,
            exercises: selectedExercises.map((item, index) => ({
                exerciseId: item.id,
                order: index + 1,
                sets: Number(item.sets),
                reps: Number(item.reps),
                restSeconds: Number(item.rest),
            })),
        };

        const response = await API.post(
            '/routines/newroutine',
            routineData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log('Routine created:', response.data);

        Alert.alert(
            'Routine Created!',
            `${routineName} has been created successfully.`,
            [{ text: 'OK', onPress: () => navigation.goBack() }]
        );

    } catch (error) {
        console.log('Create Routine Error:', error.response?.data || error.message);

        Alert.alert(
            'Error',
            error.response?.data?.message || error.message || 'Failed to create routine.'
        );
    }
};
// const handleCreateRoutine = async () => {
//     if (!routineName.trim()) {
//         Alert.alert('Routine name required', 'Please enter a routine name.');
//         return;
//     }

//     if (selectedExercises.length === 0) {
//         Alert.alert('Add exercises', 'Please select at least one exercise.');
//         return;
//     }

//     try {
//         const token = await AsyncStorage.getItem('token')||"token";

//         if (!token) {
//             Alert.alert('Login required', 'Please log in again.');
//             return;
//         }

//         const routineData = {
//             title: routineName.trim(),
//             goal: selectedGoal,
//             duration,
//             frequency,
//             exercises: selectedExercises.map((item, index) => ({
//                 exerciseId: item.id,
//                 order: index + 1,
//                 sets: Number(item.sets),
//                 reps: Number(item.reps),
//                 restSeconds: Number(item.rest),
//             })),
//         };

//         const response = await axios.post(
//             `${API}/routines/newroutine`,
//             routineData,
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             }
//         );

//         console.log('Routine created:', response.data);

//         Alert.alert(
//             'Routine Created!',
//             `${routineName} has been created successfully.`,
//             [{ text: 'OK', onPress: () => navigation.goBack() }]
//         );

//     } catch (error) {
//         console.log('Create Routine Error:', error.response?.data || error.message);

//         Alert.alert(
//             'Error',
//             error.response?.data?.message || error.message || 'Failed to create routine.'
//         );
//     }
// };

    // const handleCreateRoutine = () => {
    //     if (!routineName.trim()) {
    //         Alert.alert('Routine name required', 'Please enter a routine name.');
    //         return;
    //     }

    //     if (selectedExercises.length === 0) {
    //         Alert.alert(
    //             'Add exercises',
    //             'Please select at least one exercise.'
    //         );
    //         return;
    //     }

    //     const routineData = {
    //         name: routineName.trim(),
    //         goal: selectedGoal,
    //         exercises: selectedExercises,
    //         duration,
    //         frequency,
    //     };

    //     console.log('New Routine:', routineData);

    //     // Connect your create routine API here.

    //     Alert.alert(
    //         'Routine Ready!',
    //         `${routineName} has been prepared successfully.`,
    //         [
    //             {
    //                 text: 'OK',
    //                 onPress: () => navigation.goBack(),
    //             },
    //         ]
    //     );
    // };

    const renderExercise = exercise => {
        const added = isSelected(exercise.id);

        return (
            <View key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseIcon}>
                    <Ionicons
                        name={exercise.icon}
                        size={24}
                        color={COLORS.primary}
                    />
                </View>

                <View style={styles.exerciseDetails}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseMuscle}>{exercise.muscle}</Text>
                </View>

                <Pressable
                    style={[
                        styles.addButton,
                        added && styles.addedButton,
                    ]}
                    onPress={() =>
                        added
                            ? removeExercise(exercise.id)
                            : addExercise(exercise)
                    }
                >
                    <Ionicons
                        name={added ? 'checkmark' : 'add'}
                        size={23}
                        color={added ? COLORS.primary : COLORS.white}
                    />
                </Pressable>
            </View>
        );
    };

    return (
        // <SafeAreaView style={styles.container} edges={['top']}>
        <>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.background}
            />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >

                {/* HEADER */}

                <View style={styles.header}>
                    <Pressable
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons
                            name="arrow-back"
                            size={23}
                            color={COLORS.text}
                        />
                    </Pressable>

                    <Text style={styles.headerTitle}>Create Routine</Text>

                    <View style={{ width: 44 }} />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scrollContent}
                >

                    {/* HERO SECTION */}

                    <View style={styles.hero}>
                        <View style={styles.heroIcon}>
                            <Ionicons
                                name="barbell"
                                size={34}
                                color={COLORS.primary}
                            />
                        </View>

                        <View style={styles.heroContent}>
                            <Text style={styles.heroTitle}>
                                Build Your{'\n'}Custom Routine
                            </Text>

                            <Text style={styles.heroSubtitle}>
                                Choose exercises, set your goals and start your fitness journey!
                            </Text>
                        </View>
                    </View>

                    {/* ROUTINE NAME */}

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Routine Name</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons
                                name="create-outline"
                                size={21}
                                color={COLORS.secondary}
                            />

                            <TextInput
                                placeholder="e.g. Push Day, Full Body, etc."
                                placeholderTextColor="#94A3B8"
                                value={routineName}
                                onChangeText={setRoutineName}
                                style={styles.input}
                                maxLength={40}
                            />
                        </View>
                    </View>

                    {/* GOALS */}

                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Ionicons
                                name="locate-outline"
                                size={24}
                                color={COLORS.primary}
                            />
                            <Text style={styles.sectionTitle}>Select Goal</Text>
                        </View>

                        <View style={styles.goalContainer}>
                            {goals.map(goal => {
                                const active = selectedGoal === goal.name;

                                return (
                                    <Pressable
                                        key={goal.name}
                                        onPress={() => setSelectedGoal(goal.name)}
                                        style={[
                                            styles.goalCard,
                                            active && styles.goalCardActive,
                                        ]}
                                    >
                                        <Ionicons
                                            name={goal.icon}
                                            size={25}
                                            color={active ? COLORS.primary : COLORS.secondary}
                                        />

                                        <Text
                                            style={[
                                                styles.goalText,
                                                active && styles.goalTextActive,
                                            ]}
                                        >
                                            {goal.name}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </View>
                    </View>

                    {/* EXERCISE SECTION */}

                    <View style={styles.section}>
                        <View style={styles.sectionHeading}>
                            <Ionicons
                                name="list-outline"
                                size={24}
                                color={COLORS.primary}
                            />

                            <Text style={styles.sectionTitle}>
                                Choose Exercises
                            </Text>

                            <View style={{ flex: 1 }} />

                            <Text style={styles.exerciseCount}>
                                {selectedExercises.length} added
                            </Text>
                        </View>

                        {/* SEARCH */}

                        <View style={styles.searchContainer}>
                            <Ionicons
                                name="search-outline"
                                size={20}
                                color={COLORS.secondary}
                            />

                            <TextInput
                                placeholder="Search exercises..."
                                placeholderTextColor="#94A3B8"
                                value={search}
                                onChangeText={setSearch}
                                style={styles.searchInput}
                            />

                            {search.length > 0 && (
                                <Pressable onPress={() => setSearch('')}>
                                    <Ionicons
                                        name="close-circle"
                                        size={19}
                                        color={COLORS.secondary}
                                    />
                                </Pressable>
                            )}
                        </View>

                        {/* EXERCISE LIST */}

                        <View style={styles.exerciseList}>
                            {filteredExercises.length > 0 ? (
                                filteredExercises.map(renderExercise)
                            ) : (
                                <View style={styles.emptyContainer}>
                                    <Ionicons
                                        name="search-outline"
                                        size={30}
                                        color={COLORS.secondary}
                                    />
                                    <Text style={styles.emptyText}>
                                        No exercises found
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* SELECTED EXERCISES */}

                    {selectedExercises.length > 0 && (
                        <View style={styles.section}>
                            <View style={styles.sectionHeading}>
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    size={24}
                                    color={COLORS.primary}
                                />

                                <Text style={styles.sectionTitle}>
                                    Selected Exercises
                                </Text>
                            </View>

                            {selectedExercises.map((item, index) => (
                                <View key={item.id} style={styles.selectedCard}>
                                    <View style={styles.selectedHeader}>
                                        <View style={styles.numberBadge}>
                                            <Text style={styles.numberText}>
                                                {index + 1}
                                            </Text>
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.selectedName}>
                                                {item.name}
                                            </Text>
                                            <Text style={styles.exerciseMuscle}>
                                                {item.muscle}
                                            </Text>
                                        </View>

                                        <Pressable
                                            onPress={() => removeExercise(item.id)}
                                        >
                                            <Ionicons
                                                name="trash-outline"
                                                size={21}
                                                color="#EF4444"
                                            />
                                        </Pressable>
                                    </View>

                                    <View style={styles.configureRow}>
                                        {[
                                            { label: 'Sets', field: 'sets' },
                                            { label: 'Reps', field: 'reps' },
                                            { label: 'Rest (sec)', field: 'rest' },
                                        ].map(config => (
                                            <View
                                                key={config.field}
                                                style={styles.configureItem}
                                            >
                                                <Text style={styles.configureLabel}>
                                                    {config.label}
                                                </Text>

                                                <View style={styles.counter}>
                                                    <Pressable
                                                        style={styles.counterButton}
                                                        onPress={() =>
                                                            updateExercise(
                                                                item.id,
                                                                config.field,
                                                                item[config.field] - 1
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="remove"
                                                            size={16}
                                                            color={COLORS.primary}
                                                        />
                                                    </Pressable>

                                                    <Text style={styles.counterValue}>
                                                        {item[config.field]}
                                                    </Text>

                                                    <Pressable
                                                        style={styles.counterButton}
                                                        onPress={() =>
                                                            updateExercise(
                                                                item.id,
                                                                config.field,
                                                                item[config.field] + 1
                                                            )
                                                        }
                                                    >
                                                        <Ionicons
                                                            name="add"
                                                            size={16}
                                                            color={COLORS.primary}
                                                        />
                                                    </Pressable>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* ROUTINE SETTINGS */}

                    <View style={styles.settingsCard}>
                        <View style={styles.sectionHeading}>
                            <Ionicons
                                name="settings-outline"
                                size={23}
                                color={COLORS.text}
                            />

                            <Text style={styles.sectionTitle}>
                                Routine Settings
                            </Text>
                        </View>

                        {/* DURATION */}

                        <View style={styles.settingRow}>
                            <View style={styles.settingIcon}>
                                <Ionicons
                                    name="time-outline"
                                    size={22}
                                    color={COLORS.primary}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.settingLabel}>
                                    Workout Duration
                                </Text>

                                <Pressable
                                    style={styles.settingValueRow}
                                    onPress={() => {
                                        setShowDurationOptions(!showDurationOptions);
                                        setShowFrequencyOptions(false);
                                    }}
                                >
                                    <Text style={styles.settingValue}>{duration}</Text>

                                    <Ionicons
                                        name={
                                            showDurationOptions
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        size={20}
                                        color={COLORS.primary}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        {showDurationOptions && (
                            <View style={styles.optionsContainer}>
                                {durations.map(item => (
                                    <Pressable
                                        key={item}
                                        style={styles.option}
                                        onPress={() => {
                                            setDuration(item);
                                            setShowDurationOptions(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                duration === item && styles.optionTextActive,
                                            ]}
                                        >
                                            {item}
                                        </Text>

                                        {duration === item && (
                                            <Ionicons
                                                name="checkmark"
                                                color={COLORS.primary}
                                                size={19}
                                            />
                                        )}
                                    </Pressable>
                                ))}
                            </View>
                        )}

                        <View style={styles.settingDivider} />

                        {/* FREQUENCY */}

                        <View style={styles.settingRow}>
                            <View style={styles.settingIcon}>
                                <Ionicons
                                    name="repeat-outline"
                                    size={22}
                                    color={COLORS.primary}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.settingLabel}>
                                    Weekly Frequency
                                </Text>

                                <Pressable
                                    style={styles.settingValueRow}
                                    onPress={() => {
                                        setShowFrequencyOptions(!showFrequencyOptions);
                                        setShowDurationOptions(false);
                                    }}
                                >
                                    <Text style={styles.settingValue}>
                                        {frequency}
                                    </Text>

                                    <Ionicons
                                        name={
                                            showFrequencyOptions
                                                ? 'chevron-up'
                                                : 'chevron-down'
                                        }
                                        size={20}
                                        color={COLORS.primary}
                                    />
                                </Pressable>
                            </View>
                        </View>

                        {showFrequencyOptions && (
                            <View style={styles.optionsContainer}>
                                {frequencies.map(item => (
                                    <Pressable
                                        key={item}
                                        style={styles.option}
                                        onPress={() => {
                                            setFrequency(item);
                                            setShowFrequencyOptions(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.optionText,
                                                frequency === item && styles.optionTextActive,
                                            ]}
                                        >
                                            {item}
                                        </Text>

                                        {frequency === item && (
                                            <Ionicons
                                                name="checkmark"
                                                color={COLORS.primary}
                                                size={19}
                                            />
                                        )}
                                    </Pressable>
                                ))}
                            </View>
                        )}
                    </View>

                    <Text style={styles.bottomText}>
                        Stay consistent. Keep getting stronger.
                    </Text>

                </ScrollView>

                {/* BOTTOM BUTTON */}

                <View style={styles.footer}>
                    <Pressable
                        style={styles.createButton}
                        onPress={handleCreateRoutine}
                    >
                        <Ionicons
                            name="checkmark-circle"
                            size={23}
                            color={COLORS.white}
                        />

                        <Text style={styles.createButtonText}>
                            Create Routine
                        </Text>
                    </Pressable>
                </View>

            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.background,
    },

    backButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.text,
    },

    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },

    hero: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryLight,
        padding: 17,
        borderRadius: 19,
        marginTop: 10,
        marginBottom: 25,
    },

    heroIcon: {
        width: 65,
        height: 65,
        borderRadius: 18,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
    },

    heroContent: {
        flex: 1,
    },

    heroTitle: {
        fontSize: 19,
        fontWeight: '800',
        color: COLORS.text,
        lineHeight: 25,
    },

    heroSubtitle: {
        fontSize: 11,
        color: COLORS.secondary,
        marginTop: 5,
        lineHeight: 17,
    },

    section: {
        marginBottom: 25,
    },

    sectionTitle: {
        fontSize: 17,
        fontWeight: '800',
        color: COLORS.text,
    },

    sectionHeading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
    },

    inputContainer: {
        height: 54,
        backgroundColor: COLORS.white,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
    },

    input: {
        flex: 1,
        marginLeft: 11,
        fontSize: 14,
        color: COLORS.text,
    },

    goalContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 9,
    },

    goalCard: {
        width: '48%',
        minHeight: 85,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 7,
        flex: 1,
    },

    goalCardActive: {
        backgroundColor: COLORS.primaryLight,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
    },

    goalText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.secondary,
    },

    goalTextActive: {
        color: COLORS.primary,
    },

    exerciseCount: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.primary,
    },

    searchContainer: {
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        marginBottom: 13,
    },

    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.text,
    },

    exerciseList: {
        gap: 9,
    },

    exerciseCard: {
        minHeight: 76,
        backgroundColor: COLORS.white,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    exerciseIcon: {
        width: 51,
        height: 51,
        borderRadius: 12,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    exerciseDetails: {
        flex: 1,
        marginLeft: 12,
    },

    exerciseName: {
        fontSize: 14,
        fontWeight: '800',
        color: COLORS.text,
    },

    exerciseMuscle: {
        fontSize: 12,
        color: COLORS.secondary,
        marginTop: 4,
    },

    addButton: {
        width: 37,
        height: 37,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    addedButton: {
        backgroundColor: COLORS.primaryLight,
        borderWidth: 1,
        borderColor: COLORS.primary,
    },

    emptyContainer: {
        alignItems: 'center',
        padding: 25,
        backgroundColor: COLORS.white,
        borderRadius: 14,
    },

    emptyText: {
        marginTop: 8,
        color: COLORS.secondary,
        fontWeight: '600',
    },

    selectedCard: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        padding: 13,
        marginBottom: 11,
    },

    selectedHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 14,
    },

    numberBadge: {
        width: 31,
        height: 31,
        borderRadius: 10,
        backgroundColor: COLORS.primaryLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    numberText: {
        color: COLORS.primary,
        fontSize: 13,
        fontWeight: '800',
    },

    selectedName: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '800',
    },

    configureRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 5,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 12,
    },

    configureItem: {
        flex: 1,
        alignItems: 'center',
    },

    configureLabel: {
        fontSize: 11,
        color: COLORS.secondary,
        marginBottom: 8,
    },

    counter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },

    counterButton: {
        width: 25,
        height: 25,
        backgroundColor: COLORS.primaryLight,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },

    counterValue: {
        fontSize: 13,
        fontWeight: '800',
        color: COLORS.text,
    },

    settingsCard: {
        backgroundColor: COLORS.primaryLight,
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
    },

    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 9,
    },

    settingIcon: {
        width: 43,
        height: 43,
        borderRadius: 22,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    settingLabel: {
        fontSize: 12,
        color: COLORS.secondary,
    },

    settingValueRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
    },

    settingValue: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.text,
    },

    settingDivider: {
        height: 1,
        backgroundColor: '#D7E3F8',
        marginVertical: 7,
    },

    optionsContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 6,
    },

    option: {
        minHeight: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    optionText: {
        fontSize: 13,
        color: COLORS.secondary,
    },

    optionTextActive: {
        color: COLORS.primary,
        fontWeight: '800',
    },

    bottomText: {
        fontSize: 12,
        color: COLORS.secondary,
        textAlign: 'center',
        marginBottom: 10,
    },

    footer: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },

    createButton: {
        height: 54,
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },

    createButtonText: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.white,
    },
});

export default CreateNewRoutineScreen;
