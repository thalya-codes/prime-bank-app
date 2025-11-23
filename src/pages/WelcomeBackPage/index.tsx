import { Button } from "@/components";
import { BiometricSwitch } from "@/components/BiometricSwitch";
import { CardHighlight } from "@/components/CardHighlight";
import { PublicScreenLayout } from "@/layouts/PublicScreenLayout";
import { AuthContext } from "@/providers/AuthProvider";
import { useBiometricAuthStore } from "@/store/useBiometricAuthStore";
import { deleteBiometricPreference } from "@/utils/auth/secureStore";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";

export const WelcomeBackPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const { onBiometricLogin } = useBiometricAuthStore();
  const { setEnableBiometric } = useBiometricAuthStore();

  const onLoginWithEmailAndPassword = async () => {
    await deleteBiometricPreference();
    setEnableBiometric(false);
    router.push("/login");
  };

  return (
    <PublicScreenLayout
      title={`Bem vindo(a) ${user?.displayName} de volta!`}
      subTitle='Acesse sua conta Prime Bank'
      footer={
        <View className='flex-row gap-5'>
          <CardHighlight iconName={"lock"} text={"100% Seguro"} />
          <CardHighlight
            iconName={"envelope-o"}
            iconSize={16}
            text={"Suporte 24h"}
          />
        </View>
      }
    >
      <Button text='Entrar' className='gap-2' onPress={onBiometricLogin}>
        <AntDesign name='arrowright' size={20} color={"#fff"} />
      </Button>

      <BiometricSwitch />
      <View className='flex-row items-center justify-between'>
        <View className='w-5/12 h-px border border-slate-200' />
        <Text className='text-center font-inter-bold'>Ou</Text>
        <View className='w-5/12 h-px border border-slate-200' />
      </View>

      <Button
        text='Fazer login com email e senha'
        variant='link'
        onPress={onLoginWithEmailAndPassword}
      />
    </PublicScreenLayout>
  );
};

