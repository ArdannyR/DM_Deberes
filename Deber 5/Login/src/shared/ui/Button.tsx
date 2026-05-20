import { Button as TButton, Spinner, Text } from "tamagui";

interface ButtonProps {
  onPress:    () => void;
  label:      string;
  isLoading?: boolean;
  variant?:   "primary" | "ghost" | "danger";
  disabled?:  boolean;
}

const bgMap: Record<string, string> = {
  primary: "$primary",
  ghost:   "transparent",
  danger:  "$danger",
};

const borderMap: Record<string, string> = {
  primary: "$primary",
  ghost:   "$primary",
  danger:  "$danger",
};

export const Button = ({
  onPress, label, isLoading, variant = "primary", disabled
}: ButtonProps) => {
  const isDisabled = disabled || isLoading;
  return (
    <TButton
      onPress={onPress}
      disabled={isDisabled}
      backgroundColor={bgMap[variant]}
      borderWidth={variant === "ghost" ? 2 : 0}
      borderColor={borderMap[variant]}
      size="$4"
      paddingHorizontal={24}
      opacity={isDisabled ? 0.5 : 1}
      pressStyle={{ opacity: 0.8 }}
    >
      {isLoading ? (
        <Spinner color="#fff" />
      ) : (
        <Text
          color={variant === "ghost" ? "$primary" : "#fff"}
          fontSize={16}
          fontWeight="600"
        >
          {label}
        </Text>
      )}
    </TButton>
  );
};
