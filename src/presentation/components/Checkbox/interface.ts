import { ReactNode } from "react";

export interface ICheckbox {
  value: boolean;
  onValueChange: (value: boolean) => void;
  children: ReactNode;
}

