import { HomePage } from "@/pages";
import { SafeAreaView } from "react-native-safe-area-context";

export default async function HomeScreen() {

  return (
    <SafeAreaView className='flex-1'>
      <HomePage />
    </SafeAreaView>
  );
}

