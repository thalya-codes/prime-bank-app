import { FontAwesome } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Card from "../Card";
import { ICardHighlight } from "./interface";

export const CardHighlight = ({
  text,
  iconName,
  iconSize = 20,
}: ICardHighlight) => (
  <View className='w-[48%] justify-center'>
    <Card color='light-green' isOutlined={true} className='gap-2'>
      <FontAwesome
        name={iconName}
        size={iconSize}
        className='text-center'
        color={"#249695"}
      />
      <Text className='text-center font-nunito-bold text-neutral-600'>
        {text}
      </Text>
    </Card>
  </View>
);

