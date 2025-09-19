import { BottomTabMenu } from "@/components/BottomTabMenu";
import { HomePage } from "@/pages";
import { View } from "react-native";

export default function HomeScreen() {
  return (
    <View className='flex-1'>
      <View className='flex-1'>
        <HomePage />
      </View>
      <BottomTabMenu />
    </View>
  );
}

