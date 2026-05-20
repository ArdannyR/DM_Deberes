import { useEffect } from "react";
import { Stack, router } from "expo-router";
import { TamaguiProvider } from "tamagui";
import tamaguiConfig from "../tamagui.config";
import { QueryProvider } from "@/core/providers/QueryProvider";
import { useSession } from "@/features/session/model/useSession";

function AuthGuard() {
  const { isAuthenticated, isLoading } = useSession();

  useEffect(() => {
    if (isLoading) return;
    if (isAuthenticated) {
      router.replace("/home");
    } else {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, isLoading]);

  return null;
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <QueryProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="home" />
          <Stack.Screen name="index" />
        </Stack>
        <AuthGuard />
      </QueryProvider>
    </TamaguiProvider>
  );
}
