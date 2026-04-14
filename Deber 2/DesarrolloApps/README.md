# Apuntes para proyecto con Expo y React Native

---

# 🚀 Comandos para iniciar el proyecto

Clonar el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Instalar dependencias:

```bash
npm install
```

Instalar Expo:

```bash
npm install expo
```

Iniciar el proyecto:

```bash
npx expo start
```

---

# 📳 Implementar Haptics (expo-haptics)

Instalar la librería:

```bash
npx expo install expo-haptics
```

---

# 🤖 Prompt unificado (Generación con IA)

```
Actúa como Desarrollador Senior en React Native. Revisa el archivo constants/theme.ts de mi proyecto y genera el código completo de estos 4 archivos:

1. .github/agents.md: Define tu rol (Arquitecto Mobile, TS estricto sin any, código limpio).

2. .github/skills.md: 
Reglas:
- Expo Router
- Componentes aislados
- expo-haptics obligatorio
- PROHIBIDO usar colores hardcoded
- SIEMPRE importar colores desde constants/theme

3. components/CalculatorButton.tsx:
- Componente TouchableOpacity
- Props:
  (title, backgroundColor, textColor, doubleWidth, onPress)
- Obligatorio:
  Ejecutar:
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  antes de la prop onPress

4. app/index.tsx:

Lógica (useState):
- displayValue
- previousValue
- operator

Funciones:
- Números (evitar múltiples ceros o puntos)
- Operadores
- Resultado (evitar división por cero → 'Error')
- AC
- +/-
- %

UI:
- flex: 1
- justifyContent: 'flex-end'
- Display superior grande alineado a la derecha

Filas (Flex row):
Crear 5 filas de botones circulares

IMPORTANTE:
Usar EXCLUSIVAMENTE colores desde ../constants/theme

Distribución:

F1: AC, +/-, %, ÷  
F2: 7, 8, 9, ×  
F3: 4, 5, 6, -  
F4: 1, 2, 3, +  
F5: 0 (doubleWidth), ., =
```

---

# 📦 Generar APK con Expo (EAS)

⚠️ Requisito: Tener cuenta en https://expo.dev

## Instalar EAS CLI

```bash
npm install -g eas-cli
```

---

## Iniciar sesión

```bash
eas login
```

---

## Configurar el build

```bash
eas build:configure
```

Esto creará el archivo:

```
eas.json
```

---

## Configuración recomendada de `eas.json`

```json
"build": {
  "preview": {
    "android": {
      "buildType": "apk"
    }
  },
  "production": {
    "autoIncrement": true
  }
}
```

---

## Generar APK

```bash
eas build -p android --profile preview
```

Puedes ver el progreso del build en:

```
https://expo.dev/
```

---

## 📥 Ejemplo de salida

```text
💡 Build details:
https://expo.dev/accounts/tu-usuario/projects/mi-calculadora/builds/12345678-abcd-1234...

📦 Install the app:
https://expo.dev/artifacts/eas/98765432-xyz-9876.apk
```

---

# 📌 Lo siguiente no es parte de lo anterior mas es lo de expo app

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
