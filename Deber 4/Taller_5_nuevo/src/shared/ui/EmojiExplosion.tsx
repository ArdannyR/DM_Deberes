import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';

interface EmojiExplosionProps {
  trigger: boolean;
  emojis: string[];
}


const EmojiParticle = ({ emoji, trigger }: { emoji: string; trigger: boolean }) => {
  
  const translateY = useSharedValue(0);
  
  const translateX = useSharedValue(0);
  
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.5);

  
  React.useEffect(() => {
    if (trigger) {
      opacity.value = 1;
      scale.value = 1;
      
      const randomX = (Math.random() - 0.5) * 250;
      
      const randomY = -300 - Math.random() * 200;
      
      
      translateY.value = withTiming(randomY, { duration: 1500, easing: Easing.out(Easing.cubic) });
      
      translateX.value = withTiming(randomX, { duration: 1500, easing: Easing.out(Easing.cubic) });
      
      opacity.value = withDelay(1000, withTiming(0, { duration: 500 }));
    } else {
      translateY.value = 0;
      translateX.value = 0;
      opacity.value = 0;
      scale.value = 0.5;
    }
  }, [trigger]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    opacity: opacity.value,
    fontSize: 35,
    zIndex: 999,
  }));

  return <Animated.Text style={style} pointerEvents="none">{emoji}</Animated.Text>;
};


export function EmojiExplosion({ trigger, emojis }: EmojiExplosionProps) {
  if (!trigger) return null;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {emojis.map((emoji, index) => (
        <EmojiParticle key={index} emoji={emoji} trigger={trigger} />
      ))}
    </View>
  );
}
