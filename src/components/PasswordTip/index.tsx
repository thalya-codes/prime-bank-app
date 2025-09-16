import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { BottomSheet } from "../BottomSheet";

export const PasswordTip = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <FontAwesome name='info-circle' size={22} color={"#249695"} />
      </TouchableOpacity>

      <BottomSheet visible={visible} setVisible={setVisible}>
        <Text className='text-2xl font-semibold mb-3 text-center pt-4'>
          Requisitos para sua senha 🔒
        </Text>
        
        <View className='gap-8 mt-4'>
          <View className='flex-row items-center gap-2'>
            <FontAwesome name='circle' color={"#249695"} size={12} />

            <Text className='text-xl'>
              {" "}
              Conter no minimo uma{" "}
              <Text className='font-inter-bold'>letra minúscula</Text> (a-z)
            </Text>
          </View>

          <View className='flex-row items-center gap-2'>
            <FontAwesome name='circle' color={"#249695"} size={12} />
            <Text className='text-xl'>
              Conter no minimo uma{" "}
              <Text className='font-inter-bold'>letra maiúscula </Text> (A-Z)
            </Text>
          </View>
          <View className='flex-row items-center gap-2'>
            <FontAwesome name='circle' color={"#249695"} size={12} />
            <Text className='text-xl'>
              Conter no mínimo{" "}
              <Text className='font-inter-bold'>um número</Text> (0-9)
            </Text>
          </View>

          <View className='flex-row items-center gap-2'>
            <FontAwesome name='circle' color={"#249695"} size={12} />

            <Text className='text-xl'>
              Conter no mínimo um{" "}
              <Text className='font-inter-bold'>caractere especial</Text> como
              #, @, $, ou %, por exemplo.
            </Text>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

