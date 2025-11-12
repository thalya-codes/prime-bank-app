import { BottomSheet, Button } from "@/components";
import { BiometricSwitch } from "@/components/BiometricSwitch";
import { CardHighlight } from "@/components/CardHighlight";
import { useBiometricAuth } from "@/hooks/useBiometricAuth";
import { PublicScreenLayout } from "@/layouts/PublicScreenLayout";
import { AuthContext } from "@/providers/AuthProvider";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Text, View } from "react-native";

export const WelcomeBackPage = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const {
    onBiometricLogin,
    showDrawerUnconfiguredBiometrics,
    setShowDrawerUnconfiguredBiometrics,
  } = useBiometricAuth();

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
        onPress={() => router.push("/login")}
      />

      <BottomSheet
        visible={showDrawerUnconfiguredBiometrics}
        setVisible={setShowDrawerUnconfiguredBiometrics}
      >
        <View className='mt-10 gap-5'>
          <Text className='font-inter-bold text-center text-2xl'>
            Biometria Não Cadastrada.
          </Text>
          <Text className='text-xl font-inter-regular'>
            Você pode configurá-la nas{" "}
            <Text className='font-inter-bold text-xl'>Configurações</Text> do
            App. Alternativamente, entre digitando{" "}
            <Text className='font-inter-bold text-xl'>seu e-mail e senha.</Text>
          </Text>
        </View>
      </BottomSheet>
    </PublicScreenLayout>
  );
};

