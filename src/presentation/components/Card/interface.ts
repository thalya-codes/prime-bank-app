import { ReactNode } from "react";
import { ViewStyle } from "react-native";

export interface ICard {
  color?: "white" | "light-green" | "strong-green";
  isOutlined?: boolean;
  children: ReactNode;
  className?: string;
  style?: ViewStyle;
}
