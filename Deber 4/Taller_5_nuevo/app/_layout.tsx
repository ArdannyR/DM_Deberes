import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@shared/context/AuthContext";

// 🎓 [DEBER 4 - REQUISITO 1: Autenticación Supabase]: Componente que protege las rutas redirigiendo al login si no hay sesión activa
function RootLayoutNav() {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  // 🎓 [DEBER 4 - REQUISITO 1: Autenticación Supabase]: Lógica de protección de rutas - redirección automática al /login si no hay sesión activa
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
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}