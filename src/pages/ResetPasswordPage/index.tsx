import { Button } from "@/components/Button";
import { FormFieldLabel } from "@/components/FormField/FormFieldLabel";
import { FormFieldRoot } from "@/components/FormField/FormFieldRoot";
import { InputPassword } from "@/components/Input";
import { PasswordTip } from "@/components/PasswordTip";
import { PasswordTipContainer } from "@/components/PasswordTip/PasswordTipContainer";
import { useAuth } from "@/hooks/useAuth";
import { PublicScreenLayout } from "@/layouts/PublicScreenLayout";
import { passwordAndConfirmPasswordSchema } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { Toast } from "toastify-react-native";

export function ResetPasswordPage() {
  const router = useRouter();
  const { resetPassword, handleAuthError } = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    resolver: yupResolver(passwordAndConfirmPasswordSchema),
  });

  const onrResetPassword = async ({
    password,
  }: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      resetPassword(password);
      router.push("/login");
    } catch (error) {
      const errorMessage = handleAuthError(error);
      Toast.show({
        autoHide: false,
        text1: errorMessage,
      });
    } finally {
    }
  };

  return (
    <PublicScreenLayout title='Redefinir senha'>
      <FormFieldRoot>
        <PasswordTipContainer>
          <FormFieldLabel>Nova senha</FormFieldLabel>
          <PasswordTip />
        </PasswordTipContainer>

        <InputPassword
          control={control}
          name='password'
          error={errors?.password}
        />
      </FormFieldRoot>

      <FormFieldRoot>
        <FormFieldLabel>Confirmar nova senha</FormFieldLabel>
        <InputPassword
          control={control}
          name='confirmPassword'
          error={errors?.confirmPassword}
        />
      </FormFieldRoot>

      <Button
        text='Alterar'
        className='gap-2'
        onPress={handleSubmit(onrResetPassword)}
      />
    </PublicScreenLayout>
  );
}

