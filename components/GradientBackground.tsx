import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'light' | 'dark';
}

/**
 * 🌫️ GradientBackground - Fondo con gradiente tipo niebla
 * Simula un gradiente suave sin patrones duros
 */
export const GradientBackground: React.FC<GradientBackgroundProps> = ({ 
  children, 
  style,
  variant = 'light'
}) => {
  const isLight = variant === 'light';
  
  return (
    <View style={[styles.container, style]}>
      {/* Capa base */}
      <View 
        style={[
          styles.baseLayer,
          { backgroundColor: isLight ? Colors.light : Colors.dark }
        ]} 
      />
      
      {/* Capa de gradiente superior */}
      <View 
        style={[
          styles.gradientTop,
          { 
            backgroundColor: isLight ? 
              'rgba(111, 157, 247, 0.15)' : 
              'rgba(111, 157, 247, 0.08)'
          }
        ]} 
      />
      
      {/* Capa de gradiente media */}
      <View 
        style={[
          styles.gradientMiddle,
          { 
            backgroundColor: isLight ? 
              'rgba(168, 148, 255, 0.08)' : 
              'rgba(168, 148, 255, 0.05)'
          }
        ]} 
      />
      
      {/* Contenido */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  baseLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },
  gradientMiddle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderTopLeftRadius: 180,
    borderTopRightRadius: 180,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});

export default GradientBackground;
