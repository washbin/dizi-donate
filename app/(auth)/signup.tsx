import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { useAuth } from '@/contexts/AuthContext';

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useAuth();
    const { type } = useLocalSearchParams<{ type: 'user' | 'campaigner' }>();

    const handleSubmit = async () => {
        if (!email || !password || !name) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        try {
            setIsLoading(true);
            await signup(name, email, password, type || 'user');
            router.replace(type === 'campaigner' ? '/(campaigner)' : '/(user)');
        } catch (error) {
            Alert.alert('Error', error instanceof Error ? error.message : 'Signup failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Sign Up' }} />
            <View style={styles.container}>
                <View>
                    <ThemedText style={[styles.headline, { fontSize: 72 }]}>
                        SignUp
                    </ThemedText>

                    <ThemedText>Name:</ThemedText>
                    <TextInput
                        placeholder="Enter your name..."
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        autoCapitalize="words"
                        editable={!isLoading}
                    />

                    <ThemedText>Email:</ThemedText>
                    <TextInput
                        placeholder="Enter your email..."
                        style={styles.input}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        editable={!isLoading}
                    />

                    <ThemedText>Password:</ThemedText>
                    <TextInput
                        style={styles.input}
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        editable={!isLoading}
                    />

                    <TouchableOpacity 
                        style={[styles.button, isLoading && styles.buttonDisabled]} 
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Sign Up</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.linkButton}
                        onPress={() => router.push('/login')}
                    >
                        <ThemedText style={styles.linkText}>Already have an account? Login</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    headline: {
        textAlign: "center",
        marginTop: -100,
        marginBottom: 50,
        fontWeight: 700,
        fontStyle: "italic",
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "grey",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 12,
        borderRadius: 6,
        alignItems: "center",
        marginTop: 10,
    },
    buttonDisabled: {
        opacity: 0.7,
    },
    buttonText: {
        color: "white",
        fontSize: 18,
    },
    linkButton: {
        marginTop: 20,
        alignItems: 'center',
    },
    linkText: {
        color: '#007AFF',
        fontSize: 16,
    },
}); 