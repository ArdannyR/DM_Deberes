import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@shared/context/AuthContext";
import { ThemeProvider, useTheme, lightColors, darkColors } from "@shared/context/ThemeContext";
import Animated, { useAnimatedStyle, interpolateColor, useSharedValue, withTiming } from "react-native-reanimated";
import { StyleSheet } from "react-native";

function AnimatedRoot({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme();
  const themeValue = useSharedValue(0);

  useEffect(() => {
    themeValue.value = withTiming(isDarkMode ? 1 : 0, { duration: 600 });
  }, [isDarkMode]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      themeValue.value,
      [0, 1],
      [lightColors.background, darkColors.background]
    ),
    flex: 1,
  }));

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    const inAuthGroup = segments[0] === "(tabs)";
    if (!session && inAuthGroup) {
      router.replace("/login");
    } else if (session && segments[0] === "login") {
      router.replace("/(tabs)");
    }
  }, [session, loading, segments]);

  if (loading) return null;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Iniciar Sesión', headerShown: false }} />
      <Stack.Screen name="proyecto/[id]" options={{ title: 'Detalle del Proyecto' }} />
      <Stack.Screen name="proyecto/editar/[id]" options={{ title: 'Editar Proyecto' }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AnimatedRoot>
          <RootLayoutNav />
        </AnimatedRoot>
      </AuthProvider>
    </ThemeProvider>
  );
}