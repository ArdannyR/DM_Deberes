import { useState } from "react";
import { Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/shared/api/supabase";
import { SESSION_QUERY_KEY } from "@/features/session/model/useSession";
// CORRECCIÓN: Importar router correctamente desde expo-router
import { router } from "expo-router"; 

export const useGoogleLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Importante: Pre-calentar el navegador mejora la experiencia en móvil
      await WebBrowser.warmUpAsync();

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "authesfot://", 
          skipBrowserRedirect: false,
        },
      });

      if (error) throw error;

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        "authesfot://"
      );

      if (result.type === "success") {
        // Intercambiamos el código por la sesión
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(result.url);
        if (exchangeError) throw exchangeError;

        // Limpiamos el navegador tras el éxito
        await WebBrowser.coolDownAsync();
        
        // Redirección forzada al home
        console.log("Redirigiendo a home")
        router.replace("/home"); 
      }
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Error al iniciar sesión con Google");
    } finally {
      setIsLoading(false);
      await WebBrowser.coolDownAsync();
    }
  };

  return { signInWithGoogle, isLoading };
};