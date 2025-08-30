import { FontAwesome } from "@expo/vector-icons";
import { IInputIcon } from "./interface";

export const InputIcon = ({ name, size = 16 }: IInputIcon) => (
  <FontAwesome name={name} size={size} color='#4D5F7C' />
);

