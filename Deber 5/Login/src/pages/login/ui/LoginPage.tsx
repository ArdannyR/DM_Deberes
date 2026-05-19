import { useState } from "react";
import {
  View, Text, StyleSheet, KeyboardAvoidingView,
  Platform, Alert, TouchableOpacity, ScrollView
} from "react-native";
import { router }          from "expo-router";
import { useLogin }        from "@/features/auth/model/useLogin";
import { useGoogleLogin }  from "@/features/auth/model/useGoogleLogin";
import { Input }           from "@/shared/ui/Input";
import { Button }          from "@/shared/ui/Button";
import { theme }           from "@/core/styles/theme";
 
export const LoginPage = () => {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();
  const googleLogin = useGoogleLogin();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Campos requeridos", "Completa email y contraseña.");
      return;
    }
    try {
      await login.mutateAsync({ email, password });
      // La redirección ocurre automáticamente en _layout.tsx
      // cuando la sesión cambia y AuthGuard detecta isAuthenticated=true
    } catch (err: any) {
      Alert.alert("Error", err.message ?? "Credenciales incorrectas.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin.mutateAsync();
    } catch (err: any) {
      if (err.code === "GOOGLE_CANCELLED") return;
      Alert.alert("Error", err.message ?? "No se pudo iniciar sesión con Google.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="height"
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>🔐</Text>
            <Text style={styles.title}>Bienvenido</Text>
            <Text style={styles.subtitle}>ESFOT — Inicia sesión</Text>
          </View>
 
          {/* Formulario */}
          <View style={styles.form}>
            <Input
              label="Correo electrónico"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="tu@correo.com"
            />
            <Input
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              isPassword
              placeholder="Tu contraseña"
            />
            <TouchableOpacity
              onPress={() => router.push("/(auth)/forgot-password")}
              style={{ alignSelf:"flex-end" }}
            >
              <Text style={styles.link}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
            <Button
              onPress={handleLogin}
              isLoading={login.isPending}
              label="Iniciar sesión"
            />

            <View style={styles.separator}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>o continúa con</Text>
              <View style={styles.line} />
            </View>

            <Button
              onPress={handleGoogleLogin}
              isLoading={googleLogin.isPending}
              label="Continuar con Google"
              variant="ghost"
            />

            <TouchableOpacity
              onPress={() => router.push("/(auth)/register")}
              style={{ alignItems:"center" }}
            >
              <Text style={styles.linkMuted}>
                ¿No tienes cuenta?{" "}
                <Text style={{ color: theme.colors.primary, fontWeight:"700" }}>
                  Regístrate
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
 
const styles = StyleSheet.create({
  container: { flex:1, backgroundColor: theme.colors.bg },
  scroll:    { flexGrow:1, justifyContent:"center", padding:24 },
  card:      { backgroundColor: theme.colors.card, borderRadius:20,
               overflow:"hidden", ...theme.shadow.card },
  header:    { backgroundColor: theme.colors.primary, padding:32,
               alignItems:"center" },
  logo:      { fontSize:52, marginBottom:12 },
  title:     { color:"#fff", fontSize:26, fontWeight:"700", marginBottom:4 },
  subtitle:  { color:"rgba(255,255,255,0.75)", fontSize:14 },
  form:      { padding:28, gap:16 },
  link:      { color: theme.colors.accent, fontSize:14 },
  linkMuted: { color: theme.colors.textMuted, fontSize:14 },
  separator: { flexDirection:"row", alignItems:"center", gap:12 },
  line:      { flex:1, height:1, backgroundColor: theme.colors.border },
  separatorText: { color: theme.colors.textMuted, fontSize:13 },
});
