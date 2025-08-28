import { useState } from "react";
import { Pressable } from "react-native";
import { InputField } from "../Input/InputField";
import { InputIcon } from "../Input/InputIcon";
import { InputRoot } from "../Input/InputRoot";
import { IInputShared } from "../Input/interface";

export const InputPassword = ({ isError = false, ...props }: IInputShared) => {
  const [showPassword, setShowPassword] = useState(false);
  const iconName = showPassword ? "eye-slash" : "eye";

  return (
    <InputRoot isError={isError}>
      <InputField secureTextEntry={showPassword} {...props} />
      <Pressable onPress={() => setShowPassword((prev) => !prev)}>
        <InputIcon name={iconName} size={20} />
      </Pressable>
    </InputRoot>
  );
};

