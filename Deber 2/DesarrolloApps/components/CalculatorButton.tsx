import * as Haptics from "expo-haptics";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors } from "../constants/theme";

type CalculatorButtonProps = {
  label: string;
  backgroundColor?: string;
  textColor?: string;
  wide?: boolean;
  doubleWidth?: boolean;
  onPress: () => void;
};

export default function CalculatorButton({
  label,
  backgroundColor = Colors.darkGray,
  textColor = Colors.textPrimary,
  wide = false,
  doubleWidth = false,
  onPress,
}: CalculatorButtonProps) {
  const isWide = wide || doubleWidth;
  const handlePress = async () => {
    // Aqui esta la implementacion de la vibracion al presionar el boton
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={[
        styles.button,
        isWide && styles.wide,
        { backgroundColor },
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 72,
    height: 72,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    margin: 4,
  },
  wide: {
    width: 156,
    alignItems: "flex-start",
    paddingLeft: 24,
  },
  label: {
    fontSize: 28,
    fontWeight: "600",
  },
});
