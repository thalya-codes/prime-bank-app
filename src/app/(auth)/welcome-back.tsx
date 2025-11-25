import { WelcomeBackPage } from "@/presentation/pages/WelcomeBackPage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeBackScreen() {
  return (
    <SafeAreaView className='items-center justify-center h-full flex-1 bg-brand-100'>
      <WelcomeBackPage />
    </SafeAreaView>
  );
}

