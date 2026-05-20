import { useState } from "react";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { SESSION_QUERY_KEY } from "@/features/session/model/useSession";

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await WebBrowser.warmUpAsync();

      const redirectUrl = makeRedirectUri({
        scheme: "authesfot",
        path: "/",
        preferLocalhost: false,
        isTripleSlashed: true,
      });

      console.log("redirectUrl:", redirectUrl); // para verificar

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          skipBrowserRedirect: true, // ← true para que NO abra browser automático
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error("No se obtuvo URL de Google");

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectUrl
      );

      if (result.type === "success") {
        const { data: sessionData, error: exchangeError } =
          await supabase.auth.exchangeCodeForSession(result.url);
        if (exchangeError) throw exchangeError;

        queryClient.setQueryData(SESSION_QUERY_KEY, sessionData.session);
        await WebBrowser.coolDownAsync();
      }
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Error al iniciar sesión con Google");
    } finally {
      setIsLoading(false);
      await WebBrowser.coolDownAsync().catch(() => {});
    }
  };

  return { signInWithGoogle, isLoading };
};