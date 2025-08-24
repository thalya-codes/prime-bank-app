import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implementar lógica de login
    // @ts-ignore - Ignorando erros de tipo para fins de demonstração
    router.push("home");
  };

  return (
    <View className="flex-1 justify-center items-center bg-white p-4">
      <Text className="text-2xl font-bold text-blue-700 mb-6">Login</Text>

      <View className="w-full max-w-xs">
        <TextInput
          className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          className="border border-gray-300 rounded-md px-4 py-2 mb-6 w-full"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-500 py-3 px-4 rounded-md mb-4"
        >
          <Text className="text-white text-center font-bold">Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // @ts-ignore - Ignorando erros de tipo para fins de demonstração
            router.back();
          }}
          className="py-2"
        >
          <Text className="text-blue-500 text-center">Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
