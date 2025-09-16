import { Card } from "@/components/Card";
import { Logo } from "@/components/Logo";
import { Text, View } from "react-native";

interface IPublicScreenLayout {
  title: string;
  subTitle: string;
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
    <View className='w-full px-6 gap-6'>
      <View className='gap-3 justify-center w-full'>
        <View className='flex-row justify-center w-full'>
          <Logo />
        </View>

        <Text className='text-center font-inter-bold text-3xl'>{title}</Text>
        <Text className='text-center font-inter-regular text-base'>
          {subTitle}
        </Text>
      </View>

      <Card className='gap-6'>{children}</Card>
      {footer}
    </View>
  );
};

