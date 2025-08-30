import { ReactNode } from "react";

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

export interface BottomSheetProps {
  children?: ReactNode;
}