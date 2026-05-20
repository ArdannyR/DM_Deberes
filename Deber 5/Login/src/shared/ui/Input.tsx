import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { YStack, Text, Input as TInput, XStack } from "tamagui";
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
    <YStack gap={6}>
      <Text fontSize={14} fontWeight="500" color="$textMid">
        {label}
      </Text>
      <XStack position="relative" alignItems="center">
        <TInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          secureTextEntry={isPassword ? !isPasswordVisible : secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          borderWidth={1.5}
          borderColor={error ? "#DC2626" : "$border"}
          borderRadius={10}
          paddingHorizontal={16}
          paddingVertical={13}
          fontSize={15}
          color="black"
          backgroundColor="$inputBg"
          paddingRight={isPassword ? 44 : 16}
          flex={1}
        />
        {isPassword && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={{ position: "absolute", right: 12, padding: 4 }}
            activeOpacity={0.6}
          >
            <Ionicons
              name={isPasswordVisible ? "eye-off" : "eye"}
              size={22}
              color="#94A3B8"
            />
          </TouchableOpacity>
        )}
      </XStack>
      {error && (
        <Text fontSize={12} color="$danger">
          {error}
        </Text>
      )}
    </YStack>
  );
};
