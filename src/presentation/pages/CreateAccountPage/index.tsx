import { useAuth } from "@/presentation/hooks/useAuth";
import {
  emailSchema,
  passwordAndConfirmPasswordSchema,
} from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Toast } from "toastify-react-native";
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
        /\d{2}\d{8,9}/,
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
  .concat(emailSchema);

enum CREATE_ACCOUNT_STEPS {
  PERSONAL_INFOS = 1,
  PASSWORD_DEFINITION = 2,
}
export function CreateAccountPage() {
  const router = useRouter();
  const [step, setStep] = useState(CREATE_ACCOUNT_STEPS.PERSONAL_INFOS);
  const { createNewUser, handleAuthError } = useAuth();

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
    "telephone",
  ];

  const onSubmit = async (data: ICreateAccountFields) => {
    try {
      await createNewUser(data);
      reset();
      router.push("/login");
    } catch (error) {
      console.error(error);
      const errorMessage = handleAuthError(error);
      Toast.show({
        type: "error",
        autoHide: false,
        text1: errorMessage,
      });
    } finally {
    }
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

