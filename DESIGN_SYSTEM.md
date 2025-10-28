# 🌈 Sistema de Diseño de Kumo

## Identidad Visual Completa

### 🧠 Concepto Central

**Kumo** (雲 - nube en japonés) es una aplicación de acompañamiento emocional y bienestar mental que transmite:
- Calma y serenidad
- Empatía y calidez
- Ligereza mental
- Confianza

**Palabras clave**: calma, nube, respiración, empatía, introspección, flotación, diseño terapéutico

---

## 🎨 Paleta Cromática

### Colores Principales
```typescript
Colors.primary    = '#6F9DF7'  // Azul nube - calma, profundidad emocional
Colors.secondary  = '#A894FF'  // Violeta tenue - introspección, espiritualidad
Colors.light      = '#E8ECFF'  // Claridad, respiro
Colors.dark       = '#0F1C2D'  // Contraste y profundidad visual
Colors.white      = '#FFFFFF'  // Brillo y transparencia
```

### Estados Emocionales
La mascota Kumo cambia de color según el estado emocional:

| Estado | Color | Significado |
|--------|-------|-------------|
| Calma | `#6F9DF7` | Tranquilidad y paz interior |
| Neutral | `#8B95A0` | Estado base sin juicio |
| Introspección | `#A894FF` | Reflexión profunda |
| Alivio | `#8FDBBA` | Liberación y bienestar |
| Motivación | `#FFB88C` | Energía suave y positiva |

---

## 🖼️ Efectos Visuales

### Gradientes
```typescript
// Gradiente principal azul-violeta
linear-gradient(180deg, #6F9DF7 0%, #A894FF 100%)

// Gradiente de fondo
linear-gradient(180deg, #E8ECFF 0%, #FFFFFF 100%)
```

### Sombras Difusas Azuladas
```typescript
shadow: {
  shadowColor: '#6F9DF7',
  shadowOffset: { width: 0, height: 8 },
  shadowOpacity: 0.2,
  shadowRadius: 20,
}
```

### Glassmorphism
- **Blur**: 20-40px
- **Opacidad**: 30-90% blanco
- **Bordes**: Blanco desvanecido (40% opacity)
- **Sombra**: Azul tenue

---

## ✍️ Tipografía

### Fuentes
- **Logo/Branding**: System Bold (800) - letras redondeadas y aireadas
- **UI Regular**: System Regular (400)
- **UI Medium**: System Medium (500-600)
- **Texto emocional**: System Light (300) + cursiva

### Tamaños
```typescript
xs:   12px
sm:   14px
base: 16px
lg:   18px
xl:   20px
2xl:  24px
3xl:  30px
4xl:  36px
5xl:  48px
6xl:  60px
```

### Interlineado
**1.4x** para mejor legibilidad y sensación de amplitud

---

## ☁️ Mascota: Kumo

### Características
- **Forma**: Nube redonda, suave, translúcida
- **Rostro**: Ojos grandes con reflejos azul-gris, expresión serena
- **Material**: Vapor + cristal + luz
- **Movimiento**: Flotación lenta con pulsaciones de respiración

### Animaciones
```typescript
// Respiración 4-4-4
- Inspirar:  4 segundos (escala 1.0 → 1.1)
- Mantener:  4 segundos (pausa)
- Exhalar:   4 segundos (escala 1.1 → 1.0)
```

### Efectos
- Sombras volumétricas (ambient occlusion)
- Brillo interno con difusión
- Reflexión tipo glass bloom
- Partículas flotantes alrededor

---

## 🧩 Componentes

### GlassCard
Tarjeta con efecto glassmorphism para contenido importante.

**Intensidades**:
- `subtle` - 30% opacidad
- `soft` - 50% opacidad
- `medium` - 70% opacidad
- `light` - 90% opacidad

### GlassButton
Botón interactivo con retroalimentación visual.

**Variantes**:
- `primary` - Color principal con sombra
- `secondary` - Translúcido con borde de color
- `ghost` - Transparente con borde sutil

### GradientBackground
Fondo con gradiente tipo niebla sin patrones duros.

**Modos**:
- `light` - Fondo claro para uso diurno
- `dark` - Fondo oscuro para modo nocturno

### KumoMascot
La mascota animada que responde a estados emocionales.

**Props**:
- `emotion`: tipo de emoción actual
- `size`: tamaño de la nube (default: 150)

---

## 📱 Estilo de Interfaz

### Concepto General
"**Psicología + Futurismo emocional**"
Una mezcla entre spa digital y nebulosa terapéutica.

### Elementos Clave
| Elemento | Descripción |
|----------|-------------|
| Fondo | Gradientes en movimiento leve tipo niebla |
| Botones | Glassmorphism con blur 20-40 y reflejo dinámico |
| Cards | Translúcidas con sombra azul tenue |
| Animaciones | Fricción baja, easing cubic |
| Interacciones | Retroalimentación háptica y glow suave |

### Iconografía
- Trazos redondeados (2.5-3px)
- Animación micro-interactiva
- Color perlado: `#C6D4FF`

**Iconos principales**:
- 🌬️ Respiración
- 💬 Conversación
- 📅 Seguimiento
- ☀️ Bienestar diario
- ☁️ Perfil

---

## 🎯 Uso del Sistema de Diseño

### Importar el tema
```typescript
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../constants/theme';
```

### Ejemplo de uso
```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.glass.medium,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.soft,
  },
  title: {
    fontSize: Typography.sizes.xl,
    fontWeight: Typography.fonts.semibold.weight,
    color: Colors.text.primary,
  },
});
```

---

## 🌙 Modos

### Modo Día (actual)
- Gradientes pastel azul cielo y blanco perlado
- Fondo: `#E8ECFF` → `#FFFFFF`
- Texto: colores oscuros

### Modo Noche (futuro)
- Colores más fríos y bruma oscura azul-violeta
- Fondo: `#0F1C2D` → `#1A2B3F`
- Texto: colores claros

---

## 🪄 Extensiones Futuras

### Kumo Kids
Versión para niños con:
- Colores más cálidos
- Formas más blandas
- Animaciones más juguetonas

### Kumo Studio
Dashboard profesional para terapeutas con:
- Métricas y analíticas
- Vista de múltiples pacientes
- Herramientas de seguimiento

---

## 🎨 Prompt Visual (para diseñadores/IA)

> "Diseño de identidad visual para Kumo, una app de bienestar emocional. Estilo hiperrealista y terapéutico. Interface minimalista con tonos azul-violeta, glassmorphism, luz ambiental suave, y elementos animados tipo nube flotante. Mascota central: nube adorable y etérea con ojos serenos, material translúcido, rodeada de partículas flotantes. Fondo borroso y luminoso, estilo cinematográfico, moderno y calmante. Tipografía sans-serif redondeada, iconos minimalistas, reflejos suaves y estética universal accesible para todas las edades. Render ultra detallado 8K."

---

## 📦 Estructura de Archivos

```
/workspace
├── constants/
│   └── theme.ts              # Sistema de diseño completo
├── components/
│   ├── GlassCard.tsx         # Tarjetas glassmorphism
│   ├── GlassButton.tsx       # Botones con efecto cristal
│   ├── GradientBackground.tsx # Fondos con gradientes
│   └── KumoMascot.tsx        # Mascota animada
└── app/
    └── index.tsx             # Pantalla principal
```

---

## 🚀 Comenzar a Usar

1. **Instalar dependencias**:
```bash
npm install
```

2. **Ejecutar la aplicación**:
```bash
npm start
```

3. **Personalizar**:
Edita `/constants/theme.ts` para ajustar colores, espaciados o efectos.

---

## 💙 Filosofía de Diseño

Kumo no es solo una aplicación, es una **presencia amable**:
- Sin juicios
- Empática
- Cálida
- Minimalista
- Terapéutica

Cada elemento visual está diseñado para transmitir **calma**, **confianza** y un toque de **magia realista**.

> "Como las nubes, tus pensamientos pasan. Respira y observa."
