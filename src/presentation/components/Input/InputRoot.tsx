import { View } from "react-native";
import { IInputRoot } from "./interface";

export const InputRoot = ({ children, isError = false }: IInputRoot) => (
  <View
    className={`border h-12 rounded-md ${
      isError ? "border-feedback-danger-500" : "border-neutral-400"
    } p-3 w-full gap-2 flex-row items-center`}
  >
    {children}
  </View>
);

