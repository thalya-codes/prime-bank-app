import { Button } from "@/presentation/components";
import { BiometricSwitch } from "@/presentation/components/BiometricSwitch";
import { CardHighlight } from "@/presentation/components/CardHighlight";
import { useAuth } from "@/presentation/hooks/useAuth";
import { PublicScreenLayout } from "@/presentation/layouts/PublicScreenLayout";
import { AuthContext } from "@/presentation/providers/AuthProvider";
import useAuthStore from "@/presentation/store/useAuthStore";
import { deleteBiometricPreference } from "@/utils/auth/secureStore";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext, useEffect } from "react";
import { Text, View } from "react-native";

export const WelcomeBackPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const { onBiometricLogin } = useAuth();
  const { setEnableBiometric, setIsAuthenticated } = useAuthStore();

  const onLoginWithEmailAndPassword = async () => {
    await deleteBiometricPreference();
    setEnableBiometric(false);
    router.replace("/login");
  };

  useEffect(() => {
    setIsAuthenticated(false);
  }, [setIsAuthenticated]);

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

