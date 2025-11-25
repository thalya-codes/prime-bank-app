import { LoginPage } from "@/presentation/pages";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  return (
    <SafeAreaView className='items-center justify-center flex-1 bg-brand-100'>
      <LoginPage />
    </SafeAreaView>
  );
}

