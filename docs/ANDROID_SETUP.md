# Guía de Instalación - Android SDK

Esta guía te ayudará a instalar y configurar el Android SDK necesario para desarrollar aplicaciones Android con Expo/React Native.

## 📋 Requisitos Previos

- Windows 10/11, macOS, o Linux
- Al menos 8GB de RAM (recomendado 16GB)
- 10GB de espacio libre en disco
- Conexión a internet estable

## 🚀 Instalación Paso a Paso

### 1. Instalar Java Development Kit (JDK)

#### Windows:
1. Descarga JDK 17 desde [Adoptium](https://adoptium.net/)
2. Ejecuta el instalador y sigue las instrucciones
3. Configura la variable de entorno `JAVA_HOME`:
   - Abre "Variables de entorno del sistema"
   - Agrega nueva variable: `JAVA_HOME` = `C:\Program Files\Eclipse Adoptium\jdk-17.x.x-hotspot`
   - Agrega `%JAVA_HOME%\bin` al PATH

#### macOS:
```bash
# Con Homebrew
brew install openjdk@17

# Configurar JAVA_HOME
echo 'export JAVA_HOME=/opt/homebrew/opt/openjdk@17' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt update
sudo apt install openjdk-17-jdk

# Configurar JAVA_HOME
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

### 2. Instalar Android Studio

1. Ve a [developer.android.com/studio](https://developer.android.com/studio)
2. Descarga Android Studio para tu sistema operativo
3. Ejecuta el instalador y sigue las instrucciones
4. Durante la instalación, asegúrate de instalar:
   - Android SDK
   - Android SDK Platform
   - Android Virtual Device

### 3. Configurar Android SDK

#### Desde Android Studio:
1. Abre Android Studio
2. Ve a **File > Settings** (Windows/Linux) o **Android Studio > Preferences** (macOS)
3. Navega a **Appearance & Behavior > System Settings > Android SDK**
4. En la pestaña **SDK Platforms**, instala:
   - Android 14 (API Level 34) - Recomendado
   - Android 13 (API Level 33) - Compatibilidad
5. En la pestaña **SDK Tools**, instala:
   - Android SDK Build-Tools
   - Android SDK Platform-Tools
   - Android SDK Tools
   - Intel x86 Emulator Accelerator (HAXM installer) - Solo Windows

#### Configurar Variables de Entorno:

**Windows:**
```cmd
# Agregar al PATH del sistema
ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools;%ANDROID_HOME%\tools\bin
```

**macOS/Linux:**
```bash
# Agregar a ~/.zshrc o ~/.bashrc
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# export ANDROID_HOME=$HOME/Android/Sdk       # Linux
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

### 4. Verificar Instalación

Abre una terminal y ejecuta:

```bash
# Verificar Java
java -version

# Verificar Android SDK
adb version

# Verificar Android SDK Manager
sdkmanager --version
```

### 5. Configurar Emulador Android (Opcional)

1. En Android Studio, ve a **Tools > AVD Manager**
2. Haz clic en **Create Virtual Device**
3. Selecciona un dispositivo (ej: Pixel 6)
4. Descarga una imagen del sistema (ej: Android 14)
5. Configura el AVD y haz clic en **Finish**

## 🔧 Configuración para Expo

### 1. Instalar Expo CLI
```bash
npm install -g @expo/cli
```

### 2. Verificar configuración
```bash
npx expo doctor
```

### 3. Ejecutar en Android
```bash
# Conectar dispositivo físico
adb devices

# O usar emulador
npx expo start --android
```

## 🐛 Solución de Problemas Comunes

### Error: "SDK location not found"
```bash
# Configurar ANDROID_HOME
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
export ANDROID_HOME=$HOME/Android/Sdk          # Linux
export ANDROID_HOME=%LOCALAPPDATA%\Android\Sdk  # Windows
```

### Error: "Java not found"
- Verifica que JAVA_HOME esté configurado correctamente
- Reinicia la terminal después de configurar variables de entorno

### Error: "adb not found"
- Asegúrate de que Android SDK Platform-Tools esté instalado
- Verifica que `platform-tools` esté en el PATH

### Error: "Emulator not found"
- Instala Intel HAXM (Windows) o KVM (Linux)
- Crea un AVD desde Android Studio

### Error: "Build failed"
```bash
# Limpiar caché de Expo
npx expo r -c

# Limpiar caché de npm
npm cache clean --force

# Reinstalar node_modules
rm -rf node_modules
npm install
```

## 📱 Configuración de Dispositivo Físico

### Habilitar Modo Desarrollador:
1. Ve a **Configuración > Acerca del teléfono**
2. Toca **Número de compilación** 7 veces
3. Ve a **Configuración > Opciones de desarrollador**
4. Habilita **Depuración USB**

### Conectar dispositivo:
```bash
# Verificar conexión
adb devices

# Si no aparece, instalar drivers USB (Windows)
# O configurar permisos USB (Linux)
```

## ✅ Verificación Final

Ejecuta estos comandos para verificar que todo esté configurado correctamente:

```bash
# 1. Verificar Java
java -version

# 2. Verificar Android SDK
adb version

# 3. Verificar Expo
npx expo doctor

# 4. Verificar dispositivos conectados
adb devices

# 5. Ejecutar app
npx expo start --android
```

## 📚 Recursos Adicionales

- [Documentación oficial de Android](https://developer.android.com/)
- [Guía de Expo para Android](https://docs.expo.dev/workflow/android-studio/)
- [Configuración de React Native para Android](https://reactnative.dev/docs/environment-setup)

## 🆘 Soporte

Si tienes problemas:
1. Revisa los logs de error
2. Verifica que todas las variables de entorno estén configuradas
3. Reinicia Android Studio y la terminal
4. Consulta la documentación oficial
5. Busca en Stack Overflow o GitHub Issues
