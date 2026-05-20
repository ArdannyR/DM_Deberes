import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/shared/api/supabase";
import type { Session } from "@supabase/supabase-js";
 
// Clave canónica de la sesión en TanStack Query.
// Al usar la misma clave en cualquier componente de la app,
// TanStack garantiza que todos lean del mismo caché.
export const SESSION_QUERY_KEY = ["auth", "session"] as const;
 
export const useSession = () => {
  const queryClient = useQueryClient();
 
  // Query que obtiene la sesión actual.
  // TanStack Query la cachea y la comparte con todos los suscriptores.
  const { data: session, isLoading } = useQuery<Session | null>({
    queryKey: SESSION_QUERY_KEY,
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;
      return session;
    },
    // La sesión se considera "fresca" por 2 minutos.
    // Después, TanStack la re-fetcha en background automáticamente.
    staleTime: 2 * 60 * 1000,
  });
 
  // Listener de Supabase: cuando el estado de auth cambia
  // (login, logout, token refresh), actualizamos la caché de TanStack.
  // Esto garantiza que la UI se actualice INMEDIATAMENTE sin esperar
  // al siguiente ciclo de refetch.
  useEffect(() => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Evento detectado:", event); // Esto te dirá qué está pasando
        
        // Actualizamos la caché con la nueva sesión (sea inicial o nueva)
        queryClient.setQueryData(SESSION_QUERY_KEY, newSession);
        
        // Si el evento es SIGNED_IN, forzamos la actualización de la UI
        if (event === 'SIGNED_IN') {
          console.log("¡Usuario autenticado con éxito!");
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [queryClient]);
 
  const signOut = async () => {
    await supabase.auth.signOut();
    // Limpiar toda la caché de TanStack al cerrar sesión.
    // Esto evita que datos del usuario anterior persistan.
    queryClient.clear();
  };
 
  return {
    session,
    isLoading,
    isAuthenticated: !!session,
    user: session?.user ?? null,
    signOut,
  };
};
