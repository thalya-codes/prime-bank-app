import Button from "@/presentation/components/Button";
import { FormFieldLabel } from "@/presentation/components/FormField/FormFieldLabel";
import { FormFieldMessage } from "@/presentation/components/FormField/FormFieldMessage";
import { FormFieldRoot } from "@/presentation/components/FormField/FormFieldRoot";
import { InputField, InputIcon, InputRoot } from "@/presentation/components/Input";
import { PublicScreenLayout } from "@/presentation/layouts/PublicScreenLayout";
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
            <FormFieldLabel>Nome completo</FormFieldLabel>
            <InputRoot>
              <InputIcon name='user' />
              <InputField
                placeholder='Seu Nome'
                autoCapitalize='words'
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
                keyboardType='email-address'
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

