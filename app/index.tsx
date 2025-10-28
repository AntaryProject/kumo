import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import { GradientBackground } from "../components/GradientBackground";
import { GlassCard } from "../components/GlassCard";
import { GlassButton } from "../components/GlassButton";
import { KumoMascot } from "../components/KumoMascot";
import { Colors, Typography, Spacing, BorderRadius } from "../constants/theme";

type EmotionType = 'calm' | 'neutral' | 'introspection' | 'relief' | 'motivation';

/**
 * 🌟 Kumo - Aplicación de acompañamiento emocional y bienestar mental
 * Diseño: Psicología + Futurismo emocional
 */
export default function Page() {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('calm');

  const emotionOptions: { type: EmotionType; label: string; icon: string }[] = [
    { type: 'calm', label: 'Calma', icon: '💙' },
    { type: 'neutral', label: 'Neutral', icon: '🤍' },
    { type: 'introspection', label: 'Introspección', icon: '💜' },
    { type: 'relief', label: 'Alivio', icon: '💚' },
    { type: 'motivation', label: 'Motivación', icon: '🧡' },
  ];

  return (
    <GradientBackground>
      <StatusBar barStyle="dark-content" />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con logo */}
        <View style={styles.header}>
          <Text style={styles.logo}>Kumo</Text>
          <Text style={styles.tagline}>Tu compañero de bienestar emocional</Text>
        </View>

        {/* Mascota principal */}
        <View style={styles.mascotContainer}>
          <KumoMascot emotion={currentEmotion} size={180} />
          <Text style={styles.emotionText}>
            Estado actual: {emotionOptions.find(e => e.type === currentEmotion)?.label}
          </Text>
        </View>

        {/* Selector de emociones */}
        <GlassCard style={styles.emotionsCard}>
          <Text style={styles.sectionTitle}>¿Cómo te sientes?</Text>
          <View style={styles.emotionsGrid}>
            {emotionOptions.map((emotion) => (
              <GlassButton
                key={emotion.type}
                title={`${emotion.icon} ${emotion.label}`}
                onPress={() => setCurrentEmotion(emotion.type)}
                variant={currentEmotion === emotion.type ? 'primary' : 'secondary'}
                style={styles.emotionButton}
                textStyle={styles.emotionButtonText}
              />
            ))}
          </View>
        </GlassCard>

        {/* Tarjetas de funcionalidades */}
        <View style={styles.featuresContainer}>
          <GlassCard style={styles.featureCard} intensity="soft">
            <Text style={styles.featureIcon}>🌬️</Text>
            <Text style={styles.featureTitle}>Respiración</Text>
            <Text style={styles.featureDescription}>
              Ejercicios guiados de respiración consciente para encontrar tu centro
            </Text>
          </GlassCard>

          <GlassCard style={styles.featureCard} intensity="soft">
            <Text style={styles.featureIcon}>💬</Text>
            <Text style={styles.featureTitle}>Conversación</Text>
            <Text style={styles.featureDescription}>
              Comparte tus pensamientos en un espacio seguro y sin juicios
            </Text>
          </GlassCard>

          <GlassCard style={styles.featureCard} intensity="soft">
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureTitle}>Seguimiento</Text>
            <Text style={styles.featureDescription}>
              Observa tus patrones emocionales y celebra tu progreso
            </Text>
          </GlassCard>

          <GlassCard style={styles.featureCard} intensity="soft">
            <Text style={styles.featureIcon}>☀️</Text>
            <Text style={styles.featureTitle}>Bienestar diario</Text>
            <Text style={styles.featureDescription}>
              Prácticas simples para cultivar la calma en tu día a día
            </Text>
          </GlassCard>
        </View>

        {/* Botón principal de acción */}
        <View style={styles.actionContainer}>
          <GlassButton
            title="✨ Comenzar mi práctica"
            onPress={() => console.log('Iniciar práctica')}
            variant="primary"
            style={styles.mainActionButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            "Como las nubes, tus pensamientos pasan. Respira y observa."
          </Text>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing['2xl'],
  },
  
  // Header
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logo: {
    fontSize: Typography.sizes['5xl'],
    fontWeight: Typography.fonts.brand.weight,
    color: Colors.primary,
    letterSpacing: -1,
    textShadowColor: 'rgba(111, 157, 247, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    fontSize: Typography.sizes.base,
    fontWeight: Typography.fonts.light.weight,
    color: Colors.text.secondary,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
  
  // Mascota
  mascotContainer: {
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  emotionText: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.fonts.medium.weight,
    color: Colors.text.primary,
    marginTop: Spacing.lg,
    fontStyle: 'italic',
  },
  
  // Emociones
  emotionsCard: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.fonts.semibold.weight,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  emotionsGrid: {
    gap: Spacing.sm,
  },
  emotionButton: {
    width: '100%',
    marginBottom: Spacing.sm,
  },
  emotionButtonText: {
    fontSize: Typography.sizes.base,
  },
  
  // Funcionalidades
  featuresContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  featureCard: {
    alignItems: 'center',
    padding: Spacing.lg,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    fontSize: Typography.sizes.lg,
    fontWeight: Typography.fonts.semibold.weight,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: Typography.sizes.sm,
    color: Colors.text.secondary,
    textAlign: 'center',
    lineHeight: Typography.sizes.sm * Typography.lineHeight,
  },
  
  // Acción principal
  actionContainer: {
    marginVertical: Spacing.xl,
  },
  mainActionButton: {
    width: '100%',
    paddingVertical: Spacing.lg,
  },
  
  // Footer
  footer: {
    alignItems: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.lg,
  },
  footerText: {
    fontSize: Typography.sizes.sm,
    fontWeight: Typography.fonts.light.weight,
    color: Colors.text.light,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: Typography.sizes.sm * Typography.lineHeight,
  },
});
