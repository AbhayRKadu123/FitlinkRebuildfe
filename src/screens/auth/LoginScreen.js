
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
  StyleSheet,
} from 'react-native';
import Toast from 'react-native-toast-message';
import AuthInput from '../../components/auth/AuthInput';
import { authStyles, COLORS } from '../../constants/authStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  // ScrollView,
  RefreshControl,
} from 'react-native';
// import API from '../../api/api'; // Adjust the import path as necessaryR
import * as Keychain from 'react-native-keychain';
// Replace this with your Cloudinary logo URL.
import API from '../../api/api';
const LOGO_URL =
  'https://res.cloudinary.com/dcrso2pvr/image/upload/v1792842630/a_clean_high_resolution_vector_logo_style_image_o_hl5vhp.png';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      // Call your API to reload screen data here
      setEmail('')
      setPassword('');
      setErrors({});
      setLoading(false);
      setRefreshing(false);
      setRememberMe(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  const handleLogin = async () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!password) {
      nextErrors.password = 'Please enter your password.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      // Call login API
      const response = await API.post('/auth/login', {
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, user } = response.data;

      // Securely store JWT token
      await Keychain.setGenericPassword(
        'fitlink',
        token,
        { service: 'fitlink_auth_token' }
      );

      // Save remember me preference if needed later
      Toast.show({
        type: 'success',
        text1: 'Welcome Back!',
        text2: 'Login successful.',
      });

      navigation.replace('Main');

    } catch (error) {
      console.log(
        'Login error:',
        error.response?.data || error.message
      );

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Something went wrong.',
      });

    } finally {
      setLoading(false);
    }
  };


  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot password?',
      'Password reset will be available after backend integration.',
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
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

          <Text style={authStyles.heading}>Welcome Back</Text>
          <Text style={authStyles.subtitle}>
            Log in to continue your fitness journey.
          </Text>

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
            placeholder="Password"
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            secureTextEntry
            error={errors.password}
          />

          <View style={authStyles.row}>
            <Pressable
              style={styles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: rememberMe }}
            >
              <View
                style={[
                  styles.checkbox,
                  rememberMe && styles.checkboxChecked,
                ]}
              >
                {rememberMe && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </Pressable>

            <Pressable onPress={handleForgotPassword}>
              <Text style={authStyles.link}>Forgot password?</Text>
            </Pressable>
          </View>

          <Pressable
            style={[
              authStyles.primaryButton,
              loading && { opacity: 0.6 }
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={authStyles.primaryButtonText}>
              {loading ? 'Logging In...' : 'Log In'}
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
              Don't have an account?
            </Text>
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text style={authStyles.footerLink}>Sign Up</Text>
            </Pressable>
          </View>

          <Text style={styles.bottomText}>
            Small steps. Big results.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkmark: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  rememberText: {
    color: COLORS.text,
    fontSize: 13,
  },
  bottomText: {
    textAlign: 'center',
    color: '#93A8C8',
    fontSize: 12,
    marginTop: 34,
  },
});
