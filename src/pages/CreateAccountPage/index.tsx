import {
  cpfSchema,
  emailSchema,
  passwordAndConfirmPasswordSchema,
} from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ICreateAccountFields, TCreateAccountFieldNames } from "./interfaces";
import { DefinePasswordStep } from "./steps/DefinePasswordStep";
import { PersonalInfosStep } from "./steps/PersonalInfosStep";

const createAccountSchema = yup
  .object({
    fullName: yup
      .string()
      .required("O campo é obrigatório!")
      .matches(
        /^(?!.*\s{2,})(?![ ])(?=.*[A-Z].*[A-Z].*).*\S$/,
        "Por favor insira o seu nome completo corretamente."
      ),

    telephone: yup
      .string()
      .required("O campo é obrigatório!")
      .matches(
        /\d{2}\s\d{8,9}/,
        "Telefone inválido. Por favor, insira o número no formato 00 000000000."
      ),

    acceptTermAndPolice: yup
      .boolean()
      .required("O campo é obrigatório!")
      .oneOf(
        [true],
        "Para criar uma conta é necessário aceitar os termos e políticas antes."
      ),
  })
  .concat(passwordAndConfirmPasswordSchema)
  .concat(cpfSchema)
  .concat(emailSchema);

enum CREATE_ACCOUNT_STEPS {
  PERSONAL_INFOS = 1,
  PASSWORD_DEFINITION = 2,
}
export function CreateAccountPage() {
  const router = useRouter();
  const [step, setStep] = useState(CREATE_ACCOUNT_STEPS.PERSONAL_INFOS);

  const {
    control,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm<ICreateAccountFields>({
    defaultValues: {
      fullName: "",
      email: "",
      cpf: "",
      telephone: "",
      password: "",
      confirmPassword: "",
      acceptTermAndPolice: false,
    },
    mode: "onBlur",
    resolver: yupResolver(createAccountSchema),
  });

  const step1FieldNames: TCreateAccountFieldNames[] = [
    "fullName",
    "email",
    "cpf",
    "telephone",
  ];

  const onSubmit = (data: ICreateAccountFields) => {
    console.log(data);
    reset();
    router.push("/login");
  };

  const onNextStep = async () => {
    const isValid = await trigger(step1FieldNames);

    if (isValid) {
      setStep(CREATE_ACCOUNT_STEPS.PASSWORD_DEFINITION);
      return;
    }
  };

  const onBackToStep1 = async () => {
    setStep(CREATE_ACCOUNT_STEPS.PERSONAL_INFOS);
  };

  return step === CREATE_ACCOUNT_STEPS.PERSONAL_INFOS ? (
    <>
      <PersonalInfosStep
        control={control}
        errors={{
          fullName: errors?.fullName,
          cpf: errors?.cpf,
          email: errors?.email,
          telephone: errors?.telephone,
        }}
        onNextStep={onNextStep}
      />
    </>
  ) : (
    <DefinePasswordStep
      control={control}
      onCreateAccount={handleSubmit(onSubmit)}
      errors={{
        password: errors?.password,
        confirmPassword: errors?.confirmPassword,
        acceptTermAndPolice: errors?.acceptTermAndPolice,
      }}
      onBackToStep1={onBackToStep1}
    />
  );
}

