import { StyleSheet } from "react-native";
import Skeleton from "react-native-reanimated-skeleton";
import { ICustomViewStyle } from "react-native-reanimated-skeleton/lib/typescript/constants";

const BONE_COLOR = "#E5E8EF";
const HIGHLIGHT_COLOR = "#F7F8FC";

const AVATAR_SKELETON_LAYOUT: ICustomViewStyle[] = [
  {
    key: "avatar",
    width: 40,
    height: 40,
    borderRadius: 80,
  },
];

export function AvatarSkeleton({ isVisible = true }: { isVisible?: boolean }) {
  if (!isVisible) {
    return null;
  }

  return (
    <Skeleton
      isLoading
      animationType='shiver'
      boneColor={BONE_COLOR}
      highlightColor={HIGHLIGHT_COLOR}
      containerStyle={styles.container}
      layout={AVATAR_SKELETON_LAYOUT}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
