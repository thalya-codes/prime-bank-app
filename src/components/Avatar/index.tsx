import React from "react";
import { Image, Text, View } from "react-native";

import { AvatarProps } from "./types";

export function Avatar({ name, uri, size = 48 }: AvatarProps) {
  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  const initials = getInitials(name);

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
        }}
      />
    );
  }

  return (
    <View
      className="bg-gray-300 justify-center items-center"
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
      }}
    >
      <Text className="font-bold text-white" style={{ fontSize: size * 0.4 }}>
        {initials}
      </Text>
    </View>
  );
}
