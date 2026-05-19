import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { QueryProvider } from "@/core/providers/QueryProvider";
import { useSession } from "@/features/session/model/useSession";

// AuthGuard ahora es mucho más simple.
// No necesita el listener de Supabase porque useSession ya lo tiene.
function AuthGuard() {
  const { isAuthenticated, isLoading } = useSession();

  useEffect(() => {
    // Si la app está cargando, no hacemos nada todavía
    if (isLoading) return;

    if (isAuthenticated) {
      // Si ya hay sesión, mandamos al home
      router.replace("/home");
    } else {
      // Si no hay sesión, obligamos a ir al login
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading]);

  return null; 
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="home" />
        <Stack.Screen name="index" />
      </Stack>
      {/* AuthGuard actúa como un "observador" dentro del QueryProvider */}
      <AuthGuard />
    </QueryProvider>
  );
}