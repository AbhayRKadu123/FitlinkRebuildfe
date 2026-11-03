
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import { authStyles, COLORS } from '../../constants/authStyles';

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
  autoCapitalize = 'none',
  error,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={authStyles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[
            authStyles.input,
            styles.textInput,
            secureTextEntry && styles.passwordInput,
            error ? authStyles.inputError : null,
          ]}
          placeholder={placeholder}
          placeholderTextColor="#8A9AB1"
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          accessibilityLabel={placeholder}
        />

        {secureTextEntry && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeButton}
            accessibilityRole="button"
            accessibilityLabel={
              showPassword ? 'Hide password' : 'Show password'
            }
          >
            <Text style={styles.eyeText}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </Pressable>
        )}
      </View>

      {!!error && (
        <Text style={authStyles.errorText}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  textInput: {
    width: '100%',
  },
  passwordInput: {
    paddingRight: 75,
  },
  eyeButton: {
    position: 'absolute',
    right: 14,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  eyeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});
