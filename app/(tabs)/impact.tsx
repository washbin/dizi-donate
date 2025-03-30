import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface ImpactStats {
	totalDonations: number;
	totalAmount: number;
	activeCampaigns: number;
	completedCampaigns: number;
}

// Placeholder data - in a real app, this would come from an API
const placeholderStats: ImpactStats = {
	totalDonations: 150,
	totalAmount: 25000,
	activeCampaigns: 8,
	completedCampaigns: 12,
};

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

export default function ImpactScreen() {
	const router = useRouter();

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

	return (
		<ScrollView style={styles.container}>
			<Text style={styles.title}>Our Impact</Text>

			<View style={styles.statsGrid}>
				<StatCard
					title="Total Donations"
					value={placeholderStats.totalDonations}
					icon="volunteer-activism"
				/>
				<StatCard
					title="Total Amount"
					value={`$${placeholderStats.totalAmount.toLocaleString()}`}
					icon="payments"
				/>
				<StatCard
					title="Active Campaigns"
					value={placeholderStats.activeCampaigns}
					icon="campaign"
				/>
				<StatCard
					title="Completed Campaigns"
					value={placeholderStats.completedCampaigns}
					icon="check-circle"
				/>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Recent Success Stories</Text>
				<TouchableOpacity style={styles.storyCard}>
					<View style={styles.storyContent}>
						<Text style={styles.storyTitle}>Education for All</Text>
						<Text style={styles.storyDescription}>
							Successfully funded education for 100 children in rural areas.
						</Text>
					</View>
					<MaterialIcons name="arrow-forward" size={24} color="#666" />
				</TouchableOpacity>

				<TouchableOpacity style={styles.storyCard}>
					<View style={styles.storyContent}>
						<Text style={styles.storyTitle}>Clean Water Project</Text>
						<Text style={styles.storyDescription}>
							Provided clean water access to 500 families in need.
						</Text>
					</View>
					<MaterialIcons name="arrow-forward" size={24} color="#666" />
				</TouchableOpacity>
			</View>

			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Your Impact</Text>
				<TouchableOpacity style={styles.impactCard}>
					<MaterialIcons name="person" size={24} color="#4CAF50" />
					<View style={styles.impactContent}>
						<Text style={styles.impactTitle}>Your Donations</Text>
						<Text style={styles.impactValue}>$1,500</Text>
						<Text style={styles.impactDescription}>
							You've helped 5 campaigns reach their goals
						</Text>
					</View>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		padding: 20,
		color: "#333",
	},
	statsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		padding: 10,
		justifyContent: "space-between",
	},
	statCard: {
		width: "48%",
		backgroundColor: "#f8f8f8",
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		alignItems: "center",
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
	section: {
		padding: 20,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 16,
	},
	storyCard: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f8f8f8",
		borderRadius: 12,
		padding: 16,
		marginBottom: 12,
	},
	storyContent: {
		flex: 1,
	},
	storyTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 4,
	},
	storyDescription: {
		fontSize: 14,
		color: "#666",
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
});
