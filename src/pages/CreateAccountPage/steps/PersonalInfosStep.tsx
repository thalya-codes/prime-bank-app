import { Button } from "@/components/Button";
import { FormFieldLabel } from "@/components/FormField/FormFieldLabel";
import { FormFieldMessage } from "@/components/FormField/FormFieldMessage";
import { FormFieldRoot } from "@/components/FormField/FormFieldRoot";
import { InputField, InputIcon, InputRoot } from "@/components/Input";
import { PublicScreenLayout } from "@/layouts/PublicScreenLayout";
import { cpfMask, phoneMask } from "@/utils/masks";
import { Controller } from "react-hook-form";
import { IPersonalInfosStep } from "../interfaces";

export const PersonalInfosStep = ({
  control,
  onNextStep,
  errors,
}: IPersonalInfosStep) => {
  return (
    <PublicScreenLayout
      title='Criar conta'
      subTitle='Preencha seus dados pessoais'
    >
      <Controller
        name='fullName'
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <FormFieldRoot>
            <FormFieldLabel>Nova completo</FormFieldLabel>
            <InputRoot>
              <InputIcon name='user' />
              <InputField
                placeholder='Seu Nome'
                onChangeText={onChange}
                {...field}
              />
            </InputRoot>
            {errors?.fullName && (
              <FormFieldMessage isError>
                {errors?.fullName?.message}
              </FormFieldMessage>
            )}
          </FormFieldRoot>
        )}
      />

      <Controller
        name='email'
        control={control}
        render={({ field: { onChange, ...field } }) => (
          <FormFieldRoot>
            <FormFieldLabel>Email</FormFieldLabel>
            <InputRoot>
              <InputIcon name='envelope-o' />

              <InputField
                placeholder='email@email.com'
                onChangeText={onChange}
                {...field}
              />
            </InputRoot>
            {errors?.email && (
              <FormFieldMessage isError>
                {errors?.email?.message}
              </FormFieldMessage>
            )}
          </FormFieldRoot>
        )}
      />

      <Controller
        name='cpf'
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <FormFieldRoot>
            <FormFieldLabel>CPF</FormFieldLabel>
            <InputRoot>
              <InputField
                keyboardType='number-pad'
                placeholder='000.000.000-00'
                value={cpfMask(value)}
                onChangeText={onChange}
                {...field}
              />
            </InputRoot>
            {errors?.cpf && (
              <FormFieldMessage isError>
                {errors?.cpf?.message}
              </FormFieldMessage>
            )}
          </FormFieldRoot>
        )}
      />

      <Controller
        name='telephone'
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <FormFieldRoot>
            <FormFieldLabel>Telefone</FormFieldLabel>
            <InputRoot>
              <InputIcon name='phone' />
              <InputField
                keyboardType='number-pad'
                placeholder='00 000000000'
                onChangeText={onChange}
                value={value}
                {...field}
              />
            </InputRoot>
            {errors?.telephone && (
              <FormFieldMessage isError>
                {errors?.telephone?.message}
              </FormFieldMessage>
            )}
          </FormFieldRoot>
        )}
      />

      <Button
        text='Continuar'
        className='gap-2'
        variant={"primary"}
        onPress={onNextStep}
      />
    </PublicScreenLayout>
  );
};

