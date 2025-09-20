import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Image
        source={require("@/assets/images/react-logo.png")}
        className="w-24 h-24 mb-4"
      />
      <Text className="text-lg font-bold text-center text-blue-600">
        Prime Bank App - React Native com NativeWind
      </Text>
      <Text className="text-base text-center mt-2 text-gray-600">
        Edite src/app/index.tsx para personalizar esta tela.
      </Text>

      <View className="mt-8 w-full max-w-xs space-y-4">
        <Pressable
          onPress={() => {
            // @ts-ignore - Ignorando erros de tipo para fins de demonstração
            router.push("login");
          }}
          className="bg-blue-500 py-3 px-4 rounded-md"
          style={{ marginBottom: 16 }} // 1rem = 16px
        >
          <Text className="text-white text-center font-bold">Ir para Login</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            // @ts-ignore - Ignorando erros de tipo para fins de demonstração
            router.push("home");
          }}
          className="bg-green-500 py-3 px-4 rounded-md"
          style={{ marginBottom: 16 }} // 1rem = 16px
        >
          <Text className="text-white text-center font-bold">Ir para Home</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            // @ts-ignore - Ignorando erros de tipo para fins de demonstração
            router.push("transactions");
          }}
          className="bg-red-500 py-3 px-4 rounded-md"
        >
          <Text className="text-white text-center font-bold">Ir para Transações</Text>
        </Pressable>
      </View>
    </View>
  );
}
