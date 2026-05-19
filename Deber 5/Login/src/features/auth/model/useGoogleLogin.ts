import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Platform } from "react-native";
import {
  GoogleSignin,
  isSuccessResponse,
} from "@react-native-google-signin/google-signin";
import { supabase } from "@/shared/api/supabase";
import { SESSION_QUERY_KEY } from "@/features/session/model/useSession";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID!,
  iosClientId:
    Platform.OS === "ios"
      ? process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID!
      : undefined,
});

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        const err = new Error("Google Sign-In cancelled by user");
        (err as any).code = "GOOGLE_CANCELLED";
        throw err;
      }

      const idToken = response.data.idToken;
      if (!idToken) {
        throw new Error("No se pudo obtener el token de Google.");
      }

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(SESSION_QUERY_KEY, data.session);
    },
  });
};
