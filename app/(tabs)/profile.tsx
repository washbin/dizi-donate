import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { useAuth } from "@/contexts/AuthContext";

interface DonationHistory {
  id: number;
  amount: number;
  date: string;
  status: "completed" | "pending";
  campaign: {
    title: string;
    image: string;
  };
}

// Placeholder data - in a real app, this would come from an API
const placeholderDonations: DonationHistory[] = [
  {
    id: 1,
    amount: 100,
    date: "2024-03-15",
    status: "completed",
    campaign: {
      title: "Education for All",
      image: "https://via.placeholder.com/300x200",
    },
  },
  {
    id: 2,
    amount: 50,
    date: "2024-03-10",
    status: "completed",
    campaign: {
      title: "Education for All",
      image: "https://via.placeholder.com/300x200",
    },
  },
  {
    id: 3,
    amount: 200,
    date: "2024-03-05",
    status: "pending",
    campaign: {
      title: "Education for All",
      image: "https://via.placeholder.com/300x200",
    },
  },
];

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export default function ProfileScreen() {
  const router = useRouter();

  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace("/");
    } catch (error) {
      Alert.alert("Error", "Failed to sign in. Please try again.");
    }
  };

  const { user } = useAuth();

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
        <Text style={styles.donationTitle}>
          Donation to {donation.campaign.title}
        </Text>
        <Text style={styles.donationDate}>{donation.date}</Text>
      </View>
      <View style={styles.donationAmount}>
        <Text style={styles.amountText}>£{donation.amount}</Text>
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
    const totalDonated = placeholderDonations
      .filter((d) => d.status === "completed")
      .reduce((sum, d) => sum + d.amount, 0);

    const totalPending = placeholderDonations
      .filter((d) => d.status === "pending")
      .reduce((sum, d) => sum + d.amount, 0);

    return (
      <View style={styles.summarySection}>
        <Text style={styles.sectionTitle}>Donation Summary</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>£{totalDonated}</Text>
            <Text style={styles.summaryLabel}>Total Donated</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>£{totalPending}</Text>
            <Text style={styles.summaryLabel}>Pending</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>
              {placeholderDonations.length}
            </Text>
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
        {placeholderDonations.map((donation) => (
          <DonationItem key={donation.id} donation={donation} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <SettingsItem icon="person" title="Edit Profile" onPress={() => {}} />
        <SettingsItem
          icon="notifications"
          title="Notifications"
          onPress={() => {}}
        />
        <SettingsItem icon="security" title="Security" onPress={() => {}} />
        <SettingsItem icon="help" title="Help & Support" onPress={() => {}} />
        <SettingsItem icon="logout" title="Logout" onPress={handleLogout} />
      </View>
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
