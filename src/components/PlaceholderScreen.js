
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PlaceholderScreen({ title }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>FitLink — Coming soon</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#172554',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
  },
});
