import { ResetPasswordPage } from "@/pages";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPasswordScreen() {
  return (
    <SafeAreaView className='items-center justify-center flex-1 bg-brand-100'>
      <ResetPasswordPage />
    </SafeAreaView>
  );
}

