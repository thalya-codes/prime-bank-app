import { StyleSheet, ViewStyle } from "react-native";
import Skeleton from "react-native-reanimated-skeleton";

type LayoutItem = ViewStyle & {
  key?: string | number;
  children?: LayoutItem[];
};

const BONE_COLOR = "#E5E8EF";
const HIGHLIGHT_COLOR = "#F7F8FC";

const ANALYSIS_SKELETON_LAYOUT: LayoutItem[] = [
  {
    key: "analysis-title",
    width: "60%",
    height: 26,
    borderRadius: 16,
    marginBottom: 10,
  },
  {
    key: "analysis-subtitle",
    width: "85%",
    height: 18,
    borderRadius: 10,
    marginBottom: 20,
  },
  {
    key: "mode-toggle",
    width: "100%",
    height: 56,
    borderRadius: 32,
    marginBottom: 28,
  },
  {
    key: "summary-card-one",
    width: "100%",
    height: 110,
    borderRadius: 22,
    marginBottom: 16,
  },
  {
    key: "summary-card-two",
    width: "100%",
    height: 110,
    borderRadius: 22,
    marginBottom: 16,
  },
  {
    key: "summary-card-three",
    width: "100%",
    height: 110,
    borderRadius: 22,
    marginBottom: 24,
  },
  {
    key: "chart-card-one",
    width: "100%",
    height: 220,
    borderRadius: 28,
    marginBottom: 18,
  },
  {
    key: "chart-card-two",
    width: "100%",
    height: 220,
    borderRadius: 28,
  },
];

type AnalysisSkeletonProps = {
  isVisible?: boolean;
};

export function AnalysisSkeleton({ isVisible = true }: AnalysisSkeletonProps) {
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
      layout={ANALYSIS_SKELETON_LAYOUT}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
