
import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    TextInput,
    Pressable,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Ionicons from 'react-native-vector-icons/Ionicons';
import { Ionicons } from '@react-native-vector-icons/ionicons';
// import { useState } from 'react';
import {
  // ScrollView,
  RefreshControl,
} from 'react-native';
const COLORS = {
    primary: '#2563EB',
    primaryLight: '#EFF6FF',
    background: '#F8FAFC',
    white: '#FFFFFF',
    text: '#111827',
    secondary: '#64748B',
    border: '#E5E7EB',
};

const categories = ['All', 'Strength', 'Cardio', 'Flexibility'];

const workouts = [
    {
        id: '1',
        name: 'Push Day',
        muscleGroup: 'Chest • Shoulders • Triceps',
        exercises: 6,
        duration: '55 min',
        category: 'Strength',
        image: 'https://res.cloudinary.com/dcrso2pvr/image/upload/v1793901693/Intense_Incline_Dumbbell_Press_r4hifs.png',
        color: '#DBEAFE',
        icon: 'barbell-outline',
    },
    {
        id: '2',
        name: 'Pull Day',
        muscleGroup: 'Back • Biceps',
        exercises: 5,
        duration: '50 min',
        category: 'Strength',
        image: 'https://res.cloudinary.com/dcrso2pvr/image/upload/v1793901693/Intense_Incline_Dumbbell_Press_r4hifs.png',
        color: '#E0E7FF',
        icon: 'fitness-outline',
    },
    {
        id: '3',
        name: 'Leg Day',
        muscleGroup: 'Quads • Hamstrings • Calves',
        exercises: 7,
        duration: '65 min',
        category: 'Strength',
        image: 'https://res.cloudinary.com/dcrso2pvr/image/upload/v1793901693/Intense_Incline_Dumbbell_Press_r4hifs.png',
        color: '#DCFCE7',
        icon: 'walk-outline',
    },
    {
        id: '4',
        name: 'Shoulder Day',
        muscleGroup: 'Front • Side • Rear Delts',
        exercises: 5,
        duration: '45 min',
        category: 'Strength',
        image: 'https://res.cloudinary.com/dcrso2pvr/image/upload/v1793901693/Intense_Incline_Dumbbell_Press_r4hifs.png',
        color: '#FCE7F3',
        icon: 'body-outline',
    },
    {
        id: '5',
        name: 'Full Body Cardio',
        muscleGroup: 'Full Body',
        exercises: 8,
        duration: '30 min',
        category: 'Cardio',
        image: 'https://res.cloudinary.com/dcrso2pvr/image/upload/v1793901693/Intense_Incline_Dumbbell_Press_r4hifs.png',
        color: '#FEF3C7',
        icon: 'heart-outline',
    },
];

const WorkoutsScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [refreshing, setRefreshing] = useState(false);

      const onRefresh = async () => {
    setRefreshing(true);

    try {
      // Call your API to reload screen data here
      
      setRefreshing(false);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

    const filteredWorkouts = useMemo(() => {
        return workouts.filter(workout => {
            const matchesCategory =
                selectedCategory === 'All' ||
                workout.category === selectedCategory;

            const matchesSearch =
                workout.name.toLowerCase().includes(search.toLowerCase()) ||
                workout.muscleGroup.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [search, selectedCategory]);

    const handleWorkoutPress = workout => {
        // Navigate to your routine details screen later.
        console.log('Selected workout:', workout.name);
    };

    const handleCreateRoutine = () => {
        // Replace this with your actual Create Routine route.
        navigation?.navigate('CreateRoutine');
    };

    const renderWorkoutCard = workout => (
        <Pressable
            key={workout.id}
            style={styles.workoutCard}
            onPress={() => handleWorkoutPress(workout)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: workout.image }}
                    style={styles.workoutImage}
                    resizeMode="cover"
                />

                <View style={styles.imageBadge}>
                    <Ionicons name="barbell-outline" size={13} color={COLORS.white} />
                    <Text style={styles.imageBadgeText}>{workout.category}</Text>
                </View>

                <Pressable
                    style={styles.moreButton}
                    onPress={() => console.log('Workout options:', workout.name)}
                    hitSlop={8}
                >
                    <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.text} />
                </Pressable>
            </View>

            <View style={styles.cardContent}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.muscleGroup}>{workout.muscleGroup}</Text>

                <View style={styles.cardDivider} />

                <View style={styles.cardFooter}>
                    <View style={styles.cardInfo}>
                        <Ionicons name="fitness-outline" size={16} color={COLORS.secondary} />
                        <Text style={styles.cardInfoText}>
                            {workout.exercises} exercises
                        </Text>
                    </View>

                    <View style={styles.cardInfo}>
                        <Ionicons name="time-outline" size={16} color={COLORS.secondary} />
                        <Text style={styles.cardInfoText}>{workout.duration}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );

    return (
        // <SafeAreaView style={styles.container} edges={['top']}>
        <>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            <ScrollView
                showsVerticalScrollIndicator={false}
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
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.headerTitle}>My Workouts</Text>
                        <Text style={styles.headerSubtitle}>
                            Your routines, your progress.
                        </Text>
                    </View>

                    <Pressable
                        style={styles.headerIcon}
                        onPress={() => console.log('Notifications')}
                    >
                        <Ionicons
                            name="notifications-outline"
                            size={23}
                            color={COLORS.text}
                        />
                        <View style={styles.notificationDot} />
                    </Pressable>
                </View>

                {/* Routine summary */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryIcon}>
                        <Ionicons name="barbell" size={25} color={COLORS.primary} />
                    </View>

                    <View style={styles.summaryTextContainer}>
                        <Text style={styles.summaryNumber}>{workouts.length} Routines</Text>
                        <Text style={styles.summaryDescription}>
                            Keep building your strength
                        </Text>
                    </View>

                    <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
                </View>

                {/* Search */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color={COLORS.secondary} />

                    <TextInput
                        placeholder="Search your workouts..."
                        placeholderTextColor="#94A3B8"
                        value={search}
                        onChangeText={setSearch}
                        style={styles.searchInput}
                    />

                    {search.length > 0 && (
                        <Pressable onPress={() => setSearch('')}>
                            <Ionicons name="close-circle" size={19} color={COLORS.secondary} />
                        </Pressable>
                    )}
                </View>

                {/* Categories */}
                <View style={styles.categoryContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        {categories.map(category => {
                            const isSelected = selectedCategory === category;

                            return (
                                <Pressable
                                    key={category}
                                    onPress={() => setSelectedCategory(category)}
                                    style={[
                                        styles.categoryButton,
                                        isSelected && styles.categoryButtonActive,
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.categoryText,
                                            isSelected && styles.categoryTextActive,
                                        ]}
                                    >
                                        {category}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </ScrollView>
                </View>

                {/* Workout list heading */}
                <View style={styles.sectionHeader}>
                    <View>
                        <Text style={styles.sectionTitle}>Your Routines</Text>
                        <Text style={styles.sectionSubtitle}>
                            Select a routine to get started
                        </Text>
                    </View>

                    <Text style={styles.routineCount}>
                        {filteredWorkouts.length} routines
                    </Text>
                </View>

                {/* Workout cards */}
                {filteredWorkouts.length > 0 ? (
                    <View style={styles.workoutList}>
                        {filteredWorkouts.map(renderWorkoutCard)}
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons
                            name="search-outline"
                            size={35}
                            color={COLORS.secondary}
                        />
                        <Text style={styles.emptyTitle}>No workouts found</Text>
                        <Text style={styles.emptySubtitle}>
                            Try another search or category.
                        </Text>
                    </View>
                )}

                {/* Create routine button */}
                <Pressable
                    style={styles.createButton}
                    onPress={handleCreateRoutine}
                >
                    <Ionicons name="add-circle-outline" size={22} color={COLORS.white} />
                    <Text style={styles.createButtonText}>Create New Routine</Text>
                </Pressable>

                <Text style={styles.bottomText}>
                    Stay consistent. Keep getting stronger.
                </Text>
            </ScrollView>
      </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 35,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 22,
    },
    headerTitle: {
        fontSize: 27,
        fontWeight: '800',
        color: COLORS.text,
    },
    headerSubtitle: {
        fontSize: 13,
        color: COLORS.secondary,
        marginTop: 5,
    },
    headerIcon: {
        width: 45,
        height: 45,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 11,
        height: 7,
        width: 7,
        borderRadius: 4,
        backgroundColor: '#EF4444',
    },
    summaryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryLight,
        padding: 16,
        borderRadius: 17,
        marginBottom: 20,
    },
    summaryIcon: {
        height: 46,
        width: 46,
        borderRadius: 14,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    summaryTextContainer: {
        flex: 1,
        marginLeft: 13,
    },
    summaryNumber: {
        fontSize: 17,
        fontWeight: '800',
        color: COLORS.text,
    },
    summaryDescription: {
        color: COLORS.secondary,
        fontSize: 12,
        marginTop: 4,
    },
    searchContainer: {
        height: 52,
        backgroundColor: COLORS.white,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: COLORS.border,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 18,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: COLORS.text,
    },
    categoryContainer: {
        marginBottom: 25,
    },
    categoryButton: {
        paddingHorizontal: 19,
        paddingVertical: 10,
        borderRadius: 22,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: 9,
    },
    categoryButtonActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    categoryTextActive: {
        color: COLORS.white,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.text,
    },
    sectionSubtitle: {
        fontSize: 12,
        color: COLORS.secondary,
        marginTop: 5,
    },
    routineCount: {
        fontSize: 12,
        color: COLORS.secondary,
        fontWeight: '600',
    },
    workoutList: {
        gap: 16,
    },
    workoutCard: {
        backgroundColor: COLORS.white,
        borderRadius: 18,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    imageContainer: {
        height: 155,
        backgroundColor: '#E2E8F0',
        position: 'relative',
    },
    workoutImage: {
        width: '100%',
        height: '100%',
    },
    imageBadge: {
        position: 'absolute',
        left: 12,
        top: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.72)',
        paddingHorizontal: 11,
        paddingVertical: 7,
        borderRadius: 20,
        gap: 5,
    },
    imageBadgeText: {
        color: COLORS.white,
        fontSize: 11,
        fontWeight: '700',
    },
    moreButton: {
        position: 'absolute',
        right: 12,
        top: 12,
        width: 34,
        height: 34,
        borderRadius: 12,
        backgroundColor: COLORS.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContent: {
        padding: 15,
    },
    workoutName: {
        fontSize: 17,
        fontWeight: '800',
        color: COLORS.text,
    },
    muscleGroup: {
        fontSize: 12,
        color: COLORS.secondary,
        marginTop: 5,
    },
    cardDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 13,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 22,
    },
    cardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    cardInfoText: {
        fontSize: 12,
        color: COLORS.secondary,
        fontWeight: '500',
    },
    emptyContainer: {
        alignItems: 'center',
        paddingVertical: 40,
        backgroundColor: COLORS.white,
        borderRadius: 16,
    },
    emptyTitle: {
        color: COLORS.text,
        fontWeight: '700',
        fontSize: 16,
        marginTop: 12,
    },
    emptySubtitle: {
        color: COLORS.secondary,
        fontSize: 13,
        marginTop: 5,
    },
    createButton: {
        height: 54,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        marginTop: 25,
    },
    createButtonText: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: '700',
    },
    bottomText: {
        textAlign: 'center',
        fontSize: 12,
        color: COLORS.secondary,
        marginTop: 18,
    },
});

export default WorkoutsScreen;
