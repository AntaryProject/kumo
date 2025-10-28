import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, BorderRadius, Shadows } from '../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: 'subtle' | 'soft' | 'medium' | 'light';
}

/**
 * 🪟 GlassCard - Componente con efecto glassmorphism
 * Diseño translúcido con sombra azul tenue y borde blanco desvanecido
 */
export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  style, 
  intensity = 'medium' 
}) => {
  const backgroundColors = {
    subtle: Colors.glass.subtle,
    soft: Colors.glass.soft,
    medium: Colors.glass.medium,
    light: Colors.glass.light,
  };

  return (
    <View 
      style={[
        styles.container, 
        { backgroundColor: backgroundColors[intensity] },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    padding: 20,
    ...Shadows.soft,
  },
});

export default GlassCard;
