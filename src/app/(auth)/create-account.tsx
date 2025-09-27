import { CreateAccountPage } from "@/pages/CreateAccountPage";
import { SafeAreaView } from "react-native";

export default function CreatAccountScreen() {
  return (
    <SafeAreaView className='flex-1 justify-center items-center bg-brand-100'>
      <CreateAccountPage />
    </SafeAreaView>
  );
}

