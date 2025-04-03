import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface DonationForm {
  amount: string;
  paymentMethod: "qr" | "nfc" | null;
}

export default function DonationScreen() {
  const [form, setForm] = useState<DonationForm>({
    amount: "",
    paymentMethod: null,
  });
  const router = useRouter();

  const handleDonate = () => {
    const amount = Number.parseFloat(form.amount);
    if (Number.isNaN(amount) || amount <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    if (!form.paymentMethod) {
      Alert.alert("Error", "Please select a payment method");
      return;
    }

    // TODO: Implement actual payment processing based on selected method
    Alert.alert("Success", "Thank you for your donation!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a Donation</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Donation Amount ($)</Text>
        <TextInput
          style={styles.input}
          value={form.amount}
          onChangeText={(text) => setForm({ ...form, amount: text })}
          keyboardType="numeric"
          placeholder="Enter amount"
        />

        <Text style={styles.label}>Payment Method</Text>
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              form.paymentMethod === "qr" && styles.selectedMethod,
            ]}
            onPress={() => setForm({ ...form, paymentMethod: "qr" })}
          >
            <MaterialIcons
              name="qr-code"
              size={24}
              color={form.paymentMethod === "qr" ? "#fff" : "#666"}
            />
            <Text
              style={[
                styles.methodText,
                form.paymentMethod === "qr" && styles.selectedMethodText,
              ]}
            >
              QR Code
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              form.paymentMethod === "nfc" && styles.selectedMethod,
            ]}
            onPress={() => setForm({ ...form, paymentMethod: "nfc" })}
          >
            <MaterialIcons
              name="nfc"
              size={24}
              color={form.paymentMethod === "nfc" ? "#fff" : "#666"}
            />
            <Text
              style={[
                styles.methodText,
                form.paymentMethod === "nfc" && styles.selectedMethodText,
              ]}
            >
              NFC
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleDonate}>
          <Text style={styles.buttonText}>Donate Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  paymentMethods: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  paymentMethod: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 5,
  },
  selectedMethod: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  methodText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#666",
  },
  selectedMethodText: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
