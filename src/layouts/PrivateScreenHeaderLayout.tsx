import { Avatar, MenuDropdown } from "@/components";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";

export const PrivateScreenHeaderLayout = () => {
  const router = useRouter();
  const { logout, handleAuthError } = useAuth();

  const signOut = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      const errorMessage = handleAuthError(error);
      Toast.show({
        autoHide: false,
        text1: errorMessage,
      });
    } finally {
    }
  };

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
      <MenuDropdown
        data={[
          {
            label: "Sair",
            color: "text-brand-800",
            icon: (
              <FontAwesome name='arrow-right' size={16} color={"#256365"} />
            ),
            onPress: signOut,
          },
        ]}
        maxHeight={40}
      >
        <Avatar name='Thalya Stéffany' />
      </MenuDropdown>
    </SafeAreaView>
  );
};

