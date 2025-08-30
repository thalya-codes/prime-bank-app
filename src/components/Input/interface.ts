import { ReactNode } from "react";
import { TextInputProps } from "react-native";

export interface IInputShared extends TextInputProps {
  isError?: boolean;
}
export interface IInputRoot extends IInputShared {
  children: ReactNode;
}

export interface IInputIcon {
  name: any;
  size?: number;
}

