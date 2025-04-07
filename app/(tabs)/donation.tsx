import { useState, useEffect } from "react";
import {
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { API_BASE_URL } from "@/config/api";
import { useStripe, retrievePaymentIntent } from "@stripe/stripe-react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";

export default function DonationScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("10");
  const [clientSecret, setClientSecret] = useState("");

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_BASE_URL}/donations/payment-sheet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number.parseFloat(amount) * 100, // Convert to cents
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
    try {
      const { paymentIntent, ephemeralKey, customer } =
        await fetchPaymentSheetParams();

      setClientSecret(paymentIntent);

      const { error } = await initPaymentSheet({
        merchantDisplayName: "Example, Inc.",
        customerId: customer,
        customerEphemeralKeySecret: ephemeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        defaultBillingDetails: {
          name: "Jane Doe",
        },
      });

      if (!error) {
        setLoading(true);
      }
    } catch (e) {
      console.error("Error initializing payment sheet:", e);
      Alert.alert("Error", "Unable to initialize payment.");
    }
  };

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      try {
        const result = await retrievePaymentIntent(clientSecret);
        const paymentIntentId = result?.paymentIntent?.id;

        if (paymentIntentId) {
          await fetch(`${API_BASE_URL}/donations/save-payment`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user?.token}`,
            },
            body: JSON.stringify({ paymentIntentId }),
          });
        }

        Alert.alert("Success", "Your donation has been received!");
      } catch (e) {
        console.error("Failed to save payment:", e);
        Alert.alert("Success", "Payment succeeded, but we couldn't save it.");
      }
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
  label: {
    marginBottom: 4,
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
