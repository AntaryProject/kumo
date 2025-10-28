import { Stack } from 'expo-router';
import { COLORS } from '../../constants';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Iniciar Sesión',
          headerShown: false,
        }} 
      />
      <Stack.Screen 
        name="register" 
        options={{ 
          title: 'Crear Cuenta',
          headerShown: false,
        }} 
      />
    </Stack>
  );
}
