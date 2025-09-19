import { TextInput, TextInputProps } from "react-native";

export const InputField = (props: TextInputProps) => {
  return (
    <TextInput
      className='flex-1 h-12 text-neutral-700 placeholder placeholder-neutral-400'
      {...props}
    />
  );
};

