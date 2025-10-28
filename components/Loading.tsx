import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, SPACING, FONT_SIZES } from '../constants';

interface LoadingProps {
  text?: string;
  size?: 'small' | 'large';
  color?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Loading({
  text = 'Cargando...',
  size = 'large',
  color = COLORS.primary,
  style,
  textStyle,
}: LoadingProps) {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </View>
  );
}

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function ErrorMessage({
  message,
  onRetry,
  style,
  textStyle,
}: ErrorMessageProps) {
  return (
    <View style={[styles.errorContainer, style]}>
      <Text style={[styles.errorText, textStyle]}>{message}</Text>
      {onRetry && (
        <Text style={styles.retryText} onPress={onRetry}>
          Toca para reintentar
        </Text>
      )}
    </View>
  );
}

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

export function EmptyState({
  title,
  subtitle,
  icon = '📭',
  style,
  titleStyle,
  subtitleStyle,
}: EmptyStateProps) {
  return (
    <View style={[styles.emptyContainer, style]}>
      <Text style={styles.emptyIcon}>{icon}</Text>
      <Text style={[styles.emptyTitle, titleStyle]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.emptySubtitle, subtitleStyle]}>{subtitle}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  text: {
    marginTop: SPACING.md,
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  errorText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SPACING.md,
  },
  retryText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: SPACING.lg,
  },
  emptyTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '600',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  emptySubtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
