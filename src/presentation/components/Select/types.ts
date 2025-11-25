export type SelectRef = {
  open: () => void;
  close: () => void;
};

export interface Option {
  label: string;
  value: string | number;
}

export interface SelectProps {
  data: Option[];
  value?: string | number;
  onChange?: (value: string | number) => void;
  placeholder?: string;
  maxHeight?: number;
  disabled?: boolean;
}