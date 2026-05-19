import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InputProps {
  label:           string;
  value:           string;
  onChangeText:    (t: string) => void;
  placeholder?:    string;
  secureTextEntry?: boolean;
  isPassword?:     boolean;
  keyboardType?:   "default" | "email-address" | "numeric";
  error?:          string;
  autoCapitalize?: "none" | "sentences" | "words";
}

export const Input = ({
  label, value, onChangeText, placeholder,
  secureTextEntry, isPassword, keyboardType = "default", error,
  autoCapitalize = "none",
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#94A3B8"
          secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          style={[
            styles.input,
            isPassword ? styles.inputWithIcon : null,
            error ? styles.inputError : null,
          ]}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeButton}
            activeOpacity={0.6}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={22}
              color="#94A3B8"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:       { gap:6 },
  label:         { fontSize:14, fontWeight:"500", color:"#334155" },
  inputWrapper:  { position:"relative", justifyContent:"center" },
  input:         { borderWidth:1.5, borderColor:"#CBD5E1", borderRadius:10,
                   paddingHorizontal:16, paddingVertical:13, fontSize:15,
                   color:"#0F172A", backgroundColor:"#F8FAFC" },
  inputWithIcon: { paddingRight:44 },
  inputError:    { borderColor:"#DC2626" },
  eyeButton:     { position:"absolute", right:12, padding:4 },
  error:         { fontSize:12, color:"#DC2626" },
});
 
