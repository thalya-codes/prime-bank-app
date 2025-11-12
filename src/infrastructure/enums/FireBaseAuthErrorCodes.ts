export enum FirebaseAuthErrorCodes {
  // Erros de Credenciais
  USER_NOT_FOUND = "auth/user-not-found",
  WRONG_PASSWORD = "auth/wrong-password",
  INVALID_EMAIL = "auth/invalid-email",
  INVALID_CREDENTIAL = "auth/invalid-credential",

  // Erros de Usuário/Conta
  USER_DISABLED = "auth/user-disabled",
  EMAIL_ALREADY_IN_USE = "auth/email-already-in-use",
  // Erros de Segurança e Requisição
  WEAK_PASSWORD = "auth/weak-password",
  TOO_MANY_REQUESTS = "auth/too-many-requests",
  OPERATION_NOT_ALLOWED = "auth/operation-not-allowed",

  // Erros de Ambiente e Rede
  NETWORK_REQUEST_FAILED = "auth/network-request-failed",
  INTERNAL_ERROR = "auth/internal-error",
}

export enum FirebaseAuthErrorMessages {
  USER_NOT_FOUND = "Nenhum usuário encontrado com as credenciais fornecidas.",
  WRONG_PASSWORD = "A senha está incorreta. Por favor, tente novamente.",
  INVALID_EMAIL = "O endereço de e-mail não é válido.",
  INVALID_CREDENTIAL = "A credencial de autenticação fornecida é inválida.",

  USER_DISABLED = "Esta conta de usuário foi desativada.",
  EMAIL_ALREADY_IN_USE = "O endereço de e-mail já está em uso por outra conta.",

  WEAK_PASSWORD = "A senha é muito fraca. Por favor, escolha uma senha mais forte.",
  TOO_MANY_REQUESTS = "Muitas tentativas. Por favor, tente novamente mais tarde.",
  OPERATION_NOT_ALLOWED = "Esta operação não é permitida. Entre em contato com o suporte.",

  NETWORK_REQUEST_FAILED = "Falha na conexão com a rede. Verifique sua internet e tente novamente.",
  INTERNAL_ERROR = "Ocorreu um erro interno. Por favor, tente novamente mais tarde.",
}

