import { HomePage } from "@/pages";
import { SafeAreaView } from "react-native";

export default async function HomeScreen() {

  return (
    <SafeAreaView className='flex-1'>
      <HomePage />
    </SafeAreaView>
  );
}

