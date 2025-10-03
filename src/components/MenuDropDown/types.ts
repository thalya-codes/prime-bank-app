export type MenuDropdownRef = {
  open: () => void;
  close: () => void;
};

export interface Option {
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onPress: () => void;
}

export interface MenuDropdownProps {
  data: Option[];
  maxHeight?: number;
  children?: React.ReactNode;
}