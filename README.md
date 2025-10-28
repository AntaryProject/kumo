# Kumo - App de Bienestar Mental

Kumo es una aplicación móvil desarrollada con React Native y Expo que ayuda a los usuarios a gestionar su bienestar mental a través de chat con IA, gestión de tareas y registro de estados de ánimo.

## 🚀 Características

- **Chat con IA**: Conversaciones inteligentes para apoyo emocional
- **Gestión de Tareas**: Organización personal con recordatorios
- **Registro de Estados de Ánimo**: Seguimiento diario del bienestar emocional
- **Notificaciones Push**: Recordatorios personalizados
- **Autenticación Segura**: Login/registro con Supabase Auth
- **Sincronización en Tiempo Real**: Datos sincronizados con Supabase
- **Integración n8n**: Webhooks para automatización

## 🛠️ Tecnologías

- **Frontend**: React Native, Expo, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Realtime)
- **Automatización**: n8n webhooks
- **Estado**: Zustand
- **Navegación**: Expo Router
- **Notificaciones**: Expo Notifications
- **UI**: Componentes personalizados con diseño consistente

## 📱 Requisitos del Sistema

### Desarrollo
- Node.js 18+ 
- npm o yarn
- Expo CLI
- Android Studio (para Android)
- Xcode (para iOS, solo macOS)

### Dispositivos
- Android 6.0+ (API level 23+)
- iOS 11.0+
- Conexión a internet

## 🔧 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd kumo
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo de ejemplo y configura tus credenciales:
```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:
```env
# Supabase Configuration
SUPABASE_URL=tu_supabase_url_aqui
SUPABASE_ANON_KEY=tu_supabase_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key_aqui

# n8n Webhooks
N8N_WEBHOOK_URL=tu_n8n_webhook_url_aqui
N8N_WEBHOOK_TEST_URL=tu_n8n_test_webhook_url_aqui

# App Configuration
APP_NAME=Kumo
APP_VERSION=1.0.0
APP_ENVIRONMENT=development
```

### 4. Configurar Supabase

#### Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Obtén las credenciales de tu proyecto

#### Configurar base de datos
Ejecuta estos comandos SQL en el editor SQL de Supabase:

```sql
-- Habilitar RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Crear tabla de usuarios
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de mensajes
CREATE TABLE public.messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de tareas
CREATE TABLE public.tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de estados de ánimo
CREATE TABLE public.moods (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL CHECK (mood IN ('very_happy', 'happy', 'neutral', 'sad', 'very_sad')),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear tabla de tokens de notificación
CREATE TABLE public.notification_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, platform)
);

-- Políticas RLS
CREATE POLICY "Users can view own data" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own tasks" ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own tasks" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own tasks" ON public.tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own tasks" ON public.tasks FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own moods" ON public.moods FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own moods" ON public.moods FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own notification tokens" ON public.notification_tokens FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notification tokens" ON public.notification_tokens FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notification tokens" ON public.notification_tokens FOR UPDATE USING (auth.uid() = user_id);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_messages_updated_at BEFORE UPDATE ON public.messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_notification_tokens_updated_at BEFORE UPDATE ON public.notification_tokens FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 5. Configurar n8n (Opcional)
1. Instala n8n en tu servidor
2. Crea un webhook workflow
3. Configura la URL del webhook en las variables de entorno

## 🚀 Ejecutar la aplicación

### Desarrollo
```bash
# Iniciar servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en web
npm run web
```

### Build para producción
```bash
# Build para Android
npm run build:android

# Build para iOS
npm run build:ios
```

## 📁 Estructura del Proyecto

```
kumo/
├── app/                    # Pantallas con Expo Router
│   ├── (auth)/            # Pantallas de autenticación
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── _layout.tsx
│   ├── (tabs)/            # Pantallas principales
│   │   ├── chat.tsx
│   │   ├── tasks.tsx
│   │   ├── profile.tsx
│   │   └── _layout.tsx
│   └── index.tsx          # Pantalla inicial
├── components/            # Componentes reutilizables
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Card.tsx
│   ├── Loading.tsx
│   └── ErrorBoundary.tsx
├── constants/            # Constantes y configuración
│   └── index.ts
├── hooks/                # Hooks personalizados
│   ├── useNotificationSetup.ts
│   ├── useNetworkStatus.ts
│   └── useAsyncEffect.ts
├── lib/                  # Servicios y utilidades
│   ├── supabase.ts       # Cliente Supabase
│   ├── n8n.ts           # Servicio n8n
│   └── notifications.ts  # Servicio de notificaciones
├── store/               # Estado global con Zustand
│   ├── auth.ts
│   ├── chat.ts
│   ├── tasks.ts
│   └── moods.ts
├── types/               # Definiciones de tipos TypeScript
│   └── index.ts
├── assets/              # Recursos estáticos
├── app.json             # Configuración de Expo
├── package.json         # Dependencias y scripts
└── tsconfig.json        # Configuración de TypeScript
```

## 🔧 Scripts Disponibles

- `npm start` - Iniciar servidor de desarrollo
- `npm run android` - Ejecutar en Android
- `npm run ios` - Ejecutar en iOS
- `npm run web` - Ejecutar en web
- `npm run build:android` - Build para Android
- `npm run build:ios` - Build para iOS
- `npm run lint` - Ejecutar linter
- `npm run lint:fix` - Corregir errores de linting
- `npm run type-check` - Verificar tipos TypeScript
- `npm run clean` - Limpiar caché de Expo

## 🐛 Solución de Problemas

### Error de conexión a Supabase
- Verifica que las credenciales en `.env` sean correctas
- Asegúrate de que el proyecto Supabase esté activo
- Revisa que las políticas RLS estén configuradas correctamente

### Error de Android SDK
- Instala Android Studio
- Configura las variables de entorno ANDROID_HOME
- Instala Android SDK Platform 34

### Error de notificaciones
- Verifica que el dispositivo tenga permisos de notificación
- En desarrollo, usa un dispositivo físico (no emulador)
- Revisa la configuración de Expo Notifications

### Error de n8n webhook
- Verifica que la URL del webhook sea correcta
- Asegúrate de que n8n esté ejecutándose
- Revisa los logs de n8n para errores

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Si tienes problemas o preguntas:
- Abre un issue en GitHub
- Revisa la documentación de [Expo](https://docs.expo.dev/)
- Revisa la documentación de [Supabase](https://supabase.com/docs)

## 🔄 Changelog

### v1.0.0
- Versión inicial
- Autenticación con Supabase
- Chat con IA integrado con n8n
- Gestión de tareas completa
- Registro de estados de ánimo
- Notificaciones push
- Interfaz de usuario moderna y responsive
