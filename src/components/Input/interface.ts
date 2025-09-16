import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
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

export interface IInputPassword extends IInputShared {
  name: string;
  control: any;
  error: FieldError | undefined;
}

