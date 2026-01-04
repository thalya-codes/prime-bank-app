import { Avatar, MenuDropDown } from "@/presentation/components";
import { Logo } from "@/presentation/components/Logo";
import { useGetUser } from "@/presentation/features/user/queries";
import { useAuth } from "@/presentation/hooks/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { Text } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "toastify-react-native";
import { AvatarSkeleton } from "../components/Skeletons/AvatarSkeleton";

export const PrivateScreenHeaderLayout = () => {
  const router = useRouter();
  const { logout, handleAuthError } = useAuth();
  const {
    data: user,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
  } = useGetUser();

  const signOut = async () => {
    try {
      await logout();
      router.replace("/login");
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
    <SafeAreaView edges={Platform.OS === "android" ? ["top"] : []}>
      <View className='flex-row items-center justify-between pl-1 pr-4 bg-white border-b border-gray-200'>
        <View className='flex-row items-center gap-2 px-4 py-3'>
          <Logo size='xs' />
          <Text className='text-xl font-inter-semi-bold text-neutral-900'>
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
              onPress: signOut,
            },
          ]}
          maxHeight={40}
        >
          
          {isUserLoading || isUserFetching ? (
            <AvatarSkeleton isVisible={true} />
          ) : (
            <Avatar name={user?.fullName ?? "Usuário Desconhecido"} />
          )}
        </MenuDropDown>
      </View>
    </SafeAreaView>
  );
};

