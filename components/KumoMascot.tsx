import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Colors } from '../constants/theme';

interface KumoMascotProps {
  emotion?: 'calm' | 'neutral' | 'introspection' | 'relief' | 'motivation';
  size?: number;
}

/**
 * ☁️ KumoMascot - La mascota nube viva y luminosa
 * 
 * Características:
 * - Forma: nube redonda, suave, ligeramente translúcida
 * - Rostro: ojos grandes con reflejos azul-gris, expresión serena
 * - Material: mezcla de vapor + cristal + luz
 * - Movimiento: flota lentamente con pulsaciones suaves (respiración)
 * - Color dinámico: cambia según el estado emocional
 */
export const KumoMascot: React.FC<KumoMascotProps> = ({ 
  emotion = 'calm',
  size = 150
}) => {
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  // Animación de respiración 4-4-4 (inspirar → mantener → exhalar)
  useEffect(() => {
    const breatheSequence = Animated.sequence([
      // Inspirar (4s)
      Animated.timing(breatheAnim, {
        toValue: 1.1,
        duration: 4000,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
      // Mantener (4s) - sin cambio
      Animated.delay(4000),
      // Exhalar (4s)
      Animated.timing(breatheAnim, {
        toValue: 1,
        duration: 4000,
        easing: Easing.inOut(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(breatheSequence).start();
  }, [breatheAnim]);

  // Animación de flotación
  useEffect(() => {
    const floatSequence = Animated.sequence([
      Animated.timing(floatAnim, {
        toValue: -10,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(floatAnim, {
        toValue: 0,
        duration: 3000,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    Animated.loop(floatSequence).start();
  }, [floatAnim]);

  const emotionColor = Colors.emotions[emotion];

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [
            { scale: breatheAnim },
            { translateY: floatAnim },
          ],
        },
      ]}
    >
      {/* Nube principal */}
      <View style={[styles.cloudMain, { backgroundColor: emotionColor }]} />
      
      {/* Partes de la nube (efecto volumétrico) */}
      <View style={[styles.cloudBubble, styles.cloudLeft, { backgroundColor: emotionColor }]} />
      <View style={[styles.cloudBubble, styles.cloudRight, { backgroundColor: emotionColor }]} />
      <View style={[styles.cloudBubble, styles.cloudTop, { backgroundColor: emotionColor }]} />
      
      {/* Brillo interno (glow) */}
      <View style={[styles.innerGlow, { backgroundColor: emotionColor }]} />
      
      {/* Rostro de Kumo */}
      <View style={styles.face}>
        {/* Ojos */}
        <View style={styles.eyesContainer}>
          <View style={styles.eye}>
            <View style={styles.eyeball} />
            <View style={styles.eyeReflection} />
          </View>
          <View style={styles.eye}>
            <View style={styles.eyeball} />
            <View style={styles.eyeReflection} />
          </View>
        </View>
        
        {/* Boca serena (sutil sonrisa) */}
        <View style={styles.mouth} />
      </View>
      
      {/* Partículas flotantes alrededor */}
      <View style={[styles.particle, styles.particle1]} />
      <View style={[styles.particle, styles.particle2]} />
      <View style={[styles.particle, styles.particle3]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Estructura de la nube
  cloudMain: {
    position: 'absolute',
    width: '100%',
    height: '70%',
    borderRadius: 9999,
    opacity: 0.9,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  
  cloudBubble: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.85,
  },
  
  cloudLeft: {
    width: '50%',
    height: '50%',
    left: -10,
    top: '25%',
  },
  
  cloudRight: {
    width: '50%',
    height: '50%',
    right: -10,
    top: '25%',
  },
  
  cloudTop: {
    width: '45%',
    height: '45%',
    top: -5,
    alignSelf: 'center',
  },
  
  // Brillo interno (glow effect)
  innerGlow: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    borderRadius: 9999,
    opacity: 0.4,
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  
  // Rostro
  face: {
    position: 'absolute',
    width: '60%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  
  eyesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    marginBottom: 8,
  },
  
  eye: {
    width: 18,
    height: 18,
    borderRadius: 9999,
    backgroundColor: Colors.dark,
    opacity: 0.8,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  eyeball: {
    width: 8,
    height: 8,
    borderRadius: 9999,
    backgroundColor: '#2D3E50',
  },
  
  eyeReflection: {
    position: 'absolute',
    width: 5,
    height: 5,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    top: 3,
    left: 3,
  },
  
  mouth: {
    width: 20,
    height: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: 'rgba(15, 28, 45, 0.6)',
    marginTop: 4,
  },
  
  // Partículas flotantes
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  
  particle1: {
    top: '10%',
    left: '15%',
  },
  
  particle2: {
    top: '30%',
    right: '10%',
  },
  
  particle3: {
    bottom: '20%',
    left: '20%',
  },
});

export default KumoMascot;
