import { ReactNode } from "react";
import { Text } from "react-native";

export const FormFieldLabel = ({ children }: { children: ReactNode }) => (
  <Text className='font-inter-medium text-neutral-700 text-lg'>{children}</Text>
);

