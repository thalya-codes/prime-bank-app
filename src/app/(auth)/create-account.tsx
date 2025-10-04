import { CreateAccountPage } from "@/pages/CreateAccountPage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatAccountScreen() {
  return (
    <SafeAreaView className='items-center justify-center flex-1 bg-brand-100'>
      <CreateAccountPage />
    </SafeAreaView>
  );
}

