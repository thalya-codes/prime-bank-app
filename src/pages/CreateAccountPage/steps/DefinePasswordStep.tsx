import { Button } from "@/components/Button";
import { CardHighlight } from "@/components/CardHighlight";
import { Checkbox } from "@/components/Checkbox/Checkbox";
import { CheckboxLabel } from "@/components/Checkbox/CheckboxLabel";
import { FormFieldLabel } from "@/components/FormField/FormFieldLabel";
import { FormFieldMessage } from "@/components/FormField/FormFieldMessage";
import { FormFieldRoot } from "@/components/FormField/FormFieldRoot";
import { InputPassword } from "@/components/Input";
import { PasswordTip } from "@/components/PasswordTip";
import { PublicScreenLayout } from "@/layouts/PublicScreenLayout";
import { Ionicons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { IDefinePasswordStep } from "../interfaces";
import { PasswordTipContainer } from "@/components/PasswordTip/PasswordTipContainer";

export const DefinePasswordStep = ({
  control,
  onCreateAccount,
  errors,
  onBackToStep1,
}: IDefinePasswordStep) => {
  return (
    <PublicScreenLayout
      title='Definir senha'
      subTitle='Crie uma senha segura'
      footer={
        <View className='flex-row justify-between'>
          <CardHighlight iconName={"lock"} text={"100% Seguro"} />
          <CardHighlight iconName={"envelope-o"} text={"Suporte 24h"} />
        </View>
      }
    >
      <FormFieldRoot>
        <PasswordTipContainer className="flex-row items-center justify-between">
          <FormFieldLabel>Senha</FormFieldLabel>
          <PasswordTip />
        </PasswordTipContainer>

        <InputPassword
          placeholder='Mínimo 6 caracteres'
          error={errors?.password}
          name='password'
          control={control}
        />
      </FormFieldRoot>

      <FormFieldRoot>
        <FormFieldLabel>Confirmar senha</FormFieldLabel>
        <InputPassword
          control={control}
          name='confirmPassword'
          error={errors?.confirmPassword}
          placeholder='Digite a senha novamente'
        />
      </FormFieldRoot>

      <Controller
        name='acceptTermAndPolice'
        control={control}
        render={({ field: { onChange, ...props } }) => (
          <FormFieldRoot>
            <Checkbox {...props} onValueChange={onChange}>
              <CheckboxLabel>
                <Text>Aceito os </Text>
                <Text className='text-md font-nunito-bold text-brand-600'>
                  termos de uso
                </Text>
                <Text> e as </Text>
                <Text className='text-md font-nunito-bold text-brand-600'>
                  políticas de privacidade
                </Text>{" "}
              </CheckboxLabel>
            </Checkbox>

            {errors?.acceptTermAndPolice && (
              <FormFieldMessage isError>
                {errors?.acceptTermAndPolice?.message}
              </FormFieldMessage>
            )}
          </FormFieldRoot>
        )}
      />

      <Button text='Criar conta' className='gap-2' onPress={onCreateAccount}>
        <Ionicons name='checkmark-circle-outline' size={28} color={"#fff"} />
      </Button>
      <Button
        variant='link'
        text='Voltar para dados pessoais'
        onPress={onBackToStep1}
      />
    </PublicScreenLayout>
  );
};

