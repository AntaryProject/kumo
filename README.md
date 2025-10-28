# ☁️ Kumo

> Tu compañero de bienestar emocional

**Kumo** (雲 - nube en japonés) es una aplicación de acompañamiento emocional y bienestar mental. Una presencia amable, tranquila y empática que te acompaña en tu viaje hacia el bienestar.

![Kumo](https://img.shields.io/badge/Kumo-Bienestar_Emocional-6F9DF7?style=for-the-badge&logo=react&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

---

## ✨ Características

- 🌬️ **Ejercicios de Respiración**: Prácticas guiadas de respiración consciente
- 💬 **Conversación Empática**: Espacio seguro para expresar tus pensamientos
- 📅 **Seguimiento Emocional**: Observa tus patrones y celebra tu progreso
- ☀️ **Bienestar Diario**: Prácticas simples para cultivar la calma
- ☁️ **Mascota Kumo**: Una nube viva que responde a tus emociones

---

## 🚀 Comenzar

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Expo CLI

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repo>

# Instalar dependencias
npm install

# Iniciar la aplicación
npm start
```

### Comandos Disponibles

```bash
npm start          # Inicia Expo Dev Server
npm run android    # Ejecuta en Android
npm run ios        # Ejecuta en iOS
npm run web        # Ejecuta en navegador
```

---

## 🎨 Identidad Visual

Kumo cuenta con una identidad visual completa basada en:

- **Concepto**: Psicología + Futurismo emocional
- **Estilo**: Glassmorphism con gradientes suaves
- **Colores**: Azul nube (`#6F9DF7`) y violeta tenue (`#A894FF`)
- **Animaciones**: Respiración 4-4-4 y flotación suave
- **Mascota**: Nube viva con emociones dinámicas

Para más detalles, consulta [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

---

## 🧩 Componentes Principales

### `KumoMascot`
La mascota animada que cambia de color según las emociones.

```tsx
<KumoMascot emotion="calm" size={180} />
```

**Emociones disponibles**: `calm` | `neutral` | `introspection` | `relief` | `motivation`

### `GlassCard`
Tarjeta con efecto glassmorphism.

```tsx
<GlassCard intensity="medium">
  {/* Tu contenido */}
</GlassCard>
```

### `GlassButton`
Botón interactivo con variantes.

```tsx
<GlassButton 
  title="Comenzar" 
  onPress={handlePress}
  variant="primary"
/>
```

### `GradientBackground`
Fondo con gradiente tipo niebla.

```tsx
<GradientBackground variant="light">
  {/* Tu contenido */}
</GradientBackground>
```

---

## 📁 Estructura del Proyecto

```
/workspace
├── app/                    # Páginas de la aplicación (expo-router)
│   └── index.tsx          # Pantalla principal
├── components/            # Componentes reutilizables
│   ├── GlassCard.tsx
│   ├── GlassButton.tsx
│   ├── GradientBackground.tsx
│   ├── KumoMascot.tsx
│   └── index.ts
├── constants/             # Sistema de diseño
│   └── theme.ts          # Colores, tipografía, espaciado, etc.
├── assets/               # Imágenes y recursos
├── DESIGN_SYSTEM.md      # Documentación completa del diseño
└── package.json
```

---

## 🎨 Sistema de Colores

```typescript
// Colores principales
const Colors = {
  primary: '#6F9DF7',      // Azul nube
  secondary: '#A894FF',     // Violeta tenue
  light: '#E8ECFF',        // Claridad
  dark: '#0F1C2D',         // Profundidad
}

// Estados emocionales
const Emotions = {
  calm: '#6F9DF7',         // Calma
  neutral: '#8B95A0',      // Neutral
  introspection: '#A894FF', // Introspección
  relief: '#8FDBBA',       // Alivio
  motivation: '#FFB88C',   // Motivación
}
```

---

## 🌈 Filosofía de Diseño

Kumo se basa en tres pilares fundamentales:

1. **Calma Visual**: Colores suaves, animaciones lentas, espacios amplios
2. **Empatía**: Diseño que escucha, no juzga
3. **Simplicidad Terapéutica**: Cada elemento tiene un propósito emocional

> "Como las nubes, tus pensamientos pasan. Respira y observa."

---

## 🛠️ Tecnologías

- **Frontend**: React Native con Expo
- **Router**: Expo Router (file-based routing)
- **Estado**: Zustand
- **Backend**: Supabase
- **Queries**: TanStack Query (React Query)
- **Lenguaje**: TypeScript
- **Estilo**: StyleSheet (React Native)

---

## 🌙 Roadmap

- [ ] Modo nocturno completo
- [ ] Ejercicios de respiración interactivos
- [ ] Chat con IA empática
- [ ] Seguimiento de patrones emocionales
- [ ] Notificaciones mindfulness
- [ ] Comunidad de apoyo
- [ ] Kumo Kids (versión para niños)
- [ ] Kumo Studio (dashboard para terapeutas)
- [ ] Audio ambiente y sonidos binaurales
- [ ] Integración con wearables

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es privado y está protegido por derechos de autor.

---

## 💙 Contacto

Para preguntas, sugerencias o colaboraciones, abre un issue en el repositorio.

---

<p align="center">
  <i>Desarrollado con 💙 para el bienestar emocional</i>
</p>

<p align="center">
  ☁️ Kumo - Donde tus emociones flotan libres
</p>
