import { Control, FieldError } from "react-hook-form";

export type TCreateAccountControl = Control<ICreateAccountFields>;

export type TCreateAccountFieldNames = 'fullName' | 'email' | 'cpf' | 'telephone'

export interface ICreateAccountSharedProps<IErrors> {
  control: TCreateAccountControl;
  errors: IErrors;
}

export interface ICreateAccountFieldsStep1 {
  fullName: string;
  email: string;
  cpf: string;
  telephone: string;
}

export interface ICreateAccountFieldsStep2 {
  password: string;
  confirmPassword: string;
  acceptTermAndPolice: boolean;
}
export interface ICreateAccountFields
  extends ICreateAccountFieldsStep1,
    ICreateAccountFieldsStep2 {}

export interface IPersonalInfosStep
  extends ICreateAccountSharedProps<{
    fullName: FieldError | undefined;
    email: FieldError | undefined;
    cpf: FieldError | undefined;
    telephone: FieldError | undefined;
  }> {
  onNextStep: () => void;
}

export interface IDefinePasswordStep
  extends ICreateAccountSharedProps<{
    password: FieldError | undefined;
    confirmPassword: FieldError | undefined;
    acceptTermAndPolice: FieldError | undefined;
  }> {
  control: TCreateAccountControl;
  onCreateAccount: () => void;
  onBackToStep1: () => void;
}

