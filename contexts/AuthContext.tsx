import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService, AuthResponse } from '@/services/auth';

type UserType = 'user' | 'campaigner' | null;

interface AuthContextType {
  userType: UserType;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: {
    id: string;
    name: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, userType: UserType) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const isAuth = await authService.isAuthenticated();
      if (isAuth) {
        const type = await authService.getUserType();
        setUserType(type);
        // TODO: Fetch user details from API
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });
      setUserType(response.userType);
      setUser({ id: response.userId, name: response.name });
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string, userType: UserType) => {
    try {
      setIsLoading(true);
      const response = await authService.signup({ name, email, password, userType });
      setUserType(response.userType);
      setUser({ id: response.userId, name: response.name });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUserType(null);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userType,
        isAuthenticated: !!userType,
        isLoading,
        user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 