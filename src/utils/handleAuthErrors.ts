import {
  FirebaseAuthErrorCodes,
  FirebaseAuthErrorMessages,
} from "@/enums/FireBaseAuthErrorCodes";

export const handleAuthError = (error: any) => {
  const {
    EMAIL_ALREADY_IN_USE,
    INTERNAL_ERROR,
    INVALID_CREDENTIAL,
    NETWORK_REQUEST_FAILED,
    OPERATION_NOT_ALLOWED,
    TOO_MANY_REQUESTS,
    USER_NOT_FOUND,
  } = FirebaseAuthErrorCodes;

  switch (error.code) {
    case USER_NOT_FOUND:
      return FirebaseAuthErrorMessages.USER_NOT_FOUND;
    case INVALID_CREDENTIAL:
      return FirebaseAuthErrorMessages.INVALID_CREDENTIAL;
    case EMAIL_ALREADY_IN_USE:
      return FirebaseAuthErrorMessages.EMAIL_ALREADY_IN_USE;
    case TOO_MANY_REQUESTS:
      return FirebaseAuthErrorMessages.TOO_MANY_REQUESTS;
    case OPERATION_NOT_ALLOWED:
      return FirebaseAuthErrorMessages.OPERATION_NOT_ALLOWED;
    case NETWORK_REQUEST_FAILED:
      return FirebaseAuthErrorMessages.NETWORK_REQUEST_FAILED;
    case INTERNAL_ERROR:
      return FirebaseAuthErrorMessages.INTERNAL_ERROR;
  }
};

