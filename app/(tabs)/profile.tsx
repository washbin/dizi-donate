import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";

interface DonationHistory {
  id: number;
  amount: number;
  date: string;
  status: "completed" | "pending";
}

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export default function ProfileScreen() {
  const router = useRouter();

  const { signOut, user } = useAuth();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonationHistory = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/donations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`, // Pass JWT token in header
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch donation history");
      }

      const data = await response.json();
      setDonations(data.donations);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonationHistory();
  }, [user]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to sign in. Please try again.");
    }
  };

  const ProfileHeader = () => (
    <View style={styles.header}>
      {/* <View style={styles.avatarContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.avatar}
        />
      </View> */}
      <Text style={styles.name}>{user?.name}</Text>
      <Text style={styles.email}>{user?.email}</Text>
    </View>
  );

  const SettingsItem = ({
    icon,
    title,
    onPress,
  }: { icon: MaterialIconName; title: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#666" />
      <Text style={styles.settingsText}>{title}</Text>
      <MaterialIcons name="chevron-right" size={24} color="#666" />
    </TouchableOpacity>
  );

  const DonationItem = ({ donation }: { donation: DonationHistory }) => (
    <View style={styles.donationItem}>
      <View style={styles.donationContent}>
        <Text style={styles.donationTitle}>Donation to Children Welfare</Text>
        <Text style={styles.donationDate}>{donation.date}</Text>
      </View>
      <View style={styles.donationAmount}>
        <Text style={styles.amountText}>£{donation.amount / 100}</Text>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                donation.status === "completed" ? "#e8f5e9" : "#fff3e0",
            },
          ]}
        >
          <Text
            style={[
              styles.statusText,
              {
                color: donation.status === "completed" ? "#4CAF50" : "#ff9800",
              },
            ]}
          >
            {donation.status}
          </Text>
        </View>
      </View>
    </View>
  );

  const DonationSummary = () => {
    const totalDonated = donations
      .filter((d) => d.status === "succeeded")
      .reduce((sum, d) => sum + d.amount, 0);

    const totalPending = donations
      .filter((d) => d.status === "pending")
      .reduce((sum, d) => sum + d.amount, 0);

    return (
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Donation Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>£{totalDonated / 100}</Text>
            <Text style={styles.summaryLabel}>Total Donated</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>£{totalPending / 100}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>{donations.length}</Text>
            <Text style={styles.summaryLabel}>Total Donations</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeader />
      <DonationSummary />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Donation History</Text>
        {loading ? (
          <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          donations.map((donation) => (
            <DonationItem key={donation.id} donation={donation} />
          ))
        )}

        {error ? (
          <View style={styles.container}>
            <Text>{error}</Text>
          </View>
        ) : null}
      </View>

      <SettingsItem icon="logout" title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 12,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  summarySection: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  summaryGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  donationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  donationContent: {
    flex: 1,
  },
  donationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  donationDate: {
    fontSize: 14,
    color: "#666",
  },
  donationAmount: {
    alignItems: "flex-end",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  settingsText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
});
