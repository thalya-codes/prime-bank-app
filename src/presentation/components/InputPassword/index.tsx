import { useState } from "react";
import { Controller } from "react-hook-form";
import { Pressable } from "react-native";
import { FormFieldMessage } from "../FormField/FormFieldMessage";
import { InputField } from "../Input/InputField";
import { InputIcon } from "../Input/InputIcon";
import { InputRoot } from "../Input/InputRoot";
import { IInputPassword } from "../Input/interface";

export const InputPassword = ({
  isError = false,
  name = "password",
  control,
  error,
  ...props
}: IInputPassword) => {
  const [showPassword, setShowPassword] = useState(false);
  const iconName = showPassword ? "eye" : "eye-slash";

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ...field } }) => (
        <>
          <InputRoot isError={isError}>
            <InputIcon name='lock' size={18} />

            <InputField
              secureTextEntry={!showPassword}
              onChangeText={onChange}
              {...props}
              {...field}
            />
            <Pressable onPress={() => setShowPassword((prev) => !prev)}>
              <InputIcon name={iconName} size={20} />
            </Pressable>
          </InputRoot>
          {error && (
            <FormFieldMessage isError>{error?.message}</FormFieldMessage>
          )}
        </>
      )}
    />
  );
};

