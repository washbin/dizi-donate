import * as SecureStore from 'expo-secure-store';
import { API_URL } from '@/constants';

const TOKEN_KEY = 'auth_token';
const USER_TYPE_KEY = 'user_type';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  userType: 'user' | 'campaigner';
}

export interface AuthResponse {
  token: string;
  userType: 'user' | 'campaigner';
  userId: string;
  name: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }

      const data: AuthResponse = await response.json();
      await this.setToken(data.token);
      await this.setUserType(data.userType);
      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Signup failed');
      }

      const authData: AuthResponse = await response.json();
      await this.setToken(authData.token);
      await this.setUserType(authData.userType);
      return authData;
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(USER_TYPE_KEY);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.error('Get token error:', error);
      return null;
    }
  }

  async getUserType(): Promise<'user' | 'campaigner' | null> {
    try {
      const type = await SecureStore.getItemAsync(USER_TYPE_KEY);
      return type as 'user' | 'campaigner' | null;
    } catch (error) {
      console.error('Get user type error:', error);
      return null;
    }
  }

  private async setToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } catch (error) {
      console.error('Set token error:', error);
      throw error;
    }
  }

  private async setUserType(userType: 'user' | 'campaigner'): Promise<void> {
    try {
      await SecureStore.setItemAsync(USER_TYPE_KEY, userType);
    } catch (error) {
      console.error('Set user type error:', error);
      throw error;
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await this.getToken();
      return !!token;
    } catch (error) {
      console.error('Check authentication error:', error);
      return false;
    }
  }
}

export const authService = new AuthService(); 