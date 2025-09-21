import { Avatar, MenuDropDown } from "@/components";
import { Logo } from "@/components/Logo";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const PrivateScreenHeaderLayout = () => {
  const router = useRouter();
  
  return (
    <SafeAreaView
      edges={["top"]}
      className='bg-white border-b flex-row items-center justify-between border-gray-200 pl-1 pr-4'
    >
      <View className='flex-row items-center gap-2 px-4 py-3'>
        <Logo size='xs' />
        <Text className='font-inter-semi-bold text-neutral-900 text-xl'>
          Prime Bank
        </Text>
      </View>
      <MenuDropDown
        data={[
          {
            label: "Sair",
            color: "text-brand-800",
            icon: (
              <FontAwesome name='arrow-right' size={16} color={"#256365"} />
            ),
            onPress: () => router.push("/login"),
          },
        ]}
        maxHeight={40}
      >
        <Avatar name='Thalya Stéffany' />
      </MenuDropDown>
    </SafeAreaView>
  );
};

