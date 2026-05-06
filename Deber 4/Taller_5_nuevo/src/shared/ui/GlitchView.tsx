import React, { useEffect } from 'react';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
  interpolateColor
} from 'react-native-reanimated';

interface GlitchViewProps {
  children: React.ReactNode;
  trigger: boolean;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
}


export function GlitchView({ children, trigger, style, borderRadius = 8 }: GlitchViewProps) {
  
  const glitchVal = useSharedValue(0);
  
  const translateX = useSharedValue(0);
  
  const opacity = useSharedValue(1);

  
  useEffect(() => {
    if (trigger) {
      const timingConf = { duration: 50, easing: Easing.linear };
      
      
      glitchVal.value = withSequence(
        withTiming(1, { duration: 50 }),
        withTiming(0, { duration: 250 })
      );

      
      translateX.value = withSequence(
        withTiming(8, timingConf),
        withTiming(-8, timingConf),
        withTiming(4, timingConf),
        withTiming(-4, timingConf),
        withTiming(0, timingConf)
      );

      
      opacity.value = withSequence(
        withTiming(0.2, timingConf),
        withTiming(1, timingConf),
        withTiming(0.4, timingConf),
        withTiming(1, timingConf)
      );
    }
  }, [trigger]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    ...StyleSheet.absoluteFillObject,
    backgroundColor: interpolateColor(
      glitchVal.value,
      [0, 1],
      ['transparent', 'rgba(231, 76, 60, 0.3)']
    ),
    borderWidth: glitchVal.value > 0 ? 2 : 0,
    borderColor: '#E74C3C',
    borderRadius: borderRadius,
  }));

  return (
    <Animated.View style={[style, animatedStyle]}>
      {children}
      <Animated.View style={overlayStyle} pointerEvents="none" />
    </Animated.View>
  );
}
