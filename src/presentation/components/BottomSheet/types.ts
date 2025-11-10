import { Dispatch, ReactNode, SetStateAction } from "react";

export type BottomSheetRef = {
  open: () => void;
  close: () => void;
};

export interface BottomSheetProps {
  children?: ReactNode;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

