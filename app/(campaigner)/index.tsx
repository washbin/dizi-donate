import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for donations
const mockDonations = [
  {
    id: 1,
    campaignTitle: 'Help Children in Need',
    donorName: 'John Doe',
    amount: 100,
    date: '2024-03-15',
  },
  {
    id: 2,
    campaignTitle: 'Environmental Cleanup',
    donorName: 'Jane Smith',
    amount: 50,
    date: '2024-03-14',
  },
];

export default function CampaignerDashboard() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>My Campaign Donations</ThemedText>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.donationList}>
        {mockDonations.map((donation) => (
          <View key={donation.id} style={styles.donationCard}>
            <ThemedText style={styles.campaignTitle}>{donation.campaignTitle}</ThemedText>
            <View style={styles.donationDetails}>
              <ThemedText style={styles.donorName}>From: {donation.donorName}</ThemedText>
              <ThemedText style={styles.amount}>${donation.amount}</ThemedText>
              <ThemedText style={styles.date}>{donation.date}</ThemedText>
            </View>
          </View>
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
  donationList: {
    flex: 1,
  },
  donationCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  donationDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  donorName: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
}); 