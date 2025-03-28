import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function UserTypeSelection() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Choose Your Role</ThemedText>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/signup?type=user')}
      >
        <ThemedText style={styles.buttonText}>I want to Donate</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => router.push('/signup?type=campaigner')}
      >
        <ThemedText style={styles.buttonText}>I want to Create Campaigns</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.linkButton}
        onPress={() => router.push('/login')}
      >
        <ThemedText style={styles.linkText}>Already have an account? Login</ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
}); 