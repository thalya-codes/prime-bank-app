import { Image, Text, View } from "react-native";

import { AvatarProps } from "./types";

const mapSizes = {sm: 32, md: 40, lg: 48, xl: 56}

function Avatar({ name, uri, size = 'md' }: AvatarProps) {
  const getInitials = (name: string) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    const first = parts[0]?.[0] || "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase();
  };

  const initials = getInitials(name);
  const avatarSize = mapSizes[size]

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
        }}
      />
    );
  }

  return (
    <View
      className="bg-brand-100 justify-center items-center"
      style={{
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
      }}
    >
      <Text className="text-brand-800 inter-semi-bold" style={{ fontSize: avatarSize * 0.4 }}>
        {initials}
      </Text>
    </View>
  );
}

export default Avatar