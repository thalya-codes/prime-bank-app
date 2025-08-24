import { BottomTabMenu } from "@/components/BottomTabMenu";
import { TransactionsPage } from "@/pages/app";
import { View } from "react-native";

export default function TransactionsScreen() {
  return (
    <View className="flex-1">
      <View className="flex-1">
        <TransactionsPage />
      </View>
      <BottomTabMenu />
    </View>
  );
}
