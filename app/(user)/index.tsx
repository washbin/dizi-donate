import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for active campaigns
const mockCampaigns = [
  {
    id: 1,
    title: 'Help Children in Need',
    description: 'Support education for underprivileged children',
    progress: 75,
    target: 10000,
    raised: 7500,
  },
  {
    id: 2,
    title: 'Environmental Cleanup',
    description: 'Help us clean up our local beaches',
    progress: 45,
    target: 5000,
    raised: 2250,
  },
];

export default function UserDashboard() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>Active Campaigns</ThemedText>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.campaignList}>
        {mockCampaigns.map((campaign) => (
          <TouchableOpacity key={campaign.id} style={styles.campaignCard}>
            <ThemedText style={styles.campaignTitle}>{campaign.title}</ThemedText>
            <ThemedText style={styles.campaignDescription}>{campaign.description}</ThemedText>
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: `${campaign.progress}%` }]} />
              <ThemedText style={styles.progressText}>
                ${campaign.raised} raised of ${campaign.target}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#007AFF',
    fontSize: 16,
  },
  campaignList: {
    flex: 1,
  },
  campaignCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  campaignDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  progressContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
}); 