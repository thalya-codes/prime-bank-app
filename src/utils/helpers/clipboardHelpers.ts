import * as Clipboard from "expo-clipboard";
import { showSuccessToast, showErrorToast } from "./toastHelpers";

export async function copyToClipboard(
  text: string,
  successMessage: string = "Copiado com sucesso",
  errorMessage: string = "Não foi possível copiar"
) {
  try {
    await Clipboard.setStringAsync(String(text));
    showSuccessToast(successMessage);
  } catch {
    showErrorToast(errorMessage);
  }
}

