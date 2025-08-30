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
import { Option, SelectProps, SelectRef } from "./types";

function SelectBase(
  {
    data,
    value,
    onChange,
    placeholder = "Selecione...",
    maxHeight = 200,
    disabled = false,
  }: SelectProps,
  ref: React.Ref<SelectRef>
) {
  const { animatedHeight, open, close } = useDropdownAnimation(0, maxHeight);
  const [isOpen, setIsOpen] = useState(false);

  const selectedLabel = data.find((item) => item.value === value)?.label;

  useImperativeHandle(ref, () => ({
    open: () => {
      if (disabled) return;
      open();
      setIsOpen(true);
    },
    close: () => {
      close();
      setIsOpen(false);
    },
  }));

  const toggleSelect = () => {
    if (disabled) return;
    if (isOpen) {
      close();
      setIsOpen(false);
    } else {
      open();
      setIsOpen(true);
    }
  };

  const handleSelect = (item: Option) => {
    onChange?.(item.value);
    close();
    setIsOpen(false);
  };

  return (
    <View className="w-full">
      <TouchableOpacity
        className={`p-3 flex-row justify-between items-center bg-white border border-gray-300 ${disabled ? "opacity-50" : ""}`}
        onPress={toggleSelect}
        activeOpacity={disabled ? 1 : 0.7}
      >
        <Text className="text-gray-700">{selectedLabel || placeholder}</Text>
        <Animated.View
          style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
        >
          <Ionicons name="chevron-down" size={20} color="gray" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={{ height: animatedHeight, overflow: "hidden" }}
        className="bg-white rounded-md shadow mt-1"
      >
        <ScrollView>
          {data.map((item) => (
            <TouchableOpacity
              key={item.value.toString()}
              className="p-3 border-b border-gray-200"
              onPress={() => handleSelect(item)}
            >
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

export const Select = forwardRef(SelectBase);
