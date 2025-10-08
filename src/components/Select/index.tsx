import { Ionicons } from "@expo/vector-icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const selectedLabel = data.find(item => item.value === value)?.label;

  const itemHeight = 56;
  const realHeight = Math.min(data.length * itemHeight, maxHeight);

  const openDropdown = () => {
    Animated.timing(animatedHeight, {
      toValue: realHeight,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const closeDropdown = () => {
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  useImperativeHandle(ref, () => ({
    open: () => {
      if (disabled) return;
      openDropdown();
      setIsOpen(true);
    },
    close: () => {
      closeDropdown();
      setIsOpen(false);
    },
  }));

  const toggleSelect = () => {
    if (disabled) return;
    if (isOpen) {
      closeDropdown();
      setIsOpen(false);
    } else {
      openDropdown();
      setIsOpen(true);
    }
  };

  const handleSelect = (item: Option) => {
    onChange?.(item.value);
    closeDropdown();
    setIsOpen(false);
  };

  return (
    <View className="relative w-full">
      <TouchableOpacity
        className={`p-3 flex-row justify-between items-center bg-white rounded-lg ${disabled ? "opacity-50" : ""}`}
        onPress={toggleSelect}
        activeOpacity={disabled ? 1 : 0.7}
        disabled={disabled}
        style={{
          borderRadius: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }}
      >
        <Text className={`${disabled ? 'text-neutral-300' : 'text-neutral-950'} font-nunito-regular ${!value ? 'text-neutral-300' : 'text-neutral-950'}`}>{selectedLabel || placeholder}</Text>
        <Animated.View
          style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
        >
          <Ionicons name="chevron-down" size={20} color="gray" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View
        style={{
          height: animatedHeight,
          overflow: "hidden",
          position: "absolute",
          top: 48,
          left: 0,
          right: 0,
          zIndex: 9999,
          elevation: 25,
          backgroundColor: "white",
          borderRadius: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.15,
          shadowRadius: 16,
        }}
      >
        {/* <<<<<<< HEAD
  <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
    {data.map((item) => (
      <TouchableOpacity
        key={item.value.toString()}
        className="p-3 border-b border-l border-r border-gray-200"
======= */}
        <ScrollView
          style={{
            backgroundColor: "white",
            borderRadius: 12,
          }}
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={item.value.toString()}
              className={`p-4 bg-white active:bg-gray-50 ${index !== data.length - 1 ? "border-b border-gray-100" : ""
                } ${index === 0 ? "rounded-t-xl" : ""} ${index === data.length - 1 ? "rounded-b-xl" : ""
                }`}

              onPress={() => handleSelect(item)}
              style={{
                backgroundColor: "white",
                borderTopLeftRadius: index === 0 ? 12 : 0,
                borderTopRightRadius: index === 0 ? 12 : 0,
                borderBottomLeftRadius: index === data.length - 1 ? 12 : 0,
                borderBottomRightRadius: index === data.length - 1 ? 12 : 0,
              }}
            >
              <Text className="text-base font-nunito-regular text-neutral-900">
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View >
    </View >
  );
}

const Select = forwardRef(SelectBase);
export default Select