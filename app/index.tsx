import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useAuthStore } from '../store/auth';
import { COLORS, SPACING, FONT_SIZES } from '../constants';
import { AppErrorBoundary } from '../components/ErrorBoundary';
import { useNotificationSetup } from '../hooks/useNotificationSetup';

function AppContent() {
  const { user, loading, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  if (user) {
    return <Redirect href="/(tabs)/chat" />;
  }

  return <Redirect href="/(auth)/login" />;
}

export default function Index() {
  useNotificationSetup();

  return (
    <AppErrorBoundary>
      <AppContent />
    </AppErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.textSecondary,
  },
});
