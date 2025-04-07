import { useState, useEffect } from "react";
import {
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { API_BASE_URL } from "@/config/api";
import { useStripe } from "@stripe/stripe-react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

import { Colors } from "@/constants/Colors";
import { TextInput } from "react-native";

export default function DonationScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("10");

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_BASE_URL}/donations/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number.parseFloat(amount) * 100,
        currency: "GBP",
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch payment sheet parameters");
    }
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const { paymentIntent, ephemeralKey, customer } =
      await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: "Jane Doe",
      },
    });
    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert("Success", "Your order is confirmed!");
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <ThemedView style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Make a Donation
        </ThemedText>

        <ThemedText type="defaultSemiBold" style={styles.label}>
          Amount
        </ThemedText>
        <ThemedView style={styles.inputContainer}>
          <ThemedText type="default" style={styles.currencySymbol}>
            £
          </ThemedText>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
            placeholder="10"
          />
        </ThemedView>

        <TouchableOpacity
          style={styles.button}
          onPress={openPaymentSheet}
          disabled={!loading || !amount || Number.parseFloat(amount) <= 0}
        >
          <Text style={styles.buttonText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 32,
    textAlign: "center",
  },
  card: {
    padding: 24,
  },
  label: {
    marginBottom: 4,
  },
  currencyLabel: {
    marginTop: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  currencySymbol: {
    marginRight: 4,
    fontSize: 24,
  },
  input: {
    flex: 1,
    fontSize: 24,
    padding: 8,
    borderBottomWidth: 2,
  },
  pickerContainer: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 32,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  picker: {
    height: 50,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.dark.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
