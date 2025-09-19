import React, { forwardRef, useImperativeHandle } from "react";
import { Animated, Dimensions, Modal, ScrollView, View } from "react-native";

import { Overlay } from "@/components";
import { useBottomSheetAnimation } from "@/hooks";
import { BottomSheetProps, BottomSheetRef } from "./types";

function BottomSheetBase(
  { children, visible, setVisible }: BottomSheetProps,
  ref: React.Ref<BottomSheetRef>
) {
  const screenHeight = Dimensions.get("window").height;

  const MAX_HEIGHT = screenHeight * 0.85;
  const MIN_HEIGHT = screenHeight * 0.4;

  const { animatedHeight, panResponder, open, close } = useBottomSheetAnimation(
    MIN_HEIGHT,
    MAX_HEIGHT,
    () => setVisible(false)
  );

  useImperativeHandle(ref, () => ({
    open,
    close,
  }));

  return (
    <Modal
      animationType='slide'
      transparent
      visible={visible}
      onRequestClose={close}
    >
      <View className='flex-1 justify-end'>
        <View className='absolute top-0 left-0 right-0 bottom-0 bg-black/10'>
          <Overlay onPress={close} />
        </View>

        <Animated.View
          {...panResponder.panHandlers}
          className='w-full bg-white rounded-t-2xl p-4'
          style={{
            height: animatedHeight,
            maxHeight: MAX_HEIGHT,
            minHeight: MIN_HEIGHT,
          }}
        >
          <View className='w-12 h-1.5 bg-gray-300 rounded-full self-center mb-3' />

          <ScrollView
            showsVerticalScrollIndicator
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

export const BottomSheet = forwardRef<BottomSheetRef, BottomSheetProps>(
  BottomSheetBase
);

