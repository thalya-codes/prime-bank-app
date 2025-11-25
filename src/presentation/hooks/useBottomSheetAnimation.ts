import { useRef } from "react";
import { Animated, PanResponder } from "react-native";

export function useBottomSheetAnimation(minHeight: number, maxHeight: number, onClose: () => void) {
  const animatedHeight = useRef(new Animated.Value(minHeight)).current;

  const open = () => {
    Animated.timing(animatedHeight, {
      toValue: minHeight,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const close = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start(onClose);
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) => Math.abs(g.dy) > 5,
      onPanResponderMove: (_, g) => {
        const newHeight = minHeight - g.dy;
        if (newHeight >= minHeight && newHeight <= maxHeight) {
          animatedHeight.setValue(newHeight);
        }
      },
      onPanResponderRelease: (_, g) => {
        if (g.dy > 100) {
          close();
        } else {
          const currentHeight = (animatedHeight as any).__getValue();
          if (currentHeight < (minHeight + maxHeight) / 2) {
            Animated.spring(animatedHeight, { toValue: minHeight, useNativeDriver: false }).start();
          } else {
            Animated.spring(animatedHeight, { toValue: maxHeight, useNativeDriver: false }).start();
          }
        }
      },
    })
  ).current;

  return { animatedHeight, panResponder, open, close };
}
