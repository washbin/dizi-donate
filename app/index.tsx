import { Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function Index() {
  const { isAuthenticated, userType } = useAuth();

  if (isAuthenticated) {
    return <Redirect href={userType === 'campaigner' ? '/(campaigner)' : '/(user)'} />;
  }

  return <Redirect href="/(auth)" />;
} 