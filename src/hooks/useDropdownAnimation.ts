import { useRef } from "react";
import { Animated } from "react-native";

export function useDropdownAnimation(initialHeight = 0, maxHeight = 200) {
  const animatedHeight = useRef(new Animated.Value(initialHeight)).current;

  const open = () => {
    Animated.timing(animatedHeight, {
      toValue: maxHeight,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const close = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return { animatedHeight, open, close };
}
