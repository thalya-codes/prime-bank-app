export type MenuDropdownRef = {
  open: () => void;
  close: () => void;
};

export interface Option {
  label: string;
  onPress: () => void;
}

export interface MenuDropdownProps {
  data: Option[];
  maxHeight?: number;
  iconSize?: number;
  iconColor?: string;
}