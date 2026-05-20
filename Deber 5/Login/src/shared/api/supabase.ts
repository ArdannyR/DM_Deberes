import { createClient } from "@supabase/supabase-js";
import * as SecureStore from "expo-secure-store";
 
const supabaseUrl     = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;
 
const CHUNK_SIZE = 1800;

const SecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    const firstChunk = await SecureStore.getItemAsync(`${key}.chunk.0`);
    if (firstChunk === null) return null;
    let value = firstChunk;
    let index = 1;
    while (true) {
      const chunk = await SecureStore.getItemAsync(`${key}.chunk.${index}`);
      if (chunk === null) break;
      value += chunk;
      index++;
    }
    return value;
  },

  setItem: async (key: string, value: string): Promise<void> => {
    await SecureStoreAdapter.removeItem(key);
    for (let i = 0; i < value.length; i += CHUNK_SIZE) {
      await SecureStore.setItemAsync(`${key}.chunk.${i / CHUNK_SIZE}`, value.substring(i, i + CHUNK_SIZE));
    }
  },

  removeItem: async (key: string): Promise<void> => {
    let index = 0;
    while (index < 100) {
      const chunkKey = `${key}.chunk.${index}`;
      const chunk = await SecureStore.getItemAsync(chunkKey);
      if (chunk === null) break;
      await SecureStore.deleteItemAsync(chunkKey);
      index++;
    }
  },
};
 
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage:           SecureStoreAdapter,
    autoRefreshToken:  true,   // Renueva el access_token automáticamente
    persistSession:    true,   // Persiste la sesión entre reinicios de la app
    detectSessionInUrl: false, // En React Native NO hay URL; deshabilitar
  },
});
