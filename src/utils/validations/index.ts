import * as yup from "yup";

export const passwordSchema = yup.object({
  password: yup
    .string()
    .required("O campo é obrigatório!")
    .min(6, "A senha deve ter no mínimo 6 caracteres.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).*$/,
      "Sua senha não atende aos requisitos. Consulte o ícone i ao lado do campo para mais detalhes."
    ),
});

export const confirmPasswordSchema = yup.object({
  confirmPassword: yup
    .string()
    .required("O campo é obrigatório!")
    .oneOf([yup.ref("password")], "As senhas não coincidem."),
});

export const passwordAndConfirmPasswordSchema = passwordSchema
  .concat(passwordSchema)
  .concat(confirmPasswordSchema);

export const emailSchema = yup.object({
  email: yup
    .string()
    .email(
      "Email inválido. Por favor, insira um email no formato email@email.com"
    )
    .required("O Campo é obrigatório!"),
});
