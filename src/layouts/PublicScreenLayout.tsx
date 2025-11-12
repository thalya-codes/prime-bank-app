import { Card } from "@/components";
import { Logo } from "@/components/Logo";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

interface IPublicScreenLayout {
  title: string;
  subTitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
export const PublicScreenLayout = ({
  title,
  subTitle,
  children,
  footer,
}: IPublicScreenLayout) => {
  return (
    <KeyboardAvoidingView
      className='flex-col w-full px-6 gap-6'
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View className='gap-5 justify-center w-full'>
          <View className='flex-row justify-center w-full'>
            <Logo />
          </View>

          <Text className='text-center font-inter-bold text-3xl'>{title}</Text>
          {subTitle && (
            <Text className='text-center font-inter-regular text-base'>
              {subTitle}
            </Text>
          )}
        </View>

        <Card className="my-6 gap-3 h-max">{children}</Card>
        {footer}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

