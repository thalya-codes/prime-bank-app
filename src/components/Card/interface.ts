import { ReactNode } from "react";

export interface ICard {
  color?: "white" | "light-green" | "strong-green";
  isOutlined?: boolean;
  children: ReactNode;
  className?: string
}

