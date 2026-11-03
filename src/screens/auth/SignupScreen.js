
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Pressable,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {
  // ScrollView,
  RefreshControl,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import AuthInput from '../../components/auth/AuthInput';
import { authStyles } from '../../constants/authStyles';
// import Api from '../../api/Api';
import API from '../../api/api'; // Adjust the import path as necessary
// Replace this with your Cloudinary logo URL.
const LOGO_URL =
    'https://res.cloudinary.com/dcrso2pvr/image/upload/v1792842630/a_clean_high_resolution_vector_logo_style_image_o_hl5vhp.png';

export default function SignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);

        try {
            // Call your API to reload screen data here
            setEmail('')
            setPassword('');
            setName('');
            setConfirmPassword('');
            setErrors({});
            setLoading(false);
            setRefreshing(false);
            //   setRememberMe(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleSignup = async () => {
        const nextErrors = {};

        if (!name.trim()) {
            nextErrors.name = 'Please enter your name.';
        }

        if (!email.trim()) {
            nextErrors.email = 'Please enter your email.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            nextErrors.email = 'Enter a valid email address.';
        }

        if (password.length < 8) {
            nextErrors.password = 'Password must contain at least 8 characters.';
        }

        if (confirmPassword !== password) {
            nextErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        try {
            setLoading(true);

            const response = await API.post('/auth/register', {
                name: name.trim(),
                email: email.trim().toLowerCase(),
                password: password,
            });

            Alert.alert(
                'Success',
                'Your FitLink account has been created!',
                [
                    {
                        text: 'Continue',
                        onPress: () => navigation.navigate('Login'),
                    },
                ]
            );

            console.log('Signup response:', response.data);

        } catch (error) {
            console.log('Signup error:', error.response?.data || error.message);

            Alert.alert(
                'Signup Failed',
                error.response?.data?.message ||
                'Unable to connect to the server. Please try again.'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <KeyboardAvoidingView
                style={authStyles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    contentContainerStyle={authStyles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
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
                    <View style={authStyles.branding}>
                        <Image
                            source={{ uri: LOGO_URL }}
                            style={authStyles.logo}
                            resizeMode="contain"
                            accessibilityLabel="FitLink logo"
                        />
                        <Text style={authStyles.tagline}>
                            Better Workouts. Stronger You.
                        </Text>
                    </View>

                    <Text style={authStyles.heading}>Create Your Account</Text>
                    <Text style={authStyles.subtitle}>
                        Join FitLink and start tracking your progress.
                    </Text>

                    <AuthInput
                        placeholder="Full name"
                        value={name}
                        onChangeText={(value) => {
                            setName(value);
                            setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        autoCapitalize="words"
                        error={errors.name}
                    />

                    <AuthInput
                        placeholder="Email address"
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value);
                            setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        keyboardType="email-address"
                        error={errors.email}
                    />

                    <AuthInput
                        placeholder="Password (minimum 8 characters)"
                        value={password}
                        onChangeText={(value) => {
                            setPassword(value);
                            setErrors((prev) => ({
                                ...prev,
                                password: undefined,
                                confirmPassword: undefined,
                            }));
                        }}
                        secureTextEntry
                        error={errors.password}
                    />

                    <AuthInput
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChangeText={(value) => {
                            setConfirmPassword(value);
                            setErrors((prev) => ({
                                ...prev,
                                confirmPassword: undefined,
                            }));
                        }}
                        secureTextEntry
                        error={errors.confirmPassword}
                    />

                    <Pressable
                        style={[
                            authStyles.primaryButton,
                            loading && { opacity: 0.6 }
                        ]}
                        onPress={handleSignup}
                        disabled={loading}
                    >
                        <Text style={authStyles.primaryButtonText}>
                            {loading ? 'Creating Account...' : 'Sign Up'}
                        </Text>
                    </Pressable>

                    <View style={authStyles.dividerRow}>
                        <View style={authStyles.divider} />
                        <Text style={authStyles.dividerText}>OR</Text>
                        <View style={authStyles.divider} />
                    </View>

                    <Pressable
                        style={authStyles.googleButton}
                        onPress={() =>
                            Alert.alert(
                                'Google Sign-In',
                                'Google authentication will be added later.',
                            )
                        }
                    >
                        <Text style={authStyles.googleButtonText}>
                            🌐  Continue with Google
                        </Text>
                    </Pressable>

                    <View style={authStyles.footer}>
                        <Text style={authStyles.footerText}>
                            Already have an account?
                        </Text>
                        <Pressable onPress={() => navigation.navigate('Login')}>
                            <Text style={authStyles.footerLink}>Log In</Text>
                        </Pressable>
                    </View>

                    <Text
                        style={[
                            authStyles.tagline,
                            { textAlign: 'center', marginTop: 34 },
                        ]}
                    >
                        Stronger habits. A healthier you.
                    </Text>
                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
