import { TouchableOpacityProps } from "react-native";

type TButtonVariant = "primary" | "secondary" | "link" | "neutral";

export interface IButton extends TouchableOpacityProps {
  variant?: TButtonVariant;
  textClassName?: string;
  text: string;
  isFullWidth?: boolean;
}

