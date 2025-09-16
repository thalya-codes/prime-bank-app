import { ReactNode } from "react";
import { Text } from "react-native";

export const CheckboxLabel = ({ children }: { children: ReactNode }) => (
  <Text className='font-inter-semi-bold text-base text-neutral-900'>
    {children}
  </Text>
);

