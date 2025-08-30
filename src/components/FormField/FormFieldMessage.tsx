import { cn } from "@/utils/twClassnamesResolver";
import { Text } from "react-native";
import { IFormFieldMessage } from "./interface";

export const FormFieldMessage = ({
  children,
  isError = false,
}: IFormFieldMessage) => (
  <Text
    className={cn(
      "font-inter-medium text-sm text-neutral-700",
      isError && "text-feedback-danger-500"
    )}
  >
    {children}
  </Text>
);

