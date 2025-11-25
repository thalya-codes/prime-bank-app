import { StyleSheet, ViewStyle } from "react-native";
import Skeleton from "react-native-reanimated-skeleton";

type LayoutItem = ViewStyle & {
  key?: string | number;
  children?: LayoutItem[];
};

const BONE_COLOR = "#E5E8EF";
const HIGHLIGHT_COLOR = "#F7F8FC";

const HOME_SKELETON_LAYOUT: LayoutItem[] = [
  {
    key: "hero-card",
    width: "100%",
    height: 164,
    borderRadius: 28,
    marginBottom: 20,
  },
  {
    key: "balance-card",
    width: "100%",
    height: 140,
    borderRadius: 28,
    marginBottom: 24,
  },
  {
    key: "section-title",
    width: "65%",
    height: 22,
    borderRadius: 12,
    marginBottom: 12,
  },
  {
    key: "type-label",
    width: "42%",
    height: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  {
    key: "type-field",
    width: "100%",
    height: 48,
    borderRadius: 16,
    marginBottom: 16,
  },
  {
    key: "value-label",
    width: "35%",
    height: 16,
    borderRadius: 10,
    marginBottom: 8,
  },
  {
    key: "value-field",
    width: "100%",
    height: 48,
    borderRadius: 16,
    marginBottom: 18,
  },
  {
    key: "submit-button",
    width: "100%",
    height: 54,
    borderRadius: 18,
    marginBottom: 24,
  },
  {
    key: "receipt-upload",
    width: "100%",
    height: 86,
    borderRadius: 20,
  },
];

type HomeSkeletonProps = {
  isVisible?: boolean;
};

export function HomeSkeleton({ isVisible = true }: HomeSkeletonProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <Skeleton
      isLoading
      animationType="shiver"
      boneColor={BONE_COLOR}
      highlightColor={HIGHLIGHT_COLOR}
      containerStyle={styles.container}
      layout={HOME_SKELETON_LAYOUT}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
});
