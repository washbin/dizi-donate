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

interface Campaign {
  title: string;
  description: string;
  target: number;
  raised: number;
  image: string;
  daysLeft: number;
  category: string;
  impact: {
    title: string;
    value: string;
  }[];
}

// Placeholder data - in a real app, this would come from an API
const campaign: Campaign = {
  title: "Education for All",
  description:
    "Support education for underprivileged children in rural areas. Your donation will help provide quality education, school supplies, and learning resources to children who need it most.",
  target: 50000,
  raised: 25000,
  image: "https://via.placeholder.com/300x200",
  daysLeft: 15,
  category: "Education",
  impact: [
    { title: "Children Helped", value: "100+" },
    { title: "Schools Supported", value: "5" },
    { title: "Communities Reached", value: "3" },
  ],
};

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export default function HomeScreen() {
  const router = useRouter();
  const progress = (campaign.raised / campaign.target) * 100;

  const ImpactCard = ({ title, value }: { title: string; value: string }) => (
    <View style={styles.impactCard}>
      <Text style={styles.impactValue}>{value}</Text>
      <Text style={styles.impactTitle}>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome back!</Text>
        <Text style={styles.subtitle}>Make a difference today</Text>
      </View>

      <View style={styles.campaignSection}>
        <Image source={{ uri: campaign.image }} style={styles.campaignImage} />
        <View style={styles.campaignContent}>
          <View style={styles.categoryBadge}>
            <MaterialIcons name="school" size={16} color="#4CAF50" />
            <Text style={styles.categoryText}>{campaign.category}</Text>
          </View>
          <Text style={styles.campaignTitle}>{campaign.title}</Text>
          <Text style={styles.campaignDescription}>{campaign.description}</Text>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>
              £{campaign.raised.toLocaleString()} / £
              {campaign.target.toLocaleString()}
            </Text>
          </View>

          <View style={styles.impactSection}>
            <Text style={styles.sectionTitle}>Our Impact</Text>
            <View style={styles.impactGrid}>
              {campaign.impact.map((item) => (
                <ImpactCard
                  key={item.title}
                  title={item.title}
                  value={item.value}
                />
              ))}
            </View>
          </View>

          <View style={styles.campaignFooter}>
            <View style={styles.daysLeft}>
              <MaterialIcons name="schedule" size={16} color="#666" />
              <Text style={styles.daysLeftText}>
                {campaign.daysLeft} days left
              </Text>
            </View>
            <TouchableOpacity
              style={styles.donateButton}
              onPress={() => router.push("/donation")}
            >
              <Text style={styles.donateButtonText}>Donate Now</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  campaignSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  campaignImage: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  campaignContent: {
    padding: 20,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  categoryText: {
    color: "#4CAF50",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  campaignTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  campaignDescription: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  progressText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  impactSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  impactGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  impactCard: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 6,
    alignItems: "center",
  },
  impactValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 4,
  },
  impactTitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  campaignFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  daysLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  daysLeftText: {
    fontSize: 16,
    color: "#666",
    marginLeft: 4,
  },
  donateButton: {
    backgroundColor: "#4CAF50",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  donateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
