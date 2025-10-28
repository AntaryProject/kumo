/**
 * 🌈 Sistema de Diseño de Kumo
 * Identidad visual completa para la app de bienestar emocional
 */

export const Colors = {
  // Colores principales
  primary: '#6F9DF7', // azul nube - calma, profundidad emocional
  secondary: '#A894FF', // violeta tenue - introspección, espiritualidad suave
  light: '#E8ECFF', // claridad, respiro
  dark: '#0F1C2D', // contraste y profundidad visual
  white: '#FFFFFF',
  
  // Estados emocionales de la mascota Kumo
  emotions: {
    calm: '#6F9DF7', // azul = calma
    neutral: '#8B95A0', // gris = neutralidad
    introspection: '#A894FF', // violeta = introspección
    relief: '#8FDBBA', // verde suave = alivio
    motivation: '#FFB88C', // naranja claro = motivación
  },
  
  // Colores funcionales
  text: {
    primary: '#0F1C2D',
    secondary: '#5A6B7D',
    light: '#A0ABBB',
    inverse: '#FFFFFF',
  },
  
  // Fondos con opacidad para glassmorphism
  glass: {
    light: 'rgba(255, 255, 255, 0.9)',
    medium: 'rgba(255, 255, 255, 0.7)',
    soft: 'rgba(255, 255, 255, 0.5)',
    subtle: 'rgba(255, 255, 255, 0.3)',
  },
};

export const Gradients = {
  // Gradiente principal azul-violeta
  primary: ['#6F9DF7', '#A894FF'],
  
  // Gradiente de fondo
  background: ['#E8ECFF', '#FFFFFF'],
  
  // Gradiente de fondo modo oscuro
  backgroundDark: ['#0F1C2D', '#1A2B3F'],
  
  // Gradientes emocionales
  calm: ['#6F9DF7', '#8FB7FF'],
  introspection: ['#A894FF', '#C6B3FF'],
  relief: ['#8FDBBA', '#A8E8CE'],
  motivation: ['#FFB88C', '#FFC9A5'],
};

export const Typography = {
  // Fuentes (se usarán las nativas de RN/Expo o se cargarán custom)
  fonts: {
    // Logo / Branding: Satoshi Bold o Inter ExtraBold
    brand: {
      family: 'System', // Usar System hasta cargar custom fonts
      weight: '800' as const,
    },
    // Texto UI: Inter Regular / Medium
    regular: {
      family: 'System',
      weight: '400' as const,
    },
    medium: {
      family: 'System',
      weight: '500' as const,
    },
    semibold: {
      family: 'System',
      weight: '600' as const,
    },
    bold: {
      family: 'System',
      weight: '700' as const,
    },
    // Subtítulos o estados emocionales: Light Italic
    light: {
      family: 'System',
      weight: '300' as const,
    },
  },
  
  // Tamaños
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
  },
  
  // Interlineado amplio (1.4x)
  lineHeight: 1.4,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  full: 9999,
};

export const Shadows = {
  // Sombras difusas azuladas
  soft: {
    shadowColor: '#6F9DF7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  medium: {
    shadowColor: '#6F9DF7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  glow: {
    shadowColor: '#A894FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
  },
};

export const Effects = {
  // Blur para glassmorphism
  blur: {
    light: 20,
    medium: 30,
    strong: 40,
  },
  
  // Animaciones
  animation: {
    // Respiración 4-4-4 (inspirar → mantener → exhalar)
    breatheDuration: 4000,
    // Easing suave tipo easeInOutCubic
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  },
};

export const Icons = {
  // Configuración de iconos
  strokeWidth: 2.5,
  size: {
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  },
  color: '#C6D4FF', // tono perlado
};

/**
 * Tema completo de Kumo
 */
export const KumoTheme = {
  colors: Colors,
  gradients: Gradients,
  typography: Typography,
  spacing: Spacing,
  borderRadius: BorderRadius,
  shadows: Shadows,
  effects: Effects,
  icons: Icons,
};

export default KumoTheme;
