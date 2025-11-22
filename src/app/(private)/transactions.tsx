import { TransactionsPage } from "@/presentation/pages";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionsScreen() {
  return (
    <SafeAreaView className='flex-1'>
      <TransactionsPage />
    </SafeAreaView>
  );
}

