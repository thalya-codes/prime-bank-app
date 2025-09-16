import { Logo } from '@/components/Logo';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export function HomePage() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold text-blue-700 mb-6">Página Inicial</Text>
      <Text className="text-lg text-gray-600 mb-8">Bem-vindo ao Prime Bank App</Text>
      <Logo />
      {/* <TouchableOpacity
        onPress={() => {
          // @ts-ignore - Ignorando erros de tipo para fins de demonstração
          router.push("transactions");
        }}
        className="bg-blue-500 py-3 px-6 rounded-md mb-4"
      >
        <Text className="text-white font-bold">Ver Transações</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          // @ts-ignore - Ignorando erros de tipo para fins de demonstração
          router.back();
        }}
        className="bg-gray-500 py-3 px-6 rounded-md"
      >
        <Text className="text-white font-bold">Voltar</Text>
      </TouchableOpacity> */}
    </View>
  );
}
