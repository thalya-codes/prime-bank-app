import { Ionicons } from "@expo/vector-icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from "react";
import { Animated, ScrollView, Text, TouchableOpacity, View } from "react-native";

import { useDropdownAnimation } from "@/hooks";
import { MenuDropdownProps, MenuDropdownRef, Option } from "./types";

function MenuDropdownBase(
  { data, maxHeight = 200, iconSize = 24, iconColor = "black" }: MenuDropdownProps,
  ref: React.Ref<MenuDropdownRef>
) {
  const { animatedHeight, open, close } = useDropdownAnimation(0, maxHeight);
  const [isOpen, setIsOpen] = useState(false);

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
    <View className="relative">
      <TouchableOpacity onPress={toggleMenu}>
        <Ionicons name="ellipsis-vertical" size={iconSize} color={iconColor} />
      </TouchableOpacity>

      <Animated.View
        style={{
          height: animatedHeight,
          overflow: "hidden",
          position: "absolute",
          top: iconSize + 8,
          right: 0,
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
    </View>
  );
}

export const MenuDropdown = forwardRef(MenuDropdownBase);
