import React from 'react';
import { TextInput, type TextInputProps } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
  interpolate,
} from 'react-native-reanimated';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);

interface AnimatedTextInputProps extends TextInputProps {
  error?: boolean;
}

export function AnimatedTextInput({ error, ...props }: AnimatedTextInputProps) {
  const isFocused = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const focusProgress = isFocused.value;

    const borderColor = interpolateColor(
      focusProgress,
      [0, 1],
      [error ? '#E74C3C' : '#DDE2E8', '#007AFF']
    );

    const borderWidth = interpolate(
      focusProgress,
      [0, 1],
      [error ? 1.5 : 1, 2]
    );

    return {
      borderColor,
      borderWidth,
    };
  });

  const handleFocus = (e: any) => {
    isFocused.value = withTiming(1, { duration: 200 });
    props.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    isFocused.value = withTiming(0, { duration: 200 });
    props.onBlur?.(e);
  };

  return (
    <AnimatedInput
      {...props}
      style={[props.style, animatedStyle]}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
