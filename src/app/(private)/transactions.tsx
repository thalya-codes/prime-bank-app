import { TransactionsPage } from "@/pages";
import { View } from "react-native";

export default function TransactionsScreen() {
  return (
    <View className='flex-1'>
      <View className='flex-1'>
        <TransactionsPage />
      </View>
    </View>
  );
}

