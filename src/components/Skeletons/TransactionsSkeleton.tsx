import { StyleSheet, ViewStyle } from "react-native";
import Skeleton from "react-native-reanimated-skeleton";

type LayoutItem = ViewStyle & {
  key?: string | number;
  children?: LayoutItem[];
};

const BONE_COLOR = "#E5E8EF";
const HIGHLIGHT_COLOR = "#F7F8FC";

const buildTransactionsLayout = (): LayoutItem[] => {
  const items: LayoutItem[] = [
    {
      key: "filter-card",
      width: "100%",
      height: 84,
      borderRadius: 20,
      marginBottom: 20,
    },
  ];

  Array.from({ length: 4 }).forEach((_, index) => {
    items.push({
      key: `transaction-item-${index}`,
      width: "100%",
      height: 128,
      borderRadius: 24,
      marginBottom: index === 3 ? 12 : 18,
    });
  });

  return items;
};

type TransactionsSkeletonProps = {
  isVisible?: boolean;
};

export function TransactionsSkeleton({
  isVisible = true,
}: TransactionsSkeletonProps) {
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
      layout={buildTransactionsLayout()}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
