import { Ionicons } from "@expo/vector-icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDropdownAnimation } from "@/hooks";
import { MenuDropdownProps, MenuDropdownRef, Option } from "./types";

function MenuDropdownBase(
  { data, maxHeight = 200, iconSize = 24, iconColor = "black" }: MenuDropdownProps,
  ref: React.Ref<MenuDropdownRef>
) {
  const { animatedHeight, open, close } = useDropdownAnimation(0, maxHeight);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLayout, setButtonLayout] = useState<{ x: number; y: number; width: number; height: number } | null>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      open();
      setIsOpen(true);
    },
    close: () => {
      close();
      setIsOpen(false);
    },
  }));

  const toggleMenu = () => {
    if (isOpen) {
      close();
      setIsOpen(false);
    } else {
      open();
      setIsOpen(true);
    }
  };

  const handlePress = (item: Option) => {
    item.onPress();
    close();
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={toggleMenu}
        onLayout={(e) => setButtonLayout(e.nativeEvent.layout)}
      >
        <Ionicons name="ellipsis-vertical" size={iconSize} color={iconColor} />
      </TouchableOpacity>

      {isOpen && buttonLayout && (
        <Animated.View
          style={{
            height: animatedHeight,
            overflow: "hidden",
            position: "absolute",
            top: buttonLayout.y + buttonLayout.height + 4,
            left: buttonLayout.x,
            minWidth: 150,
            maxHeight,
            zIndex: 9999,
          }}
          className="bg-white rounded-md shadow-lg"
        >
          <ScrollView>
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="p-3 border-b border-gray-200"
                onPress={() => handlePress(item)}
              >
                <Text>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

export const MenuDropdown = forwardRef(MenuDropdownBase);
