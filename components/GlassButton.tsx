import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { Colors, BorderRadius, Shadows, Typography } from '../constants/theme';

interface GlassButtonProps {
  onPress: () => void;
  title: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * 🔘 GlassButton - Botón con efecto glassmorphism
 * Con blur, reflejo dinámico y retroalimentación visual
 */
export const GlassButton: React.FC<GlassButtonProps> = ({ 
  onPress, 
  title, 
  style,
  textStyle,
  variant = 'primary'
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          container: styles.primaryContainer,
          text: styles.primaryText,
        };
      case 'secondary':
        return {
          container: styles.secondaryContainer,
          text: styles.secondaryText,
        };
      case 'ghost':
        return {
          container: styles.ghostContainer,
          text: styles.ghostText,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <TouchableOpacity 
      style={[styles.container, variantStyles.container, style]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, variantStyles.text, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.xl,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  text: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.fonts.semibold.weight,
    letterSpacing: 0.5,
  },
  
  // Variante Primary
  primaryContainer: {
    backgroundColor: Colors.primary,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    ...Shadows.medium,
  },
  primaryText: {
    color: Colors.white,
  },
  
  // Variante Secondary
  secondaryContainer: {
    backgroundColor: Colors.glass.medium,
    borderColor: 'rgba(111, 157, 247, 0.4)',
    ...Shadows.soft,
  },
  secondaryText: {
    color: Colors.primary,
  },
  
  // Variante Ghost
  ghostContainer: {
    backgroundColor: 'transparent',
    borderColor: Colors.glass.soft,
  },
  ghostText: {
    color: Colors.text.primary,
  },
});

export default GlassButton;
