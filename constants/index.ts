// Constants for the app
export const APP_CONFIG = {
  name: 'Kumo',
  version: '1.0.0',
  description: 'App de bienestar mental',
};

// Mood options
export const MOOD_OPTIONS = [
  { value: 'very_happy', label: 'Muy feliz', emoji: '😄', color: '#4CAF50' },
  { value: 'happy', label: 'Feliz', emoji: '😊', color: '#8BC34A' },
  { value: 'neutral', label: 'Neutral', emoji: '😐', color: '#FFC107' },
  { value: 'sad', label: 'Triste', emoji: '😢', color: '#FF9800' },
  { value: 'very_sad', label: 'Muy triste', emoji: '😭', color: '#F44336' },
] as const;

// Task priority options
export const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Baja', color: '#4CAF50' },
  { value: 'medium', label: 'Media', color: '#FF9800' },
  { value: 'high', label: 'Alta', color: '#F44336' },
] as const;

// Colors theme
export const COLORS = {
  primary: '#6366F1',
  secondary: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  background: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
} as const;

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Font sizes
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// Border radius
export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;
