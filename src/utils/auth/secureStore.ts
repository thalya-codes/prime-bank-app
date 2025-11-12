import { api } from "@/services/api";
import useAuthStore from "@/store/useAuthStore";
import * as SecureStore from "expo-secure-store";

export async function saveToken(key: string, token: string) {
  try {
    await SecureStore.setItemAsync(key, token);
    useAuthStore.setState({ token });
    api.defaults.headers.common.Authorization = `Bearer ${useAuthStore.getState().token}`;
  } catch (error) {
    console.error("Error saving token:", error);
  }
}

export async function getToken(key: string) {
  try {
    const token = await SecureStore.getItemAsync(key);
    if (token) {
      useAuthStore.setState({ token });
      api.defaults.headers.common.Authorization = `Bearer ${useAuthStore.getState().token}`;
      return token;
    } else {
      console.log("No token found.");
      return null;
    }
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

export async function deleteToken(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
    useAuthStore.setState({ token: undefined });
    api.defaults.headers.common.Authorization = `Bearer ${undefined}`;
  } catch (error) {
    console.error("Error deleting token:", error);
  }
}

export function saveBiometricPreference(value: boolean) {
  try {
    SecureStore.setItem(
      process.env.EXPO_PUBLIC_BIOMETRICS_STORE_KEY as string,
      String(value)
    );
  } catch (error) {
    console.error("Error to saving biometric user preference:", error);
  }
}

export function getBiometricPreference() {
  const biometricPreference = SecureStore.getItem(
    process.env.EXPO_PUBLIC_BIOMETRICS_STORE_KEY as string
  );

  return biometricPreference;
}

