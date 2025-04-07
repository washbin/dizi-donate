import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/config/api";

interface ImpactStats {
  totalDonations: number;
  totalAmount: number;
  childrenHelped: number;
  schoolsSupported: number;
  communitiesReached: number;
  lastUpdate: string;
}

// Placeholder data - in a real app, this would come from an API
const impactStats: ImpactStats = {
  totalDonations: 150,
  totalAmount: 25000,
  childrenHelped: 100,
  schoolsSupported: 5,
  communitiesReached: 3,
  lastUpdate: "2024-03-15",
};

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export default function ImpactScreen() {
  const router = useRouter();


    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const fetchDonationHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/campaign/stats`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch donation history");
        }
  
        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchDonationHistory();
    }, []);

  const StatCard = ({
    title,
    value,
    icon,
  }: { title: string; value: string | number; icon: MaterialIconName }) => (
    <View style={styles.statCard}>
      <MaterialIcons name={icon} size={24} color="#4CAF50" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );

  const ImpactStory = ({
    title,
    description,
    image,
  }: { title: string; description: string; image: string }) => (
    <View style={styles.storyCard}>
      <Image source={{ uri: image }} style={styles.storyImage} />
      <View style={styles.storyContent}>
        <Text style={styles.storyTitle}>{title}</Text>
        <Text style={styles.storyDescription}>{description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Our Impact</Text>
        <Text style={styles.subtitle}>Education for All Campaign</Text>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Campaign Progress</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Donations"
            value={stats.totalDonations}
            icon="volunteer-activism"
          />
          <StatCard
            title="Total Amount"
            value={`£${stats.totalAmount}`}
            icon="payments"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Impact Metrics</Text>
        <View style={styles.statsGrid}>
          <StatCard
            title="Children Helped"
            value={impactStats.childrenHelped}
            icon="child-care"
          />
          <StatCard
            title="Schools Supported"
            value={impactStats.schoolsSupported}
            icon="school"
          />
          <StatCard
            title="Communities Reached"
            value={impactStats.communitiesReached}
            icon="location-city"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Success Stories</Text>
        <ImpactStory
          title="New School Building"
          description="Thanks to your donations, we've completed the construction of a new school building in rural area, providing education to 50 children."
          image="https://via.placeholder.com/300x200"
        />
        <ImpactStory
          title="School Supplies Distribution"
          description="We've distributed essential school supplies to 100 students, ensuring they have the tools they need to learn effectively."
          image="https://via.placeholder.com/300x200"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Impact</Text>
        <TouchableOpacity style={styles.impactCard}>
          <MaterialIcons name="person" size={24} color="#4CAF50" />
          <View style={styles.impactContent}>
            <Text style={styles.impactTitle}>Your Donations</Text>
            <Text style={styles.impactValue}>£1,500</Text>
            <Text style={styles.impactDescription}>
              You've helped provide education to 6 children
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Last updated: {impactStats.lastUpdate}
        </Text>
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
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
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
  statsSection: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 8,
  },
  statTitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  storyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  storyImage: {
    width: "100%",
    height: 200,
  },
  storyContent: {
    padding: 16,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  storyDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  impactCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    borderRadius: 12,
    padding: 16,
  },
  impactContent: {
    marginLeft: 16,
    flex: 1,
  },
  impactTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  impactValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  impactDescription: {
    fontSize: 14,
    color: "#666",
  },
  footer: {
    padding: 20,
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
});
