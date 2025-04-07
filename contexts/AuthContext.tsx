import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_BASE_URL } from "@/config/api";

type User = {
  token: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app start
    loadStoredUser();
  }, []);

  async function loadStoredUser() {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(JSON.parse(user));
      }
    } catch (error) {
      console.error("Error loading stored user:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = (await response.json()).error;
        throw new Error(error);
      }

      const data = (await response.json()).data;

      await AsyncStorage.setItem("user", JSON.stringify(data));
      setUser(data);
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  }

  async function signUp(email: string, password: string, name: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });
      if (!response.ok) {
        const error = (await response.json()).error;
        throw new Error(error);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
