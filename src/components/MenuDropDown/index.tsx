import { Ionicons } from "@expo/vector-icons";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useDropdownAnimation } from "@/hooks";
import { MenuDropdownProps, MenuDropdownRef, Option } from "./types";
import { cn } from "@/utils/twClassnamesResolver";

function MenuDropdownBase(
  { data, maxHeight = 200, children }: MenuDropdownProps,
  ref: React.Ref<MenuDropdownRef>
) {
  const { animatedHeight, open, close } = useDropdownAnimation(0, maxHeight);
  const [isOpen, setIsOpen] = useState(false);
  const [buttonLayout, setButtonLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

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

  console.log("buttonLayout:", buttonLayout);

  return (
    <View>
      <TouchableOpacity
        className="pr-3.5"
        onPress={toggleMenu}
        onLayout={e => setButtonLayout(e.nativeEvent.layout)}
      >
        {children ? (
          children
        ) : (
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        )}
      </TouchableOpacity>

      {isOpen && buttonLayout && (
        <Animated.View
          style={{
            height: animatedHeight,
            overflow: "hidden",
            position: "absolute",
            top: buttonLayout.y + buttonLayout.height + 4,
            right: 20,
            minWidth: 150,
            maxHeight,
            zIndex: 9999,
            elevation: 10,
            backgroundColor: "white",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
          }}
        >
          <ScrollView
            style={{ backgroundColor: "white" }}
            showsVerticalScrollIndicator={false}
          >
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="p-2  border-b border-gray-200 gap-2 flex-row items-center bg-white active:bg-gray-50"
                onPress={() => handlePress(item)}
                style={{ backgroundColor: "white" }}
              >
                {item?.icon}
                <Text
                  className={cn(
                    "font-nunito-regular text-base  ",
                    item?.color || "text-neutral-900"
                  )}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

export const MenuDropdown = forwardRef(MenuDropdownBase);
