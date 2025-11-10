import { ReactNode } from "react";
import { View } from "react-native";

export const FormFieldRoot = ({ children }: { children: ReactNode }) => (
  <View className='gap-2 max-w-[98%]'>{children}</View>
);

