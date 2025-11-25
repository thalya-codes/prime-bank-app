import { Toast } from "toastify-react-native";

export function showSuccessToast(message: string) {
  Toast.show({
    autoHide: true,
    text1: message,
    type: "success",
  });
}

export function showErrorToast(message: string, details?: string) {
  Toast.show({
    autoHide: true,
    text1: message,
    text2: details,
    type: "error",
  });
}

export function showInfoToast(message: string) {
  Toast.show({
    autoHide: true,
    text1: message,
    type: "info",
  });
}

