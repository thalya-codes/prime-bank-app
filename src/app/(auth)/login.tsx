import { LoginPage } from "@/pages";
import { View } from "react-native";
import { Toast } from "toastify-react-native";

export default function LoginScreen() {
  Toast.error('JDDJ')
  return (
    <View className='flex-1 justify-center items-center bg-brand-100'>
      <LoginPage />
      
    </View>
  );
}

